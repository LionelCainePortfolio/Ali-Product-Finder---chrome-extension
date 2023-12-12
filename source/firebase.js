//Import Firebase Local Scripts
self.importScripts(
    './scripts/firebase-app.js',
    './scripts/firebase-auth.js',
    './scripts/firebase-database.js',
    './scripts/jszip.js',
    './scripts/FileSaver.js',
    './scripts/jszip-utils.js'
);
var firebaseConfig = {
    apiKey: "AAAAAAAAAAAAAAAA_AAAAAAAAAAAAAAAAAAAAAAAA",
    authDomain: "aliexpress-product-finder-pro.firebaseapp.com",
    databaseURL: "https://aliexpress-product-finder-pro-default-rtdb.firebaseio.com",
    projectId: "aliexpress-product-finder-pro",
    storageBucket: "aliexpress-product-finder-pro.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:000000000000"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var doRest = false;
chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        y = tab.url;
        var url = y;

        if (url.match(/extensions/) || url.match(/newtab/)) {
            doRest = false;
        } else {
            doRest = true;
        }
    });
});

chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        var url = change.url;
        //for each url check if the url is "https://www.youtube.com/*"
        if (url.match(/extensions/) || url.match(/newtab/)) {
            doRest = false;

        } else {
            doRest = true;
        }

    }
});




// use `url` here inside the callback because it's asynchronous!

//for each url check if the url is "https://www.youtube.com/*"



// Your web app's Firebase configuration

