sixstreetApp.ManagerFacade = function() {
	this.managerMediator = clone(new sixstreetApp.ManagerMediator(this));
	this.managerProxy = clone(new sixstreetApp.ManagerProxy(this));
	this.managerCommand = clone(new sixstreetApp.ManagerCommand(this));
	
	sixstreetApp.ManagerFacade.prototype.retrieveMediator = function() {
		return this.managerMediator;
	};
	
	sixstreetApp.ManagerFacade.prototype.retrieveProxy = function() {
		return this.managerProxy;
	};	

};