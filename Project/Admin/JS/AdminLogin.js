function validateAdminLogin() {
    var adminId = document.getElementById("AdminID").value.trim();
    var password = document.getElementById("Password").value.trim();
    var captchaInput = document.getElementById("Captcha").value.trim();
    var remember = document.getElementById("Remember").checked;
    var resultText = document.getElementById("ResultText");

    setError("AdminIDError", "");
    setError("PasswordError", "");
    setError("CaptchaError", "");
    resultText.innerText = "";

    var isValid = true;

    if (adminId === "") {
        setError("AdminIDError", "Admin ID is required (e.g. ADM-1234).");
        isValid = false;
    }

    if (password === "") {
        setError("PasswordError", "Password is required.");
        isValid = false;
    } else if (password.length < 6) {
        setError("PasswordError", "Password must be at least 6 characters.");
        isValid = false;
    }

    if (captchaInput === "" || parseInt(captchaInput, 10) !== captchaAnswer) {
        setError("CaptchaError", "Incorrect security answer. Try again.");
        makeCaptcha();
        isValid = false;
    }

    if (!isValid) {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Please fix the errors above before logging in.";
        return false;
    }

    var admins = JSON.parse(localStorage.getItem("cms_admins") || "[]");
    var foundAdmin = null;
    for (var i = 0; i < admins.length; i++) {
        if (admins[i].adminId.toUpperCase() === adminId.toUpperCase() && admins[i].password === password) {
            foundAdmin = admins[i];
            break;
        }
    }

    if (foundAdmin) {
        localStorage.setItem("cms_logged_in_admin", JSON.stringify(foundAdmin));
        if (remember) {
            localStorage.setItem("cms_remember_id", foundAdmin.adminId);
        } else {
            localStorage.removeItem("cms_remember_id");
        }
        resultText.style.color = "#16a34a";
        resultText.innerText = "Login successful! Redirecting to Dashboard...";
        setTimeout(function () {
            window.location.href = "Dashboard.html";
        }, 800);
    } else {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Invalid Admin ID or Password! (Default: ADM-1234 / admin123)";
        makeCaptcha();
    }

    return false;
}

window.addEventListener("DOMContentLoaded", function () {
    var savedId = localStorage.getItem("cms_remember_id");
    if (savedId && document.getElementById("AdminID")) {
        document.getElementById("AdminID").value = savedId;
        document.getElementById("Remember").checked = true;
    }
});
