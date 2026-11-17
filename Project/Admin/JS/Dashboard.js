function loadDashboard() {
    var loggedAdmin = JSON.parse(localStorage.getItem("cms_logged_in_admin") || "null");
    var welcomeEl = document.getElementById("WelcomeAdmin");
    if (welcomeEl) {
        welcomeEl.innerText = loggedAdmin ? "Welcome, " + loggedAdmin.fullName + " (" + loggedAdmin.adminId + ")" : "Welcome, Admin User";
    }

    var dateEl = document.getElementById("CurrentDate");
    if (dateEl) {
        var now = new Date();
        dateEl.innerText = now.toDateString();
    }

    var patients = JSON.parse(localStorage.getItem("cms_patients") || "[]");
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    var receptionists = JSON.parse(localStorage.getItem("cms_receptionists") || "[]");
    var appointments = JSON.parse(localStorage.getItem("cms_appointments") || "[]");

    if (document.getElementById("TotalPatients")) document.getElementById("TotalPatients").innerText = patients.length;
    if (document.getElementById("TotalDoctors")) document.getElementById("TotalDoctors").innerText = doctors.length;
    if (document.getElementById("TotalReceptionists")) document.getElementById("TotalReceptionists").innerText = receptionists.length;
    if (document.getElementById("TotalAppointments")) document.getElementById("TotalAppointments").innerText = appointments.length;

    renderDoctorRequests();
}

function renderDoctorRequests() {
    var tbody = document.getElementById("DoctorVerifyBody");
    if (!tbody) return;
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < doctors.length; i++) {
        var d = doctors[i];
        var badgeClass = d.status === "Verified" ? "badge-verified" : "badge-pending";
        var actionBtn = d.status === "Pending"
            ? '<button type="button" class="small-btn btn-success" onclick="verifyDoctor('' + d.id + '')">Verify</button>'
            : '<a href="ManageDoctors.html" class="small-btn">View</a>';
        tbody.innerHTML += "<tr>" +
            "<td>" + d.id + "</td>" +
            "<td>" + d.name + "</td>" +
            "<td>" + d.specialization + "</td>" +
            "<td>" + d.experience + "</td>" +
            "<td><span class='badge " + badgeClass + "'>" + d.status + "</span></td>" +
            "<td>" + actionBtn + "</td>" +
            "</tr>";
    }
}

function verifyDoctor(docId) {
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    for (var i = 0; i < doctors.length; i++) {
        if (doctors[i].id === docId) {
            doctors[i].status = "Verified";
            break;
        }
    }
    localStorage.setItem("cms_doctors", JSON.stringify(doctors));
    loadDashboard();
}
