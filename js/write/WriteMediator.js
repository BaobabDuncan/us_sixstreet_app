sixstreetApp.WriteMediator = function(_facade) {	
	var writeFacade = _facade;	
	var self = this;
	
	sixstreetApp.WriteMediator.prototype.initalizeWritePage = function() {		
	  CURRENT_POSITION = Constants.ViewingPage.WritePage;
	}
    sixstreetApp.WriteMediator.prototype.appendHtmlWritePage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);
      var html = self.getHtmlForWrite();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	}
    sixstreetApp.WriteMediator.prototype.getHtmlForWrite = function() {
      var html = '';
	  html += '<div class="info">';
      html += '<p>청우회 회원님들은<br> 이름 선택 후 알려드린 코드를 입력해 주세요</p>';	 
	  html += '<p class="error_message" id="error_message"></p>';
      html += '</div>';
	  /*html += '<h2>손님</h2>';
	  html += '<ul class="rounded">';
	  html += '<li class="arrow"><a href="javascript:" id="user_guest">둘러보기</a></li>';
	  html += '</ul>';*/
	  html += '<h2>청우회 회원</h2>';
	  html += '<ul class="edit rounded">';
	  html += '<li><input type="text" name="write_code" id="write_code" placeholder="Code"/></li>';
	  html += '<li>'+self.getHtmlForUserChoice()+'</li>';      
	  html += '<li class="arrow"><a href="javascript:void(0);" id="user_info_button">청우회 회원으로 시작하기</a></li>';
	  html += '</ul>';
      return html;		
	}
	sixstreetApp.WriteMediator.prototype.getHtmlForUserChoice = function() {
		var html = '';
		html += '<select id="select_user">';		
		for (var index=0; index< myFriendsList.length; index++){
			html += '<option value="'+myFriendsList[index].user_id+'">'+myFriendsList[index].user_name+'</option>';	
		}		
		html += '</select>';	
		return html;
	}	
    sixstreetApp.WriteMediator.prototype.attachMainWriteEvents = function() {
		/*$("#user_guest").click(function(){			
			listFacade.showListPage();		
		})*/
		$('#user_info_button').click(function(){
			/*if ($("#select_user").val()==Constants.Guest_id)
			{				
				listFacade.showListPage();				
			}*/
			if ($("#write_code").val()==Constants.StreetCode.Master)
			{
				mySetting.user_id = $("#select_user").val();
				mySetting.code = Constants.Boolean.True;
				writeFacade.registrationUser();				
			}
			else{
				$("#error_message").html('코드가 일치하지 않습니다. 청우회 회원은 우상욱님에게 문의 주세요^^');				
			}
		})
	}
    sixstreetApp.WriteMediator.prototype.displayWritePage = function() {		
	  goToPage(CURRENT_POSITION,'pop');
	}
	
	
	
	sixstreetApp.WriteMediator.prototype.initalizeWritePageForMaster = function() {		
	  CURRENT_POSITION = Constants.ViewingPage.WritePage;
	}
    sixstreetApp.WriteMediator.prototype.appendHtmlWritePageForMaster = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);
      var html = self.getHtmlForWriteForMaster();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	}
    sixstreetApp.WriteMediator.prototype.getHtmlForWriteForMaster = function() {
		var html = '';
		html = '<h1>승인인 완료 되었습니다.</h1>';
		return html;		
	}	
    sixstreetApp.WriteMediator.prototype.attachMainWriteEventsForMaster = function() {
		
	}
    
};

