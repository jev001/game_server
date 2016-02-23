function Mail_Detail() {
	this.pickup = 0; 				//是否收取过附件
	this.mail_id = 0; 			//邮件id
	this.send_time = 0; 		//发邮件时间
	this.sender_type = 0; 	//发件人类型
	this.sender_id = 0; 		//发件人id
	this.sender_name = ""; 	//发件人名字
	this.mail_title = ""; 	//邮件标题
	this.mail_content = ""; //邮件内容
	this.bind_copper = 0;		//绑定铜钱
	this.copper = 0;				//铜钱
	this.bind_gold = 0;			//绑定元宝
	this.gold = 0;					//元宝
	
	this.serialize = function(buffer) {
		buffer.write_int8(pickup);
		buffer.write_int32(mail_id);
		buffer.write_int32(send_time);
		buffer.write_int32(sender_type);
		buffer.write_int64(sender_id);
		buffer.write_string(sender_name);
		buffer.write_string(mail_title);
		buffer.write_string(mail_content);
		buffer.write_int32(bind_copper);
		buffer.write_int32(copper);
		buffer.write_int32(bind_gold);
		buffer.write_int32(gold);
	}

	this.deserialize = function(buffer) {
		pickup = buffer.read_int8();
		mail_id = buffer.read_int32();
		send_time = buffer.read_int32();
		sender_type = buffer.read_int32();
		sender_id = buffer.read_int64();
		sender_name = buffer.read_string();
		mail_title = buffer.read_string();
		mail_content = buffer.read_string();
		bind_copper = buffer.read_int32();
		copper = buffer.read_int32();
		bind_gold = buffer.read_int32();
		gold = buffer.read_int32();
    };
}

function Mail_Info() {
	this.role_id = 0;						//角色ID
	this.total_count = 0; 			//邮件的总数量，即目前为止收到的所有邮件数
	this.mail_map = new Map();		//邮件信息map
	this.is_change = false;			//邮件数据是否改变
	
	this.serialize = function(buffer) {
		buffer.write_int64(role_id);
		buffer.write_int32(total_count);
		buffer.write_uint16(mail_map.size());
		mail_map.each(function(key,value,index) {
			value.serialize(buffer);
     	});
		buffer.write_bool(is_change);
	}
	
	this.deserialize = function(buffer) {
		this.role_id = buffer.read_int64();
		this.total_count = buffer.read_int32();
		var len = buffer.read_uint16();
		for (var i = 0; i < len; ++i) {
			var mail_detail = new Mail_Detail();
			mail_detail.deserialize(buffer);
			this.mail_map.put(mail_detail.mail_id, mail_detail);
		}
		this.is_change = buffer.read_bool();
	}
}