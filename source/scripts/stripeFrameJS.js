window.sandbox = false; //SET sandbox MODE

// Create a Stripe client. / Publishable key
var testKey = 'pk_test_000000000';
var liveKey = 'pk_live_000000000';
var stripeKey = testKey;

if (sandbox == false) {
  stripeKey = liveKey;
}
var stripe = Stripe(stripeKey);
// Create an instance of Elements.
var elements = stripe.elements();
// Custom styling can be passed to options when creating an Element.

var style = {
  base: {
    color: "#666666",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "13px",
    "::placeholder": {
      color: "#919191"
    },
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a",
    border: "2px solid red"
  },
};
// Create an instance of the card Element.
var card = elements.create("card", { hidePostalCode: true, style: style });

/*
//HOW TO SEND TO CORRECT PAGE
if content script...
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  var activeTab = tabs[0];
  //chrome.tabs.sendMessage(activeTab.id,{
  return true;
});

//if popout use
//chrome.runtime.sendMessage({ ...

*/


  var _example_setupStripe = function (sandbox = false) {
    // Add an instance of the card Element into the `card-element` <div>.
    card.mount("#card-element");
    // Handle real-time validation errors from the card Element.
    card.on("change", function (event) {
      //enable live validation reporting
      chrome.runtime.sendMessage({command: "stripeCardOnChange", event: event});
      
    });
  };
  _example_submitStripe = function () {
    //Handle form submission.
    try {
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          //send resonse of message
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirmError", result: result.error });
        } else {
          // Send the token to your server.
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirm", token: result.token });
        }
      });
    } catch (e) {
      //Send Response of error
      //stripeCardOnConfirm
      chrome.runtime.sendMessage({command: "stripeCardOnConfirmError",e: e.message,result: "Invalid card"});
    }
  };
      _example_submitStripeNewRenew = function () {
    //Handle form submission.
    try {
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          //send resonse of message
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirmNewRenewError", result: result.error });
        } else {
          // Send the token to your server.
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirmNewRenew", token: result.token });
        }
      });
    } catch (e) {
      //Send Response of error
      //stripeCardOnConfirm
      chrome.runtime.sendMessage({command: "stripeCardOnConfirmError",e: e.message,result: "Invalid card"});
    }
  };
    _example_submitStripeNew = function () {
    //Handle form submission.
    try {
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          //send resonse of message
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirmNewError", result: result.error });
        } else {
          // Send the token to your server.
          //stripeCardOnConfirm
          chrome.runtime.sendMessage({command: "stripeCardOnConfirmNew", token: result.token });
        }
      });
    } catch (e) {
      //Send Response of error
      //stripeCardOnConfirm
      chrome.runtime.sendMessage({command: "stripeCardOnConfirmError",e: e.message,result: "Invalid card"});
    }
  };
  _example_setupStripe();
  chrome.runtime.onMessage.addListener((msg, sender, response) => {
    //Stripe Card onChange...
    if (msg.command == "submitStripeCardNew") {
      _example_submitStripeNew();
      //process & wait
    }
    //Stripe Card onChange...
    if (msg.command == "submitStripeCardNewRenew") {
      _example_submitStripeNewRenew();
      //process & wait
    }    
    if (msg.command == "submitStripeCard") {
      _example_submitStripe();
      //process & wait
    }
    return true;
  });
