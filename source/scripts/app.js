var user_email = '';
var subscription_id = '';
var plan_interval = '';
var cus_id = '';
var customer_country = '';
is_active = false;
var name = '';
var clicked_signUp = false;
var clicked_buy = false;
var testmode = false;
var purchase_count = 0;

chrome.runtime.sendMessage({
    get_user_email: "true"
}, (response) => {
    if ($('.userArea').css('display') == 'block') {

        user_email = response.customer_email;
        testmode = response.testmode_status;
        purchase_count = response.purchase_count;

    }
});

chrome.runtime.connect({
    name: "popup"
});

$("#toggle").attr('unchecked', 'true');
setTimeout(
    function() {
        if (testmode == false && purchase_count == 0) {
            $('html').css("height", "780px");

        } else {
            $('html').css("height", "550px");

        }

    }, 1200);

var language = '';
chrome.runtime.sendMessage({
    get_language: "true"
}, (response) => {
    language = response.language;
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            var new_id = "#" + id + "";
            //$(new_id).html(text);
            $('.language-picker__item').removeAttr('aria-selected');
            $('.language-picker__flag').removeAttr('aria-selected');

            $('.language-picker__label').removeClass('language-picker__flag--polski');
            $('.language-picker__label').removeClass('language-picker__flag--english');
            $('.language-picker__label').removeClass('language-picker__flag--deutsch');
            $('.language-picker__label').removeClass('language-picker__flag--francais');
            $('.language-picker__label').removeClass('language-picker__flag--italiano');
            $('.language-picker__label').removeClass('language-picker__flag--espanol');
            $('.language-picker__label:after').css('display', 'none');

            if (language == "polish") {
                //$('.language-picker-select :contains("polish")').attr('selected', 'selected');
                $('.language-picker__label').html('<em>Polski</em>');
                $('.language-picker__label').addClass('language-picker__flag--polish');
                $('.language-picker-select :contains("polish")').attr('selected', 'selected');
                $('.language-picker__flag--polish:after').css('display', 'block');
                $('.language-picker__flag--polish').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='polish']").attr('aria-selected', 'true');


            } else if (language == "english") {
                $('.language-picker__label').html('<em>English</em>');
                $('.language-picker__label').addClass('language-picker__flag--english');
                $('.language-picker-select :contains("english")').attr('selected', 'selected');
                $('.language-picker__flag--english:after').css('display', 'block');
                $('.language-picker__flag--english').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='english']").attr('aria-selected', 'true');

            } else if (language == "deutsch") {
                $('.language-picker__label').html('<em>Deutsch</em>');
                $('.language-picker__label').addClass('language-picker__flag--deutsch');
                $('.language-picker-select :contains("deutsch")').attr('selected', 'selected');
                $('.language-picker__flag--deutsch:after').css('display', 'block');
                $('.language-picker__flag--deutsch').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='deutsch']").attr('aria-selected', 'true');

            } else if (language == "francais") {
                $('.language-picker__label').html('<em>Francais</em>');
                $('.language-picker__label').addClass('language-picker__flag--francais');
                $('.language-picker-select :contains("francais")').attr('selected', 'selected');
                $('.language-picker__flag--francais:after').css('display', 'block');
                $('.language-picker__flag--francais').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='francais']").attr('aria-selected', 'true');

            } else if (language == "italiano") {
                $('.language-picker__label').html('<em>Italiano</em>');
                $('.language-picker__label').addClass('language-picker__flag--italiano');
                $('.language-picker-select :contains("italiano")').attr('selected', 'selected');
                $('.language-picker__flag--italiano:after').css('display', 'block');
                $('.language-picker__flag--italiano').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='italiano']").attr('aria-selected', 'true');

            } else if (language == "espanol") {
                $('.language-picker__label').html('<em>Espanol</em>');
                $('.language-picker__label').addClass('language-picker__flag--espanol');
                $('.language-picker-select :contains("espanol")').attr('selected', 'selected');
                $('.language-picker__flag--espanol:after').css('display', 'block');
                $('.language-picker__flag--espanol').attr('aria-selected', 'true');
                $('.language-picker__list').find("[data-value='espanol']").attr('aria-selected', 'true');
            }
        });
        //$(".language-picker-select option:selected").removeAttr("selected");

    });
});

$('.language-picker__button').on('click', function() {
    chrome.runtime.sendMessage({
        get_language: "true"
    }, (response) => {
        language = response.language;
        language = $('.language-picker__list').find("[aria-selected]").attr('data-value');
        $('.language-picker__list').find("[data-value='" + language + "']").attr('aria-selected', 'true');
        alert(language);
        alert(response.language);

    });
});

$('.language-picker__flag--polish').on('click', function() {
    language = 'polish';
    $('.language-picker__list').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='polish']").attr('aria-selected', 'true');

    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);


            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });


        });
    });


});
$('.language-picker__flag--english').on('click', function() {
    language = 'english';
    $('.language-picker__flag').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='english']").attr('aria-selected', 'true');
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);
            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });
        });
    });
});

$('.language-picker__flag--deutsch').on('click', function() {
    language = 'deutsch';
    $('.language-picker__flag').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='deutsch']").attr('aria-selected', 'true');
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);

            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });

        });
    });
});

$('.language-picker__flag--francais').on('click', function() {

    language = 'francais';
    $('.language-picker__flag').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='francais']").attr('aria-selected', 'true');
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);
            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });

        });
    });
});

$('.language-picker__flag--italiano').on('click', function() {
    language = 'italiano';
    $('.language-picker__flag').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='italiano']").attr('aria-selected', 'true');
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);


            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });


        });
    });
});

$('.language-picker__flag--spanish').on('click', function() {
    language = 'spanish';
    $('.language-picker__flag').removeAttr('aria-selected');
    $('.language-picker__list').find("[data-value='spanish']").attr('aria-selected', 'true');
    $.ajax({
        url: 'scripts/languages.xml',
        dataType: "xml"
    }).done(function(xml) {
        $(xml).find('translation').each(function() {
            var id = $(this).attr('id');
            var text = $(this).find(language).text();
            $("#" + id).html(text);

            chrome.runtime.sendMessage({
                set_language: "true",
                language: language
            }, (response) => {

            });


        });
    });
});
$('.flag_shippment').on('click', function() {
    var shipping_from_country = $(this).val();
    chrome.runtime.sendMessage({
        set_shipping: "true",
        shipping_from: shipping_from_country
    }, (response) => {
        //console.log(response.shipping_from_changed);
        if (response.shipping_from_changed != "error") {
            $('.flag_shippment').removeClass('shippment_active').children('div');
            $(this).toggleClass('shippment_active').children('div');
        }
    });
    return false;
});

function checkCustomerSubscription() {
    chrome.runtime.sendMessage({
        get_user_email: "true"
    }, (response) => {
        user_email = response.customer_email;
        testmode = response.testmode_status;
        purchase_count = response.purchase_count;

        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
        urlAWS += '&email=' + user_email;
        urlAWS += '&type=get_user_data';
        try {
            fetch(urlAWS).then((response) => {
                return response.json();
            }).then((res) => {
                // console.log(res.data[0]);
                cus_id = res.data[0].id;
                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                urlAWS += '&customer_id=' + cus_id;
                urlAWS += '&type=get_subscription_data';
                try {
                    fetch(urlAWS).then((response2) => {
                        return response2.json();
                    }).then((res2) => {

                        if (res2.data.length === 0) {
                            is_active = false;

                        } else {
                            if (res2.data[0].plan != null) {
                                plan_interval = res2.data[0].plan.interval;
                                is_active = res2.data[0].plan.active;
                                var plan_to = res2.data[0].current_period_end;
                                var plan_id = res2.data[0].plan.id;
                                var valid_to = '';
                                var new_date_from_timestamp_valid_to = new Date(plan_to * 1000);
                                if (plan_id == "price_1KbRwzIIuoBlfUrtXzKfyXdw") {
                                    valid_to = "Valid to: " + new_date_from_timestamp_valid_to.getDate() + "." + (new_date_from_timestamp_valid_to.getMonth() + 1) + "." + new_date_from_timestamp_valid_to.getFullYear();

                                } else if (plan_id == "price_1KbRwzIIuoBlfUrtLvZAqXfJ") {
                                    valid_to = "Valid to: " + new_date_from_timestamp_valid_to.getDate() + "." + new_date_from_timestamp_valid_to.getMonth() + "." + (new_date_from_timestamp_valid_to.getFullYear() + 1);

                                }
                                subscription_id = res2.data[0].id;
                            } else {
                                is_active = false;


                            }
                        }
                        if (is_active == true) {
                            //active
                            $(".userArea").show();
                            $(".logout_icon").css("right", "15px");
                            $(".logout_icon").hide();
                            $(".subscription_options_icon").show();

                            get_shipping_from();
                            if (res2.data[0].plan.id == "price_1KfSVjIIuoBlfUrt0IduvWMs") {
                                $(".ali_product_finder_valid_text").text("Lifetime access. Thank You!");
                                $(".subscription_item_button_cancel").hide();
                                $(".subscription_item_button_update").hide();
                                $("#buttons_plan").hide();
                                $(".subscription_item_renews_time_lifetime").show();
                            } else {
                                $(".ali_product_finder_valid_text").text(valid_to);
                                $(".subscription_item_button_cancel").show();
                            }
                            $(".to_blur").removeClass("blurred");
                            $(".enable_disable").show();
                            $("#payment_method_text").css("margin-top", "30px");

                            if (purchase_count > 0) {
                                if ($('.userArea').css('display') != 'block') {
                                    $('html').css("height", "800px");
                                }
                            }

                            $(".renew_plan").hide();
                            $(".curr_plan_info").show();

                            $(".ali_product_finder_valid_text").css("line-height", "0.5");
                        } else {
                            if (testmode == true) {
                                get_shipping_from();
                                $(".buySubscription").hide();
                                $(".userArea").show();
                                $(".enable_disable").show();
                                $(".subscription_options_icon").hide();
                                $(".logout_icon").css("right", "40px");
                                $(".logout_icon").show();
                                $(".ali_product_finder_valid_text").css("line-height", "1.3");
                                $(".ali_product_finder_valid_text").text("Testmode is active.");
                                $(".subscription_item_button_cancel").hide();
                            } else {
                                if (purchase_count > 0) {
                                    $(".buySubscription").hide();
                                    $(".logout_icon").css("right", "15px");
                                    $(".renew_text").text("Renew");

                                    $(".subscription_options_icon").show();
                                    $(".userArea").show();
                                    $(".to_blur").addClass("blurred");
                                    $(".enable_disable").hide();
                                    $(".curr_plan_info").hide();
                                    $("#payment_method_text").css("margin-top", "0px");
                                    $('html').css("height", "600px");
                                    $(".renew_plan").show();
                                    $(".subscription_item_button_cancel").hide();
                                    $(".ali_product_finder_valid_text").css("line-height", "1.3");
                                    $(".ali_product_finder_valid_text").text("Renew your subscription to use the extension");
                                } else {

                                    $(".logout_icon").css("right", "40px");
                                    $(".logout_icon").show();

                                    $(".to_blur").addClass("blurred");
                                    $(".userArea").hide();
                                    $(".subscription_options_icon").hide();

                                    $(".buySubscription").show();

                                }

                            }

                        }



                    }).catch((error) => {

                        console.log(error, "error");
                        showNotificationError();
                    });
                } catch (e) {
                    console.log(error, "error");
                    showNotificationError();
                }
            }).catch((error) => {
                console.log(error, "error");
                showNotificationError();
            });
        } catch (e) {
            console.log(error, "error");
            showNotificationError();
        }
    });

}




