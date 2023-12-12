var o = 0;
var g = 0;
const processContent = () => {
  // do whatever here.
  let data = {message: "UPDATE_BACKGROUND_DATA"}
  chrome.runtime.sendMessage(data);
}
    var runProductFinder_status = false;
    var subscription_status = false;
        var test_mode = 0;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    var customer_id = request.customer_id;
    subscription_status = request.subscription_status;
    runProductFinder_status = request.runProductFinder_status;
    if (request.testmode_seconds_left > 2){
          test_mode = 1;
    }
    else{
          test_mode = 0;
    }
/*
  if (request.message === 'DO_SOMETHING_MESSAGE') {
    processContent();
  }
*/
      if (test_mode == 1){
            if (o == 0){
                if (runProductFinder_status == 'true'){
                   o = 1;

                    if (request.testmode_seconds_left != null){
                      makeTimerOnce('testmode', request.testmode_seconds_left);
                    }


                }
                else if (runProductFinder_status == 'false'){
                   o = 1;
                    if (request.testmode_seconds_left != null){
                      makeTimerOnce('testmode', request.testmode_seconds_left);
                    }
                  }
             }
             else{

                 if (runProductFinder_status == 'true'){
                  // updateTimer('testmode', request.testmode_seconds_left);
                }
                else if (runProductFinder_status == 'false'){
                 //  updateTimer('testmode_d', request.testmode_seconds_left);
                  }
             }
        }

      if (test_mode != 1 && o==0){
         if((runProductFinder_status == 'true') && (subscription_status == 'true') ){
            //makeTimerOnce('extension_active', request.subscriptionToDate);
                               o = 1;
            makeTimerOnce('extension_active', 'null');
         }
         else if((runProductFinder_status == 'false') && (subscription_status == 'true') ){
                             o = 1;
            makeTimerOnce('extension_disabled', 'null');
         }
         else if((runProductFinder_status == 'false') && (subscription_status == 'false') ){
                             o = 1;
            makeTimerOnce('extension_inactive', 'null');
         }

      }



              if((runProductFinder_status == 'true') && (subscription_status == 'true') || (runProductFinder_status == 'true') && (test_mode == 1) ){


                      $('body').find('.manhattan--container--1lP57Ag').each(function(){
                        if(($(this).is(":contains(3-dniowa dostawa)") || $(this).is(":contains(5-dniowa dostawa)") || $(this).is(":contains(7-dniowa dostawa)")) && ($(this).is(":not(:contains(15-dniowa dostawa))"))){
                        removeBlur();
                        }
                        else if(($(this).is(":contains(3-day Delivery)") || $(this).is(":contains(5-day Delivery)") || $(this).is(":contains(7-day Delivery)")) && ($(this).is(":not(:contains(15-day Delivery))"))){
                        removeBlur();
                        }
                        else if(($(this).is(":contains(Consegna in 3 giorni)") || $(this).is(":contains(Consegna in 5 giorni)") || $(this).is(":contains(Consegna in 7 giorni)")) && ($(this).is(":not(:contains(Consegna in 15 giorni))"))){
                        removeBlur();
                        }
                        else if(($(this).is(":contains(3-Tage-Lieferung)") || $(this).is(":contains(5-Tage-Lieferung)") || $(this).is(":contains(7-Tage-Lieferung)")) && ($(this).is(":not(:contains(15-Tage-Lieferung))"))){
                        removeBlur();
                        }
                        else if(($(this).is(":contains(3-daagse levering)") || $(this).is(":contains(5-daagse levering)") || $(this).is(":contains(7-daagse levering)")) && ($(this).is(":not(:contains(15-daagse levering))"))){
                        removeBlur();
                        }
                        else{
                          blurMe();
                              $(this).remove();
                              if ($('.pagination--paginationList--2qhuJId').length) {
                              $(".pagination--paginationList--2qhuJId").remove();
                              }
                        }

                      });

      }
    else{
    }

              if (runProductFinder_status == 'true' || runProductFinder_status == true){
      $(".timerFinder_status").attr("src","https://aliproductfinder.com/img/extension_active.png");

                }
                else if (runProductFinder_status == 'false' || runProductFinder_status == false){
      $(".timerFinder_status").attr("src","https://aliproductfinder.com/img/extension_disabled.png");

                  }

