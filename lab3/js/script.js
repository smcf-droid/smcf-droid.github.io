document.addEventListener("DOMContentLoaded", () => {
  loadStates();

  document.querySelector("#state").addEventListener("change", loadCounties);
  document.querySelector("#zip").addEventListener("change", displayCity);
  document.querySelector("#username").addEventListener("change", checkUsername);
  document.querySelector("#password").addEventListener("click", passwordSuggest);
  document.querySelector("#passwordAgain").addEventListener("change", checkPassword);
  document.querySelector("#signupForm").addEventListener("submit", validateForm);
});


async function displayCity() {
  try {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/geo/cityInfoAPI.php?zip=${zipCode}`;
    let response = await fetch(url);
    let data = await response.json();

    //the API returns false when the zip code is not found, so we can check for that case before trying to access the city property
    if (data === false) {
      document.querySelector("#city").textContent = "Zip code not found";
      document.querySelector("#latitude").textContent = "";
      document.querySelector("#longitude").textContent = "";
      return;
    }

    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;

  } catch (error) {
    document.querySelector("#city").textContent = "Unable to retrieve city";
    console.error(error);
  }
}


async function loadStates() {
  let stateMenu = document.querySelector("#state");

  stateMenu.textContent = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  stateMenu.appendChild(defaultOption);

  try {
    let url = "https://csumb.space/api/geo/statesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.usps;
      option.textContent = item.state;
      stateMenu.appendChild(option);
    }
  } catch (error) {
    console.error(error);

    stateMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load states";
    stateMenu.appendChild(errorOption);
  }
}

async function loadCounties() {
  let countyMenu = document.querySelector("#county");
  let stateUsps = document.querySelector("#state").value;

  countyMenu.textContent = "";

  if (stateUsps == "") {
    countyMenu.textContent = "Select a state first";
    return;
  }

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  countyMenu.appendChild(defaultOption);

  try {
    let url = `https://csumb.space/api/geo/countyListAPI.php?state=${stateUsps}`;
    let response = await fetch(url);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.usps;
      option.textContent = item.county;
      countyMenu.appendChild(option);
    }
  } catch (error) {
    console.error(error);

    countyMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load county";
    countyMenu.appendChild(errorOption);
  }
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    return false;
  }

  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.available) {
    usernameError.textContent = "Username available!";
    usernameError.style.color = "green";
    return true;
  } else {
    usernameError.textContent = "Username taken";
    usernameError.style.color = "red";
    return false;
  }
}

async function checkPassword() {
  let pw = document.querySelector("#password").value;
  let pwa = document.querySelector("#passwordAgain").value;
  let passwordError = document.querySelector("#passwordError");

  if (pw.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters";
    passwordError.style.color = "red";
    return false;
  }

  if (pw != pwa) {
    passwordError.textContent = "Passwords must be identical";
    passwordError.style.color = "red";
    return false;
  }

  passwordError.textContent = "";
  return true;
}

async function passwordSuggest() {
  let pw = document.querySelector("#password").value;
  let passwordSuggest = document.querySelector("#passwordSuggest");
  
  let url = "https://csumb.space/api/suggestedPassword.php?length=8";
  let response = await fetch(url);
  let data = await response.json();

  if (pw.length == 0) {
    passwordSuggest.textContent = "Suggested Password: " + data.password;
    return false;
  }

  passwordSuggest.textContent = "";
  return true;
}

async function validateForm(event) {
  event.preventDefault();

  let isValid = true;

  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  let password = document.querySelector("#password").value;
  let passwordAgain = document.querySelector("#passwordAgain").value;
  let passwordError = document.querySelector("#passwordError");


  usernameError.textContent = "";

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    isValid = false;
  } else {
    let usernameAvailable = await checkUsername();

    if (usernameAvailable === false) {
      isValid = false;
    }
  }

if (password.length === 0 || passwordAgain.length === 0) {
    passwordError.textContent = "Password required";
    passwordError.style.color = "red";
    isValid = false;
  } else {
    let pwValid = await checkPassword();

    if (pwValid === false) {
      isValid = false;
    }
  }  

  if (isValid) {
    document.querySelector("#signupForm").submit();
  }
}