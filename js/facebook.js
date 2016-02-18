/**
 * Created by mpo on 09.02.2016.
 */


$( document ).ready(function() {

});

var FACEBOOK_APP_ID = '927583730682087';
var URL_BACKEND = "../fb/saveaccesstoken";
var shortTermAccessToken;
var deviceId;


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
}


function successfullyConnected(response)
{
    testAPI();

    shortTermAccessToken = response.authResponse.accessToken;
    deviceId = getQueryVariable("deviceId");
    userId = response.authResponse.userID;

    console.log("the following data, will be send to Streetlife Backend");
    console.log("userId:");
    console.log(userId);
    console.log("fb short term access token:");
    console.log(shortTermAccessToken);
    console.log("streetlife app deviceId: ");
    console.log(deviceId);
    console.log(deviceId);


    $.ajax({
        url: URL_BACKEND,
        type: 'post',
        data: {"deviceid" : deviceId, "fb_userid" : userId,"fb_shortaccesstoken":shortTermAccessToken},
        headers: {
            "Content-Type": "application/json"

        },
        dataType: 'json',
        success: function (data) {
            console.info(data);
        }
    });

    FB.api(
        '/me',
        'GET',
        {"fields":"name"},
        function(response) {
            // Insert your code here

            console.log("Basic Information");
            console.log(response);
            $('#welcome').css("display","none");
            $('#loggedIn').css("display","inline");
            var name = response.name.split(" ")[0];

           $('#loggedInText').prepend("<center><p>Hallo "+name+",<br> Deine Facebookdaten wurden anonymisiert an die Streetlife Plattform weitergeleitet.</center>");

        }
    );

}

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
     successfullyConnected(response);


    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.

    } else {
        // The person is not logged into Facebook, so we're not sure if
         // they are logged into this app or not.



    }
}

function startFacebookLoginProcess()
{
    FB.login(function(response) {

        if (response.authResponse) {
            checkLoginState();
        }

    }, {scope: 'user_friends'});
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {


    FB.init({
        appId      : FACEBOOK_APP_ID,
        cookie     : true,  // enable cookies to allow the server to access
                            // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.2' // use version 2.2
    });

    // Now that we've initialized the JavaScript SDK, we call
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });

};

// Load the SDK asynchronously
(function(d, s, id) {

    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    FB.api('/me', function(response) {
        console.log('FB Successful login for: ' + response.name);
    });
}