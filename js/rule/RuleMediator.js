sixstreetApp.RuleMediator = function(_facade) {	
	var ruleFacade = _facade;	
	var self = this;
	
	sixstreetApp.RuleMediator.prototype.initalizeRulePage = function() {		
	  CURRENT_POSITION = Constants.ViewingPage.RulePage;
	}
    sixstreetApp.RuleMediator.prototype.appendHtmlRulePage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);
      var html = self.getHtmlForRule();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	}
    sixstreetApp.RuleMediator.prototype.getHtmlForRule = function() {
      var html = '';
      html += '<div><img src="./images/rule_page.jpg"></div>';
      return html
		
	}
    sixstreetApp.RuleMediator.prototype.attachMainRuleEvents = function() {
		
	}
    sixstreetApp.RuleMediator.prototype.displayRulePage = function() {		
	  goToPage(CURRENT_POSITION,'pop');
	}
};

