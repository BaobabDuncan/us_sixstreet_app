var CURRENT_POSITION = null;
var myDBHandler = null;
var myFriendsList = null;
var mySetting = null;
var myRecommend = null;


var databaseOptions = {
	fileName: "sixstreet.db",
	version: "1.0",
	displayName:"sixstreet db",
	maxSize: 1024
};

var Constants = {
	StreetCode :{
		Guest : 0,
		Master : 851226
	},
	TabbarItems: {
		CMD_MAIN:'cmdmain',
		CMD_LIST:'cmdlist',
		CMD_RULE:'cmdrule',
		CMD_CODE:'cmdcode'	
	},
	ViewingPage : {
		MainPage : '#mainview',
		ListPage : '#listview',
		RulePage : '#ruleview',
		WritePage : '#writeview',
		CodePage : '#codeview',
		MenuPage : '#menuview'
	},
	Separator :{		
		FriendLine : '\n',
		FriendSection : '|',
		BirthSection : '.'
	},
	Boolean : {
		False : "false",
		True : "true"
	},
	FirstRecommend : {
		User_id : 9
	},
	RandomNum : {
		From : 0,
		To : 5
	},
	Setting_id : 1,
	recommend_id : 1,
	Guest_id : 0
}