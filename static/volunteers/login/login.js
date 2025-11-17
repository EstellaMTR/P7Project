console.log("JavaScript is running succesfully")

// IF correct username and password is input in inputfields
// and the user clicks on the "login" button
// user will be logged in a rerouted to the volunteer chat page

const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("submit-button");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;

    if (username === "miscoolkat" && password === "missekat") {
        location.href = "/public/volunteers/chat/chat.html";
    } else {
        alert("Wrong username or password. Please try again.");
        location.reload();
    }
})



// ELSE IF no or incorrect username or password is input in the inputfields
// and the user clicks on the "login" button
// user will be prompted to enter the right credentials 