$('#subscription_options').on('click', function() {
    $(".userArea").hide();
    $(".help_icon").hide();
    $(".sub_info").show();
    $(".subscription_options_icon").hide();
    $(".home_icon").show();
    $(".logout_icon").css("right", "15px");
    $(".logout_icon").show();
    $('#card_data').hide();
    $('#add_card').show();
    $('body').css("height", "760px");
    $('html').css("height", "800px");
    chrome.runtime.sendMessage({
        get_user_email: "true"
    }, (response) => {
        user_email = response.customer_email;
        testmode = response.testmode_status;
        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
        urlAWS += '&email=' + user_email;
        urlAWS += '&type=get_user_data';
        try {
            fetch(urlAWS).then((response) => {
                return response.json();
            }).then((res) => {
                //  console.log(res.data[0]);
                var cus_id = res.data[0].id;
                var dicount_boolean = res.data[0].discount;
                var dicount_percent = "";
                if (dicount_boolean) {
                    dicount_percent = res.data[0].discount.coupon.percent_off;
                }
                customer_country = res.data[0].address.country;
                var line1 = res.data[0].address.line1;
                var line2 = res.data[0].address.line2;
                var city = res.data[0].address.city;
                var postal_code = res.data[0].address.postal_code;
                var country = res.data[0].address.country;
                name = res.data[0].name;

                $("#subscription_email_billing").text(user_email);
                $("#subscription_name_billing").text(name);
                $("#subscription_line1_billing").text(line1);
                $("#subscription_line2_billing").text(line2);
                $("#subscription_postcode_billing").text(postal_code);
                $("#subscription_city_billing").text(city);
                $("#subscription_country_billing").text(country);


                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                urlAWS += '&customer_id=' + cus_id;
                urlAWS += '&type=get_subscription_data';
                try {
                    fetch(urlAWS).then((response2) => {
                        return response2.json();
                    }).then((res2) => {
                        if (res2.data.length !== 0) {
                            //console.log(res2.data[0]);
                            var plan_price = res2.data[0].plan.amount;
                            var plan_interval = res2.data[0].plan.interval;
                            var plan_to = res2.data[0].current_period_end;
                            subscription_id = res2.data[0].id;
                            plan_price = plan_price / 100;
                            if (dicount_percent > 1) {
                                var new_discount_percent = dicount_percent / 100;
                                plan_price_old = plan_price * new_discount_percent;
                                plan_price = plan_price - plan_price_old;
                            }
                            var is_canceled = res2.data[0].cancel_at_period_end;
                            ///time
                            if (is_canceled == true) {
                                $('.subscription_item_button_cancel').hide();
                            }

                            var price_interval = "€ " + plan_price.toFixed(2) + " per " + plan_interval;
                            var is_active = res2.data[0].plan.active;
                            ///time
                            var a = new Date(plan_to * 1000);
                            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                            var year = a.getFullYear();
                            var month = months[a.getMonth()];
                            var date = a.getDate();
                            var hour = a.getHours();
                            var min = a.getMinutes();
                            var sec = a.getSeconds();
                            if (res2.data[0].plan.id == "price_1KfSVjIIuoBlfUrt0IduvWMs") {
                                price_interval = "€ " + plan_price.toFixed(2) + " per " + plan_interval + ", lifetime access";
                                $('.subscription_item_price').text(price_interval);
                            } else {
                                $('.subscription_item_price').text(price_interval);
                            }

                        }

                        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                        urlAWS += '&customer_id=' + cus_id;
                        urlAWS += '&type=get_cards';
                        try {
                            fetch(urlAWS).then((response3) => {
                                return response3.json();
                            }).then((res3) => {

                                if (res3.data[0]) {
                                    $('#add_card').hide();
                                    $('.subscription_item_renews_time').show();
                                    $('#card_data').show();
                                    //console.log(res3.data[0]);
                                    var card_id = res3.data[0].id;
                                    var brand = res3.data[0].brand;
                                    var last4 = "**** " + res3.data[0].last4;
                                    var exp_month = res3.data[0].exp_month;
                                    var exp_year = res3.data[0].exp_year;
                                    var expires = "Expires " + exp_month + "/" + exp_year;
                                    if (language == "english") {
                                        expires = "Expires " + exp_month + "/" + exp_year;
                                    } else if (language == "polish") {
                                        expires = "Wygasa " + exp_month + "/" + exp_year;
                                    } else if (language == "deutsch") {
                                        expires = "Es läuft ab " + exp_month + "/" + exp_year;
                                    } else if (language == "francais") {
                                        expires = "Il expire " + exp_month + "/" + exp_year;
                                    } else if (language == "italiano") {
                                        expires = "Scade " + exp_month + "/" + exp_year;
                                    } else if (language == "espanol") {
                                        expires = "Caduca " + exp_month + "/" + exp_year;
                                    }
                                    var price_to_new = "Your plan renews on " + month + " " + date + ", " + year + " using " + brand + " " + last4 + ".";
                                    if (is_canceled == true) {
                                        if (language == "english") {
                                            price_to_new = "Your plan ends on " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("RENEW");
                                        } else if (language == "polish") {
                                            price_to_new = "Twój plan zakończy się dnia " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("ODNÓW");
                                        } else if (language == "deutsch") {
                                            price_to_new = "Ihr Plan wird den Tag beenden " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("ERNEUERN");
                                        } else if (language == "francais") {
                                            price_to_new = "Votre plan finira la journée " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("RENOUVELER");
                                        } else if (language == "italiano") {
                                            price_to_new = "Il tuo piano finirà la giornata " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("RINNOVARE");
                                        } else if (language == "espanol") {
                                            price_to_new = "Tu plan terminará el día " + month + " " + date + ", " + year + ".";
                                            $("#update_plan_button").text("RENOVAR");
                                        }
                                    } else {
                                        price_to_new = "Your plan renews on " + month + " " + date + ", " + year + " using " + brand + " " + last4 + ".";
                                    }
                                    $('.subscription_item_renews_time').text(price_to_new);

                                    $('.payment_method_card').text(last4);
                                    $('.payment_method_card_expiration').text(expires);
                                    $('.delete_card_confirm').val(card_id);
                                    if (brand == "visa") {
                                        $('#mastercard').hide();
                                        $('#visa').show();
                                    } else if (brand == "mastercard") {
                                        $('#visa').hide();
                                        $('#mastercard').show();
                                    }
                                } else {
                                    $('#card_data').hide();
                                    $('#add_card').show();
                                    $('.subscription_item_renews_time').hide();
                                }

                                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                                urlAWS += '&customer_id=' + cus_id;
                                urlAWS += '&type=get_history';
                                try {
                                    fetch(urlAWS).then((response4) => {
                                        return response4.json();
                                    }).then((res4) => {

                                        var template = "";

                                        //$('.billing_history_date').text(history_time);
                                        //$('.billing_history_price').text(history_price);
                                        if (res4.data.length > 3) {
                                            $('#show_more_billing_history').show();
                                        }
                                        if (res4.data.length == 2) {
                                            $('html').css("height", "850px");
                                        }
                                        if (res4.data.length > 2) {
                                            $('html').css("height", "910px");
                                        }
                                        $('.billing_history_three_latest').empty();
                                        res4.data.forEach(function(item, index) {
                                            var history_price = res4.data[index].items.data[0].plan.amount;
                                            var history_created = res4.data[index].start_date;
                                            var subscription_type = res4.data[index].items.data[0].plan.nickname;
                                            history_price = history_price / 100;

                                            if (subscription_type == "Lifetime access") {
                                                $('html').css("height", "820px");
                                                history_price = "249.99";
                                            }
                                            var a = new Date(history_created * 1000);
                                            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                                            var year = a.getFullYear();
                                            var month = months[a.getMonth()];
                                            var date = a.getDate();
                                            var hour = a.getHours();
                                            var min = a.getMinutes();
                                            var sec = a.getSeconds();

                                            var history_time = month + " " + date + ", " + year;
                                            history_price = "€ " + history_price;

                                            template +=
                                                `<div style="display: inline-flex; padding-top: 10px;"><div class="billing_history_date">${history_time}</div>
                                                              <div class="billing_history_icon">
                                                                  <img src="images/box-arrow-up-right.svg" width="10px" height="10px" style=" cursor: pointer;   position: absolute; margin-left: 5px;" />
                                                              </div>
                                                          <div class="billing_history_price">${history_price}</div><div class="billing_history_title">Ali Product Finder PRO</div></div>`

                                        });
                                        $('.billing_history_three_latest').html(template);


                                    }).catch((error) => {
                                        console.log(error, "error");
                                        showNotificationError();
                                    });
                                } catch (e) {
                                    console.log(error, "error");
                                    showNotificationError();
                                }



                            }).catch((error) => {
                                console.log(error, "error");
                                showNotificationError();
                            });
                        } catch (e) {
                            console.log(error, "error");
                            showNotificationError();
                        }


                    }).catch((error) => {
                        console.log(error, "error");
                        showNotificationError();
                    });
                } catch (e) {
                    console.log(error, "error");
                    showNotificationError();
                }


                chrome.runtime.sendMessage({
                    set_new_user_id: "true",
                    get_user_id: cus_id
                }, (response) => {});

            }).catch((error) => {
                console.log(error, "error");
                showNotificationError();
            });
        } catch (e) {
            console.log(error, "error");
            showNotificationError();
        }
    });

});
$('#home').on('click', function() {
    $(".sub_info").hide();
    $(".userArea").show();
    $(".subscription_options_icon").show();
    $(".home_icon").hide();
    $(".logout_icon").hide();
    $(".help_icon").show();

    $('body').css("height", "500px");
    if (testmode == false && purchase_count == 0) {
        $('html').css("height", "780px");

    } else {
        $('html').css("height", "550px");
    }
    setTimeout(
        function() {
            if (testmode == false && purchase_count == 0) {
                $('html').css("height", "780px");

            } else {
                $('html').css("height", "550px");
            }
        }, 1200);


});

$("#toggle").on('change', function() {
    if (is_active == true || testmode == true) {
        if ($(this).is(':checked')) {
            chrome.runtime.sendMessage({
                set_extension_active: "true",
                extension_active_status: "true"
            }, (response) => {
                get_extension_active();

            });
        } else {
            chrome.runtime.sendMessage({
                set_extension_active: "true",
                extension_active_status: "false"
            }, (response) => {
                get_extension_active();

            });
        }
    }
});

