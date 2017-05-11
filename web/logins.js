let APIBase = "" // "http://0.0.0.0:8000"

$(document).ready(function() {
    $("#login").click(login)
    $("#signup-link").click(function() {
        $("#signup-text").css("display", "none")
        $("#login-text").css("display", "inline")
        $(".username").css("display", "inline")
        $(".login-or-signup-btn").text("Sign up").attr("id", "signup")
        $("#login-banner").text("Sign up")
        $("#login").click(login)
    })
    $("#login-link").click(function() {
        $("#signup-text").css("display", "inline")
        $("#login-text").css("display", "none")
        $(".username").css("display", "none")
        $(".login-or-signup-btn").text("Log in").attr("id", "login")
        $("#login-banner").text("Sign in")
        $("#signup").click(signup)
    })
})

function login() {
    console.log("Henlo")
    $.post(APIBase + "/api/auth/login", JSON.stringify({ email: document.getElementById("email").value, password: document.getElementById("password").value }), function (result) {
        window.localStorage.setItem("token", JSON.parse(result).token)
        window.location.href = "serverview.html"
    });
}

function signup() {
    $.post(APIBase + "/api/users/add", JSON.stringify({ email: document.getElementById("email"), username: document.getElementById("username"), password: document.getElementById("password") }), function (result) {
        result = JSON.parse(result)
        if (result.code != 1 || result.message != "success") return alert(new Error("An error occurred while signing you up :( Error " + result.code + ": " + result.message))
        login()
    });
}