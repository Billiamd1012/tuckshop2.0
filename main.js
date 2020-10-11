
logout = document.getElementById('logout')

function signOut(){
  if (!localStorage['microsoftName']){
    console.log("login button pressed")
    signIn();
  }
  else{
    //firebase.auth.logout();
    localStorage.removeItem('microsoftName');
    upload.style.display = 'none';
    queue_div.style.display = 'none';
    logout.innerHTML = "Login"
  }
}

function signIn() {
  var provider = new firebase.auth.OAuthProvider('microsoft.com');
  provider.setCustomParameters({
    tenant: 'ebc0ee77-ff3b-4903-bce7-6cb50ce73fd4'
  });
  firebase.auth().signInWithPopup(provider)
  .then(function(result) {
    console.log('logged in', result.user.displayName);
    localStorage['microsoftName'] = result.user.displayName;
    logout.innerHTML = "Logout"

    console.log('about to show queue_div')
    if (localStorage['microsoftName'] == "William Darker" || localStorage['microsoftName'] == "Samuel Beahan"){
      upload.style.display = 'block';
      queue_div.style.display = 'block';
    }
    else if (localStorage['microsoftName'] == "Thomas Ranieri") {
      queue_div.style.display = 'block';
    }
    else if (localStorage['microsoftName']){
      upload.style.display = 'block';
    }

    jobs.orderBy("datetime").onSnapshot(refreshPage)

  })
  .catch(function(error) {
    // Handle error.
    console.error(error);
  });
}


logout.onclick = signOut;