function get_extension_active() {
    chrome.runtime.sendMessage({
        get_extension_active: "true"
    }, (response) => {


        if (response.get_extension_active_changed == "false") {

            $("#toggle").attr('unchecked', 'true');
            chrome.runtime.sendMessage({
                runProductFinder: "false"
            }, (response) => {
                is_active = false;

            });
        } else {
            $("#toggle").attr('checked', 'true');

            chrome.runtime.sendMessage({
                runProductFinder: "true"
            }, (response) => {
                is_active = true;

            });
        }
        //console.log("extension_running_status:", response.get_extension_active_changed);

    });


}

function get_shipping_from() {

    if (is_active == true || testmode == true) {
        chrome.runtime.sendMessage({
            get_shipping_from: "true"
        }, (response) => {
            $('.flag_shippment').removeClass('shippment_active').children('div');
            if (response.get_shipping_from_country != null) {
                var class_shippment = "." + response.get_shipping_from_country.toLowerCase() + '_shippment';
                $(class_shippment).toggleClass('shippment_active').children('div');
            } else {
                var class_shippment = '.pl_shippment';
                $(class_shippment).toggleClass('shippment_active').children('div');
            }

        });
    }
}


$(".payment_method_card_edit").on('click', function() {
    $("#delete_card_popout").show();
});
$('.delete_card_popout_close').on('click', function() {
    $("#delete_card_popout").hide();
});
$('.billing_information_update_text').on('click', function() {
    $("#info_popout").show();
});
$('.info_popout_close').on('click', function() {
    $("#info_popout").hide();
});
$('.understand_confirm').on('click', function() {
    $("#info_popout").hide();
});
$('.subscription_item_button_cancel ').on('click', function() {
    $("#cancel_subscription_confirmation").show();
});

$('.cancel_subscription_close').on('click', function() {
    $("#cancel_subscription_confirmation").hide();
});

$('#add_card').on('click', function() {
    $("#add_card_popout").show();
});

$('.add_card_popout_close').on('click', function() {
    $("#add_card_popout").hide();
});


$('#renew_subscriptionn').on('click', function() {
    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
    urlAWS += '&customer_id=' + cus_id;
    urlAWS += '&type=get_cards';
    try {
        fetch(urlAWS).then((response3) => {
            return response3.json();
        }).then((res3) => {
            //   console.log(res3.data[0]);
            if (res3.data[0]) { //customer has card added, create subscription

                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                urlAWS += '&customer_id=' + cus_id;
                urlAWS += '&price_renew=' + price;
                urlAWS += '&type=renew_subscription';
                try {
                    fetch(urlAWS).then((response3) => {
                        return response3.json();
                    }).then((res3) => {

                        if (res3.data[0]) {
                            $("#success_text").text("Karta została pomyślnie wznowiona.");
                            $(".success")
                                .fadeIn()
                                .css({
                                    right: -500,
                                    position: "fixed"
                                })
                                .animate({
                                    right: 20
                                }, 500, function() {
                                    // $('#selector').delay(5000).fadeOut('slow');

                                });
                        }
                        setTimeout(hideNotificationSuccess, 3000);

                    }).catch((error) => {
                        console.log(error, "error");
                        showNotificationError();
                    });
                } catch (e) {
                    console.log(error, "error");
                    showNotificationError();
                }




            } else { //no card added, add card, then create subscription

                chrome.runtime.sendMessage({
                    command: "submitStripeCardNewRenew"
                }, (response) => {
                    chrome.runtime.onMessage.addListener((msg, sender, resp) => {
                        // console.log(msg.command);

                        sendResponse({
                            got_it: true
                        });


                    });
                });

            }

        }).catch((error) => {
            console.log(error, "error");
            showNotificationError();
        });
    } catch (e) {
        console.log(error, "error");
        showNotificationError();
    }




});

$('#renew_text').on('click', function() {
    $("#renew_subscription_popout").show();
    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
    urlAWS += '&customer_id=' + cus_id;
    urlAWS += '&type=get_cards';
    try {
        fetch(urlAWS).then((response3) => {
            return response3.json();
        }).then((res3) => {

            if (res3.data[0]) {
                $('#add_card_renew').hide();
                var card_id = res3.data[0].id;
                var brand = res3.data[0].brand;
                var last4 = "**** " + res3.data[0].last4;
                var exp_month = res3.data[0].exp_month;
                var exp_year = res3.data[0].exp_year;
                var expires = "Expires " + exp_month + "/" + exp_year;
                if (language == "english") {
                    expires = "Expires " + exp_month + "/" + exp_year;
                } else if (language == "polish") {
                    expires = "Wygasa " + exp_month + "/" + exp_year;
                } else if (language == "deutsch") {
                    expires = "Es läuft ab " + exp_month + "/" + exp_year;
                } else if (language == "francais") {
                    expires = "Il expire " + exp_month + "/" + exp_year;
                } else if (language == "italiano") {
                    expires = "Scade " + exp_month + "/" + exp_year;
                } else if (language == "espanol") {
                    expires = "Caduca " + exp_month + "/" + exp_year;
                }

                $('.payment_method_card_renew').text(last4);
                $('.payment_method_card_expiration_renew').text(expires);
                if (brand == "visa") {
                    $('#mastercard').hide();
                    $('#visa').show();

                } else if (brand == "mastercard") {
                    $('#visa').hide();
                    $('#mastercard').show();

                }
                $('#renew_subscription_card_details').show();

            } else {
                $('#renew_subscription_card_details').hide();
                $('#add_card_renew').show();
            }

        }).catch((error) => {
            console.log(error, "error");
            showNotificationError();
        });
    } catch (e) {
        console.log(error, "error");
        showNotificationError();
    }

});

$('.renew_subscription_popout_close').on('click', function() {
    $("#renew_subscription_popout").hide();

});



$('.add_card_confirm').on('click', function() {
    chrome.runtime.sendMessage({
        command: "submitStripeCardNew"
    }, (response) => {
        chrome.runtime.onMessage.addListener((msg, sender, resp) => {
            // console.log(msg.command);

            if (msg.command == 'stripeCardOnConfirmNewError') {
                //error with stripe token
                console.log('error with card info', msg);
                showNotificationError();
            }
            sendResponse({
                got_it: true
            });

        });
    });

});



$('#cancel_subscription').on('click', function() {
    if (is_active == true) {
        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
        urlAWS += '&subscription_id=' + subscription_id;
        urlAWS += '&type=cancel_subscription';
        try {
            fetch(urlAWS).then((response4) => {
                return response4.json();
            }).then((res4) => {
                //deleted
                $('.subscription_item_button_cancel').hide();


            }).catch((error) => {
                console.log(error, "error");
                showNotificationError();
            });
        } catch (e) {
            console.log(e, "error");
            showNotificationError();
        }
    }
});



function hideNotificationSuccess() {
    $(".success_n").fadeOut("slow");
}


function hideNotificationError() {
    $(".error_n").fadeOut("slow");
}

function showNotificationError() {
    $(".error")
        .fadeIn()
        .css({
            right: -500,
            position: "fixed"
        })
        .animate({
            right: 20
        }, 500, function() {
            // $('#selector').delay(5000).fadeOut('slow');
        });
    setTimeout(hideNotificationSuccess, 3000);
}
$('.delete_card_confirm').on('click', function() {
    card_id = $(this).val();
    var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
    urlAWS += '&customer_id=' + cus_id + '&card_id=' + card_id;
    urlAWS += '&type=delete_card';
    try {
        fetch(urlAWS).then((response4) => {
            return response4.json();
        }).then((res4) => {
            //deleted
            $('#card_data').hide();
            $('#delete_card_popout').hide();
            $('#add_card').show();
            $("#success_text").text("Karta została pomyślnie usunięta.");
            $(".success")
                .fadeIn()
                .css({
                    right: -500,
                    position: "fixed"
                })
                .animate({
                    right: 20
                }, 500, function() {
                    // $('#selector').delay(5000).fadeOut('slow');
                });
            setTimeout(hideNotificationSuccess, 3000);

        }).catch((error) => {
            console.log(error, "error");
            showNotificationError();


        });
    } catch (e) {
        console.log(e, "error");
        showNotificationError();
    }
});




