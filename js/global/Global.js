settingDB();

function settingDB() {
	myDBHandler = new DBHandler(databaseOptions);
	myDBHandler.connectDB();
	myDBHandler.createFriendsTable();
	myDBHandler.createSettingTable();
	myDBHandler.createRecommendTable();
}

function clone(obj) {
	if(typeof(obj) != 'object') return obj;
	if(obj == null) return obj;
	
	var newObj = new Object();
	for(var i in obj) newObj[i] = clone(obj[i]);
	return newObj;
};

function getJqtCurrentPageWrapper(pageId) {
	var wrapperPage = pageId+'-wrapper';
	return wrapperPage	
};

function emptyHTML(Id){
	$(Id).empty();
};

function goToPage(pageId,event,reverse) {	
	if (event==null) event='';
	if (reverse==null) reverse=false;
	jQT.goTo(pageId,event,reverse);	
};

function getUserProfilePhotoUrl(user_id) {
	url = './images/user_profile/'+user_id+'.jpg';
	return url 
}

function getTodayDateForRecommend() {
	var date = new Date();
	return date.getDate();		
}

function userIsGuest(){
	return mySetting.code==Constants.Boolean.False
}

function getRandomFromTo(from,to){
	return Math.floor(Math.random() * (to - from + 1) + from);
}

function moveToTheMain(){
	document.location.replace('main.html');	
}