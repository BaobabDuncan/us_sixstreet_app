sixstreetApp.MainFacade = function() {
	this.mainMediator = clone(new sixstreetApp.MainMediator(this));

	sixstreetApp.MainFacade.prototype.retrieveMediator = function() {
		return this.mainMediator;
	};
    
    // show Main Page
    sixstreetApp.MainFacade.prototype.showMainPage = function() {		
		this.mainMediator.initalizeMainPage();
		this.mainMediator.appendHtmlMainPage();
		this.mainMediator.attachMainPageEvents();
		this.mainMediator.displayMainPage();
	};
	
	sixstreetApp.MainFacade.prototype.showMenuPage = function() {
		this.mainMediator.initalizeMenuPage();
		this.mainMediator.appendHtmlMenuPage();
		this.mainMediator.attachMenuPageEvents();
		this.mainMediator.displayMenuPage();
	}
	

};

