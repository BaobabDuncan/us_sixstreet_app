sixstreetApp.WriteProxy = function(_facade) {
	var writeFacade = _facade;	
	var self = this;
	
	
	sixstreetApp.WriteProxy.prototype.updateSetting = function(callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = "UPDATE setting SET user_id = '"+mySetting.user_id+"' ,code = '"+mySetting.code+"' WHERE setting_id = '"+Constants.Setting_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc();
			}, self.handleError);
		});
	};
	sixstreetApp.WriteProxy.prototype.deleteOwnerUser = function(callbackFunc) {		
		myDBHandler.database.transaction(function (tx) {
			var sql = "DELETE FROM friends WHERE user_id = '"+mySetting.user_id+"'";
			tx.executeSql(sql,[], function(transaction, results)  {				
				callbackFunc();
			}, self.handleError);
		});
	};
};
