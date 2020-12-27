import User from './userClass.js';
import { emailInput, passwordInput, userNameInput, signUpBtn, signInBtn, URLOrigin } from './variables.js';
export let users;

let user = new User();// create new user instance from User class
// getting data from local storage

if (localStorage.getItem("Users") == null) {
    users = [];
} else {
    users = JSON.parse(localStorage.getItem("Users"));
    users.forEach((element) => {
        // here we filter all saved users to check if any one has true signIn state   
        if (element.isSignedIn) {
            user.currentUser = element; // assigning the signed In user to current property of user obj
        }
    });
}

if (user.currentUser != null) {
    if (location != `${URLOrigin}docs/Home.html`) {
        window.location = `${URLOrigin}docs/Home.html`;
    }
}

// dynamic function checks any input value takes required pattern , input and unvalid message  
let IsValidInput = (Pattern, inputElement) => {
    if (Pattern.test($(inputElement).val())) {
        $(inputElement).removeClass("unvalidinput");
        $('.req-patten-box').addClass('d-none');
        return true;
    } else {
        $(inputElement).addClass("unvalidinput");
        $('.req-patten-box').removeClass('d-none');
        return false;
    }
}

// function to check if password and email input will match the required pattern or not 
let isValidEmailAndPass = () => {
    /** email rgx means start with 
    * one or more lowercase or uppercaase characters or any number 0 to 9 or . or - 
    * @ and the same before @ and . and from 2 to 4 lowercase or uppercaase letters 
   */
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = IsValidInput(emailPattern, emailInput);
    /** password rgx means must contain minimum 2 small letter and capital letters and any numbe */
    const passPattern = /^[a-zA-Z]{2,}[A-Za-z]{2,}[0-9]+$/;
    const isValidPass = IsValidInput(passPattern, passwordInput);
    if (isValidEmail && isValidPass) {
        return true;
    } else {
        return false;
    }
};


// check if current page url is at sign up page to get sign up button
if (window.location == `${URLOrigin}docs/sign%20up.html`) {
    /** execute sign Up process */
    $(signUpBtn).click(function (e) {
        e.preventDefault();
        let name = $(userNameInput).val();
        let password = $(passwordInput).val();
        let email = $(emailInput).val();
        /** pattern means must contain small or capital letters or numbers only  */
        const userNamePattern = /^[a-zA-Z]+(\s)*[a-zA-Z0-9]*$/;
        const isValidName = IsValidInput(userNamePattern, userNameInput);
        if (isValidName && isValidEmailAndPass()) {
            // after we insured that all user entered data matches required patterns
            let user = new User(); // creater user obj from User class
            user.singUp(name, email, password);
        }
    })
}

// check if current page url is at sign up page to get sign up button
if (window.location == `${URLOrigin}`) {
    $(signInBtn).click(function (e) {
        e.preventDefault();
        let password = $(passwordInput).val();
        let email = $(emailInput).val();
        if (isValidEmailAndPass()) {
            user.signIn(email, password);
        }else{
            $('.alert-box').text("Wrong password or email").addClass("text-danger");
        }
    })
}

if (location == `${URLOrigin}docs/Home.html`) {
    $(".userName").text(user.currentUser.name);
    $("#logOutBtn").click(() => {
        user.SignOut();
    })
}



