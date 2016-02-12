sixstreetApp.WriteCommand = function(_facade) {
	var writeFacade = _facade;	
	var self = this;
	
	
	sixstreetApp.WriteCommand.prototype.showWritePage = function() {
		if (userIsGuest()){
			writeFacade.showWritePageForGuest();
		}
		else{
			writeFacade.showWritePageForMaster();
		}	
	};
	
	sixstreetApp.WriteCommand.prototype.updateSetting = function() {
		writeFacade.retrieveProxy().updateSetting(self.handleUpdateSetting);
	};	
	sixstreetApp.WriteCommand.prototype.handleUpdateSetting = function() {
		self.deleteOwnerUser();
	};
	sixstreetApp.WriteCommand.prototype.deleteOwnerUser = function() {
		writeFacade.retrieveProxy().deleteOwnerUser(self.handleDeleteOwnerUser);
	};	
	sixstreetApp.WriteCommand.prototype.handleDeleteOwnerUser = function() {
		moveToTheMain();
	};
	
}