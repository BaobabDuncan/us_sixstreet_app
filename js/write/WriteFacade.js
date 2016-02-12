sixstreetApp.WriteFacade = function() {
	this.writeProxy = clone(new sixstreetApp.WriteProxy(this));
	this.writeCommand = clone(new sixstreetApp.WriteCommand(this));
	this.writeMediator = clone(new sixstreetApp.WriteMediator(this));

	sixstreetApp.WriteFacade.prototype.retrieveMediator = function() {
		return this.writeMediator;
	};
	
	sixstreetApp.WriteFacade.prototype.retrieveProxy = function() {
		return this.writeProxy;
	};
	
	sixstreetApp.WriteFacade.prototype.showWritePage = function() {
		this.writeCommand.showWritePage();			
	};
	
	sixstreetApp.WriteFacade.prototype.showWritePageForGuest = function() {
		this.writeMediator.initalizeWritePage();
		this.writeMediator.appendHtmlWritePage();
		this.writeMediator.attachMainWriteEvents();
		this.writeMediator.displayWritePage();
	};
	
	sixstreetApp.WriteFacade.prototype.showWritePageForMaster = function() {
		this.writeMediator.initalizeWritePageForMaster();
		this.writeMediator.appendHtmlWritePageForMaster();
		this.writeMediator.attachMainWriteEventsForMaster();
		this.writeMediator.displayWritePage();
	};
	
	
	
	sixstreetApp.WriteFacade.prototype.registrationUser = function() {
		this.writeCommand.updateSetting();
	};

};