window.onload = function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }).then(([tab]) => {


        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['/scripts/jszip.js']
        });
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['/scripts/jszip-utils.js']
        });
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['/scripts/FileSaver.js']
        });
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['/scripts/jquery.min.js']
        });
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            files: ['/scripts/bootstrap.min.js']
        });
        let download_allButton = document.getElementById('all_images');
        download_allButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['all'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['all'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };

        let download_mainButton = document.getElementById('main_images');
        download_mainButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['main'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['main'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };


        let download_descButton = document.getElementById('desc_images');
        download_descButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['desc'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['desc'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };


        let download_variantButton = document.getElementById('variant_images');
        download_variantButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['variant'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['variant'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };

        let download_reviewsButton = document.getElementById('reviews_images');
        download_reviewsButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['reviews'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['reviews'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };

        //shopee
        let download_allShopeeButton = document.getElementById('all_images_shopee');
        download_allShopeeButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['all_shopee'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['all_shopee'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };

        let download_mainShopeeButton = document.getElementById('main_images_shopee');
        download_mainShopeeButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['main_shopee'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['main_shopee'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };

        let download_reviewsShopeeButton = document.getElementById('reviews_images_shopee');
        download_reviewsShopeeButton.onclick = function() {
            if (is_active == true) {
                chrome.scripting.executeScript({
                    args: ['reviews_shopee'],
                    target: {
                        tabId: tab.id
                    },
                    function: functionCodeCollect
                });
                chrome.storage.local.get('savedImages', function(result) {
                    setTimeout(function() {
                        chrome.scripting.executeScript({
                            args: ['reviews_shopee'],
                            target: {
                                tabId: tab.id
                            },
                            function: functionCodeDownload
                        });
                    }, 1000);
                });
                //downloadButton.innerHTML = "Downloaded ";
            }
        };


    });



    function functionCodeCollect(type) {
        var images = "";
        var images1 = "";
        var images2 = "";
        var url_reviews = "";

        if (type == "all") {
            url_reviews = document.getElementById("product-evaluation").src;
            images1 = document.querySelectorAll('.images-view-wrap img, .product-description img, .sku-property-list img');
            $.ajax({
                url: url_reviews,
                type: 'GET',
                success: function(res) {
                    var el = document.createElement('html');
                    el.innerHTML = res;
                    images2 = el.querySelectorAll('.r-photo-list li img');
                    images = Array.prototype.slice.call(images1).concat(Array.prototype.slice.call(images2));
                }
            });

        } else if (type == "main") {
            images = document.querySelectorAll('.images-view-wrap img');
        } else if (type == "desc") {
            images = document.querySelectorAll('.detail-desc-decorate-richtext img');
        } else if (type == "variant") {
            images = document.querySelectorAll('.sku-property-list img');
        } else if (type == "all_shopee") {
            $("._2jXolU").trigger('click');
            setTimeout(function() {
                images = document.querySelectorAll('._3iW6K2 ._3DKwBj, .rating-media-list__container .shopee-rating-media-list-image__content');
                //$('._34EwmR').toggleClass("active_")
                $("body").removeClass("shopee-no-scroll");
            }, 250);
        } else if (type == "main_shopee") {
            $("._2jXolU").trigger('click');
            setTimeout(function() {
                images = document.querySelectorAll('._3iW6K2 ._3DKwBj');
                //$('._34EwmR').toggleClass("active_")
                $("body").removeClass("shopee-no-scroll");
            }, 250);

        } else if (type == "reviews_shopee") {
            images = document.querySelectorAll('.rating-media-list__container .shopee-rating-media-list-image__content');
        }
        setTimeout(function() {

            let srcArray = Array.from(images).map(function(image) {
                if ((type == "reviews_shopee") || (type == "all_shopee") || (type == "main_shopee")) {
                    style = image.currentStyle || window.getComputedStyle(image, false),
                        img_src = style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    // console.log(img_src);
                    return img_src;
                } else {
                    return image.currentSrc;
                }
            });
            chrome.storage.local.get('savedImages', function(result) {
                // remove empty images
                imagestodownload = [];
                for (img of srcArray) {
                    if (img) imagestodownload.push(img);
                };
                result.savedImages = imagestodownload;
                chrome.storage.local.set(result);
                //console.log("local collection setting success:"+result.savedImages.length); 
            });
        }, 500);


    }



    function functionCodeDownload(type) {
        chrome.storage.local.get('savedImages', function(result) {
            if (result.savedImages.length > 0) {

                chrome.runtime.sendMessage({
                    savedImages: result.savedImages,
                    saveImage: "true"
                }, (response) => {
                    //console.log(response);
                    var fileUrls = result.savedImages;
                    var counter = 0;
                    var count = 0;
                    var zipFilename = "";
                    if ((type == "all") || (type == "all_shopee")) {
                        zipFilename = "all_images.zip";
                    } else if ((type == "main") || (type == "main_shopee")) {
                        zipFilename = "main_images.zip";
                    } else if (type == "desc") {
                        zipFilename = "desc_images.zip";
                    } else if (type == "variant") {
                        zipFilename = "variant_images.zip";
                    } else if ((type == "reviews") || (type == "reviews_shopee")) {
                        zipFilename = "reviews_images.zip";
                    }

                    const downloadZip = async (urls) => {
                        const urlToPromise = (url) => {
                            return new Promise((resolve, reject) => {
                                JSZipUtils.getBinaryContent(url, (err, data) => {
                                    if (err) reject(err)
                                    else resolve(data)
                                })
                            })
                        }

                        const getExtension = (binary) => {
                            const arr = (new Uint8Array(binary)).subarray(0, 4)
                            let hex = ''
                            for (var i = 0; i < arr.length; i++) {
                                hex += arr[i].toString(16)
                            }
                            switch (hex) {
                                case '89504e47':
                                    return 'png'
                                case '47494638':
                                    return 'gif'
                                case 'ffd8ffe0':
                                case 'ffd8ffe1':
                                case 'ffd8ffe2':
                                case 'ffd8ffe3':
                                case 'ffd8ffe8':
                                    return 'jpg'
                                default:
                                    return ''
                            }
                        }

                        this.progress = true

                        const zip = new JSZip();
                        for (const index in urls) {
                            const url = urls[index];
                            const binary = await urlToPromise(url);
                            const extension = "png";
                            //const extension = getExtension(binary) || url.split('.').pop().split(/#|\?/)[0];
                            const filename = `${index}.${extension}`;
                            zip.file(filename, binary, {
                                binary: true
                            });
                        }
                        await zip.generateAsync({
                                type: 'blob'
                            })
                            .then((blob) => {
                                saveAs(blob, zipFilename);
                                this.progress = false;
                            })
                    }
                    for (var i = 0; i < fileUrls.length; i++) {
                        fileUrls[i] = fileUrls[i].replaceAll('50x50', '');
                        if ((type == "all_shopee") || (type == "main_shopee") || (type == "reviews_shopee")) {
                            fileUrls[i] = fileUrls[i].replaceAll('_tn', '');
                        }
                    }
                    downloadZip(result.savedImages);
                    /*

let mainZip = new JSZip();


for (let src of result.savedImages){

                  var filename = fileUrls[src];
                  filename = count+".png";
                  // loading a file and add it in a zip file
                  JSZipUtils.getBinaryContent(src, function (err, data) {
                    if (err) {
                      throw err; // or handle the error
                    }
                    mainZip.file(filename, data, { binary: true });

                    count++;
                    if (count >= fileUrls.length) {
                      mainZip.generateAsync({type: 'blob'}).then(content => {
                         saveAs(content, 'main.zip');
                      });
                    zip.generateAsync({type:"blob"})
                        .then(function(content) {
                           // see FileSaver.js
                           console.log(content);
                           saveAs(content, zipFilename);       
                           var item = {
                             'name': name,
                             'type': content.type,
                             'size': content.size
                           };
                        });
                    }
                  });
          
               // download({url:src, filename:"AliProductFinderDownloads/"+counter+".png"}); counter++;
         
        }


         for (let src of result.savedImages) {
        
                src = src.replaceAll("50x50", "");
                console.log(src);
                fetch(src)
                  .then(resp => resp.blob())
                  .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = counter+".png";
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                    counter++;
                    console.log(url);
                      if (counter >=10){

                      }
                  })
                  .catch(() => console.log("error"));
     

             }
            */
                    /*
                    var zip = new JSZip();
                    var count = 0;
                    var zipFilename = "Pictures.zip";

                    links.forEach(function (url, i) {
                      var filename = links[i];
                      filename = filename.replace(/[\/\*\|\:\<\>\?\"\\]/gi, '').replace("httpsi.imgur.com","");
                      // loading a file and add it in a zip file
                      JSZipUtils.getBinaryContent(url, function (err, data) {
                        if (err) {
                          throw err; // or handle the error
                        }
                        zip.file(filename, data, { binary: true });
                        count++;
                        if (count == links.length) {
                          zip.generateAsync({ type: 'blob' }).then(function (content) {
                            saveAs(content, zipFilename);
                          });
                        }
                      });
                    }); */
                    // download({url:src, filename:"AliProductFinderDownloads/"+counter+".png"}); counter++;



                });
            }
        });
    }
};




document.querySelector('#get_access').addEventListener('click', function() {


    if ($('.address-form').css('display') == 'block') {
        $('body').css("height", "1040px");
        $('html').css("height", "1160px");
    } else {
        $('body').css("height", "830px");
        $('html').css("height", "870px");
    }
    document.querySelector('.login-area').style.display = 'none';
    document.querySelector('.signup-area').style.display = 'block';
    document.querySelector('.choose_plan').style.display = 'block';
    document.querySelector('#sign_in_top').style.display = 'block';
    document.querySelector('.help_icon').style.display = 'none';


});
document.querySelector('#buy_access').addEventListener('click', function() {

    if (clicked_buy == false) {


        var line1 = document.querySelector('.input_address1').value;
        var line2 = document.querySelector('.input_address2').value;
        var country = $('.input_country :selected').val();

        var postcode = document.querySelector('.input_postcode').value;
        var city = document.querySelector('.input_city').value;
        var name_billing = document.querySelector('.input_name_billing').value;
        var lastname_billing = document.querySelector('.input_lastname_billing').value;
        var accepted = 0;
        var price = 'monthly';
        var id = $('.nav-tabs .active').attr('id');



        if ($(".address-form").css("display") == "block") {
            if (city == '') {
                accepted = 0;
                $(".empty_city").show().delay(5000).fadeOut();
                $('.input_city').addClass('error');

            } else if (city.length <= 2) {
                accepted = 0;
                $(".wrong_city").show().delay(5000).fadeOut();
                $('.input_city').addClass('error');

            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_city").hide();
                $(".wrong_city").hide();
                $('.input_city').removeClass('error');

            }

            if (country == '') {
                accepted = 0;
                $(".empty_country").show().delay(5000).fadeOut();
            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_country").hide();
                $(".wrong_country").hide();
            }


            if (line1 == '') {
                accepted = 0;
                $(".empty_line1").show().delay(5000).fadeOut();
                $('.input_address1').addClass('error');

            } else if (line1.length <= 3) {
                accepted = 0;
                $(".wrong_line1").show().delay(5000).fadeOut();
                $('.input_address1').addClass('error');

            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_line1").hide();
                $(".wrong_line1").hide();
                $('.input_address1').removeClass('error');

            }

            if (postcode == '') {
                accepted = 0;
                $(".empty_postcode").show().delay(5000).fadeOut();
                $('.input_postcode').addClass('error');

            } else if (postcode.length <= 3) {
                accepted = 0;
                $(".wrong_postcode").show().delay(5000).fadeOut();
                $('.input_postcode').addClass('error');

            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_postcode").hide();
                $(".wrong_postcode").hide();
                $('.input_postcode').removeClass('error');

            }



            if (name_billing == '') {
                accepted = 0;
                $(".empty_name_billing").show().delay(5000).fadeOut();

                $('.input_name_billing').addClass('error');

            } else if (name_billing.length < 3) {
                accepted = 0;
                $(".wrong_name_billing").show().delay(5000).fadeOut();
                $('.input_name_billing').addClass('error');

            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_name_billing").hide();
                $(".wrong_name_billing").hide();
                $('.input_name_billing').removeClass('error');

            }

            if (lastname_billing == '') {
                accepted = 0;
                $(".empty_lastname_billing").show().delay(5000).fadeOut();
                $('.input_lastname_billing').addClass('error');

            } else if (lastname_billing.length <= '3') {
                accepted = 0;
                $(".wrong_lastname_billing").show().delay(5000).fadeOut();
                $('.input_lastname_billing').addClass('error');

            } else {
                // Yay! valid
                accepted = 1;
                $(".empty_lastname_billing").hide();
                $(".wrong_lastname_billing").hide();
                $('.input_lastname_billing').removeClass('error');

            }




            if (target == "#monthly") {
                price = 'monthly';
            } else if (target == "#yearly") {
                price = "yearly";
            } else if (target == "#lifetime") {
                price = "lifetime";
            }

            if (accepted == 1) {
                $('.input_city').removeClass('error');
                $('.input_line1').removeClass('error');
                $('.input_postcode').removeClass('error');
                $('.input_name_billing').removeClass('error');
                $('.input_lastname_billing').removeClass('error');
                window.signupPrice = price;
                window.signupNameBilling = name_billing;
                window.signupLastnameBilling = lastname_billing;
                window.signupCountry = country;
                window.signupLine1 = line1;
                window.signupLine2 = line2;
                window.signupPostcode = postcode;
                window.signupCity = city;

                chrome.runtime.sendMessage({
                    command: "submitStripeCard"
                }, (response) => {
                    //now listen for events...

                    if (response.status == "success") {

                        pageDisplay(response, "true");



                    } else {

                        if (response.message != null) {
                            clicked_buy = false;
                        }
                    }
                });
            }
        }
    }
});

document.querySelector('#sign_in_top').addEventListener('click', function() {
    $('body').css("height", "500px");
    $('html').css("height", "540px");

    if ($('.signup-area').css('display') != 'block') {

        if (testmode == false && purchase_count == 0) {
            $('html').css("height", "780px");
            $(".buySubscription").show();

        } else {
            $('html').css("height", "550px");

        }
    }
    document.querySelector('#sign_in_top').style.display = 'none';
    document.querySelector('.signup-area').style.display = 'none';
    document.querySelector('.choose_plan').style.display = 'none';
    document.querySelector('.login-area').style.display = 'block';
    document.querySelector('.help_icon').style.display = 'block';


});
document.querySelector('.have_a_coupon').addEventListener('click', function() {
    document.querySelector('.have_a_coupon').style.display = 'none';
    document.querySelector('.info_code').style.display = 'block';
    document.querySelector('.has_coupon').style.display = 'inline-flex';
    if ($('.address-form').css('display') == 'block') {
        $('body').css("height", "1160px");
        $('html').css("height", "1200px");
    } else {
        $('body').css("height", "900px");
        $('html').css("height", "940px");
    }
});
document.querySelector('.have_a_coupon_renew').addEventListener('click', function() {
    $(".coupon_area_renew").removeClass('pbottom');

    document.querySelector('.have_a_coupon_renew').style.display = 'none';
    document.querySelector('.info_code_renew').style.display = 'block';
    document.querySelector('.has_coupon_renew').style.display = 'inline-flex';
    if ($('.address-form').css('display') == 'block') {
        $('body').css("height", "1160px");
        $('html').css("height", "1200px");
    } else {
        $('body').css("height", "900px");
        $('html').css("height", "940px");
    }
});
window.signupPromoCode = "x";
var extendedCost = 49.99;
var price = 'monthly';
var promo_code_input = "";
var target = '#monthly';
var promo_code_accepted = false;
var promo_code_input_clicked = false;
var response;

$('a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
    target = $(e.target).attr("href");
    if (target == "#monthly_renew" || (target == "#yearly_renew") || (target == "#lifetime_renew")) {
        if (customer_country == "PL") {
            //Poland tax rate
            TAXRATE = 23;
        } else if (customer_country == "AT") {
            //Austria tax rate
            TAXRATE = 20;
        } else if (customer_country == "BE") {
            //Belgium tax rate
            TAXRATE = 21;
        } else if (customer_country == "BG") {
            //Bulgaria tax rate
            TAXRATE = 20;
        } else if (customer_country == "HR") {
            //Croata tax rate
            TAXRATE = 25;
        } else if (customer_country == "CY") {
            //Cyprus tax rate
            TAXRATE = 19;
        } else if (customer_country == "CZ") {
            //Czech Republic tax rate
            TAXRATE = 21;
        } else if (customer_country == "DK") {
            //Denmark tax rate
            TAXRATE = 25;
        } else if (customer_country == "EE") {
            //Estonia tax rate
            TAXRATE = 20;
        } else if (customer_country == "FI") {
            //Finland tax rate
            TAXRATE = 24;
        } else if (customer_country == "FR") {
            //France tax rate
            TAXRATE = 20;
        } else if (customer_country == "DE") {
            //Germany tax rate
            TAXRATE = 19;
        } else if (customer_country == "GR") {
            //Greece tax rate
            TAXRATE = 24;
        } else if (customer_country == "HU") {
            //Hungary tax rate
            TAXRATE = 27;
        } else if (customer_country == "IE") {
            //Ireland tax rate
            TAXRATE = 23;
        } else if (customer_country == "LV") {
            //Latvia tax rate
            TAXRATE = 21;
        } else if (customer_country == "LT") {
            //Lithuania tax rate
            TAXRATE = 21;
        } else if (customer_country == "LU") {
            //Luxembourg tax rate
            TAXRATE = 17;
        } else if (customer_country == "MT") {
            //Malta tax rate
            TAXRATE = 18;
        } else if (customer_country == "NL") {
            //Netherlands tax rate
            TAXRATE = 21;
        } else if (customer_country == "PT") {
            //Portugal tax rate
            TAXRATE = 23;
        } else if (customer_country == "RO") {
            //Romania tax rate
            TAXRATE = 19;
        } else if (customer_country == "SK") {
            //Slovakia tax rate
            TAXRATE = 20;
        } else if (customer_country == "SI") {
            //Slovenia tax rate
            TAXRATE = 22;
        } else if (customer_country == "ES") {
            //Spain tax rate
            TAXRATE = 21;
        } else if (customer_country == "SE") {
            //Sweden tax rate
            TAXRATE = 25;
        }
    }
    if (target == "#monthly") {
        price = 'monthly';
        if (promo_code_accepted == true) {
            extendedCost = 49.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_count_monthly").text(new_text_tax_rate_count);
            $(".total_new_monthly").text(count_new_cost_string);
            $(".subscription_cost_terms_update").show();
            $(".subscription_info").show();
            $(".subscription_cost_terms_update").text("€ 44.99");
            $(".subscription_info").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the monthly subscription costs until I cancel the service.");
            $(".change_text_fee").text("The monthly cost of the service is ");
            $(".fee_info").show();
            $(".change_text_fee").show();
            $(".subscription_cost_terms_update").show();

        } else {
            extendedCost = 49.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;

            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_monthly").text(new_text_tax_rate);
            $(".tax_rate_count_monthly").text(new_text_tax_rate_count);
            $(".total_new_monthly").text(count_new_cost_string);
            $(".subscription_cost_terms_update").show();
            $(".subscription_info").show();
            $(".subscription_cost_terms_update").text("€ 49.99");
            $(".subscription_info").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the monthly subscription costs until I cancel the service.");
            $(".change_text_fee").text("The monthly cost of the service is ");
            $(".fee_info").show();
            $(".change_text_fee").show();
            $(".subscription_cost_terms_update").show();

        }
    } else if (target == "#yearly") {
        price = 'yearly';

        if (promo_code_accepted == true) {
            extendedCost = 119.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);
            $(".tax_rate_count_yearly").text(new_text_tax_rate_count);
            $(".total_new_yearly").text(count_new_cost_string);
            $(".subscription_cost_terms_update").show();
            $(".subscription_info").show();
            $(".subscription_cost_terms_update").text("€ 107.99");
            $(".subscription_info").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the yearly subscription costs until I cancel the service.");
            $(".change_text_fee").text("The yearly cost of the service is ");
            $(".fee_info").show();
            $(".change_text_fee").show();
            $(".subscription_cost_terms_update").show();

        } else {
            extendedCost = 119.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_yearly").text(new_text_tax_rate);
            $(".tax_rate_count_yearly").text(new_text_tax_rate_count);
            $(".total_new_yearly").text(count_new_cost_string);
            $(".subscription_cost_terms_update").show();
            $(".subscription_info").show();
            $(".subscription_cost_terms_update").text("€ 119.99");
            $(".subscription_info").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the yearly subscription costs until I cancel the service.");
            $(".change_text_fee").text("The yearly cost of the service is ");
            $(".fee_info").show();
            $(".change_text_fee").show();
            $(".subscription_cost_terms_update").show();

        }
    } else if (target == "#lifetime") {
        price = 'lifetime';
        if (promo_code_accepted == true) {
            extendedCost = 249.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var new_extended = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_count_lifetime").text(new_text_tax_rate_count);
            $(".subscription_cost_terms_update").show();
            $(".total_new_lifetime").text(new_extended);
            $(".subscription_info_renew").text("I agree to get immediate lifetime access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO. I understand that I am not entitled to a refund.");
            $(".subscription_cost_terms_update").hide();
            $(".fee_info").hide();
            $(".change_text_fee").hide();
            $(".subscription_cost_terms_update").hide();
        } else {
            extendedCost = 249.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;

            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var new_extended = "€ " + extendedCost.toFixed(2);

            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            $(".tax_rate_lifetime").text(new_text_tax_rate);
            $(".tax_rate_count_lifetime").text(new_text_tax_rate_count);
            $(".total_new_lifetime").text(new_extended);
            $(".subscription_cost_terms_update").hide();
            $(".subscription_info_renew").text("I agree to get immediate lifetime access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO. I understand that I am not entitled to a refund.");
            $(".fee_info").hide();
            $(".change_text_fee").hide();
            $(".subscription_cost_terms_update").hide();
        }
    }

    if (target == "#monthly_renew") {
        price = 'monthly';
        if (promo_code_accepted == true) {
            extendedCost = 49.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_count_monthly_renew").text(new_text_tax_rate_count);
            $(".total_new_monthly_renew").text(count_new_cost_string);
            $(".subscription_cost_terms_update_renew").show();
            $(".subscription_info_renew").show();
            $(".subscription_cost_terms_update_renew").text("€ 44.99");
            $(".subscription_info_renew").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the monthly subscription costs until I cancel the service.");
            $(".change_text_fee_renew").text("The monthly cost of the service is ");
            $(".fee_info_renew").show();
            $(".change_text_fee_renew").show();
            $(".subscription_cost_terms_update_renew").show();

        } else {
            extendedCost = 49.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;

            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_monthly_renew").text(new_text_tax_rate);
            $(".tax_rate_count_monthly_renew").text(new_text_tax_rate_count);
            $(".total_new_monthly_renew").text(count_new_cost_string);
            $(".subscription_cost_terms_update_renew").show();
            $(".subscription_info_renew").show();
            $(".subscription_cost_terms_update_renew").text("€ 49.99");
            $(".subscription_info_renew").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the monthly subscription costs until I cancel the service.");
            $(".change_text_fee_renew").text("The monthly cost of the service is ");
            $(".fee_info_renew").show();
            $(".change_text_fee_renew").show();
            $(".subscription_cost_terms_update_renew").show();

        }
    } else if (target == "#yearly_renew") {
        price = 'yearly';

        if (promo_code_accepted == true) {
            extendedCost = 119.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);
            $(".tax_rate_count_yearly_renew").text(new_text_tax_rate_count);
            $(".total_new_yearly_renew").text(count_new_cost_string);
            $(".subscription_cost_terms_update_renew").show();
            $(".subscription_info_renew").show();
            $(".subscription_cost_terms_update_renew").text("€ 107.99");
            $(".subscription_info_renew").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the yearly subscription costs until I cancel the service.");
            $(".change_text_fee_renew").text("The yearly cost of the service is ");
            $(".fee_info_renew").show();
            $(".change_text_fee_renew").show();
            $(".subscription_cost_terms_update_renew").show();

        } else {
            extendedCost = 119.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var count_new_cost_string = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_yearly_renew").text(new_text_tax_rate);
            $(".tax_rate_count_yearly_renew").text(new_text_tax_rate_count);
            $(".total_new_yearly_renew").text(count_new_cost_string);
            $(".subscription_cost_terms_update_renew").show();
            $(".subscription_info_renew").show();
            $(".subscription_cost_terms_update_renew").text("€ 119.99");
            $(".subscription_info_renew").text("I agree to get immediate access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO subscription. I agree to bear the yearly subscription costs until I cancel the service.");
            $(".change_text_fee_renew").text("The yearly cost of the service is ");
            $(".fee_info_renew").show();
            $(".change_text_fee_renew").show();
            $(".subscription_cost_terms_update_renew").show();

        }
    } else if (target == "#lifetime_renew") {
        price = 'lifetime';
        if (promo_code_accepted == true) {
            extendedCost = 249.99;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var new_extended = "€ " + extendedCost.toFixed(2);

            $(".tax_rate_count_lifetime_renew").text(new_text_tax_rate_count);
            $(".subscription_cost_terms_update_renew").show();
            $(".total_new_lifetime_renew").text(new_extended);
            $(".subscription_info_renew").text("I agree to get immediate lifetime access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO. I understand that I am not entitled to a refund.");

            $(".subscription_cost_terms_update_renew").hide();
            $(".fee_info_renew").hide();
            $(".change_text_fee_renew").hide();
            $(".subscription_cost_terms_update_renew").hide();
        } else {
            extendedCost = 249.99;
            var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
            //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
            var taxrate_to_decimal = TAXRATE / 100;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;

            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
            var new_tax = parseFloat(total_tax);
            var new_extended = "€ " + extendedCost.toFixed(2);

            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            $(".tax_rate_lifetime_renew").text(new_text_tax_rate);
            $(".tax_rate_count_lifetime_renew").text(new_text_tax_rate_count);
            $(".total_new_lifetime_renew").text(new_extended);
            $(".subscription_cost_terms_update_renew").hide();
            $(".subscription_info_renew").text("I agree to get immediate lifetime access to Ali Product Finder PRO and at the same time activate the Ali Product Finder PRO. I understand that I am not entitled to a refund.");
            $(".fee_info_renew").hide();
            $(".change_text_fee_renew").hide();
            $(".subscription_cost_terms_update_renew").hide();
        }
    }



});
document.querySelector('.input_coupon_button_renew').addEventListener('click', function() {
    promo_code_input = $('.input_coupon_renew').val();
    promo_code_input_clicked = true;
    if ((promo_code_input.length != 0) && ((promo_code_input === "INWESTOWANIE") || (promo_code_input === "JAKUBEK"))) {
        $(".coupon_area_renew").hide();
        $(".info_code_renew").hide();
        $(".wrong_code_renew").hide();
        $(".code_section_renew").hide();

        if (target == "#monthly_renew") {
            price = 'monthly';
            $(".total_new_monthly_renew").text("€ 44.99");
            $(".count_saved_renew").text("€ 1.00");
            $(".count_special_discount_renew").text("- € 5.00");
            $(".subscription_cost_terms_update_renew").text("€ 44.99");

        } else if (target == "#yearly_renew") {
            price = 'yearly';
            $(".total_new_yearly_renew").text("€ 107.99");
            $(".count_saved_renew").text("€ 9.00");
            $(".count_special_discount_renew").text("- € 9.00");
            $(".subscription_cost_terms_update_renew").text("€ 107.99");
        } else if (target == "#lifetime_renew") {
            price = 'lifetime';
            $(".total_new_lifetime_renew").text("€ 224.99");
            $(".count_saved_renew").text("€ 12.00");
            $(".count_special_discount_renew").text("- € 12.00");

        }
        document.querySelector('.coupon_saved_monthly_renew').style.display = 'inline-flex';
        document.querySelector('.special_discounts_monthly_renew').style.display = 'inline-flex';
        document.querySelector('.total_old_monthly_renew').style.display = 'block';
        document.querySelector('.coupon_saved_lifetime_renew').style.display = 'inline-flex';
        document.querySelector('.special_discounts_lifetime_renew').style.display = 'inline-flex';
        document.querySelector('.total_old_lifetime_renew').style.display = 'block';
        document.querySelector('.coupon_saved_yearly_renew').style.display = 'inline-flex';
        document.querySelector('.special_discounts_yearly_renew').style.display = 'inline-flex';
        document.querySelector('.total_old_yearly_renew').style.display = 'block';


        if (promo_code_input == "INWESTOWANIE") {
            promo_code_accepted = true;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var new_extended = "€ " + extendedCost.toFixed(2);

            if (target == "#monthly_renew") {
                $(".tax_rate_count_monthly_renew").text(new_text_tax_rate_count);
                $(".total_new_monthly_renew").text(new_extended);
            } else if (target == "#yearly_renew") {
                $(".tax_rate_count_yearly_renew").text(new_text_tax_rate_count);
                $(".total_new_yearly_renew").text(new_extended);
            } else if (target == "#lifetime_renew") {
                $(".tax_rate_count_lifetime_renew").text(new_text_tax_rate_count);
                $(".total_new_lifetime_renew").text(new_extended);
            }

        } else if (promo_code_input == "JAKUBEK") {
            promo_code_accepted = true;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtrBT2okff";
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_extended = "€ " + extendedCost.toFixed(2);

            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            if (target == "#monthly_renew") {
                $(".tax_rate_count_monthly_renew").text(new_text_tax_rate_count);
                $(".total_new_monthly").text(new_extended);
            } else if (target == "#yearly_renew") {
                $(".tax_rate_count_yearly_renew").text(new_text_tax_rate_count);
                $(".total_new_yearly_renew").text(new_extended);
            } else if (target == "#lifetime_renew") {
                $(".tax_rate_count_lifetime_renew").text(new_text_tax_rate_count);
                $(".total_new_lifetime_renew").text(new_extended);
            }

        }


    } else if (promo_code_input.length == 0) {
        window.signupPromoCode = "x";
        promo_code_accepted = false;

    } else {
        $(".info_code_renew").hide().delay(5050).fadeIn();
        $(".wrong_code_renew").show().delay(5000).fadeOut();
        window.signupPromoCode = "x";
        promo_code_accepted = false;
    }


});

document.querySelector('.input_coupon_button').addEventListener('click', function() {
    if ($('.address-form').css('display') == 'block') {
        $('body').css("height", "1040px");
        $('html').css("height", "1160px");
    } else {
        $('body').css("height", "860px");
        $('html').css("height", "900px");
    }


    promo_code_input = $('.input_coupon').val();
    promo_code_input_clicked = true;
    if ((promo_code_input.length != 0) && ((promo_code_input === "INWESTOWANIE") || (promo_code_input === "JAKUBEK"))) {
        $(".coupon_area").hide();
        $(".info_code").hide();
        $(".wrong_code").hide();
        $(".code_section").hide();

        if (target == "#monthly") {
            price = 'monthly';
            $(".total_new").text("€ 44.99");
            $(".count_saved").text("€ 5.00");
            $(".count_special_discount").text("- € 5.00");
            $(".subscription_cost_terms_update").text("€ 44.99");

        } else if (target == "#yearly") {
            price = 'yearly';
            $(".total_new").text("€ 107.99");
            $(".count_saved").text("€ 9.00");
            $(".count_special_discount").text("- € 9.00");
            $(".subscription_cost_terms_update").text("€ 107.99");
        } else if (target == "#lifetime") {
            price = 'lifetime';
            $(".total_new").text("€ 224.99");
            $(".count_saved").text("€ 12.00");
            $(".count_special_discount").text("- € 12.00");

        }
        document.querySelector('.coupon_saved_monthly').style.display = 'inline-flex';
        document.querySelector('.special_discounts_monthly').style.display = 'inline-flex';
        document.querySelector('.total_old_monthly').style.display = 'block';
        document.querySelector('.coupon_saved_lifetime').style.display = 'inline-flex';
        document.querySelector('.special_discounts_lifetime').style.display = 'inline-flex';
        document.querySelector('.total_old_lifetime').style.display = 'block';
        document.querySelector('.coupon_saved_yearly').style.display = 'inline-flex';
        document.querySelector('.special_discounts_yearly').style.display = 'inline-flex';
        document.querySelector('.total_old_yearly').style.display = 'block';


        if (promo_code_input == "INWESTOWANIE") {
            promo_code_accepted = true;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtVaR7VUuW";
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            var new_extended = "€ " + extendedCost.toFixed(2);

            if (target == "#monthly") {
                $(".tax_rate_count_monthly").text(new_text_tax_rate_count);
                $(".total_new_monthly").text(new_extended);
            } else if (target == "#yearly") {
                $(".tax_rate_count_yearly").text(new_text_tax_rate_count);
                $(".total_new_yearly").text(new_extended);
            } else if (target == "#lifetime") {
                $(".tax_rate_count_lifetime").text(new_text_tax_rate_count);
                $(".total_new_lifetime").text(new_extended);
            }

        } else if (promo_code_input == "JAKUBEK") {
            promo_code_accepted = true;
            window.signupPromoCode = "promo_1KbRzpIIuoBlfUrtrBT2okff";
            extendedCost = extendedCost - count_new_cost;
            var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
            var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1);
            var new_tax = parseFloat(total_tax);
            var taxAmount_decimal = new_tax.toFixed(2);
            var new_extended = "€ " + extendedCost.toFixed(2);

            var new_text_tax_rate_count = "€ " + taxAmount_decimal;
            if (target == "#monthly") {
                $(".tax_rate_count_monthly").text(new_text_tax_rate_count);
                $(".total_new_monthly").text(new_extended);
            } else if (target == "#yearly") {
                $(".tax_rate_count_yearly").text(new_text_tax_rate_count);
                $(".total_new_yearly").text(new_extended);
            } else if (target == "#lifetime") {
                $(".tax_rate_count_lifetime").text(new_text_tax_rate_count);
                $(".total_new_lifetime").text(new_extended);
            }

        }


    } else if (promo_code_input.length == 0) {
        window.signupPromoCode = "x";
        promo_code_accepted = false;

    } else {
        $(".info_code").hide().delay(5050).fadeIn();
        $(".wrong_code").show().delay(5000).fadeOut();
        window.signupPromoCode = "x";
        promo_code_accepted = false;
    }


});




