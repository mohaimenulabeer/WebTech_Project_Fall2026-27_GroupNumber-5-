function validateAdminRegistration() {
    var fullName = document.getElementById("FullName").value.trim();
    var email = document.getElementById("OfficialEmail").value.trim();
    var password = document.getElementById("Password").value.trim();
    var empId = document.getElementById("EmployeeID").value.trim();
    var dept = document.getElementById("Department").value;
    var authCode = document.getElementById("AuthCode").value.trim();
    var joinDate = document.getElementById("JoiningDate").value;
    var secQ = document.getElementById("SecurityQuestion").value;
    var secA = document.getElementById("SecurityAnswer").value.trim();
    var agree = document.getElementById("AgreeTerms").checked;
    var captchaInput = document.getElementById("Captcha").value.trim();
    var resultText = document.getElementById("ResultText");

    var errorIds = ["FullNameError", "EmailError", "PasswordError", "EmployeeIDError", "DepartmentError", "AuthCodeError", "JoiningDateError", "SecurityError", "AgreeError", "CaptchaError"];
    for (var i = 0; i < errorIds.length; i++) {
        setError(errorIds[i], "");
    }
    resultText.innerText = "";

    var valid = true;

    if (fullName === "") { setError("FullNameError", "Full name is required."); valid = false; }
    if (email === "" || email.indexOf("@") === -1) { setError("EmailError", "Valid official email is required."); valid = false; }
    if (password.length < 6) { setError("PasswordError", "Password must be at least 6 characters."); valid = false; }
    if (empId === "") { setError("EmployeeIDError", "Employee / Admin ID is required (e.g. ADM-5678)."); valid = false; }
    if (dept === "") { setError("DepartmentError", "Please select a department."); valid = false; }
    if (authCode === "") { setError("AuthCodeError", "Authorization code is required."); valid = false; }
    if (joinDate === "") { setError("JoiningDateError", "Joining date is required."); valid = false; }
    if (secQ === "" || secA === "") { setError("SecurityError", "Select a security question and enter an answer."); valid = false; }
    if (!agree) { setError("AgreeError", "You must agree to the terms and conditions."); valid = false; }
    if (captchaInput === "" || parseInt(captchaInput, 10) !== captchaAnswer) {
        setError("CaptchaError", "Incorrect security check answer.");
        makeCaptcha();
        valid = false;
    }

    if (!valid) {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Please correct the highlighted errors.";
        return false;
    }

    var admins = JSON.parse(localStorage.getItem("cms_admins") || "[]");
    admins.push({
        adminId: empId.toUpperCase(),
        fullName: fullName,
        email: email,
        password: password,
        department: dept,
        authCode: authCode,
        joiningDate: joinDate,
        securityQ: secQ,
        securityA: secA
    });
    localStorage.setItem("cms_admins", JSON.stringify(admins));

    resultText.style.color = "#16a34a";
    resultText.innerText = "Admin Registered Successfully! Redirecting to Login...";
    setTimeout(function () {
        window.location.href = "AdminLogin.html";
    }, 1000);

    return false;
}
