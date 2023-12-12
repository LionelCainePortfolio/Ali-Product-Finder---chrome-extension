const Stripe = require('stripe');
const stripe = Stripe('sk_test_00000000000'); //stripe secret test key

//Lambda function

//Will include - firebase uid / user email / stripe token id
exports.handler = async function(event, context, callback) {

            var token = '';
            var emailAddress = '';
            var uid = '';
            var price = '';
            var promo_code = '';
            var name_billing = '';
            var lastname_billing = '';
            var city = '';
            var postal_code = '';
            var country = '';
            var line1 = '';
            var line2 = '';
            var customer_id = '';
            var subscription_id = '';
            var card_id = '';
            var type = '';
            var card_token = '';
            var price_renew = '';
            var card_holder = '';

            //check query params
            if (event.hasOwnProperty('queryStringParameters')) {
                var params = event.queryStringParameters;

                if (params.hasOwnProperty('type')) {
                    type = event.queryStringParameters.type;




                    //First Create customer

                    //add stripe error handling ... https://stripe.com/docs/api/errors/handling
                    //https://github.com/stripe/stripe-node/wiki/Error-Handling

                    if (params.hasOwnProperty('email')) {
                        emailAddress = event.queryStringParameters.email;
                    }
                    const existingCustomers = await stripe.customers.list({
                        email: emailAddress,
                        limit: 1
                    });
                    if (existingCustomers.data.length) {
                        customer_id = existingCustomers.data.id;
                    }
                    if (type == "new_user") {
                        if (uid != '') {
                            if (params.hasOwnProperty('email')) {
                                emailAddress = event.queryStringParameters.email;
                            }
                            if (params.hasOwnProperty('uid')) {
                                uid = event.queryStringParameters.uid;
                            }
                            const customer = await stripe.customers.create({
                                email: emailAddress,
                                description: uid,
                                name: 'Test mode'
                            });
                        }
                    } else if (type == "buy_first_sub") {
                        if (params.hasOwnProperty('token')) {
                            token = event.queryStringParameters.token;
                        }
                        if (params.hasOwnProperty('uid')) {
                            uid = event.queryStringParameters.uid;
                        }

                        if (params.hasOwnProperty('price')) {
                            price = event.queryStringParameters.price;
                        } else {
                            price = 'monthly';
                        }
                        if (params.hasOwnProperty('promo_code')) {
                            promo_code = event.queryStringParameters.promo_code;
                        } else {
                            promo_code = 'x';
                        }

                        if (params.hasOwnProperty('country')) {
                            country = event.queryStringParameters.country;
                        } else {
                            country = 'error';
                        }
                        if (params.hasOwnProperty('line1')) {
                            line1 = event.queryStringParameters.line1;
                        } else {
                            line1 = 'error';
                        }

                        if (params.hasOwnProperty('line2')) {
                            line2 = event.queryStringParameters.line2;
                        } else {
                            line2 = 'error';
                        }
                        if (params.hasOwnProperty('postal_code')) {
                            postal_code = event.queryStringParameters.postal_code;
                        } else {
                            postal_code = 'error';
                        }
                        if (params.hasOwnProperty('city')) {
                            city = event.queryStringParameters.city;
                        } else {
                            city = 'error';
                        }
                        if (params.hasOwnProperty('name_billing')) {
                            name_billing = event.queryStringParameters.name_billing;
                        } else {
                            name_billing = 'error';
                        }
                        if (params.hasOwnProperty('lastname_billing')) {
                            lastname_billing = event.queryStringParameters.lastname_billing;
                        } else {
                            lastname_billing = 'error';
                        }
                        var name_lastname_billing = name_billing + " " + lastname_billing;

                        //***Process Charge***
                        //Explain for the latest Stripe Methods to check their API Docs
                        //Process for customer with priceid
                        if (promo_code == 'x') {

                            if (price == "monthly") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KbRwzIIuoBlfUrtXzKfyXdw'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                });


                            } else if (price == "yearly") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KbRwzIIuoBlfUrtLvZAqXfJ'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                });



                            } else if (price == "lifetime") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KfSVjIIuoBlfUrt0IduvWMs'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                    add_invoice_items: [{
                                        price: 'price_1KbRwzIIuoBlfUrtLuUAzkb5'
                                    }]
                                });

                            }

                            const customers = await stripe.customers.list({
                                email: emailAddress,
                            });

                            return {
                                statusCode: 200,
                                body: JSON.stringify(customers.data[0].id) // If you working with lambda-proxy-integrations, the `body` must be a string
                            }; // return to response the request 
                        } // eof if promocode == x
                        else {


                            const existingCustomers = await stripe.customers.list({
                                email: emailAddress,
                                limit: 1
                            });
                            if (existingCustomers.data.length) {
                                customer_id = existingCustomers.data.id;
                            }
                            //***Process Charge***
                            //Explain for the latest Stripe Methods to check their API Docs
                            //Process for customer with priceid
                            if (price == "monthly") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KbRwzIIuoBlfUrtXzKfyXdw'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                });
                            } else if (price == "yearly") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KbRwzIIuoBlfUrtLvZAqXfJ'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                });
                            } else if (price == "lifetime") {
                                const subscription = await stripe.subscriptions.create({
                                    customer: customer.id,
                                    automatic_tax: {
                                        enabled: 'true',
                                    },
                                    items: [{
                                            price: 'price_1KfSVjIIuoBlfUrt0IduvWMs'
                                        }, //change here for one-time-fee or subscription...
                                    ],
                                    add_invoice_items: [{
                                        price: 'price_1KbRwzIIuoBlfUrtLuUAzkb5'
                                    }]
                                });

                            }

                            const customers = await stripe.customers.list({
                                email: emailAddress,
                            });

                            return {
                                statusCode: 200,
                                body: JSON.stringify(customers.data[0].id) // If you working with lambda-proxy-integrations, the `body` must be a string
                            }; // return to response the request 
                        } // eof else if promocode == x
                    } //eof       if (type =="buy_first_sub"){
                    else if (type == "get_user_data") {
                        if (params.hasOwnProperty('email')) {
                            emailAddress = event.queryStringParameters.email;
                        }

                        const customers = await stripe.customers.list({
                            email: emailAddress,
                        });

                        return {
                            statusCode: 200,
                            body: JSON.stringify(customers) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "update_customer") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }
                        const customer_update = await stripe.customers.update(
                            customer_id, {
                                name: name_lastname_billing,
                                address: {
                                    city: city,
                                    country: country,
                                    line1: line1,
                                    line2: line2,
                                    postal_code: postal_code,
                                    source: token
                                },
                            }
                        );
                        return {
                            statusCode: 200,
                            body: JSON.stringify(customer_update) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "get_subscription_data") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }

                        const subscriptions = await stripe.subscriptions.list({
                            limit: 1,
                            customer: customer_id
                        });


                        return {
                            statusCode: 200,
                            body: JSON.stringify(subscriptions) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "get_cards") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }

                        const cards = await stripe.customers.listSources(
                            customer_id, {
                                object: 'card',
                                limit: 1
                            }
                        );


                        return {
                            statusCode: 200,
                            body: JSON.stringify(cards) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "get_history") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }
                        // if(params.hasOwnProperty('card_holder')){
                        // card_holder = event.queryStringParameters.card_holder;
                        //}  

                        const subscriptions = await stripe.subscriptions.list({
                            customer: customer_id,
                            status: 'all'
                        });


                        //const paymentIntents = await stripe.paymentIntents.list({

                        //limit: 3,
                        //  customer: customer_id
                        //});

                        //const transactions = await stripe.issuing.transactions.list({
                        //limit: 3,
                        //cardholder: card_holder
                        //});

                        return {
                            statusCode: 200,
                            body: JSON.stringify(subscriptions) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "cancel_subscription") {
                        if (params.hasOwnProperty('subscription_id')) {
                            subscription_id = event.queryStringParameters.subscription_id;
                        }
                        const deleted = await stripe.subscriptions.update(
                            subscription_id, {
                                cancel_at_period_end: true
                            }
                        ); //pauzuje subksyrpcje po uzyciu
                        /*const deleted2 = await stripe.subscriptions.del(
                  subscription_id
                ); // usuwa subskrypcje od razu - nie uzywac
                    */
                        return {
                            statusCode: 200,
                            body: JSON.stringify(deleted) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "delete_card") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }

                        if (params.hasOwnProperty('card_id')) {
                            card_id = event.queryStringParameters.card_id;
                        }
                        const deleted = await stripe.customers.deleteSource(
                            customer_id,
                            card_id
                        );
                        return {
                            statusCode: 200,
                            body: JSON.stringify(deleted) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "add_card") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }

                        if (params.hasOwnProperty('card_token')) {
                            card_token = event.queryStringParameters.card_token;
                        }
                        const card_added = await stripe.customers.createSource(
                            customer_id, {
                                source: card_token
                            }
                        );
                        return {
                            statusCode: 200,
                            body: JSON.stringify(card_added) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } else if (type == "renew_subscription") {
                        if (params.hasOwnProperty('customer_id')) {
                            customer_id = event.queryStringParameters.customer_id;
                        }

                        if (params.hasOwnProperty('price_renew')) {
                            price_renew = event.queryStringParameters.price_renew;
                        }
                        const subscription = '';
                        if (price_renew == "monthly") {
                            subscription = await stripe.subscriptions.create({
                                customer: customer_id,
                                automatic_tax: {
                                    enabled: 'true',
                                },
                                items: [{
                                        price: 'price_1KbRwzIIuoBlfUrtXzKfyXdw'
                                    }, //change here for one-time-fee or subscription...
                                ],
                            });




                        } else if (price_renew == "yearly") {
                            subscription = await stripe.subscriptions.create({
                                customer: customer_id,
                                automatic_tax: {
                                    enabled: 'true',
                                },
                                items: [{
                                        price: 'price_1KbRwzIIuoBlfUrtLvZAqXfJ'
                                    }, //change here for one-time-fee or subscription...
                                ],
                            });




                        } else if (price_renew == "lifetime") {
                            subscription = await stripe.subscriptions.create({
                                customer: customer_id,
                                automatic_tax: {
                                    enabled: 'true',
                                },
                                items: [{
                                        price: 'price_1KfSVjIIuoBlfUrt0IduvWMs'
                                    }, //change here for one-time-fee or subscription...
                                ],
                                add_invoice_items: [{
                                    price: 'price_1KbRwzIIuoBlfUrtLuUAzkb5'
                                }]
                            });




                        }
                        return {
                            statusCode: 200,
                            body: JSON.stringify(subscription) // If you working with lambda-proxy-integrations, the `body` must be a string
                        }; // return to response the request 
                    } //eof renew subscription
                } // eof    if (params.hasOwnProperty('type')){
                else {
                    callback(null, {
                        "status": "error",
                        "message": "missing params",
                    });
                }

            };