var TAXRATE = 23;
var picked_country = "PL";
$('.countrypicker').on('change', function(e) {
    picked_country = $(".input_country :selected").val();
    if (picked_country == "PL") {
        //Poland tax rate
        TAXRATE = 23;
    } else if (picked_country == "AT") {
        //Austria tax rate
        TAXRATE = 20;
    } else if (picked_country == "BE") {
        //Belgium tax rate
        TAXRATE = 21;
    } else if (picked_country == "BG") {
        //Bulgaria tax rate
        TAXRATE = 20;
    } else if (picked_country == "HR") {
        //Croata tax rate
        TAXRATE = 25;
    } else if (picked_country == "CY") {
        //Cyprus tax rate
        TAXRATE = 19;
    } else if (picked_country == "CZ") {
        //Czech Republic tax rate
        TAXRATE = 21;
    } else if (picked_country == "DK") {
        //Denmark tax rate
        TAXRATE = 25;
    } else if (picked_country == "EE") {
        //Estonia tax rate
        TAXRATE = 20;
    } else if (picked_country == "FI") {
        //Finland tax rate
        TAXRATE = 24;
    } else if (picked_country == "FR") {
        //France tax rate
        TAXRATE = 20;
    } else if (picked_country == "DE") {
        //Germany tax rate
        TAXRATE = 19;
    } else if (picked_country == "GR") {
        //Greece tax rate
        TAXRATE = 24;
    } else if (picked_country == "HU") {
        //Hungary tax rate
        TAXRATE = 27;
    } else if (picked_country == "IE") {
        //Ireland tax rate
        TAXRATE = 23;
    } else if (picked_country == "LV") {
        //Latvia tax rate
        TAXRATE = 21;
    } else if (picked_country == "LT") {
        //Lithuania tax rate
        TAXRATE = 21;
    } else if (picked_country == "LU") {
        //Luxembourg tax rate
        TAXRATE = 17;
    } else if (picked_country == "MT") {
        //Malta tax rate
        TAXRATE = 18;
    } else if (picked_country == "NL") {
        //Netherlands tax rate
        TAXRATE = 21;
    } else if (picked_country == "PT") {
        //Portugal tax rate
        TAXRATE = 23;
    } else if (picked_country == "RO") {
        //Romania tax rate
        TAXRATE = 19;
    } else if (picked_country == "SK") {
        //Slovakia tax rate
        TAXRATE = 20;
    } else if (picked_country == "SI") {
        //Slovenia tax rate
        TAXRATE = 22;
    } else if (picked_country == "ES") {
        //Spain tax rate
        TAXRATE = 21;
    } else if (picked_country == "SE") {
        //Sweden tax rate
        TAXRATE = 25;
    }

    target = $(e.target).attr("href");

    if (target == "#monthly") {
        price = 'monthly';
        extendedCost = 49.99;
        if (promo_code_accepted == true) {
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
        }
    } else if (target == "#yearly") {
        price = 'yearly';
        extendedCost = 119.99;
        if (promo_code_accepted == true) {
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
        }
    } else if (target == "#lifetime") {
        price = 'lifetime';
        extendedCost = 249.99;
        if (promo_code_accepted == true) {
            count_new_cost = extendedCost * 0.10;
            extendedCost = extendedCost - count_new_cost;
        }
    }



    var new_text_tax_rate = "Tax (" + TAXRATE + "% inclusive): ";
    //var new_tax = parseFloat(extendedCost) * ((TAXRATE / 100 ) / (100+TAXRATE / 100));
    var taxrate_to_decimal = TAXRATE / 100;
    var taxrate_to_decimal_x_1 = (TAXRATE + 100) / 100;
    //var new_tax = parseFloat(extendedCost)*taxrate_to_decimal/taxrate_to_decimal_x_1;

    var total_tax = extendedCost - (extendedCost / taxrate_to_decimal_x_1); //1.87
    var new_tax = parseFloat(total_tax);



    var taxAmount_decimal = new_tax.toFixed(2);
    var new_text_tax_rate_count = "€ " + taxAmount_decimal;
    $(".tax_rate").text(new_text_tax_rate);
    $(".tax_rate_count").text(new_text_tax_rate_count);



});




