let lifeline;

keepAlive();

chrome.runtime.onConnect.addListener(port => {
    if (port.name === 'keepAlive') {
        lifeline = port;
        setTimeout(keepAliveForced, 295e3); // 5 minutes minus 5 seconds
        port.onDisconnect.addListener(keepAliveForced);
    }
});

function keepAliveForced() {
    lifeline?.disconnect();
    lifeline = null;
    keepAlive();
}

async function keepAlive() {
    if (lifeline) return;
    for (const tab of await chrome.tabs.query({
            url: '*://*/*'
        })) {
        try {
            await chrome.scripting.executeScript({
                target: {
                    tabId: tab.id
                },
                function: () => chrome.runtime.connect({
                    name: 'keepAlive'
                }),
                // `function` will become `func` in Chrome 93+
            });
            chrome.tabs.onUpdated.removeListener(retryOnTabUpdate);
            return;
        } catch (e) {}
    }
    chrome.tabs.onUpdated.addListener(retryOnTabUpdate);
}

async function retryOnTabUpdate(tabId, info, tab) {
    if (info.url && /^(file|https?):/.test(info.url)) {
        keepAlive();
    }
}

//Service Worker Catch Any Errors...
try {
    //Import Firebase Local Scripts
    self.importScripts(
        './scripts/firebase-app.js',
        './scripts/firebase-auth.js',
        './scripts/firebase-database.js',
        './scripts/jszip.js'
    );

    // Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyAjstYbn4_slODLyCVxIMtz4gI9JT96QKs",
        authDomain: "aliexpress-product-finder-pro.firebaseapp.com",
        databaseURL: "https://aliexpress-product-finder-pro-default-rtdb.firebaseio.com",
        projectId: "aliexpress-product-finder-pro",
        storageBucket: "aliexpress-product-finder-pro.appspot.com",
        messagingSenderId: "837652155107",
        appId: "1:837652155107:web:67b18a17c612d5b93713d6"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    var db = firebase.database();
    //Add Auth to storage
    var user = firebase.auth().currentUser;
    var storage = chrome.storage.local;
    var key = 'ship_from';
    var key2 = 'extension_active';
    var key3 = 'runProductFinder';
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

    chrome.runtime.onInstalled.addListener(function() {
        chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
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
        });
        chrome.storage.local.set(initialState);
        console.log("initialState set");
    });



    chrome.runtime.onMessage.addListener((msg, sender, resp) => {

        if (msg.saveImage == "true") {
            console.log("message coming");
            console.log(msg);
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


        sendResponse("Gotcha!");

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
                            if (msg.extension_active_status == "true") {
                                resp({
                                    get_extension_active_changed: "false"
                                });

                            } else {
                                resp({
                                    get_extension_active_changed: "true"
                                });

                            }
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
                    resp({
                        get_extension_active_changed: result.extension_active
                    });
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            runProductFinder_status: result.extension_active
                        });
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
                    chrome.tabs.query({
                        active: true,
                        currentWindow: true
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            runProductFinder_status: result.runProductFinder
                        });
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
                    }, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            runProductFinder_status: result.runProductFinder
                        });
                    });
                }
            });


        }


        if (msg.get_runProductFinderStatus == "true") {

            storage.get([key3], (result) => {
                if (chrome.runtime.lastError) {
                    console.log('Error getting');
                } else {

                    resp({
                        runProductFinder_status: result.runProductFinder
                    });

                }
            });
        }


        if (msg.command == "user-auth") {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    // User is signed in.
                    chrome.storage.local.set({
                        authInfo: user
                    });
                    firebase.database().ref("/users/" + user.uid).once("value").then(function(snapshot) {
                        console.log(snapshot.val());
                        resp({
                            type: "result",
                            status: "success",
                            data: user,
                            userObj: snapshot.val()
                        });
                    }).catch((result) => {
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
            });
        }

        //Auth
        //logout
        if (msg.command == "auth-logout") {
            firebase.auth().signOut().then(function() {
                //user logged out...
                chrome.storage.local.set({
                    authInfo: false
                });
                resp({
                    type: "result",
                    status: "success",
                    data: false
                });
            }, function(error) {
                //logout error....
                resp({
                    type: "result",
                    status: "error",
                    data: false,
                    message: error
                });
            });
        }
        //Login
        if (msg.command == "auth-login") {
            //login user
            firebase.auth().signInWithEmailAndPassword(msg.e, msg.p).catch(function(error) {
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
            });
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                    //return success user objct...
                    chrome.storage.local.set({
                        authInfo: user
                    });
                    firebase.database().ref("/users/" + user.uid).once("value").then(function(snapshot) {
                        resp({
                            type: "result",
                            status: "success",
                            data: user,
                            userObj: snapshot.val()
                        });
                    }).catch((result) => {
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
            firebase.auth().createUserWithEmailAndPassword(msg.e, msg.p).catch(function(error) {
                // Handle Errors here.
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
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) { //user created and logged in ...
                    //build url...
                    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                    urlAWS += '&uid=' + user.uid;
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




                    chrome.storage.local.set({
                        authInfo: user
                    });
                    //console.log('make call to lambda:', urlAWS);
                    try //catch any errors
                    {
                        fetch(urlAWS).then((response) => {
                            return response.json(); //convert to json for response...
                        }).then((res) => {
                            //update and create user obj
                            console.log("id:", res);
                            firebase.database().ref("/users/" + user.uid).set({
                                stripeId: res
                            });
                            //success / update user / and return
                            firebase.database().ref("/users/" + user.uid).once("value").then(function(snapshot) {
                                if (msg.country == "PL" || msg.country == "UK" || msg.country == "DE" || msg.country == "IT" || msg.country == "ES" || msg.country == "CH" || msg.country == "CZ" || msg.country == "BE" || msg.country == "FR") {
                                    storage.set({
                                        "ship_from": msg.country
                                    }, () => {
                                        if (chrome.runtime.lastError) {
                                            console.log('Error setting');
                                        } else {
                                            resp({
                                                type: "result",
                                                status: "success",
                                                data: user,
                                                userObj: snapshot.val(),
                                                shipping_from_changed: "true",
                                                extension_active_changed: "true"
                                            });
                                        }
                                    });
                                } else {
                                    storage.set({
                                        "ship_from": "PL"
                                    }, () => {
                                        if (chrome.runtime.lastError) {
                                            console.log('Error setting');
                                        } else {
                                            resp({
                                                type: "result",
                                                status: "success",
                                                data: user,
                                                userObj: snapshot.val(),
                                                shipping_from_changed: "true",
                                                shipping_from_changed: "true"
                                            });
                                        }
                                    });
                                }

                                storage.set({
                                    "extension_active": "true"
                                }, () => {
                                    if (chrome.runtime.lastError) {
                                        console.log('Error setting');
                                    } else {
                                        resp({
                                            type: "result",
                                            status: "success",
                                            data: user,
                                            userObj: snapshot.val(),
                                            shipping_from_changed: "true",
                                            extension_active_changed: "true"
                                        });
                                    }
                                });

                            }).catch((result) => {
                                chrome.storage.local.set({
                                    authInfo: false
                                });
                                resp({
                                    type: "result",
                                    status: "error",
                                    data: false
                                });
                            });
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
        return true;
    });

} catch (e) {
    //error
    console.log(e);
}