// Common utility functions and default clinic data initialization
var captchaAnswer = 0;

function makeCaptcha() {
    var num1 = Math.floor(Math.random() * 10) + 1;
    var num2 = Math.floor(Math.random() * 10) + 1;
    captchaAnswer = num1 + num2;
    var qElem = document.getElementById("CaptchaQuestion");
    if (qElem) {
        qElem.innerText = "What is " + num1 + " + " + num2 + "?";
    }
    var ansInput = document.getElementById("Captcha");
    if (ansInput) {
        ansInput.value = "";
    }
}

function togglePassword(inputId, checkbox) {
    var field = document.getElementById(inputId);
    if (field) {
        field.type = checkbox.checked ? "text" : "password";
    }
}

function clearAllErrors() {
    var errors = document.getElementsByClassName("error");
    for (var i = 0; i < errors.length; i++) {
        errors[i].innerText = "";
    }
    var res = document.getElementById("ResultText");
    if (res) {
        res.innerText = "";
    }
    makeCaptcha();
}

function setError(id, message) {
    var el = document.getElementById(id);
    if (el) {
        el.innerText = message;
    }
}

// Initialize sample data in localStorage if not already present
function initClinicData() {
    if (!localStorage.getItem("cms_admins")) {
        var defaultAdmins = [
            {
                adminId: "ADM-1234",
                fullName: "Rifat Rudro",
                email: "admin@mediconnect.com",
                password: "admin123",
                department: "Administration",
                authCode: "AUTH-999",
                joiningDate: "2025-01-01",
                securityQ: "What is your pet name?",
                securityA: "Max"
            }
        ];
        localStorage.setItem("cms_admins", JSON.stringify(defaultAdmins));
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

    if (!localStorage.getItem("cms_receptionists")) {
        var receptionists = [
            { id: "R201", name: "Sadia Islam", shift: "Morning (8 AM - 4 PM)", phone: "01511223344", status: "Active" },
            { id: "R202", name: "Mehedi Hasan", shift: "Evening (4 PM - 12 AM)", phone: "01311223344", status: "Active" }
        ];
        localStorage.setItem("cms_receptionists", JSON.stringify(receptionists));
    }

    if (!localStorage.getItem("cms_appointments")) {
        var appointments = [
            { id: "APT-01", patient: "Tanvir Ahmed", doctor: "Dr. Farhan Ali", department: "Cardiology", date: "2026-11-18", status: "Completed" },
            { id: "APT-02", patient: "Nusrat Jahan", doctor: "Dr. Sara Khan", department: "Dermatology", date: "2026-11-19", status: "Pending" },
            { id: "APT-03", patient: "Arafat Rahman", doctor: "Dr. Imran Hossain", department: "Pediatrics", date: "2026-11-20", status: "Cancelled" }
        ];
        localStorage.setItem("cms_appointments", JSON.stringify(appointments));
    }

    if (!localStorage.getItem("cms_complaints")) {
        var complaints = [
            { id: "CMP-01", sender: "Tanvir Ahmed", subject: "Long waiting time at counter", date: "2026-11-15", status: "Pending" },
            { id: "CMP-02", sender: "Nusrat Jahan", subject: "Billing receipt delay", date: "2026-11-16", status: "Resolved" }
        ];
        localStorage.setItem("cms_complaints", JSON.stringify(complaints));
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

initClinicData();

function logoutAdmin() {
    localStorage.removeItem("cms_logged_in_admin");
    window.location.href = "AdminLogin.html";
}