//***misc functions
const pageDisplay = function(userAuth, new_user) {
    console.log(userAuth);


    if (userAuth == false || userAuth.data == false) {
        //not logged in
        document.querySelector('section.logged-in').style.display = 'none';
        document.querySelector('section.logged-out').style.display = 'block';
    } else {
        var userAuthObj = userAuth.data;
        if (new_user == "true") {


            $('body').css("height", "500px");
            $('html').css("height", "540px");

            confetti({
                particleCount: 650,
                spread: 120
            });
            $('.thank_you').delay(50).show();
            $('.setup-info').delay(50).hide();

            function login() {


                document.querySelector('section.logged-out').style.display = 'none';
                document.querySelector('section.logged-in').style.display = 'none';
                document.querySelector('#sign_in_top').style.display = 'none';
                document.querySelector('.signup-area').style.display = 'none';
                document.querySelector('.buySubscription').style.display = 'none';
                document.querySelector('.choose_plan').style.display = 'block';
                document.querySelector('.login-area').style.display = 'none';
                document.querySelector('.help_icon').style.display = 'block';
                $(".logout_icon").css("right", "40px");

                document.querySelector('.logout_icon').style.display = 'block';

                $(".subscription_options_icon").hide();
                chrome.runtime.sendMessage({
                    set_extension_active: "true",
                    extension_active_status: "true"
                }, (response) => {
                    get_extension_active();
                });
                if (!($("body").css('visibility') === "hidden")) {
                    checkCustomerSubscription();
                }
                $('.thank_you').hide();

            }

            setTimeout(login, 5000);

        } else {
            //is logged in
            if (!($("body").css('visibility') === "hidden")) {
                checkCustomerSubscription();
                get_extension_active();
                document.querySelector('section.logged-out').style.display = 'none';
                if (testmode == false && purchase_count == 0) {
                    //     $(".buySubscription").show();
                    $('html').css("height", "780px");
                    document.querySelector('.choose_plan').style.display = 'block';
                    $(".subscription_options_icon").hide();
                    $(".logout_icon").css("right", "40px");

                    document.querySelector('.logout_icon').style.display = 'block';

                } else {
                    $(".subscription_options_icon").show();
                    $(".logout_icon").css("right", "15px");

                    document.querySelector('.logout_icon').style.display = 'hide';

                    $(".buySubscription").hide();
                    document.querySelector('.choose_plan').style.display = 'none';
                    document.querySelector('section.logged-in').style.display = 'block';
                }
                //chrome.runtime.sendMessage({set_extension_active: "true", extension_active_status: "true"}, (response) => {
                //  get_extension_active();
                //  });
            }


        }


    }
}


