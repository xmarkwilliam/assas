/*
 * Copyright (c) 2004-2014 All Right Reserved, www.vtiger.com
 * Vtiger Proprietary License
 * The contents of this file cannot be modified or redistributed or copied.
 */
;
jQuery(function () {

    var VAS_URL = 'https://crmaccounts.od1.vtiger.com/v1';


    ////////////
    // ERRMSG //
    ////////////
    function parseErrorMessage(e) {
        var message = e.message;
        var ucasemsg = message.toUpperCase();
        if (ucasemsg.indexOf('INACTIVE ACCOUNT') != -1) {
            message = 'Account is inactive';
        } else if (ucasemsg.indexOf('EXPIRED ACCOUNT') != -1) {
            message = 'Account has expried';
        } else if (ucasemsg.indexOf('INVALID CREDENTIALS') != -1) {
            //message = "Invalid credentials<br>We upgraded our Authentication System<br>Please try to Reset your password.";
            message = 'Invalid credentials';
        }
        return message;
    }

    /////////////
    // AdRoll  //
    /////////////
    var triggeredAdRoll_Login = false;
    function triggerAdRoll_Login() {
        if (!triggeredAdRoll_Login && typeof __adroll != 'undefined') {
            try {
                __adroll.record_user({"adroll_segments": "login_bp"});
            } catch (err) {
            }
        }
        triggeredAdRoll_Login = true;
    }

    //////////////
    // Websense //
    //////////////
    function triggerWebsense_Convert(email) {
        if (typeof websense != "undefined" && typeof websense.convert == "function") {
            websense.convert({email: email});
        }
    }

    ////////////
    // Login  //
    ////////////

    var loginForm = jQuery('#com-form-login');
    if (loginForm.length) {
        loginForm.bind('submit', function () {
            triggerAdRoll_Login();

            var username = jQuery('[name="username"]', this);
            var password = jQuery('[name="password"]', this);
            var thisContext = this;

            if (!username.val()) {
                username.focus();
                return;
            }
            if (!password.val()) {
                password.focus();
                return;
            }
            var cred = {username: username.val().trim(), password: password.val().trim()};


            jQuery.ajax({
                url: VAS_URL + '/Users/Auth',
                data: cred,
                method: 'POST',
                success: function (res) {
                    if (!res.success) {
                        jQuery('#com-form-login-error').html(parseErrorMessage(res.error));
                    } else {
                        var billingstatus = res.result.account.billingstatus;

                        var actionurl = res.result.user.url + '/index.php?module=Ondemand&action=ODLogin';
                        actionurl += '&_bstatus=' + encodeURIComponent(billingstatus); // _bstatus - not to be obvious.

                        username.attr('name', 'username').attr('value', cred.username);
                        password.attr('name', 'password').attr('value', cred.password);
                        loginForm.attr('method', 'POST');
                        loginForm.attr('action', actionurl);
                        loginForm.unbind('submit');
            
			triggerWebsense_Convert(cred.username); // triggered here so only valid info gets linked.
                        setTimeout(function(){ loginForm.submit(); }, 250); // timeout added to allow convert request to succeed (instead of ajax cancel).
                    }
                }
            });
            return false;
        });
    }

    /////////////////////
    // ForgotPassword  //
    /////////////////////
    var forgotPasswordForm = jQuery('#com-form-forgot-password');
    if (forgotPasswordForm.length) {
        forgotPasswordForm.bind('submit', function () {
            var username = jQuery('[name="username"]', forgotPasswordForm);
            var thisContext = this;

            if (!username.val()) {
                username.focus();
                return;
            }

            jQuery('#com-form-forgot-password .contentpane input').attr('disabled', true);
            jQuery('#password-reset-submit').val('OK...');

            jQuery.ajax({
                url: VAS_URL + '/Users/ForgotPassword',
                data: {username: username.val()},
                dataType: 'jsonp',
                success: function (res) {

                    // Show the feedback - avoid a hint to hacker about wrong usernames...
                    jQuery('#com-form-forgot-password .contentpane').hide();
                    jQuery('#com-form-forgot-password .feedback').show();

                    // Interactive feedback.
                    /*if (!res.success) {
                     //jQuery('#com-form-forgot-password .feedback').html(parseErrorMessage(res.error));						
                     //alert(parseErrorMessage(res.error));
                     } else {
                     //jQuery('#com-form-forgot-password .contentpane').show();
                     alert('We have emailed you the link to reset the password, Thank you.');
                     }*/
                }
            });
            return false;
        });
    }

    //////////////////
    // ServiceAlert //
    //////////////////
    var serviceAlertBox = jQuery('#service-alert');
    if (serviceAlertBox.length) {
        serviceAlertBox.hide();
        jQuery.ajax({url: '/service-alert.txt?_' + (+new Date), dataType: 'text', complete: function (xhr, reqstatus) {
                if (reqstatus == 'success' && xhr.responseText && xhr.responseText.length) {
                    var message = xhr.responseText;
                    serviceAlertBox.html(message).show();
                }
            }});
    }
});

