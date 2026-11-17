var captchaAnswer = 0;

function makeCaptcha() {
    var a = Math.floor(Math.random() * 10) + 1;
    var b = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = a + b;
    var box = document.getElementById("CaptchaQuestion");
    if (box) {
        box.innerText = "What is " + a + " + " + b + "?";
    }
    var input = document.getElementById("Captcha");
    if (input) {
        input.value = "";
    }
}

function togglePassword(id, checkbox) {
    var field = document.getElementById(id);
    if (field) {
        field.type = checkbox.checked ? "text" : "password";
    }
}

function clearAllErrors() {
    var list = document.getElementsByClassName("error");
    for (var i = 0; i < list.length; i++) {
        list[i].innerText = "";
    }
    var res = document.getElementById("ResultText");
    if (res) {
        res.innerText = "";
    }
    makeCaptcha();
}

function showError(id, msg) {
    var el = document.getElementById(id);
    if (el) {
        el.innerText = msg;
    }
}

function setupDefaultData() {
    if (!localStorage.getItem("cms_admins")) {
        var admins = [
            {
                adminId: "ADM-1234",
                fullName: "System Admin",
                email: "admin@mediconnect.com",
                password: "admin123",
                department: "Administration"
            }
        ];
        localStorage.setItem("cms_admins", JSON.stringify(admins));
    }

    if (!localStorage.getItem("cms_doctors")) {
        var doctors = [
            { id: "D001", name: "Dr. Farhan Ali", specialization: "Cardiology", experience: "8 years", phone: "01711000001", status: "Pending" },
            { id: "D002", name: "Dr. Sara Khan", specialization: "Dermatology", experience: "5 years", phone: "01711000002", status: "Pending" },
            { id: "D003", name: "Dr. Imran Hossain", specialization: "Pediatrics", experience: "10 years", phone: "01711000003", status: "Verified" }
        ];
        localStorage.setItem("cms_doctors", JSON.stringify(doctors));
    }

    if (!localStorage.getItem("cms_patients")) {
        var patients = [
            { id: "P101", name: "Tanvir Ahmed", age: 32, gender: "Male", phone: "01811223344", condition: "Hypertension" },
            { id: "P102", name: "Nusrat Jahan", age: 27, gender: "Female", phone: "01911223344", condition: "Skin Allergy" },
            { id: "P103", name: "Arafat Rahman", age: 8, gender: "Male", phone: "01611223344", condition: "Seasonal Fever" }
        ];
        localStorage.setItem("cms_patients", JSON.stringify(patients));
    }

    if (!localStorage.getItem("cms_appointments")) {
        var appointments = [
            { id: "APT-01", patient: "Tanvir Ahmed", doctor: "Dr. Farhan Ali", department: "Cardiology", date: "2026-11-18", status: "Completed" },
            { id: "APT-02", patient: "Nusrat Jahan", doctor: "Dr. Sara Khan", department: "Dermatology", date: "2026-11-19", status: "Pending" },
            { id: "APT-03", patient: "Arafat Rahman", doctor: "Dr. Imran Hossain", department: "Pediatrics", date: "2026-11-20", status: "Cancelled" }
        ];
        localStorage.setItem("cms_appointments", JSON.stringify(appointments));
    }

    if (!localStorage.getItem("cms_departments")) {
        var departments = [
            { id: "DEPT-01", name: "General Medicine", head: "Dr. Kamrul Hasan", rooms: "101 - 105" },
            { id: "DEPT-02", name: "Cardiology", head: "Dr. Farhan Ali", rooms: "201 - 204" },
            { id: "DEPT-03", name: "Dermatology", head: "Dr. Sara Khan", rooms: "301 - 302" },
            { id: "DEPT-04", name: "Pediatrics", head: "Dr. Imran Hossain", rooms: "401 - 404" }
        ];
        localStorage.setItem("cms_departments", JSON.stringify(departments));
    }
}

setupDefaultData();

