$(document).ready(function() {
  var config = {
    apiKey: "AIzaSyBW7RkLfboNj8SNn22MD_dgRCfToPFVJBk",
    authDomain: "student-swap.firebaseapp.com",
    databaseURL: "https://student-swap.firebaseio.com",
    projectId: "student-swap",
    storageBucket: "student-swap.appspot.com",
    messagingSenderId: "981980228799"
  };
  firebase.initializeApp(config);
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      console.log("logged in");
    } else {
      console.log("not logged in");
      notLoggedIn();
    }
  });

  $("#logoutButton").on("click", function(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      localStorage.removeItem("name");
      localStorage.removeItem("picture");
      localStorage.removeItem("email");
      localStorage.removeItem("guid");
      console.log("You've signed out");
    }).catch(function(error) {
      // An error happened.
    });
  })


  function notLoggedIn() {
    $("#loginButton").on('click', function() {
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        user = result.user;
        name = user.displayName;
        email = user.email;
        photo = user.photoURL;
        uid = user.uid;
        console.log("name: ", name);
        console.log("email: ", email);
        console.log("photo: ", photo);
        console.log("unique id: ", uid);
        // NOTE: this is where we use the login credentials to append
        //to the user page.
        // $('#pic').attr("src", user.photoURL);
        // $('#userName').text(user.displayName);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("picture", user.photoURL);
        localStorage.setItem("guid", user.uid);
        localStorage.setItem("email", email);
        //Checks for user in database
        // NOTE: We'll probably be using a $.get here so that we can get
        // access to all the existing users.
        //If the we can find the user in the json, we send an object back
        //with the new users cred.

        //otherwise, if the user exists, we display their homepage, with a
        //$.get to their id's data

      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
    });
  }

})
