function sixstreetApp(){
	sixstreetApp.prototype = new Object();
};

sixstreetApp.VO_FriendsList = function() {
	this.user_id = '';	
	this.user_name = '';
	this.user_address = '';
	this.user_mail = '';
	this.user_birth = '';
	this.recommendation_count = '';
	this.contact_count = '';
	this.d_day = '';
	this.contact_score = '';
	this.etc = '';
};

sixstreetApp.VO_Setting = function() {
	this.setting_id = '';	
	this.user_id = '';
	this.code = '';
	this.write = '';	
};

sixstreetApp.VO_Recommend = function() {
	this.recommend_id = '';	
	this.user_id = '';
	this.date = '';	
};
