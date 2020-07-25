function invalidCharCheck(str) {
  var text = /^[a-zA-Z0-9?* -]+$/;
  if (! text.test(str)) {
    alert("Sorry, input value contains a character outside the allowed character set");
    return false;
  }
  return true;
}

function alphaCharCheck(str) {
  var text = /^[a-zA-Z -]+$/;
  if (! text.test(str)) {
    alert("Sorry, name is restricted to alphabetical characters");
    return false;
  }
  return true;
}

function usernameValidation() {
  // Check user input to ensure lastName is not empty 
  // (it is okay for the firstname to be empty).
  var username = document.getElementById("username").value;
  if (username == '') {
    alert("Username is required");
    return false;
  }
  if (invalidCharCheck(username) == false) {
    return false;
  }
  return true;
}

function passwordValidation() {
  var password = document.getElementById("password").value;
  if (password == '') {
    alert("Password is required");
    return false;
  }
  if (invalidCharCheck(password) == false) {
    return false;
  }
  return true;
}

function usernameAndPasswordValidation() {
  // Temporarily disabling this until I can figure
  // out how to tell which of the form buttons was
  // pressed.
  return true;
  // Check user input for both the username and password.
  if (usernameValidation() == false) {
    return false;
  }
  if (passwordValidation() == false) {
    return false;
  }
  return true;
}

function passwordValidation() {
  var password1 = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  if (password != password2) {
    alert("Passwords don't match");
    return false;
  }
  return true;
}

function usernameAndPassword2Validation() {
  // Temporarily disabling this until I can figure
  // out how to tell which of the form buttons was
  // pressed.
  return true;
  // Check user input for both the username and password.
  if (usernameValidation() == false) {
    return false;
  }
  if (passwordValidation() == false) {
    return false;
  }
  return true;
}
