/**
 * Created by mpo on 09.02.2016.
 */


$( document ).ready(function() {
    // Handler for .ready() called.

    console.log("facebook login flow");

   // checkLoginState();
});


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
        testAPI();
        console.log(response.authResponse.accessToken);
        $('#accessToken').html(response.authResponse.accessToken);
        FB.api(
            '/me/likes',
            'GET',
            {},
            function(response) {

                $('#likes').html(JSON.stringify(response));
                console.log("Likes");
                console.log(response);
            }
        );

        FB.api(
            '/me/events',
            'GET',
            {},
            function(response) {
                // Insert your code here
                $('#events').html(JSON.stringify(response));
                console.log("Events");
                console.log(response);
            }
        );

        FB.api(
            '/me',
            'GET',
            {"fields":"birthday,location,hometown,gender,picture"},
            function(response) {
                // Insert your code here
                $('#basic').html(JSON.stringify(response));
                console.log("Basic Information");
                console.log(response);
            }
        );


    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    } else {
        // The person is not logged into Facebook, so we're not sure if
        // they are logged into this app or not.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into Facebook.';


        /*
         TODO:perform automatic
         FB.login(function(response) {
         // handle the response
         }, {scope: 'public_profile,email,user_likes,user_events,user_birthday,user_location'}); */


    }
}


function startFacebookLoginProcess()
{
    FB.login(function(response) {

        console.log("whaats up");
        console.log(response);


        if (response.authResponse) {
     console.log("juhu");
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

    console.log("facebook sdk loaded");
    FB.init({
        appId      : '744933982303950',
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
    console.log("lala");
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}