$(window).scroll(function(){
  scroll = $(window).scrollTop();
  if (scroll >= 100) {
      $(".timerFinder").css("top", "5px");
  }
  else{
      $(".timerFinder").css("top", "20px");
  }
});



function removeBlur() {
  let spinner = document.querySelector(".list--gallery--34TropR");
  if (spinner.classList.contains("blurred")) {
    spinner.classList.remove("blurred");

  }
}
function blurMe() {

$('<style>.blurred { filter: blur(3px); }</style>').appendTo('body');  
//$('<style>.loader {  position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 37px; font-weight: bold; } </style>').appendTo('body');
//$('<div class="loader" id="loader"><img src="https://aliproductfinder.com/loading.gif" /></div>').appendTo("div.JIIxO");


  let spinner = document.querySelector(".list--gallery--34TropR");
  if (spinner.classList.contains("blurred")) {
    spinner.classList.remove("blurred");

  } else {
  spinner.classList.add("blurred")

  }
}



   
    sendResponse({ fromcontent: "This message is from content.js" });
    return true;
});
     function convertMillis(milliseconds, format) {
  var  minutes, seconds, total_minutes, total_seconds;
  
  total_seconds = parseInt(Math.floor(milliseconds / 1000));
  total_minutes = parseInt(Math.floor(total_seconds / 60));

  seconds = parseInt(total_seconds % 60);
  minutes = parseInt(total_minutes % 60);
  
  switch(format) {
  case 's':
    return total_seconds;
  case 'm':
    return total_minutes;
  default:
    return {m: minutes, s: seconds };
    }
  };  
   var added = 0;                       
