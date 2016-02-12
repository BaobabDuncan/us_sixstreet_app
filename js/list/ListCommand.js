sixstreetApp.ListCommand = function(_facade) {
	var listFacade = _facade;	
	var self = this;	

	sixstreetApp.ListCommand.prototype.getFriendsListToLocalDB = function() {
		listFacade.retrieveProxy().getFriendsListToLocalDB(self.handleGetFriendsListToLocalDB);
	};	
	sixstreetApp.ListCommand.prototype.handleGetFriendsListToLocalDB = function(responseObject) {
		var data = responseObject;
		var data_length = data.rows.length;
		if (data_length==0) {
			self.getFriendsListToFile();
		}
		else{			
			self.saveFriendsListToClientArray(responseObject);
		}
			
	};
	
	sixstreetApp.ListCommand.prototype.getSettingToLocalDB = function() {		
		listFacade.retrieveProxy().getSettingToLocalDB(self.handleGetSettingToLocalDB);
	};
	sixstreetApp.ListCommand.prototype.handleGetSettingToLocalDB = function(responseObject) {
		self.saveSettingToClientArray(responseObject);		
	};
	
	sixstreetApp.ListCommand.prototype.getRecommendToLocalDB = function() {		
		listFacade.retrieveProxy().getRecommendToLocalDB(self.handleGetRecommendToLocalDB);
	};
	sixstreetApp.ListCommand.prototype.handleGetRecommendToLocalDB = function(responseObject) {		
		self.saveRecommendToClientArray(responseObject);		
	};
	
	sixstreetApp.ListCommand.prototype.getFriendsListToFile = function() {
		listFacade.retrieveProxy().getFriendsListToFile(self.handleGetFriendsListToFile);
	};	
	sixstreetApp.ListCommand.prototype.handleGetFriendsListToFile = function(responseObject) {		
		listFacade.retrieveProxy().saveFriendsListToLocalDB(responseObject,self.handleSaveFriendsListToLocalDB);		
	};	
	sixstreetApp.ListCommand.prototype.handleSaveFriendsListToLocalDB = function() {
		listFacade.saveSettingTolocalDB();		
	};
	sixstreetApp.ListCommand.prototype.saveSettingTolocalDB = function() {		
		listFacade.retrieveProxy().saveSettingTolocalDB(self.handleSaveSettingTolocalDB);		
	};
	sixstreetApp.ListCommand.prototype.handleSaveSettingTolocalDB = function() {		
		listFacade.saveRecommendTolocalDB();
	};
	sixstreetApp.ListCommand.prototype.saveRecommendTolocalDB = function() {		
		listFacade.retrieveProxy().saveRecommendTolocalDB(self.handleSaveRecommendTolocalDB);	
	};
	sixstreetApp.ListCommand.prototype.handleSaveRecommendTolocalDB = function() {			
		listFacade.getFriendsListToLocalDB();
	};
	
	sixstreetApp.ListCommand.prototype.saveFriendsListToClientArray = function(data) {
		listFacade.retrieveProxy().saveFriendsListToClientArray(data,self.handleSaveFriendsListToClientArray);
	};	
	sixstreetApp.ListCommand.prototype.handleSaveFriendsListToClientArray = function() {		
		listFacade.createRecommendData();
	};
	
	sixstreetApp.ListCommand.prototype.saveSettingToClientArray = function(data) {
		listFacade.retrieveProxy().saveSettingToClientArray(data,self.handleSaveSettingToClientArray);
	};	
	sixstreetApp.ListCommand.prototype.handleSaveSettingToClientArray = function() {		
		listFacade.getRecommendToLocalDB();
	};
	sixstreetApp.ListCommand.prototype.saveRecommendToClientArray = function(data) {
		listFacade.retrieveProxy().saveRecommendToClientArray(data,self.handleSaveRecommendToClientArray);
	};	
	sixstreetApp.ListCommand.prototype.handleSaveRecommendToClientArray = function() {		
		onDeviceReady();
	};
	
	sixstreetApp.ListCommand.prototype.createRecommendData = function() {
		listFacade.retrieveProxy().updateDdayFiled();
		listFacade.retrieveProxy().updateContactScoreFiled(self.handleCreateRecommendData);		
	};	
	sixstreetApp.ListCommand.prototype.handleCreateRecommendData = function() {				
		listFacade.getSettingToLocalDB();
	};
	
	
	
	sixstreetApp.ListCommand.prototype.getRecommendUser = function() {
		return listFacade.retrieveProxy().getRecommendUser(self.handlerGetRecommendUser);
	};
	sixstreetApp.ListCommand.prototype.handlerGetRecommendUser = function() {
		listFacade.updateRecommendationFiled();
	};	
	sixstreetApp.ListCommand.prototype.updateRecommendationFiled = function() {		
		listFacade.retrieveProxy().updateRecommendationFiled(self.handlerUpdateRecommendationFiled);
	};
	sixstreetApp.ListCommand.prototype.handlerUpdateRecommendationFiled = function() {
		listFacade.updateRecommend();
	};	
	sixstreetApp.ListCommand.prototype.updateRecommend = function() {
		listFacade.retrieveProxy().updateRecommend(self.handlerUpdateRecommend);
	};
	sixstreetApp.ListCommand.prototype.handlerUpdateRecommend = function() {
		//console.info(2)
	};	
	
	sixstreetApp.ListCommand.prototype.updateContactCountFiled = function(user_id) {		
		listFacade.retrieveProxy().updateContactCountFiled(user_id,self.handlerUpdateContactCountFiled);
	};
	sixstreetApp.ListCommand.prototype.handlerUpdateContactCountFiled = function() {
		//location.href="http://www.daum.net/"
	};	
}