//Global Vars example...
window.signupUser = false;
window.signupE = '';
window.signupP = '';
window.signupPrice = '';
window.signupNameBilling = '';
window.signupLastnameBilling = '';
//***send messages
chrome.runtime.sendMessage({
    command: "user-auth"
}, (response) => {
    //console.log(response);
    pageDisplay(response, "false");
});




//***listen for messages
chrome.runtime.onMessage.addListener((msg, sender, resp) => {
    if (msg.command == 'stripeCardOnConfirmNew') {
        var card_token = msg.token.id;
        console.log(card_token);
        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
        urlAWS += '&customer_id=' + cus_id + '&card_token=' + card_token;
        urlAWS += '&type=add_card';
        try {
            fetch(urlAWS).then((response4) => {
                return response4.json();
            }).then((res4) => {
                //deleted
                $("#add_card_popout").hide();
                $("#success_text").text("Karta została pomyślnie dodana.");
                $(".success")
                    .fadeIn()
                    .css({
                        right: -500,
                        position: "fixed"
                    })
                    .animate({
                        right: 20
                    }, 500, function() {
                        // $('#selector').delay(5000).fadeOut('slow');

                    });


                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                urlAWS += '&customer_id=' + cus_id;
                urlAWS += '&type=get_cards';
                try {
                    fetch(urlAWS).then((response3) => {
                        return response3.json();
                    }).then((res3) => {

                        if (res3.data[0]) {
                            $('#add_card').hide();
                            $('.subscription_item_renews_time').show();
                            $('#card_data').show();
                            // console.log(res3.data[0]);
                            var card_id = res3.data[0].id;
                            var brand = res3.data[0].brand;
                            var last4 = "**** " + res3.data[0].last4;
                            var exp_month = res3.data[0].exp_month;
                            var exp_year = res3.data[0].exp_year;
                            var expires = "Expires " + exp_month + "/" + exp_year;
                            if (language == "english") {
                                expires = "Expires " + exp_month + "/" + exp_year;
                            } else if (language == "polish") {
                                expires = "Wygasa " + exp_month + "/" + exp_year;
                            } else if (language == "deutsch") {
                                expires = "Es läuft ab " + exp_month + "/" + exp_year;
                            } else if (language == "francais") {
                                expires = "Il expire " + exp_month + "/" + exp_year;
                            } else if (language == "italiano") {
                                expires = "Scade " + exp_month + "/" + exp_year;
                            } else if (language == "espanol") {
                                expires = "Caduca " + exp_month + "/" + exp_year;
                            }
                            var price_to_new = "Your plan renews on " + month + " " + date + ", " + year + " using " + brand + " " + last4 + ".";
                            if (is_canceled == true) {
                                if (language == "english") {
                                    price_to_new = "Your plan ends on " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("RENEW");
                                } else if (language == "polish") {
                                    price_to_new = "Twój plan zakończy się dnia " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("ODNÓW");
                                } else if (language == "deutsch") {
                                    price_to_new = "Ihr Plan wird den Tag beenden " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("ERNEUERN");
                                } else if (language == "francais") {
                                    price_to_new = "Votre plan finira la journée " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("RENOUVELER");
                                } else if (language == "italiano") {
                                    price_to_new = "Il tuo piano finirà la giornata " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("RINNOVARE");
                                } else if (language == "espanol") {
                                    price_to_new = "Tu plan terminará el día " + month + " " + date + ", " + year + ".";
                                    $("#update_plan_button").text("RENOVAR");
                                }
                            } else {
                                price_to_new = "Your plan renews on " + month + " " + date + ", " + year + " using " + brand + " " + last4 + ".";
                            }
                            $('.subscription_item_renews_time').text(price_to_new);

                            $('.payment_method_card').text(last4);
                            $('.payment_method_card_expiration').text(expires);
                            $('.payment_method_card_renew').text(last4);
                            $('.payment_method_card_expiration_renew').text(expires);
                            $('.delete_card_confirm').val(card_id);
                            if (brand == "visa") {
                                $('#mastercard_renew').hide();
                                $('#visa_renew').show();
                                $('#mastercard').hide();
                                $('#visa_').show();
                            } else if (brand == "mastercard") {
                                $('#visa_renew').hide();
                                $('#mastercard_renew').show();
                                $('#visa').hide();
                                $('#mastercard').show();
                            }
                        }
                        setTimeout(hideNotificationSuccess, 3000);

                    }).catch((error) => {
                        console.log(error, "error");
                        showNotificationError();
                    });
                } catch (e) {
                    console.log(error, "error");
                    showNotificationError();
                }



            }).catch((error) => {
                console.log(error, "error");
                showNotificationError();


            });
        } catch (e) {
            console.log(e, "error");
            showNotificationError();
        }

    }
    if (msg.command == 'stripeCardOnConfirmNewError') {
        //error with stripe token
        console.log('error with card info', msg);
        showNotificationError();
    }
    if (msg.command == 'stripeCardOnConfirmNew') {
        var card_token = msg.token.id;
        console.log(card_token);
        var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
        urlAWS += '&customer_id=' + cus_id + '&card_token=' + card_token;
        urlAWS += '&type=add_card';
        try {
            fetch(urlAWS).then((response4) => {
                return response4.json();
            }).then((res4) => {
                //deleted

                var urlAWS = 'https://l9ae064z4a.execute-api.us-east-1.amazonaws.com/default/chrome_ext_backend_stripe?stripe=true';
                urlAWS += '&customer_id=' + cus_id;
                urlAWS += '&price_renew=' + price;
                urlAWS += '&type=renew_subscription';
                try {
                    fetch(urlAWS).then((response3) => {
                        return response3.json();
                    }).then((res3) => {

                        if (res3.data[0]) {
                            $("#success_text").text("Karta została pomyślnie wznowiona.");
                            $(".success")
                                .fadeIn()
                                .css({
                                    right: -500,
                                    position: "fixed"
                                })
                                .animate({
                                    right: 20
                                }, 500, function() {
                                    // $('#selector').delay(5000).fadeOut('slow');

                                });
                        }
                        setTimeout(hideNotificationSuccess, 3000);

                    }).catch((error) => {
                        console.log(error, "error");
                        showNotificationError();
                    });
                } catch (e) {
                    console.log(error, "error");
                    showNotificationError();
                }



            }).catch((error) => {
                console.log(error, "error");
                showNotificationError();


            });
        } catch (e) {
            console.log(e, "error");
            showNotificationError();
        }

    }
    if (msg.command == 'stripeCardOnConfirmNewRenewError') {
        //error with stripe token
        console.log('error with card info', msg);
        showNotificationError();
    }
    if (msg.command == 'stripeCardOnChange') {

        var complete = msg.event.value.complete;
        document.querySelector('.address-form').style.display = 'block';
        $('.CardField-child').css('transform', 'translateX(-95px) !important');
        if ($('.has_coupon').css('display') == 'inline-flex') {
            $('body').css("height", "1040px");
            $('html').css("height", "1160px");
        } else {
            $('body').css("height", "980px");
            $('html').css("height", "1040px");
        }
    }



    if (msg.command == 'stripeCardOnConfirm') {
        //complete user signup / with stripe token
        // console.log(window.signupUser,window.signupE,window.signupP, window.signupPrice, window.signupPromoCode, window.signupNameBilling, window.signupLastnameBilling);
        //console.log('get stripe token info', msg);
        //send to background page to create user and complete payment  window.signupNameBilling = name_billing;

        chrome.runtime.sendMessage({
            command: "buy_first_sub",
            e: user_email,
            s: msg.token,
            tokenId: msg.token.id,
            price: window.signupPrice,
            promo_code: window.signupPromoCode,
            name_billing: signupNameBilling,
            lastname_billing: window.signupLastnameBilling,
            city: window.signupCity,
            postcode: window.signupPostcode,
            line1: window.signupLine1,
            line2: window.signupLine2,
            country: window.signupCountry
        }, (response) => {
            //console.log("response: ", response);
            console.log(response);
            if (response.status == "success") {

                var newDate = new Date();
                Logspot.track({
                    event: "SUCCESS_UserSubscription",
                    message: "Nowa SUBSKRYPCJA! - Ali Product Finder",
                    userId: user_email,
                    metadata: {
                        dateTime: newDate
                    },
                });

                $('body').css("height", "500px");
                $('html').css("height", "540px");

                confetti({
                    particleCount: 650,
                    spread: 120
                });
                $('.buySubscription').delay(50).hide();
                $('.thank_you_first_bought').delay(50).show();



                function login() {
                    $('.thank_you_first_bought').hide();
                    document.querySelector('.buySubscription').style.display = 'none';
                    document.querySelector('.choose_plan').style.display = 'none';
                    document.querySelector('.help_icon').style.display = 'block';
                    document.querySelector('.userArea').style.display = 'block';
                    $(".logout_icon").hide();
                    $(".subscription_options_icon").show();
                    chrome.runtime.sendMessage({
                        set_extension_active: "true",
                        extension_active_status: "true"
                    }, (response) => {
                        get_extension_active();
                    });
                    checkCustomerSubscription();

                }

                setTimeout(login, 5000);
                // pageDisplay(response, "true");

            } else {

                if (response.message != null) {
                    if (response.message.code == "error") {

                    }
                }
            }


        });


    }
    if (msg.command == 'stripeCardOnConfirmError') {
        //error with stripe token
        console.log('error with card info', msg);
        showNotificationError();
    }
});