function makeTimerOnce(val, test_seconds_left) {
   let isExeced = false;
   var startTime = new Date();



  $('<style>.timerFinder {position: absolute; display: grid; top: 20px; right: 100px; width: 250px; height: 50px; background: #f7f6f675; border-radius: 20px;}</style>').appendTo('body');
  $('<style>.timerFinder_logo {width: 200px; margin-top: 5px;margin-left: 5px;}</style>').appendTo('body');
  $('<style>.timerFinder_status {width: 20px; margin-top: 10px;margin-left: 5px; right:20px; position: absolute;}</style>').appendTo('body');

  
      $('<style>.timerFinder_nav {display: inline-flex;}</style>').appendTo('body');
      $('<style>.timerFinder_text {display: inline-flex; margin-top: -2px;}</style>').appendTo('body');
      $('<style>.timerFinder_text_span {color: #222; font-size: 11px; padding-bottom: 5px; margin-left: 47px;}</style>').appendTo('body');
      $('<style>.timerFinder_text_span2 { margin-left: 4px; margin-top: -3px;}</style>').appendTo('body');

      $('<style>.timerFinder_cube_minutes {width: 16px; height: 14px; color: #222; font-size: 11px; font-weight: 700; border-radius: 4px; line-height: 14px;}</style>').appendTo('body');
      $('<style>.timerFinder_selector {font-size: 11px; font-weight: 700; color: #222; display: inline-block; margin: 0 2px;}</style>').appendTo('body');
      $('<style>.timerFinder_cube_seconds {width: 16px; height: 14px; color: #222; font-size: 11px; font-weight: 700; border-radius: 4px;  line-height: 14px;}</style>').appendTo('body');

$(document).ready(function(){

   
    if (added == 0){
      added =1;
         if (test_seconds_left != 'null'){

            startTime.setSeconds(startTime.getSeconds() +  parseInt(test_seconds_left)); 
          }

    }

  let top_nav = document.querySelector(".header-special-container");
    if (!top_nav.classList.contains("timerFinder")) {
      // top_nav.classList.add("timerFinder");
    $(".searchbar-form").css("width", "70%");
                  $(".hm-right").css("right", "190px");
      var timerFinder = document.createElement("div"); // create new div
      timerFinder.setAttribute("class", "timerFinder"); // set class to the div
      //var loaderWrap = document.getElementById("loader-wrap"); // get the parent element
      top_nav.appendChild(timerFinder); // append the new div to the parent
          

        var timerFinderChild = document.createElement("div"); // create new div
         timerFinderChild.setAttribute("class", "timerFinder_nav"); // set class to the div
        let timerFinder_div = document.querySelector(".timerFinder");
         timerFinder_div.appendChild(timerFinderChild); // append the new div to the parent

        var timerFinderChildLogo = document.createElement("img"); // create new div
         timerFinderChildLogo.setAttribute("class", "timerFinder_logo"); // set class to the div
         timerFinderChildLogo.setAttribute("src","https://aliproductfinder.com/img/logo_ali_product_finder.png");
        let timerFinder_div_nav = document.querySelector(".timerFinder_nav");
         timerFinder_div_nav.appendChild(timerFinderChildLogo); // append the new div to the parent

                 var timerFinderChildImgStatus = document.createElement("img"); // create new div
         timerFinderChildImgStatus.setAttribute("class", "timerFinder_status"); // set class to the div
         timerFinder_div_nav.appendChild(timerFinderChildImgStatus); // append the new div to the parent

      if ((val == 'testmode') || (val == 'testmode_d')){


         var timerFinderChild1 = document.createElement("div"); // create new div
         timerFinderChild1.setAttribute("class", "timerFinder_text"); // set class to the div
         timerFinder_div.appendChild(timerFinderChild1); // append the new div to the parent


         var timerFinderChild1Span = document.createElement("span"); // create new div
         timerFinderChild1Span.setAttribute("class", "timerFinder_text_span"); // set class to the div
         let timerFinder_div_child = document.querySelector(".timerFinder_text");
         timerFinder_div_child.appendChild(timerFinderChild1Span); // append the new div to the parent



         var timerFinderChild2Span = document.createElement("div"); // create new div
         timerFinderChild2Span.setAttribute("class", "timerFinder_text_span2"); // set class to the div
         timerFinder_div_child.appendChild(timerFinderChild2Span); // append the new div to the parent

         let timerFinderChild2Span_div = document.querySelector(".timerFinder_text_span2");

         var timerFinderTrialMinutes = document.createElement("span"); // create new div
         timerFinderTrialMinutes.setAttribute("class", "timerFinder_cube_minutes"); // set class to the div
         timerFinderChild2Span_div.appendChild(timerFinderTrialMinutes); // append the new div to the parent
       //  $(".timerFinder_cube_minutes").text("11");


         var timerFinderTrialSelector= document.createElement("span"); // create new div
         timerFinderTrialSelector.setAttribute("class", "timerFinder_selector"); // set class to the div
         timerFinderChild2Span_div.appendChild(timerFinderTrialSelector); // append the new div to the parent


         var timerFinderTrialSeconds = document.createElement("span"); // create new div
         timerFinderTrialSeconds.setAttribute("class", "timerFinder_cube_seconds"); // set class to the div
         timerFinderChild2Span_div.appendChild(timerFinderTrialSeconds); // append the new div to the parent
         //$(".timerFinder_cube_seconds").text("54");



              const minutes = $(".timerFinder_cube_minutes");
              const seconds = $(".timerFinder_cube_seconds");
          
              const targetDate = new Date(startTime);


              window.setInterval( function()
              {

                // Where we check if 'now' is greater than the target date
                var date = Date.now();
                if (date > targetDate)
                {
                  // Where we break
                  $(".timerFinder").css("width", "360px");
                  $(".timerFinder_text_span").text("Free trial has ended. Please purchase a subscription.");
                  $(".timerFinder_text_span2").css("display", "none");

                                  var paramIndex = document.URL.indexOf('?');
          if (paramIndex > -1) {
    //chrome.runtime.sendMessage({output2: 'URL=' + document.URL.substring(0, paramIndex)});

                   chrome.runtime.sendMessage({test_ended: 'true'});

            }
                  clearInterval();
                } else
                {
                  // Where we set values
                  var millis = targetDate - date;
                  var millisObject = convertMillis(millis);
                     $(".timerFinder_text_span").text("Free trial ends in");
                     $(".timerFinder_selector").text(":");
                     if (val == 'testmode_d'){
                     timerFinderChildImgStatus.setAttribute("src","https://aliproductfinder.com/img/extension_disabled.png");

                      }


                  // Display values in HTML
                       if (millisObject.m <10){
                    var minutes_new = '0'+millisObject.m;
                  $(".timerFinder_cube_minutes").text(minutes_new);

                  }
                  else{
                          $(".timerFinder_cube_minutes").text(millisObject.m);
                  }

                  if (millisObject.s <10){
                    var seconds_new = '0'+millisObject.s;
                  $(".timerFinder_cube_seconds").text(seconds_new);

                  }
                  else{
                          $(".timerFinder_cube_seconds").text(millisObject.s);
                  }
                };
                                  var paramIndex = document.URL.indexOf('?');
if (paramIndex > -1) {
    //chrome.runtime.sendMessage({output2: 'URL=' + document.URL.substring(0, paramIndex)});

        chrome.runtime.sendMessage({firebaseUpdate: 'update_TimerSeconds'});

}
              }, 1000);

            } 
            else if ((val == 'extension_active') || (val == 'extension_inactive') || (val == 'extension_disabled') ){
            
               var timerFinderChild1 = document.createElement("div"); // create new div
               timerFinderChild1.setAttribute("class", "timerFinder_text"); // set class to the div
               timerFinder_div.appendChild(timerFinderChild1); // append the new div to the parent


               var timerFinderChild1Span = document.createElement("span"); // create new div
               timerFinderChild1Span.setAttribute("class", "timerFinder_text_span"); // set class to the div
               let timerFinder_div_child = document.querySelector(".timerFinder_text");
               timerFinder_div_child.appendChild(timerFinderChild1Span); // append the new div to the parent


              if (subscription_status == 'true'){
               var text_finder_span = "Your subscription is active";
                 $(".timerFinder_text_span").text(text_finder_span);

              }
              else if(subscription_status == 'false'){
                var text_finder_span = "No active subscription.";
                 $(".timerFinder_text_span").text(text_finder_span);
              }


            }

          


   }


  });

    return function(...arg) {
if (isExeced) return void 0;
        isExeced = true;
                func.apply(null, arg)
}

}
     
     function updateTimer(val, test_seconds_left){
              const minutes = $(".timerFinder_cube_minutes");
              const seconds = $(".timerFinder_cube_seconds");
            
            
              var startTime = new Date();
              startTime.setSeconds(startTime.getSeconds() + test_seconds_left);
              var targetDate = new Date(startTime);


              window.setInterval( function()
              {

                // Where we check if 'now' is greater than the target date
                var date = Date.now();
                if (date > targetDate)
                {
                  // Where we break
                  $(".timerFinder").css("width", "360px");
                  $(".timerFinder_text_span").text("Free trial has ended. Please purchase a subscription.");
                  $(".timerFinder_text_span2").css("display", "none");

              

                  clearInterval();
                } else
                {
                  // Where we set values
                  var millis = targetDate - date;
                  var millisObject = convertMillis(millis);
                     $(".timerFinder_text_span").text("Free trial ends in");
                     $(".timerFinder_selector").text(":");
                     if (val == 'testmode_d'){
                     timerFinderChildImgStatus.setAttribute("src","https://aliproductfinder.com/img/extension_disabled.png");

                      }


                  // Display values in HTML
                       if (millisObject.m <10){
                    var minutes_new = '0'+millisObject.m;
                  $(".timerFinder_cube_minutes").text(minutes_new);

                  }
                  else{
                          $(".timerFinder_cube_minutes").text(millisObject.m);
                  }

                  if (millisObject.s <10){
                    var seconds_new = '0'+millisObject.s;
                  $(".timerFinder_cube_seconds").text(seconds_new);

                  }
                  else{
                          $(".timerFinder_cube_seconds").text(millisObject.s);
                  }


                };
              }, 1000);
  sendResponse({got_it: true});

     }        







/*
chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
   if (msg.action == 'SendIt') {

 var observer = new MutationObserver(function(mutations) {
  
                if (currentPage != tab.url)
                {
                    // page has changed, set new page as 'current'
                      currentPage = tab.url;
                      console.log('location: '+ locHref + ', shipping_country: '+ isSetShipCountry +' shipping: ' + isSetShip + ', price: ' + isSetPrice + ', x_day: '+ isSetXday);


                      if (isSetShip == -1) {
                        concatStr = concatStr + fShip;
                      }
                              if (isSetXday == -1) {
                        concatStr = concatStr + xDay;
                      }
                      if (isSetPrice == -1) {
                        concatStr = concatStr + sPrice;
                      }

                          if (isSetShipCountry == -1) {
                        concatStr = concatStr + cShip;
                      }
                      newwurl = currentPage + concatStr;
                      chrome.tabs.update(tab.id, {url: newwurl});

                    // do your thing..
                }
              });
         observer.observe(document.querySelector('.product-container'), {
             subtree: true,
             childList: true,
             attributes: false,
             characterData: false,
             attributeOldValue: false,
             characterDataOldValue: false
         });

      alert("Message recieved!");
   }
});
*/
//processContent();
