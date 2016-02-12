sixstreetApp.MainMediator = function(_facade) {	
	var mainFacade = _facade;	
	var self = this;
    
    sixstreetApp.MainMediator.prototype.initalizeMainPage = function() {
	  CURRENT_POSITION = Constants.ViewingPage.MainPage;
	}
    sixstreetApp.MainMediator.prototype.appendHtmlMainPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);      
      var html = self.getHtmlForMain();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	}
    sixstreetApp.MainMediator.prototype.getHtmlForMain = function() {
      var html = '';
      html += '<h1>ToDay 추천 연락</h1>';
	  html += self.getHtmlForRecommendUser();
	  html += '<h1> D-Day 생일</h1>';
	  html += self.getHtmlForDdayUser();
      return html;		
	}
	
	sixstreetApp.MainMediator.prototype.getHtmlForRecommendUser = function() {		
		var today = getTodayDateForRecommend();		
		if (today == myRecommend.date){
			recommendUser = listFacade.retrieveProxy().getUserByUserId(myRecommend.user_id);			
		}
		else {
			recommendUser = listFacade.getRecommendUser();	
		}
		//if (!userIsGuest()){
		var html = '';		
		html += '<div class="main_main">';
		html += '<div class="main_avator">';
		html += '<img src = '+getUserProfilePhotoUrl(recommendUser.user_id)+' class="main_avator_img">';
		html += '</div>';
		html += '<div class="main_menu">';
		html += '<p class="main_user_detail">';
		//html += '<span>'+recommendUser.contact_score+' Point</span></p>';
		html += '<span>오늘은 '+self.getUserName(recommendUser.user_id)+'에게</span></p>';
		
		if (!userIsGuest()){
			html += '<p class="main_function">';
			html += '<a href="sms:'+recommendUser.user_phone+'" title="'+recommendUser.user_id+'" class="main_function_image"><img src="./images/sms.png"></a>';
			html += '<a href="tel:'+recommendUser.user_phone+'" title="'+recommendUser.user_id+'" class="main_function_image"><img src="./images/call.png"></a>';
			html += '<a href="mailto:'+recommendUser.user_mail+'" title="'+recommendUser.user_id+'" class="main_function_image"><img src="./images/email.png"></a>';
			html += '</p>';
			
		}
		else{
			html += '';
		}		
		html += '</div>';
		html += '</div>';
		return html;
	}
	sixstreetApp.MainMediator.prototype.getHtmlForDdayUser = function() {
		dDayUser = listFacade.getDdayUser();		
		var html = '';
		html += '<div class="d_day_main">';
		html += '<table class="d_day_table">';	
		
		for (var index=0; index < dDayUser.length; index++){
			html += '<tbody><tr class="d_day_tbody">';
			html += '<td width="20"></td>';
			html += '<td>'+dDayUser[index].user_name+' 생일 '+dDayUser[index].d_day+'일전</td>'
			
			if (!userIsGuest()&&dDayUser[index].d_day==0){
				html += '<td><a href="tel:'+dDayUser[index].user_phone+'"><img src="./images/call.png"></a></td>';
			}
			else{
				html += '<td></td>';
			}
			html += '</tr><tbody>';
		}
		html += '</table>';
		html += '</div>';		
		return html;
	};
	
    sixstreetApp.MainMediator.prototype.attachMainPageEvents = function() {		
		$(".main_function_image").click(function(){			
			listFacade.updateContactCountFiled(this.title);
		})		
		
	};
    sixstreetApp.MainMediator.prototype.displayMainPage = function() {
	  goToPage(CURRENT_POSITION,'pop');
	};
	
	sixstreetApp.MainMediator.prototype.initalizeMenuPage = function() {
	  CURRENT_POSITION = Constants.ViewingPage.MenuPage;
	};
    sixstreetApp.MainMediator.prototype.appendHtmlMenuPage = function() {
	  var targetDiv = getJqtCurrentPageWrapper(CURRENT_POSITION);
      emptyHTML(targetDiv);      
      var html = self.getHtmlForMenu();
      var insert = $(html);  	
      $(targetDiv).append(insert);
	};
	sixstreetApp.MainMediator.prototype.getHtmlForMenu = function() {		
		var html = '';
		if(userIsGuest()){
			html += '<div class="info">';
			html += '<p>일부 기능이 제한된 상태 입니다.</p>';
			html += '<p>청우회 회원분들만 코드를 입력해 주세요</p>';				
			html += '</div>';
		}
		else{
			html += '<div class="info">';
			html += '<p>'+self.getUserName(mySetting.user_id)+' 밥은 먹고 다니냐?</p>';			
			html += '</div>';
		}
		
		html += "<ul class='rounded'>";
        html += "<li class='arrow'><a href='javascript:' class='movePage' title='1'>청우회 소식</a></li>";
		html += "<li class='arrow'><a href='javascript:' class='movePage' title='2'>청우회 명부</a></li>";
		html += "<li class='arrow'><a href='javascript:' class='movePage' title='3'>청우회 회칙</a></li>";
		if (userIsGuest()){
			html += "<li class='arrow'><a href='javascript:' class='movePage' title='4'>코드 입력</a></li>";
		}
		else{
			html += "<li class='arrow'><a href='http://cafe.naver.com/sixstreet' target='_blank'>청우회 카페 가기</a></li>";
		}
        html += "</ul>";       
		return html
	};
	sixstreetApp.MainMediator.prototype.getUserName = function(user_id){
		user_id = user_id*1;
		user_name = null;
		switch(user_id)
		{
		case 1:
		  user_name = '떡갱';
		  break;
		case 2:
		  user_name = '쫑자';
		  break;
		case 3:
		  user_name = '똥';
		  break;
		case 4:
		  user_name = '소';
		  break;
		case 5:
		  user_name = '동글';
		  break;
		case 6:
		  user_name = '빽똥';
		  break;
		case 7:
		  user_name = '문오바';
		  break;
		case 8:
		  user_name = '맨봉';
		  break;
		case 9:
		  user_name = '간지';
		  break;
		case 10:
		  user_name = '지털';
		  break;
		case 11:
		  user_name = '질라';
		  break;
		case 12:
		  user_name = '싸이';
		  break;
		case 13:
		  user_name = '망구';
		  break;
		default:
		  user_name = '누구냐 넌?';
		}
		return user_name
		
	}
	sixstreetApp.MainMediator.prototype.attachMenuPageEvents = function() {		
		$(".movePage").click(function(){			
			if(this.title=='1'){
				mainFacade.showMainPage();
			}
			else if(this.title=='2'){
				listFacade.showListPage();
			}
			else if(this.title=='3'){
				ruleFacade.showRulePage();		
			}
			else if(this.title=='4'){
				writeFacade.showWritePage();
			}
		});		
	};
    sixstreetApp.MainMediator.prototype.displayMenuPage = function() {
		goToPage(CURRENT_POSITION,'pop');
	};
};

