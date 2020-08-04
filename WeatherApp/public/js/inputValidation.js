function emailCharCheck(str)
{
  var text = /^[a-zA-Z0-9?* -]+$/;
  if (text.test(str))
  {
    console.log(str + " state 1 char check")
    alert("invalid email address");
    return false;
  }
  else
  {
    console.log(str + " is valid email address format")
    return true;
  }

}


function passwordValidation(phrase1, phrase2)
{

  if (phrase1===phrase2)
  {
    console.log("passwords match")
    return true;
  }
  else
  {
    console.log("passwords don't match")
    alert("passwords don't match");
    return false
  }
}


function lengthChecker(phrase1)
{
  if (phrase1.length > 50)
  {
    console.log("overflow protection, length too long.")
    alert("Value too long, don't exceed 50 characters!")
    return false
  }
  else if (phrase1.length < 1)
  {
    console.log("empty values: " + phrase1)
    alert("A value was left blank, check again.")
    return false
  }
  else
  {
    console.log("length ok for " + phrase1)
    return true
  }
}


function usernameAndPassword2Validation()
{
  var username = document.getElementById("username").value;
  var email = document.getElementById("email").value;
  var password1 = document.getElementById("password").value;
  var password2 = document.getElementById("password2").value;
  var valuesArray = [username, email, password1, password2]


  for (i=0; i < valuesArray.length; i++)
  {
    if ( !lengthChecker(valuesArray[i]) )
    {
      return false
    }
  }

  if (!emailCharCheck(email))
  {
    return false
  }

  if (!passwordValidation(password1, password2))
  {
    return false
  }

  return true
}
