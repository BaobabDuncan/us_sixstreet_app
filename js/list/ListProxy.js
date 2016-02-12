sixstreetApp.ListProxy = function(_facade) {
	var listFacade = _facade;	
	var self = this;
	
	var INDICATOR = {
			index: 0,
			length: 0
	};
	
	sixstreetApp.ListProxy.prototype.getFriendsListToLocalDB = function(callbackFunc) {
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from friends';
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc(results);
			}, self.handleError);
		});		
	};
	
	sixstreetApp.ListProxy.prototype.getSettingToLocalDB = function(callbackFunc) {
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from setting WHERE setting_id = '+Constants.Setting_id+'';
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc(results);
			}, self.handleError);
		});		
	};
	
	sixstreetApp.ListProxy.prototype.getRecommendToLocalDB = function(callbackFunc) {
		myDBHandler.database.transaction(function (tx) {
			var sql = 'select * from recommend WHERE recommend_id = '+Constants.recommend_id+'';
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc(results);
			}, self.handleError);
		});		
	};
	
	sixstreetApp.ListProxy.prototype.getFriendsListToFile = function(callbackFunc) {
		$.ajax({
			url:"./file/list.txt",
			error : function(e){
				console.info('atomApp.DictionaryProxy.prototype.getFile Error = ' + e.message);
			},
			success : function(data){				
				callbackFunc(data);
			} 
		})
	};
	
	sixstreetApp.ListProxy.prototype.saveFriendsListToLocalDB = function(data,callbackFunc) {
		var tempFriendsList = new Array();
		var data = data.split(Constants.Separator.FriendLine);	
		var data_len = data.length;		
		for (var index = 0; index < data_len; index++)
		{			
			var friendslist = jQuery.trim(data[index]);			
			var friendListVO = self.parseFileFriendList(friendslist);			
			tempFriendsList.push(friendListVO)			
		}
		
		data_len = tempFriendsList.length;
		INDICATOR.length = data_len;
		INDICATOR.index = 0;
		myDBHandler.database.transaction(function(tx){
			for (var index = 0; index < data_len; index++){				
				var friendslist = tempFriendsList[index];
				try{					
					tx.executeSql('INSERT INTO friends (user_id, user_name, user_phone, user_address, user_mail, user_birth) VALUES (?,?,?,?,?,?)',
							[friendslist.user_id, friendslist.user_name, friendslist.user_phone, friendslist.user_address, friendslist.user_mail, friendslist.user_birth],
							function(trans, results){
								INDICATOR.index += 1;
								if (INDICATOR.index==INDICATOR.length){
									callbackFunc();
								}
							}, function(trans, results){
								console.log('sixstreetApp.ListProxy.prototype.saveFriendsListToLocalDB = ' + results.message);
							});
				}catch(e){
					alert('sixstreetApp.ListProxy.prototype.saveFriendsListToLocalDB = ' + e.message);
				}
			}
		});		
	};
	
	sixstreetApp.ListProxy.prototype.saveFriendsListToClientArray = function(data,callbackFunc) {
		
		var tempFriendsList = new Array();
		var data_len = data.rows.length;
		for (var index = 0; index < data_len; index++)
		{						
			var friendslist = data.rows.item(index);			
			var friendListVO = self.parseDbFriendList(friendslist);
			tempFriendsList.push(friendListVO);			
		}
		myFriendsList = tempFriendsList;
		myFriendsList.sort(self.SortByRand);
		callbackFunc();
	};
	
	sixstreetApp.ListProxy.prototype.saveSettingToClientArray = function(data,callbackFunc) {			
		for (var index = 0; index < data.rows.length; index++)
		{						
			var setting = data.rows.item(index);			
			var settingVO = new sixstreetApp.VO_Setting();
			settingVO.setting_id = setting['setting_id'];
			settingVO.user_id = setting['user_id'];
			settingVO.code = setting['code'];
			settingVO.write = setting['write'];		
		}		
		mySetting = settingVO;
		callbackFunc();
	};
	
	sixstreetApp.ListProxy.prototype.saveRecommendToClientArray = function(data,callbackFunc) {			
		for (var index = 0; index < data.rows.length; index++)
		{						
			var recommend = data.rows.item(index);			
			var recommendVO = new sixstreetApp.VO_Recommend();
			recommendVO.recommend_id = recommend['recommend_id'];
			recommendVO.user_id = recommend['user_id'];
			recommendVO.date = recommend['date'];			
		}		
		myRecommend = recommendVO;
		callbackFunc();
	};
	
	
	sixstreetApp.ListProxy.prototype.parseFileFriendList = function(friendslist) {
		friendslist = friendslist.split(Constants.Separator.FriendSection);		
		var friendListVO = new sixstreetApp.VO_FriendsList();
		friendListVO.user_id = jQuery.trim(friendslist[0]);
		friendListVO.user_name = jQuery.trim(friendslist[1]);
		friendListVO.user_phone = jQuery.trim(friendslist[2]);
		friendListVO.user_address = jQuery.trim(friendslist[3]);
		friendListVO.user_mail = jQuery.trim(friendslist[4]);
		friendListVO.user_birth = jQuery.trim(friendslist[5]);		
		return friendListVO
	};
	
	sixstreetApp.ListProxy.prototype.parseDbFriendList = function(friendslist) {		
		var friendListVO = new sixstreetApp.VO_FriendsList();
		friendListVO.user_id = friendslist['user_id'];
		friendListVO.user_name = friendslist['user_name']; 
		friendListVO.user_phone = friendslist['user_phone'];
		friendListVO.user_address = friendslist['user_address'];
		friendListVO.user_mail = friendslist['user_mail'];
		friendListVO.user_birth = friendslist['user_birth'];
		friendListVO.recommendation_count = friendslist['recommendation_count'];
		friendListVO.contact_count = friendslist['contact_count'];
		return friendListVO
	};
	
	sixstreetApp.ListProxy.prototype.updateDdayFiled = function() {		
		for (var index = 0; index < myFriendsList.length; index++)
		{			
			//console.info(myFriendsList[index].user_birth);
			var today = new Date();
			var user_birth_list = myFriendsList[index].user_birth.split(Constants.Separator.BirthSection);			
			var year = today.getFullYear();						
			var month = Number(user_birth_list[1]);
			var day = Number(user_birth_list[2]);				
			//var birthday = new Date(year,month-1,day);
			var birthday = new Date(year,month-1,day);			
			if (today - birthday > 0){
				birthday = new Date(year+1,month-1,day);
				d_day = today - birthday;
			}
			else {
				d_day = today - birthday;
			}
			d_day = d_day/1000/60/60/24;
			d_day = d_day*(-1);
			d_day = Math.ceil(d_day);
			if (d_day == 366){
				d_day = 0;
			}
			myFriendsList[index].d_day = d_day;
		}
	};
	
	sixstreetApp.ListProxy.prototype.updateContactScoreFiled = function(callbackFunc) {		
		for (var index = 0; index < myFriendsList.length; index++)
		{
			var recommendation_count = myFriendsList[index].recommendation_count;
			var contact_count = myFriendsList[index].contact_count;
			//console.info(myFriendsList[index].user_birth);
			var contact_score = recommendation_count + contact_count;			
			myFriendsList[index].contact_score = contact_score;
		}
		callbackFunc();
	};
	
	sixstreetApp.ListProxy.prototype.getRecommendUser = function(callbackFunc) {	
		myFriendsList.sort(self.SortByContact);
		var index = getRandomFromTo(Constants.RandomNum.From,Constants.RandomNum.To);		
		var recommendUser = myFriendsList[index];		
		myRecommend.user_id = recommendUser.user_id;
		callbackFunc();
		return recommendUser;
		
	};
	sixstreetApp.ListProxy.prototype.SortByContact = function(a,b) {
		return a.contact_score - b.contact_score;
	};
	
	sixstreetApp.ListProxy.prototype.getUserByUserId = function(aUser_id) {		
		for (var index = 0; index < myFriendsList.length; index++)
		{
			var user = null;
			user = myFriendsList[index]
			if (myFriendsList[index].user_id == aUser_id) {
				return user;
			}
		}
		return user;
	};
	
	sixstreetApp.ListProxy.prototype.updateRecommendationFiled = function(callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = "UPDATE friends SET recommendation_count = recommendation_count + 1 WHERE user_id = '"+myRecommend.user_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc();
			}, self.handleError);
		});
	};
	
	sixstreetApp.ListProxy.prototype.updateContactCountFiled = function(user_id,callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = "UPDATE friends SET contact_count = contact_count + 1 WHERE user_id = '"+user_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc();
			}, self.handleError);
		});
	};
	
	sixstreetApp.ListProxy.prototype.updateRecommend = function(callbackFunc) {
		var today = getTodayDateForRecommend();		
		myDBHandler.database.transaction(function (tx) {
			var sql = "UPDATE recommend SET user_id = '"+myRecommend.user_id+"',date= '"+today+"' WHERE recommend_id = '"+Constants.recommend_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc();
			}, self.handleError);
		});
	};
	//var sql = "UPDATE setting SET user_id = '"+mySetting.user_id+"' ,code = '"+mySetting.code+"' WHERE setting_id = '"+Constants.Setting_id+"'";
	
	sixstreetApp.ListProxy.prototype.saveSettingTolocalDB = function(callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			tx.executeSql("INSERT INTO setting (setting_id,code,write) VALUES (?,?,?)",
				[Constants.Setting_id,Constants.Boolean.False,Constants.Boolean.False],
				function(trans, results)  {				
					callbackFunc();
				}, self.handleError);
		});
	};
	
	sixstreetApp.ListProxy.prototype.saveRecommendTolocalDB = function(callbackFunc) {
		var today = getTodayDateForRecommend();
		myDBHandler.database.transaction(function (tx) {
			tx.executeSql("INSERT INTO recommend (recommend_id,user_id,date) VALUES (?,?,?)",
				[Constants.recommend_id,Constants.FirstRecommend.User_id,today],
				function(trans, results)  {				
					callbackFunc();
				}, self.handleError);
		});
	};
	
	sixstreetApp.ListProxy.prototype.getDdayUser = function() {
		var dDayUser = new Array();
		myFriendsList.sort(self.SortByDday);
		dDayUser[0] = myFriendsList[0];
		dDayUser[1] = myFriendsList[1];		
		return dDayUser;
	};
	sixstreetApp.ListProxy.prototype.SortByDday = function(a,b) {
		return a.d_day - b.d_day;
	};
	sixstreetApp.ListProxy.prototype.SortByRand = function() {
		return (Math.round(Math.random())-0.5);
	}
};