chrome.runtime.onConnect.addListener(function(port) {
    if (port.name === "popup") {
        var db;

        var user;
        chrome.storage.local.get('authInfo', function(result) {
            var logged_in = result;

            if (logged_in != false) {
                db = firebase.database();
                user = firebase.auth().currentUser;
            }

        });
        //Add Auth to storage
        var storage = chrome.storage.local;

        var key = 'ship_from';
        var key2 = 'extension_active';
        var key3 = 'user_email';
        var key4 = 'user_uid';
        var key5 = 'language';
        var key6 = 'runProductFinder';
        var is_active = false;
        var testmode = false;
        let downloadsArray = [];
        let initialState = {
            'savedImages': downloadsArray
        };
        if (user) {
            //user is signed in
            chrome.storage.sync.set({
                authInfo: user
            });
        } else {
            //user is not signed in
            chrome.storage.sync.set({
                authInfo: false
            });
        }

        /*
        Response Calls
          resp({type: "result", status: "success", data: doc.data(), request: msg});
          resp({type: "result", status: "error", data: error, request: msg});
        */

        chrome.runtime.onInstalled.addListener((function() {
            chrome.declarativeContent.onPageChanged.removeRules(undefined, (function() {
                chrome.declarativeContent.onPageChanged.addRules([{
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: {
                                hostContains: '.aliexpress'
                            },
                            css: ['img']
                        })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }]);
            }));




            chrome.storage.local.set(initialState);
            // console.log("initialState set");
        }));
        var getUrl = '';
        /*
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
             chrome.tabs.query({active: true, currentWindow: true}).then(([tab]) => {
                        getUrl = tab.url;
                var checkUrl = getUrl.includes("aliexpress.com/af");
                var checkUrl2 = getUrl.includes("aliexpress.com/item/");
                var checkUrl3 = getUrl.includes("aliexpress.com/category/");
                var checkUrl4 = getUrl.includes("aliexpress.com/");
                var checkUrl5 = getUrl.includes("aliexpress.com");
                  runBG();
                if ((checkUrl == true) || (checkUrl2 == true) || (checkUrl3 == true) || (checkUrl4 == true) || (checkUrl5 == true)){
                   //runBG();
                  //chrome.tabs.sendMessage(tab.id, {action: "SendIt"}, function(response) {});  
                }

             }); 
        });
        */
        chrome.tabs.onActivated.addListener(function(tabId, changeInfo, tab) {

            chrome.tabs.query({
                active: true,
                currentWindow: true
            }).then(([tab]) => {
                if (tab.url != null) {
                    getUrl = tab.url;
                }
                var checkUrl = getUrl.includes("aliexpress.com/af");
                var checkUrl2 = getUrl.includes("aliexpress.com/item/");
                var checkUrl3 = getUrl.includes("aliexpress.com/category/");
                var checkUrl4 = getUrl.includes("aliexpress.com/");
                var checkUrl5 = getUrl.includes("aliexpress.com");
                runBG();
                if ((checkUrl == true) || (checkUrl2 == true) || (checkUrl3 == true) || (checkUrl4 == true) || (checkUrl5 == true)) {
                    //runBG();
                    //chrome.tabs.sendMessage(tab.id, {action: "SendIt"}, function(response) {});  
                }

            });

        });
        var doonce_refresh = false;

        function checkdays() {
            storage.get([key4], (result) => {
                if (chrome.runtime.lastError) {
                    console.log('Error getting');
                } else {
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, (function(tabs) {
                        if (!chrome.runtime.lastError) {
                            chrome.storage.local.get('authInfo', function(result) {
                                var logged_in = result;


                                if (logged_in == false) {
                                    chrome.tabs.sendMessage(
                                        tabs[0].id, {
                                            customer_id: result.user_uid
                                        },
                                        function(response) {
                                            //window.close();
                                        }
                                    );
                                }
                            });
                        }
                    }));
                }
            });



            storage.get([key6], (result2) => {
                if (chrome.runtime.lastError) {
                    console.log('Error getting');
                } else {


                    storage.get([key3], (result) => {
                        if (chrome.runtime.lastError) {
                            console.log('Error getting');
                        } else {

                            // resp({customer_email: result.user_email});
                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (function(tabs) {
                                if (!chrome.runtime.lastError) {
                                    chrome.storage.local.get('authInfo', function(result) {
                                        var logged_in = result;


                                        if (logged_in == false) {
                                            chrome.tabs.sendMessage(
                                                tabs[0].id, {
                                                    customer_email: result.user_email

                                                },
                                                function(response) {

                                                    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                                                    urlAWS += '&email=' + result.user_email;
                                                    urlAWS += '&type=get_user_data';
                                                    try {
                                                        fetch(urlAWS).then((response) => {
                                                            return response.json();
                                                        }).then((res) => {

                                                            chrome.storage.local.get('authInfo', function(result) {
                                                                var logged_in = result;


                                                                if (logged_in == false) {

                                                                    cus_id = res.data[0].id;
                                                                    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                                                                    urlAWS += '&customer_id=' + cus_id;
                                                                    urlAWS += '&type=get_subscription_data';
                                                                    try {
                                                                        fetch(urlAWS).then((response2) => {
                                                                            return response2.json();
                                                                        }).then((res2) => {
                                                                            // console.log(res2.data);

                                                                            if (res2.data.length === 0) {
                                                                                is_active = false;

                                                                            } else {
                                                                                if (res2.data[0].plan != null) {
                                                                                    is_active = res2.data[0].plan.active;

                                                                                } else {
                                                                                    is_active = false;


                                                                                }
                                                                            }

                                                                            if (is_active == true) {
                                                                                //active
                                                                                testmode = false;
                                                                                //testmode inactive, subscription active 

                                                                                //  chrome.runtime.sendMessage({set_extension_active: "true"}, (response) => { });
                                                                                chrome.tabs.query({
                                                                                    active: true,
                                                                                    currentWindow: true
                                                                                }, (function(tabs) {
                                                                                    chrome.tabs.sendMessage(
                                                                                        tabs[0].id, {
                                                                                            subscription_status: 'true',
                                                                                            runProductFinder_status: result2.runProductFinder
                                                                                        },
                                                                                        function(response) {
                                                                                            //window.close();
                                                                                            runBG();

                                                                                        }
                                                                                    );

                                                                                }));

                                                                            } else {

                                                                                storage.get([key4], (result66) => {
                                                                                    if (chrome.runtime.lastError) {
                                                                                        console.log('Error getting');
                                                                                    } else {
                                                                                        //firebase.database().ref("/users/" + result.user_uid).set({stripeId: msg.get_user_id});
                                                                                        //testmode active, subscription inactive, enable extension

                                                                                        firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                                                                            var val = snapshot.val();
                                                                                            var test_seconds_left = val.testmode_seconds_left;
                                                                                            if (test_seconds_left > 2) {
                                                                                                testmode = true;

                                                                                                chrome.tabs.query({
                                                                                                    active: true,
                                                                                                    currentWindow: true
                                                                                                }, (function(tabs) {
                                                                                                    chrome.tabs.sendMessage(
                                                                                                        tabs[0].id, {
                                                                                                            runProductFinder_status: result2.runProductFinder,
                                                                                                            testmode_seconds_left: test_seconds_left,
                                                                                                            user_uid: result66.user_uid,
                                                                                                        },
                                                                                                        function(response) {
                                                                                                            //window.close();
                                                                                                        }
                                                                                                    );

                                                                                                }));
                                                                                            } else {
                                                                                                testmode = false;
                                                                                                is_active = false;

                                                                                                //testmode ended, subscription inactive, disable extension immaditaly
                                                                                                storage.set({
                                                                                                    "runProductFinder": "false"
                                                                                                }, () => {
                                                                                                    if (chrome.runtime.lastError) {
                                                                                                        console.log('Error setting');
                                                                                                    } else {


                                                                                                        chrome.tabs.query({
                                                                                                            active: true,
                                                                                                            currentWindow: true
                                                                                                        }, (function(tabs) {
                                                                                                            chrome.tabs.sendMessage(
                                                                                                                tabs[0].id, {
                                                                                                                    subscription_status: 'false',
                                                                                                                    runProductFinder_status: "false"
                                                                                                                },
                                                                                                                function(response) {
                                                                                                                    //window.close();
                                                                                                                    runBG();

                                                                                                                }

                                                                                                            );

                                                                                                        }));

                                                                                                        chrome.tabs.query({
                                                                                                            active: true,
                                                                                                            currentWindow: true
                                                                                                        }).then(([tab]) => {

                                                                                                            var oldUrl = getUrl;
                                                                                                            var newwurl = "";
                                                                                                            var locHref = getUrl;
                                                                                                            var fDisabled = '&disabled_extension=true';

                                                                                                            storage.get([key], (result) => {
                                                                                                                if (chrome.runtime.lastError) {
                                                                                                                    console.log('Error getting');
                                                                                                                } else {

                                                                                                                    var isExtensionDisabled = locHref.indexOf(fDisabled);
                                                                                                                    var concatStr = '';
                                                                                                                    //  console.log(isExtensionDisabled);
                                                                                                                    if (locHref.includes("&disabled_extension=")) {
                                                                                                                        locHref = locHref.replaceAll("&disabled_extension=true", "");
                                                                                                                    }
                                                                                                                    if (locHref.includes("&disabled_extension=")) {
                                                                                                                        locHref = locHref.replaceAll("&disabled_extension=false", "");
                                                                                                                    }
                                                                                                                    if (isExtensionDisabled == -1) {
                                                                                                                        concatStr = concatStr + fDisabled;
                                                                                                                    }

                                                                                                                    if (locHref.includes("&shipFromCountry=")) {
                                                                                                                        locHref = locHref.replaceAll("&shipFromCountry=", "");
                                                                                                                    }

                                                                                                                    if (locHref.includes("&isXDayDelivery=")) {
                                                                                                                        locHref = locHref.replaceAll("&isXDayDelivery=", "");
                                                                                                                    }
                                                                                                                    if (locHref.includes("&SortType=total_tranpro_desc=")) {
                                                                                                                        locHref = locHref.replaceAll("&SortType=total_tranpro_desc=", "");
                                                                                                                    }
                                                                                                                    newwurl = locHref + concatStr;


                                                                                                                    if (isExtensionDisabled == -1) {
                                                                                                                        var checkUrl = getUrl.includes("aliexpress.com/af");
                                                                                                                        var checkUrl2 = getUrl.includes("aliexpress.com/category/");

                                                                                                                        if (checkUrl == true || checkUrl2 == true) {

                                                                                                                            chrome.tabs.update(tab.id, {
                                                                                                                                url: newwurl
                                                                                                                            });
                                                                                                                            setInterval(checkdays, 5000);
                                                                                                                        }
                                                                                                                    }


                                                                                                                }
                                                                                                            });

                                                                                                        });
                                                                                                    }
                                                                                                });
                                                                                            }


                                                                                        }));



                                                                                    }
                                                                                });




                                                                            }

                                                                        }).catch((error) => {
                                                                            console.log(error, "error");
                                                                        });
                                                                    } catch (e) {
                                                                        console.log(error, "error");
                                                                    }

                                                                }
                                                            });

                                                        }).catch((error) => {
                                                            console.log(error, "error");
                                                        });

                                                    } catch (e) {
                                                        console.log(error, "error");
                                                    }



                                                    // body...
                                                }
                                            );
                                        }
                                    });
                                }
                            }));


                        }

                    });




                    //window.close();
                    //  resp({runProductFinder_status: result.runProductFinder});




                }
            });
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, (function(tabs) {
                if (!chrome.runtime.lastError) {
                    chrome.storage.local.get('authInfo', function(result) {
                        var logged_in = result;


                        if (logged_in == false) {
                            chrome.tabs.sendMessage(
                                tabs[0].id, {
                                    tabId: tabs[0].id
                                },
                                function(response) {
                                    //window.close();
                                }
                            );
                        }
                    });

                }
            }));




            chrome.runtime.onMessage.addListener((msg, sender, resp) => {
                if (msg.message === "UPDATE_BACKGROUND_DATA") {
                    // update background vars
                }

                if (msg.firebaseUpdate == "update_TimerSeconds") {
                    storage.get([key4], (result55) => {
                        if (chrome.runtime.lastError) {
                            console.log('Error getting');
                        } else {



                            firebase.database().ref("/users/" + result55.user_uid).once("value").then((function(snapshot) {
                                var val = snapshot.val();
                                var test_seconds_left = val.testmode_seconds_left - 1;
                                if (test_seconds_left > 2) {
                                    testmode = true;
                                    firebase.database().ref('/users/' + result55.user_uid).update({
                                        testmode_seconds_left: test_seconds_left
                                    });
                                } else {
                                    testmode = false;

                                }


                                resp({
                                    type: "result",
                                    status: "success",
                                    data: user,
                                    userObj: snapshot.val()
                                });
                            })).catch((result) => {

                                resp({
                                    type: "result",
                                    status: "error",
                                    data: false
                                });
                            });

                        }
                    });

                }

                if (msg.test_ended == "true") {
                    storage.set({
                        "runProductFinder": msg.runProductFinder
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.log('Error setting');
                        } else {
                            // resp({runProductFinder_status: msg.runProductFinder});
                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (function(tabs) {
                                if (!chrome.runtime.lastError) {

                                    chrome.tabs.sendMessage(
                                        tabs[0].id, {
                                            runProductFinder_status: "false"
                                        },
                                        function(response) {
                                            //window.close();
                                        }
                                    );
                                }
                            }));
                        }
                    });


                }

                if (msg.get_customer_id == "true") {
                    storage.get([key4], (result) => {
                        if (chrome.runtime.lastError) {
                            console.log('Error getting');
                        } else {

                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (function(tabs) {
                                if (!chrome.runtime.lastError) {
                                    chrome.storage.local.get('authInfo', function(result) {
                                        var logged_in = result;


                                        if (logged_in == false) {
                                            chrome.tabs.sendMessage(
                                                tabs[0].id, {
                                                    customer_id: result.user_uid
                                                },
                                                function(response) {
                                                    //window.close();
                                                }
                                            );
                                        }
                                    });
                                }
                            }));
                            //resp({customer_id: result.user_uid});
                        }
                    });
                }



                if (msg.runProductFinder == "true") {
                    storage.set({
                        "runProductFinder": msg.runProductFinder
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.log('Error setting');
                        } else {
                            // resp({runProductFinder_status: msg.runProductFinder}); 
                            storage.get([key4], (result66) => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error getting');
                                } else {



                                    firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                        var val = snapshot.val();
                                        var test_seconds_left = val.testmode_seconds_left;

                                        chrome.tabs.query({
                                            active: true,
                                            currentWindow: true
                                        }, (function(tabs) {
                                            if (!chrome.runtime.lastError) {

                                                chrome.tabs.sendMessage(
                                                    tabs[0].id, {
                                                        runProductFinder_status: msg.runProductFinder,
                                                        testmode_seconds_left: test_seconds_left,
                                                        user_uid: result66.user_uid,
                                                    },
                                                    function(response) {
                                                        //window.close();
                                                    }
                                                );
                                            }
                                        }));




                                        resp({
                                            type: "result",
                                            status: "success",
                                            data: user,
                                            userObj: snapshot.val()
                                        });
                                    })).catch((result) => {

                                        resp({
                                            type: "result",
                                            status: "error",
                                            data: false
                                        });
                                    });

                                }
                            });




                        }
                    });


                }
                if (msg.runProductFinder == "false") {
                    storage.set({
                        "runProductFinder": msg.runProductFinder
                    }, () => {
                        if (chrome.runtime.lastError) {
                            console.log('Error setting');
                        } else {

                            storage.get([key4], (result66) => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error getting');
                                } else {



                                    firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                        var val = snapshot.val();
                                        var test_seconds_left = val.testmode_seconds_left;

                                        chrome.tabs.query({
                                            active: true,
                                            currentWindow: true
                                        }, (function(tabs) {
                                            if (!chrome.runtime.lastError) {

                                                chrome.tabs.sendMessage(
                                                    tabs[0].id, {
                                                        runProductFinder_status: msg.runProductFinder,
                                                        testmode_seconds_left: test_seconds_left,
                                                        user_uid: result66.user_uid,
                                                    },
                                                    function(response) {
                                                        //window.close();
                                                    }
                                                );
                                            }
                                        }));




                                        resp({
                                            type: "result",
                                            status: "success",
                                            data: user,
                                            userObj: snapshot.val()
                                        });
                                    })).catch((result) => {

                                        resp({
                                            type: "result",
                                            status: "error",
                                            data: false
                                        });
                                    });




                                }
                            });


                        }
                    });
                }

                if (msg.get_runProductFinderStatus == "true") {

                    storage.get([key6], (result) => {
                        if (chrome.runtime.lastError) {
                            console.log('Error getting');
                        } else {
                            chrome.tabs.query({
                                active: true,
                                currentWindow: true
                            }, (function(tabs) {
                                if (!chrome.runtime.lastError) {

                                    chrome.tabs.sendMessage(
                                        tabs[0].id, {
                                            runProductFinder_status: result.runProductFinder
                                        },
                                        function(response) {
                                            //window.close();
                                        }
                                    );
                                }

                            }));
                            // resp({runProductFinder_status: result.runProductFinder});

                        }
                    });
                }

            });

        }

        function runBG() {
            if (doRest == true) {



                storage.get([key2], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {


                        storage.get([key4], (result66) => {
                            if (chrome.runtime.lastError) {
                                console.log('Error getting');
                            } else {


                                firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                    var val = snapshot.val();
                                    var test_seconds_left = val.testmode_seconds_left;

                                    if (result.extension_active === 'true' || result.extension_active === true || test_seconds_left > 2) {
                                        storage.get([key6], (result2) => {
                                            if (chrome.runtime.lastError) {
                                                console.log('Error getting');
                                            } else {
                                                if (result2.runProductFinder === 'true' || result2.runProductFinder === true) {

                                                    chrome.tabs.query({
                                                        active: true,
                                                        currentWindow: true
                                                    }).then(([tab]) => {

                                                        var oldUrl = getUrl;
                                                        var newUrl = getUrl + '&isXDayDelivery=y';
                                                        var newwurl = "";
                                                        var locHref = getUrl;
                                                        var fShip = '&isFreeShip=n';
                                                        var cShip = '';
                                                        var fDisabled = '&disabled_extension=false';

                                                        storage.get([key], (result) => {
                                                            if (chrome.runtime.lastError) {
                                                                console.log('Error getting');
                                                            } else {

                                                                cShip = '&shipFromCountry=' + result.ship_from;
                                                                // console.log(result.ship_from);
                                                                var sPrice = '&SortType=total_tranpro_desc'; //price_asc
                                                                var xDay = '&isXDayDelivery=y';
                                                                var isSetShip = locHref.indexOf(fShip);
                                                                var isSetShipCountry = locHref.indexOf(cShip);
                                                                var isSetPrice = locHref.indexOf(sPrice);
                                                                var isSetXday = locHref.indexOf(xDay);
                                                                var concatStr = '';
                                                                let currentPage = getUrl;
                                                                var isExtensionDisabled = locHref.indexOf(fDisabled);

                                                                //console.log('location: '+ locHref + ', shipping_country: '+ isSetShipCountry +' shipping: ' + isSetShip + ', price: ' + isSetPrice + ', x_day: '+ isSetXday);
                                                                if (isExtensionDisabled == -1) {
                                                                    concatStr = concatStr + fDisabled;
                                                                }
                                                                if (isSetXday == -1) {
                                                                    concatStr = concatStr + xDay;
                                                                }
                                                                if (isSetShip == -1) {
                                                                    concatStr = concatStr + fShip;
                                                                }

                                                                if (isSetPrice == -1) {
                                                                    concatStr = concatStr + sPrice;
                                                                }
                                                                if (isSetShipCountry == -1) {
                                                                    concatStr = concatStr + cShip;
                                                                }
                                                                if (locHref.includes("&shipFromCountry=")) {
                                                                    locHref = locHref.replaceAll("&shipFromCountry=", "");
                                                                }
                                                                if (locHref.includes("&disabled_extension=")) {
                                                                    locHref = locHref.replaceAll("&disabled_extension=true", "");
                                                                }
                                                                if (locHref.includes("&disabled_extension=")) {
                                                                    locHref = locHref.replaceAll("&disabled_extension=false", "");
                                                                }
                                                                if (isSetShip == -1 || isSetPrice == -1 || isSetShipCountry == -1 || isSetXday == -1) {
                                                                    newwurl = locHref + concatStr;
                                                                    var checkUrl = getUrl.includes("aliexpress.com/af");
                                                                    var checkUrl2 = getUrl.includes("aliexpress.com/category/");
                                                                    var checkUrl3 = getUrl.includes("aliexpress.com/premium/");
                                                                    var checkUrl4 = getUrl.includes("aliexpress.com/premium/category/");
                                                                    if (checkUrl == true || checkUrl2 == true || checkUrl3 == true || checkUrl4 == true) {

                                                                        chrome.tabs.update(tab.id, {
                                                                            url: newwurl
                                                                        });
                                                                        setInterval(checkdays, 5000);


                                                                    }
                                                                }


                                                            }

                                                        });


                                                    });


                                                } else {

                                                    chrome.tabs.query({
                                                        active: true,
                                                        currentWindow: true
                                                    }).then(([tab]) => {

                                                        var oldUrl = getUrl;
                                                        var newwurl = "";
                                                        var locHref = getUrl;
                                                        var fDisabled = '&disabled_extension=true';

                                                        storage.get([key], (result) => {
                                                            if (chrome.runtime.lastError) {
                                                                console.log('Error getting');
                                                            } else {


                                                                var isExtensionDisabled = locHref.indexOf(fDisabled);
                                                                var concatStr = '';
                                                                //  console.log(isExtensionDisabled);
                                                                if (locHref.includes("&disabled_extension=")) {
                                                                    locHref = locHref.replaceAll("&disabled_extension=true", "");
                                                                }
                                                                if (locHref.includes("&disabled_extension=")) {
                                                                    locHref = locHref.replaceAll("&disabled_extension=false", "");
                                                                }
                                                                if (isExtensionDisabled == -1) {
                                                                    concatStr = concatStr + fDisabled;
                                                                }

                                                                if (locHref.includes("&shipFromCountry=")) {
                                                                    locHref = locHref.replaceAll("&shipFromCountry=", "");
                                                                }

                                                                if (locHref.includes("&isXDayDelivery=")) {
                                                                    locHref = locHref.replaceAll("&isXDayDelivery=", "");
                                                                }
                                                                if (locHref.includes("&SortType=total_tranpro_desc=")) {
                                                                    locHref = locHref.replaceAll("&SortType=total_tranpro_desc=", "");
                                                                }
                                                                newwurl = locHref + concatStr;


                                                                if (isExtensionDisabled == -1) {
                                                                    var checkUrl = getUrl.includes("aliexpress.com/af");
                                                                    var checkUrl2 = getUrl.includes("aliexpress.com/category/");
                                                                    var checkUrl3 = getUrl.includes("aliexpress.com/premium/");
                                                                    var checkUrl4 = getUrl.includes("aliexpress.com/premium/category/");


                                                                    if (checkUrl == true || checkUrl2 == true || checkUrl3 == true || checkUrl4 == true) {

                                                                        chrome.tabs.update(tab.id, {
                                                                            url: newwurl
                                                                        });
                                                                        setInterval(checkdays, 5000);
                                                                    }
                                                                }

                                                            }
                                                        });
                                                    });

                                                }

                                            }
                                        });
                                    } else {

                                        chrome.tabs.query({
                                            active: true,
                                            currentWindow: true
                                        }).then(([tab]) => {

                                            var oldUrl = getUrl;
                                            var newwurl = "";
                                            var locHref = getUrl;
                                            var fDisabled = '&disabled_extension=true';

                                            storage.get([key], (result) => {
                                                if (chrome.runtime.lastError) {
                                                    console.log('Error getting');
                                                } else {


                                                    var isExtensionDisabled = locHref.indexOf(fDisabled);
                                                    var concatStr = '';
                                                    //  console.log(isExtensionDisabled);
                                                    if (locHref.includes("&disabled_extension=")) {
                                                        locHref = locHref.replaceAll("&disabled_extension=true", "");
                                                    }
                                                    if (locHref.includes("&disabled_extension=")) {
                                                        locHref = locHref.replaceAll("&disabled_extension=false", "");
                                                    }
                                                    if (isExtensionDisabled == -1) {
                                                        concatStr = concatStr + fDisabled;
                                                    }

                                                    if (locHref.includes("&shipFromCountry=")) {
                                                        locHref = locHref.replaceAll("&shipFromCountry=", "");
                                                    }

                                                    if (locHref.includes("&isXDayDelivery=")) {
                                                        locHref = locHref.replaceAll("&isXDayDelivery=", "");
                                                    }
                                                    if (locHref.includes("&SortType=total_tranpro_desc=")) {
                                                        locHref = locHref.replaceAll("&SortType=total_tranpro_desc=", "");
                                                    }
                                                    newwurl = locHref + concatStr;


                                                    if (isExtensionDisabled == -1) {
                                                        var checkUrl = getUrl.includes("aliexpress.com/af");
                                                        var checkUrl2 = getUrl.includes("aliexpress.com/category/");
                                                        var checkUrl3 = getUrl.includes("aliexpress.com/premium/");
                                                        var checkUrl4 = getUrl.includes("aliexpress.com/premium/category/");


                                                        if (checkUrl == true || checkUrl2 == true || checkUrl3 == true || checkUrl4 == true) {

                                                            chrome.tabs.update(tab.id, {
                                                                url: newwurl
                                                            });
                                                            setInterval(checkdays, 5000);
                                                        }
                                                    }

                                                }
                                            });
                                        });

                                    }

                                }));
                            }
                        });
                    }

                });
            }
        }
        setInterval(checkdays, 5000);

        chrome.runtime.onMessage.addListener((msg, sender, resp) => {

            if (msg.runProductFinder == "true") {

                //resp({runningFinder: "true"});
            }

            if (msg.get_language == "true") {

                storage.get([key5], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        resp({
                            language: result.language
                        });

                    }
                });
            }
            if (msg.set_language == "true") {
                storage.set({
                    "language": msg.language
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.log('Error setting');
                    }
                });

            }

            if (msg.saveImage == "true") {

                let srcArray = msg.savedImages;
                resp({
                    download_all: "true",
                    srcArray: srcArray
                });
                // var counter = 1;
                //  for (let src of srcArray) {
                //  chrome.downloads.download({url:src, filename:"AliProductFinderDownloads/"+counter+".jpg", saveAs: true    }); counter++;
                // };
            }

            if (msg.get_user_email == "true") {

                storage.get([key3], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        storage.get([key4], (result66) => {
                            if (chrome.runtime.lastError) {
                                console.log('Error getting');
                            } else {

                                firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                    var val = snapshot.val();
                                    var test_seconds_left = val.testmode_seconds_left;
                                    var purchase_count = val.purchase_count;
                                    if (test_seconds_left > 2) {
                                        testmode = true;
                                    } else {
                                        testmode = false;
                                    }

                                    chrome.tabs.query({
                                        active: true,
                                        currentWindow: true
                                    }, (function(tabs) {
                                        if (!chrome.runtime.lastError) {

                                            chrome.tabs.sendMessage(
                                                tabs[0].id, {
                                                    customer_email: val.user_email,
                                                    testmode_status: testmode,
                                                    purchase_count: purchase_count
                                                },
                                                function(response) {
                                                    resp({
                                                        customer_email: result.user_email,
                                                        testmode_status: testmode,
                                                        purchase_count: purchase_count
                                                    });
                                                }
                                            );
                                        }
                                    }));


                                }));

                            }

                        });
                    }
                });
            }
            if (msg.set_new_user_id == "true") {
                storage.get([key4], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        //firebase.database().ref("/users/" + result.user_uid).set({stripeId: msg.get_user_id});
                        firebase.database().ref("/users/" + result.user_uid + "/stripeId").set(msg.get_user_id);

                    }
                });
            }

            if (msg.set_shipping == "true") {
                storage.get([key], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        storage.set({
                            "ship_from": msg.shipping_from
                        }, () => {
                            if (chrome.runtime.lastError) {
                                console.log('Error setting');
                            } else {
                                runBG();


                                resp({
                                    shipping_from_changed: "true"
                                });
                            }
                        });
                    }
                });


            }

            if (msg.get_shipping_from == "true") {
                storage.get([key], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        resp({
                            get_shipping_from_country: result.ship_from
                        });
                    }
                });
            }



            if (msg.set_extension_active == "true") {
                storage.get([key2], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        storage.set({
                            "extension_active": msg.extension_active_status
                        }, () => {
                            if (chrome.runtime.lastError) {
                                console.log('Error setting');
                            } else {
                                resp({
                                    get_extension_active_changed: "true"
                                });
                                runBG();
                            }
                        });
                    }
                });

            }
            if (msg.get_extension_active == "true") {
                storage.get([key2], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        storage.get([key4], (result66) => {
                            if (chrome.runtime.lastError) {
                                console.log('Error getting');
                            } else {

                                firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                    var val = snapshot.val();
                                    var test_seconds_left = val.testmode_seconds_left;
                                    if (test_seconds_left > 2) {
                                        testmode = true;
                                    } else {
                                        testmode = false;
                                    }

                                    chrome.tabs.query({
                                        active: true,
                                        currentWindow: true
                                    }, (function(tabs) {
                                        if (!chrome.runtime.lastError) {

                                            chrome.tabs.sendMessage(
                                                tabs[0].id, {
                                                    customer_email: result.user_email,
                                                    testmode_status: testmode
                                                },
                                                function(response) {
                                                    resp({
                                                        get_extension_active_changed: result.extension_active,
                                                        testmode_status: testmode
                                                    });
                                                }
                                            );
                                        }
                                    }));


                                }));

                            }

                        });
                    }
                });
            }

            if (msg.runProductFinder == "true") {
                storage.set({
                    "runProductFinder": msg.runProductFinder
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.log('Error setting');
                    } else {
                        resp({
                            runProductFinder_status: msg.runProductFinder
                        });


                        storage.get([key4], (result66) => {
                            if (chrome.runtime.lastError) {
                                console.log('Error getting');
                            } else {
                                //firebase.database().ref("/users/" + result.user_uid).set({stripeId: msg.get_user_id});


                                firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {
                                    var val = snapshot.val();
                                    var test_seconds_left = val.testmode_seconds_left;
                                    if (test_seconds_left > 2) {
                                        testmode = true;
                                    }

                                    chrome.tabs.query({
                                        active: true,
                                        currentWindow: true
                                    }, (function(tabs) {
                                        if (!chrome.runtime.lastError) {

                                            chrome.tabs.sendMessage(
                                                tabs[0].id, {
                                                    runProductFinder_status: msg.runProductFinder,
                                                    testmode_seconds_left: test_seconds_left,
                                                    user_uid: result66.user_uid,
                                                },
                                                function(response) {
                                                    //window.close();
                                                    console.log('done');
                                                }
                                            );
                                        }
                                    }));




                                    resp({
                                        type: "result",
                                        status: "success",
                                        data: user,
                                        userObj: snapshot.val()
                                    });
                                })).catch((result) => {

                                    resp({
                                        type: "result",
                                        status: "error",
                                        data: false
                                    });
                                });



                            }
                        });




                    }
                });


            }
            if (msg.runProductFinder == "false") {
                storage.set({
                    "runProductFinder": msg.runProductFinder
                }, () => {
                    if (chrome.runtime.lastError) {
                        console.log('Error setting');
                    } else {
                        resp({
                            runProductFinder_status: msg.runProductFinder
                        });
                        chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        }, (function(tabs) {

                            if (!chrome.runtime.lastError) {

                                chrome.tabs.sendMessage(
                                    tabs[0].id, {
                                        runProductFinder_status: msg.runProductFinder
                                    },
                                    function(response) {
                                        //window.close();
                                        runBG();
                                    }
                                );
                            }
                        }));
                    }
                });


            }


            if (msg.get_runProductFinderStatus == "true") {

                storage.get([key6], (result) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        chrome.tabs.query({
                            active: true,
                            currentWindow: true
                        }, (function(tabs) {
                            if (!chrome.runtime.lastError) {
                                chrome.storage.local.get('authInfo', function(result) {
                                    var logged_in = result;


                                    if (logged_in == false) {
                                        chrome.tabs.sendMessage(
                                            tabs[0].id, {
                                                runProductFinder_status: result.runProductFinder
                                            },
                                            function(response) {
                                                //window.close();
                                            }
                                        );
                                    }
                                });
                            }
                        }));
                        resp({
                            runProductFinder_status: result.runProductFinder
                        });

                    }
                });
            }

            if (msg.command == "user-auth") {
                firebase.auth().onAuthStateChanged((function(user) {
                    if (user) {
                        // User is signed in.
                        chrome.storage.local.set({
                            authInfo: user
                        });
                        storage.set({
                            "user_uid": user.uid
                        }, () => {
                            if (chrome.runtime.lastError) {
                                console.log('Error setting');
                            }
                        });
                        firebase.database().ref("/users/" + user.uid).once("value").then((function(snapshot) {
                            // console.log(snapshot.val());
                            storage.set({
                                "user_uid": user.uid
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error setting');
                                }
                            });

                            resp({
                                type: "result",
                                status: "success",
                                data: user,
                                userObj: snapshot.val()
                            });
                        })).catch((result) => {
                            chrome.storage.local.set({
                                authInfo: false
                            });
                            resp({
                                type: "result",
                                status: "error",
                                data: false
                            });
                        });
                    } else {
                        // No user is signed in.
                        chrome.storage.local.set({
                            authInfo: false
                        });
                        resp({
                            type: "result",
                            status: "error",
                            data: false
                        });
                    }
                }));
            }

            //Auth
            //logout
            if (msg.command == "auth-logout") {
                firebase.auth().signOut().then((function() {

                    //user logged out...
                    chrome.storage.local.set({
                        authInfo: false
                    });
                    chrome.storage.sync.set({
                        authInfo: false
                    });
                    chrome.storage.local.clear(function() {
                        var error = chrome.runtime.lastError;
                        if (error) {
                            console.error(error);
                        }
                        // do something more
                    });
                    chrome.storage.sync.clear();
                    resp({
                        type: "result",
                        status: "success",
                        data: false
                    });
                }), (function(error) {
                    //logout error....
                    resp({
                        type: "result",
                        status: "error",
                        data: false,
                        message: error
                    });
                }));
            }
            //Login
            if (msg.command == "auth-login") {
                //login user
                firebase.auth().signInWithEmailAndPassword(msg.e, msg.p).catch((function(error) {
                    if (error) {
                        //return error msg...
                        chrome.storage.local.set({
                            authInfo: false
                        });
                        resp({
                            type: "result",
                            status: "error",
                            data: false
                        });
                    }
                }));
                firebase.auth().onAuthStateChanged((function(user) {
                    if (user) {
                        //return success user objct...
                        chrome.storage.local.set({
                            authInfo: user
                        });

                        firebase.database().ref("/users/" + user.uid).once("value").then((function(snapshot) {
                            storage.set({
                                "user_uid": user.uid
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error setting');
                                }
                            });

                            storage.set({
                                "user_email": msg.e
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error setting');
                                }
                            });
                            resp({
                                type: "result",
                                status: "success",
                                data: user,
                                userObj: snapshot.val()
                            });
                        })).catch((result) => {
                            chrome.storage.local.set({
                                authInfo: false
                            });
                            resp({
                                type: "result",
                                status: "error",
                                data: false
                            });
                        });
                    }
                }));
            }


            if (msg.command == "buy_first_sub") {

                storage.get([key3], (result33) => {
                    if (chrome.runtime.lastError) {
                        console.log('Error getting');
                    } else {
                        storage.get([key4], (result66) => {
                            if (chrome.runtime.lastError) {
                                console.log('Error getting');
                            } else {
                                //build url...
                                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                                urlAWS += '&uid=' + result66.user_uid;
                                urlAWS += '&email=' + msg.e;
                                urlAWS += '&token=' + msg.tokenId;
                                urlAWS += '&price=' + msg.price;
                                urlAWS += '&promo_code=' + msg.promo_code;
                                urlAWS += '&name_billing=' + msg.name_billing;
                                urlAWS += '&lastname_billing=' + msg.lastname_billing;
                                urlAWS += '&city=' + msg.city;
                                urlAWS += '&postal_code=' + msg.postcode;
                                urlAWS += '&line1=' + msg.line1;
                                urlAWS += '&line2=' + msg.line2;
                                urlAWS += '&country=' + msg.country;
                                urlAWS += '&type=buy_first_sub';



                                chrome.storage.local.set({
                                    authInfo: user
                                });
                                //console.log('make call to lambda:', urlAWS);
                                try //catch any errors
                                {
                                    fetch(urlAWS).then((response) => {
                                        return response.json(); //convert to json for response...
                                    }).then((res) => {
                                        resp({
                                            type: "result",
                                            status: "success",
                                            data: result33.user_email,
                                            shipping_from_changed: "true",
                                            extension_active_changed: "true"
                                        });

                                        //update and create user obj
                                        // console.log("id:", res);
                                        //firebase.database().ref("/users/" + user.uid).set({stripeId: res});
                                        //success / update user / and return

                                        //update database 
                                        firebase.database().ref("/users/" + result66.user_uid).once("value").then((function(snapshot) {

                                            storage.set({
                                                "user_uid": user.uid
                                            }, () => {
                                                if (chrome.runtime.lastError) {
                                                    console.log('Error setting');
                                                }
                                            });
                                            if (msg.country == "PL" || msg.country == "UK" || msg.country == "DE" || msg.country == "IT" || msg.country == "ES" || msg.country == "CH" || msg.country == "CZ" || msg.country == "BE" || msg.country == "FR") {
                                                storage.set({
                                                    "ship_from": msg.country
                                                }, () => {
                                                    if (chrome.runtime.lastError) {
                                                        console.log('Error setting');
                                                    } else {
                                                        // resp({type: "result", status: "success", data: user, userObj: snapshot.val(), shipping_from_changed: "true", extension_active_changed: "true"});
                                                    }
                                                });
                                            } else {
                                                storage.set({
                                                    "ship_from": "PL"
                                                }, () => {
                                                    if (chrome.runtime.lastError) {
                                                        console.log('Error setting');
                                                    } else {
                                                        //  resp({type: "result", status: "success", data: user, userObj: snapshot.val(), shipping_from_changed: "true", shipping_from_changed: "true"});
                                                    }
                                                });
                                            }

                                            storage.set({
                                                "extension_active": "true"
                                            }, () => {
                                                if (chrome.runtime.lastError) {
                                                    console.log('Error setting');
                                                } else {}
                                            });


                                        })).catch((result) => {
                                            chrome.storage.local.set({
                                                authInfo: false
                                            });
                                            resp({
                                                type: "result",
                                                status: "error",
                                                data: false
                                            });
                                        });


                                        firebase.database().ref("/users/" + result66.user_uid + "/purchase_count").set('1');
                                        firebase.database().ref("/users/" + result66.user_uid + "/testmode_seconds_left").set('1');

                                    }).catch((error) => {
                                        //console.log(response);
                                        console.log(error, "error with payment?");
                                        chrome.storage.local.set({
                                            authInfo: false
                                        });
                                        resp({
                                            type: "result",
                                            status: "error",
                                            data: false
                                        });
                                    });
                                } catch (e) {
                                    console.log(error, "error with payment?");
                                    chrome.storage.local.set({
                                        authInfo: false
                                    });
                                    resp({
                                        type: "result",
                                        status: "error",
                                        data: false
                                    });
                                }

                            }
                        });
                    }
                });

            }
            //Sign Up
            if (msg.command == "auth-signup") {
                //create user
                ///get user id
                //make call to lambda
                chrome.storage.local.set({
                    authInfo: false
                });
                firebase.auth().signOut();



                firebase.auth().fetchSignInMethodsForEmail(msg.e)
                    .then(providers => {
                        if (providers.length === 0) {
                            // If the user doesn't exist, create a new account
                            firebase.auth().createUserWithEmailAndPassword(msg.e, msg.p);

                        } else {
                            // If the user exists, show an error message
                            resp({
                                type: "signup",
                                status: "error",
                                data: false,
                                message: 'auth/email-already-in-use'
                            });

                        }
                    })
                    .then(() => {
                        storage.set({
                            "user_email": msg.e
                        }, () => {
                            if (chrome.runtime.lastError) {
                                console.log('Error setting');
                            }
                        });
                        resp({
                            type: "signup",
                            status: "success",
                            data: user,
                            shipping_from_changed: "false",
                            extension_active_changed: "true"
                        });


                        //            console.log('Account created!');
                    })
                    .catch(error => {
                        // Show an error message
                        // console.error(error.message);
                        chrome.storage.local.set({
                            authInfo: false
                        }); // clear any current session
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        resp({
                            type: "signup",
                            status: "error",
                            data: false,
                            message: error
                        });

                    });




                //complete payment and create user object into database with new uid
                firebase.auth().onAuthStateChanged((function(user) {
                    if (user) { //user created and logged in ...


                        firebase.database().ref("/users/" + user.uid + "/purchase_count").set('0');
                        firebase.database().ref("/users/" + user.uid + "/testmode_seconds_left").set('600');
                        firebase.database().ref("/users/" + user.uid + "/email").set(msg.e);
                        firebase.database().ref("/users/" + user.uid).once("value").then((function(snapshot) {
                            storage.set({
                                "user_email": msg.e
                            }, () => {
                                if (chrome.runtime.lastError) {
                                    console.log('Error setting');
                                }
                            });
                            //build url...
                            var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                            urlAWS += '&uid=' + user.uid;
                            urlAWS += '&email=' + msg.e;
                            urlAWS += '&type=new_user';



                            chrome.storage.local.set({
                                authInfo: user
                            });
                            //console.log('make call to lambda:', urlAWS);
                            try //catch any errors
                            {
                                fetch(urlAWS).then((response) => {
                                    return response.json(); //convert to json for response...
                                }).then((res) => {
                                    //console.log(response);




                                }).catch((error) => {
                                    //console.log(response);
                                    console.log(error, "error");
                                    chrome.storage.local.set({
                                        authInfo: false
                                    });
                                    resp({
                                        type: "result",
                                        status: "error",
                                        data: false
                                    });
                                });
                            } catch (e) {
                                console.log(error, "error");
                                chrome.storage.local.set({
                                    authInfo: false
                                });
                                resp({
                                    type: "result",
                                    status: "error",
                                    data: false
                                });
                            }


                        }));
                    }
                }));
            }
            return true;
        });

    }
});