function validateAdminLogin() {
    var adminId = document.getElementById("AdminID").value.trim();
    var password = document.getElementById("Password").value.trim();
    var captcha = document.getElementById("Captcha").value.trim();
    var remember = document.getElementById("Remember").checked;
    var resultText = document.getElementById("ResultText");

    showError("AdminIDError", "");
    showError("PasswordError", "");
    showError("CaptchaError", "");
    resultText.innerText = "";

    var ok = true;

    if (adminId === "") {
        showError("AdminIDError", "Please enter your Admin ID.");
        ok = false;
    }

    if (password === "") {
        showError("PasswordError", "Please enter your password.");
        ok = false;
    } else if (password.length < 6) {
        showError("PasswordError", "Password must be at least 6 characters.");
        ok = false;
    }

    if (captcha === "" || parseInt(captcha, 10) !== captchaAnswer) {
        showError("CaptchaError", "Wrong answer. Please try again.");
        makeCaptcha();
        ok = false;
    }

    if (!ok) {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Please fix the errors above.";
        return false;
    }

    var admins = JSON.parse(localStorage.getItem("cms_admins") || "[]");
    var user = null;

    for (var i = 0; i < admins.length; i++) {
        if (admins[i].adminId.toUpperCase() === adminId.toUpperCase() && admins[i].password === password) {
            user = admins[i];
            break;
        }
    }

    if (user) {
        localStorage.setItem("cms_current_admin", JSON.stringify(user));
        if (remember) {
            localStorage.setItem("cms_saved_id", user.adminId);
        } else {
            localStorage.removeItem("cms_saved_id");
        }
        resultText.style.color = "#16a34a";
        resultText.innerText = "Login successful! Opening dashboard...";
        setTimeout(function () {
            window.location.href = "Dashboard.html";
        }, 700);
    } else {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Invalid Admin ID or Password.";
        makeCaptcha();
    }

    return false;
}

function validateAdminRegistration() {
    var fullName = document.getElementById("FullName").value.trim();
    var email = document.getElementById("OfficialEmail").value.trim();
    var password = document.getElementById("Password").value.trim();
    var empId = document.getElementById("EmployeeID").value.trim();
    var dept = document.getElementById("Department").value;
    var authCode = document.getElementById("AuthCode").value.trim();
    var joinDate = document.getElementById("JoiningDate").value;
    var agree = document.getElementById("AgreeTerms").checked;
    var captcha = document.getElementById("Captcha").value.trim();
    var resultText = document.getElementById("ResultText");

    var errors = ["FullNameError", "EmailError", "PasswordError", "EmployeeIDError", "DepartmentError", "AuthCodeError", "JoiningDateError", "AgreeError", "CaptchaError"];
    for (var i = 0; i < errors.length; i++) {
        showError(errors[i], "");
    }
    resultText.innerText = "";

    var ok = true;

    if (fullName === "") { showError("FullNameError", "Full name is required."); ok = false; }
    if (email === "" || email.indexOf("@") === -1) { showError("EmailError", "Enter a valid email address."); ok = false; }
    if (password.length < 6) { showError("PasswordError", "Password must be at least 6 characters."); ok = false; }
    if (empId === "") { showError("EmployeeIDError", "Admin ID is required."); ok = false; }
    if (dept === "") { showError("DepartmentError", "Please select a department."); ok = false; }
    if (authCode === "") { showError("AuthCodeError", "Authorization code is required."); ok = false; }
    if (joinDate === "") { showError("JoiningDateError", "Please select joining date."); ok = false; }
    if (!agree) { showError("AgreeError", "You must agree to the terms."); ok = false; }
    if (captcha === "" || parseInt(captcha, 10) !== captchaAnswer) {
        showError("CaptchaError", "Wrong security answer.");
        makeCaptcha();
        ok = false;
    }

    if (!ok) {
        resultText.style.color = "#dc2626";
        resultText.innerText = "Please check the fields marked in red.";
        return false;
    }

    var admins = JSON.parse(localStorage.getItem("cms_admins") || "[]");
    admins.push({
        adminId: empId.toUpperCase(),
        fullName: fullName,
        email: email,
        password: password,
        department: dept
    });
    localStorage.setItem("cms_admins", JSON.stringify(admins));

    resultText.style.color = "#16a34a";
    resultText.innerText = "Registration complete! Redirecting to login...";
    setTimeout(function () {
        window.location.href = "AdminLogin.html";
    }, 900);

    return false;
}

function logoutAdmin() {
    localStorage.removeItem("cms_current_admin");
    window.location.href = "AdminLogin.html";
}

window.addEventListener("DOMContentLoaded", function () {
    var savedId = localStorage.getItem("cms_saved_id");
    if (savedId && document.getElementById("AdminID")) {
        document.getElementById("AdminID").value = savedId;
        document.getElementById("Remember").checked = true;
    }
});
