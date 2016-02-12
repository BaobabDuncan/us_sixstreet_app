sixstreetApp.RuleFacade = function() {
	this.ruleMediator = clone(new sixstreetApp.RuleMediator(this));

	sixstreetApp.RuleFacade.prototype.retrieveMediator = function() {
		return this.ruleMediator;
	};
	
	sixstreetApp.RuleFacade.prototype.showRulePage = function() {
		this.ruleMediator.initalizeRulePage();
		this.ruleMediator.appendHtmlRulePage();
		this.ruleMediator.attachMainRuleEvents();
		this.ruleMediator.displayRulePage();
	};

};