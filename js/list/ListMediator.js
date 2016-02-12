sixstreetApp.ListMediator = function(_facade) {	
	var listFacade = _facade;	
	var self = this;
	
	sixstreetApp.ListMediator.prototype.initalizeListPage = function() {		
	  CURRENT_POSITION = Constants.ViewingPage.ListPage;
	}
    sixstreetApp.ListMediator.prototype.appendHtmlListPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);
      var html = self.getHtmlForList();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	}
    sixstreetApp.ListMediator.prototype.getHtmlForList = function() {		
		var html = '';
		
		for (var index = 0; index < myFriendsList.length; index++){
			html += '<div class="list_main">';
			html += '<div class="list_avator">';
			html += '<img src= '+getUserProfilePhotoUrl(myFriendsList[index].user_id)+' class="list_avator_img">';
			html += '</div>';
			html += '<div class="list_menu">';
			html += '<p class="list_user_detail"><span class="list_user_name">'+myFriendsList[index].user_name+'</span>';
			html += '<span class="list_user_point" id="'+index+'">'+myFriendsList[index].contact_count+'Point</span></p>';
			
			html += '<p class="list_function">';
			if (!userIsGuest()){
				//html += '<a href="tel:'+myFriendsList[index].user_phone+'" title="'+myFriendsList[index].user_id+'" class="list_function_image"><img src="./images/call.png"></a>';
				html += '<a href="javascript:" title="'+index+'" class="list_function_image"><img src="./images/call.png"></a>';
				html += '<a href="sms:'+myFriendsList[index].user_phone+'" title="'+myFriendsList[index].user_id+'" class="list_function_image"><img src="./images/sms.png"></a>';
				html += '<a href="mailto:'+myFriendsList[index].user_mail+'" title="'+myFriendsList[index].user_id+'" class="list_function_image"><img src="./images/email.png"></a>';				
			}
			else{				
			}
			html += '</p>';
			html += '</div>';
			
			html += '</div>';
		}
		
		return html
		
	}
    sixstreetApp.ListMediator.prototype.attachMainListEvents = function() {
		$(".list_function_image").click(function(){			
			user = myFriendsList[this.title];
			user.contact_count = user.contact_count + 1;			
			var id = "#"+this.title;
			$(id).html(user.contact_count+'Point');
			listFacade.updateContactCountFiled(user.user_id);
		})
	}
    sixstreetApp.ListMediator.prototype.displayListPage = function() {		
	  goToPage(CURRENT_POSITION,'pop');
	}
	
	
};