//***create events 

//logout button
document.querySelector('#logout').addEventListener('click', function() {
    chrome.runtime.sendMessage({
        command: "auth-logout"
    }, (response) => {
        chrome.runtime.sendMessage({
            runProductFinder: "false"
        }, (response) => {
            is_active = false;
            testmode = false;
            chrome.runtime.sendMessage({
                set_extension_active: "true",
                extension_active_status: "false"
            }, (response) => {
                get_extension_active();

            });

        });
        pageDisplay(false, "false");
    });
    $(".buySubscription").hide();
    $(".sub_info").hide();
    $(".subscription_options").hide();
    $(".logout_icon").css("right", "15px");

    $(".logout_icon").hide();
    $(".home_icon").hide();
    $(".help_icon").show();
    $('html').css("height", "550px");


});
$('input').on('change', function(e) {
    $(this).removeClass("error");
});
var once_signup = false;
//signup user
document.querySelector('.signup-area .sign_up').addEventListener('click', function() {
    if (clicked_signUp == false) {
        once_signup = false;


        var email = document.querySelector('.signup-area .input_email').value;
        var pass = document.querySelector('.signup-area .input_pass').value;
        var accepted = 0;

        if (email == '') {
            accepted = 0;
            $(".empty_email").show().delay(5000).fadeOut();
            $(".sign_up").addClass("unavaible").delay(5000).removeClass("unavaible");
            $(".register-symbol-input100").css("top", "0 !important");
            $('.input_email').addClass('error');

        } else {
            filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (filter.test(email)) {
                // Yay! valid
                accepted = 1;
                $(".empty_email").hide();
                $(".wrong_email").hide();
                $('.input_email').removeClass('error');
                $(".sign_up").removeClass("unavaible");


            } else {
                accepted = 0;
                $(".wrong_email").show().delay(5000).fadeOut();
                $(".sign_up").addClass("unavaible").delay(5000).removeClass("unavaible");
                $(".register-symbol-input100").css("top", "0 !important");
                $('.input_email').addClass('error');
            }
        }


        if (pass == '') {
            accepted = 0;
            $(".empty_pass").show().delay(5000).fadeOut();
            $(".sign_up").addClass("unavaible").delay(5000).removeClass("unavaible");

            $(".register-symbol-input100").css("top", "0 !important");
            $('.input_pass').addClass('error');
        } else if (pass.length < 8) {
            accepted = 0;
            $(".wrong_pass").show().delay(5000).fadeOut();
            $(".register-symbol-input100").css("top", "0 !important");
            $('.input_pass').addClass('error');
            $(".sign_up").addClass("unavaible").delay(5000).removeClass("unavaible");

        } else {
            // Yay! valid
            accepted = 1;
            $(".empty_pass").hide();
            $(".wrong_pass").hide();
            $('.input_pass').removeClass('error');
            $(".sign_up").removeClass("unavaible");

        }




        if (accepted == 1) {
            $('.input_email').removeClass('error');
            $('.input_pass').removeClass('error');
            $(".sign_up").removeClass("unavaible");

            window.signupUser = true;
            window.signupE = email;
            window.signupP = pass;

            //complete event in stripeCardOnConfirm
            // console.log('send to service worker [signup] ->', email, pass, price, window.signupPromoCode, name_billing, lastname_billing);
            //generate stripe token
            chrome.runtime.sendMessage({
                command: "auth-signup",
                e: window.signupE,
                p: window.signupP
            }, (response) => {


                //console.log("response: ", response);

                if (response.status == "success") {
                    var newDate = new Date();

                    Logspot.track({
                        event: "SUCCESS_UserRegister",
                        message: "Nowa rejstracja użytkownika - Ali Product Finder",
                        userId: email,
                        metadata: {
                            dateTime: newDate
                        },
                    });
                    pageDisplay(response, "true");


                } else {

                    if (response.message != null) {
                        var newDate = new Date();

                        if (response.message.code == "auth/email-already-in-use") {
                            clicked_signUp = false;
                            var error_message_logspot = response.message.code;
                            $(".register-symbol-input100").css("top", "0 !important");
                            $('.input_email').addClass('error');
                            $("html, body").animate({
                                scrollTop: 0
                            }, 500);
                            $(".used_email").show().delay(5000).fadeOut();
                            Logspot.track({
                                event: "ERROR_UserRegister",
                                userId: email,
                                metadata: {
                                    error_message: error_message_logspot
                                },
                            });
                        } else if (response.message == "auth/email-already-in-use") {
                            var error_message_logspot = response.message;
                            clicked_signUp = false;
                            $(".register-symbol-input100").css("top", "0 !important");
                            $('.input_email').addClass('error');
                            $("html, body").animate({
                                scrollTop: 0
                            }, 500);
                            $(".used_email").show().delay(5000).fadeOut();
                            Logspot.track({
                                event: "ERROR_UserRegister",
                                userId: email,
                                metadata: {
                                    error_message: error_message_logspot
                                },
                            });
                        } else if (response.message.code == "auth/invalid-email") {
                            var error_message_logspot = response.message.code;

                            $(".register-symbol-input100").css("top", "0 !important");
                            $('.input_email').addClass('error');
                            $("html, body").animate({
                                scrollTop: 0
                            }, 500);
                            $(".wrong_email").show().delay(5000).fadeOut();
                            Logspot.track({
                                event: "ERROR_UserRegister",
                                userId: email,
                                metadata: {
                                    error_message: error_message_logspot
                                },
                            });
                        } else {
                            $("html, body").animate({
                                scrollTop: 0
                            }, 500);
                            //$(".wrong_email").show().delay(5000).fadeOut();  
                        }
                    }
                }


            });


        }
    } else {
        $("html, body").animate({
            scrollTop: 0
        }, 500);
    }
    clicked_signUp = true;
    sendResponse({
        got_it: true
    });

});

document.querySelector('.login-area .sign_in').addEventListener('click', function() {

    var email = document.querySelector('.login-area input[type="text"]').value;
    var pass = document.querySelector('.login-area input[type="password"]').value;
    //console.log('send to service worker [login] ->', email, pass);
    $(".subscription_options").show();
    chrome.runtime.sendMessage({
        command: "auth-login",
        e: email,
        p: pass
    }, (response) => {
        pageDisplay(response, "false");
    });
});