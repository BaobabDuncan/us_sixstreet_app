sixstreetApp.ListFacade = function() {
	this.listProxy = clone(new sixstreetApp.ListProxy(this));
	this.listCommand = clone(new sixstreetApp.ListCommand(this));
	this.listMediator = clone(new sixstreetApp.ListMediator(this));

	sixstreetApp.ListFacade.prototype.retrieveMediator = function() {
		return this.listMediator;
	};
	
	sixstreetApp.ListFacade.prototype.retrieveProxy = function() {
		return this.listProxy;
	};
	
	// get Friends List Data
	sixstreetApp.ListFacade.prototype.getFriendsListToLocalDB = function() {
		this.listCommand.getFriendsListToLocalDB();
	};
	
	sixstreetApp.ListFacade.prototype.saveSettingTolocalDB = function() {
		this.listCommand.saveSettingTolocalDB();
	};	
	sixstreetApp.ListFacade.prototype.saveRecommendTolocalDB = function() {
		this.listCommand.saveRecommendTolocalDB();
	};
	
	// get setting Data
	sixstreetApp.ListFacade.prototype.getSettingToLocalDB = function() {
		this.listCommand.getSettingToLocalDB();
	};
	
	// get recommend Data
	sixstreetApp.ListFacade.prototype.getRecommendToLocalDB = function() {
		this.listCommand.getRecommendToLocalDB();
	};
	
	
	
	// show Friends List 
	sixstreetApp.ListFacade.prototype.showListPage = function() {
		this.listMediator.initalizeListPage();
		this.listMediator.appendHtmlListPage();
		this.listMediator.attachMainListEvents();
		this.listMediator.displayListPage();
	};
	
	sixstreetApp.ListFacade.prototype.createRecommendData = function() {
		this.listCommand.createRecommendData();
	};
	
	sixstreetApp.ListFacade.prototype.getRecommendUser = function() {
		return this.listCommand.getRecommendUser();
	};
	
	sixstreetApp.ListFacade.prototype.updateRecommendationFiled = function(data) {
		return this.listCommand.updateRecommendationFiled(data);
	};
	
	sixstreetApp.ListFacade.prototype.getDdayUser = function() {
		return this.listProxy.getDdayUser();
	};
	
	sixstreetApp.ListFacade.prototype.updateRecommend = function() {
		return this.listCommand.updateRecommend();
	};
	
	sixstreetApp.ListFacade.prototype.updateContactCountFiled = function(user_ud) {
		return this.listCommand.updateContactCountFiled(user_ud);
	};
	
	
	
};