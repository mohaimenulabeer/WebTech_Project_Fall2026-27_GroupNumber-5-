function loadDashboard() {
    var admin = JSON.parse(localStorage.getItem("cms_current_admin") || "null");
    var welcome = document.getElementById("WelcomeAdmin");
    if (welcome) {
        welcome.innerText = admin ? "Welcome, " + admin.fullName : "Welcome, Admin";
    }

    var dateBox = document.getElementById("CurrentDate");
    if (dateBox) {
        dateBox.innerText = new Date().toDateString();
    }

    var patients = JSON.parse(localStorage.getItem("cms_patients") || "[]");
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    var appointments = JSON.parse(localStorage.getItem("cms_appointments") || "[]");
    var departments = JSON.parse(localStorage.getItem("cms_departments") || "[]");

    if (document.getElementById("TotalPatients")) document.getElementById("TotalPatients").innerText = patients.length;
    if (document.getElementById("TotalDoctors")) document.getElementById("TotalDoctors").innerText = doctors.length;
    if (document.getElementById("TotalAppointments")) document.getElementById("TotalAppointments").innerText = appointments.length;
    if (document.getElementById("TotalDepartments")) document.getElementById("TotalDepartments").innerText = departments.length;

    renderDoctorsList();
    renderAppointmentsList();
}

function renderDoctorsList() {
    var tbody = document.getElementById("DoctorVerifyBody");
    if (!tbody) return;
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    tbody.innerHTML = "";

    for (var i = 0; i < doctors.length; i++) {
        var d = doctors[i];
        var badge = d.status === "Verified" ? "badge-verified" : "badge-pending";
        var action = d.status === "Pending"
            ? "<button type='button' class='small-btn btn-green' onclick='verifyDoctor(" + i + ")'>Verify</button>"
            : "Verified";

        tbody.innerHTML += "<tr>" +
            "<td>" + d.id + "</td>" +
            "<td>" + d.name + "</td>" +
            "<td>" + d.specialization + "</td>" +
            "<td>" + d.experience + "</td>" +
            "<td><span class='badge " + badge + "'>" + d.status + "</span></td>" +
            "<td>" + action + "</td>" +
            "</tr>";
    }
}

function verifyDoctor(index) {
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    if (doctors[index]) {
        doctors[index].status = "Verified";
        localStorage.setItem("cms_doctors", JSON.stringify(doctors));
        loadDashboard();
    }
}

function renderAppointmentsList() {
    var tbody = document.getElementById("AppointmentsBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_appointments") || "[]");
    tbody.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var a = list[i];
        var badge = a.status === "Completed" ? "badge-completed" : (a.status === "Cancelled" ? "badge-cancelled" : "badge-pending");
        tbody.innerHTML += "<tr>" +
            "<td>" + a.id + "</td>" +
            "<td>" + a.patient + "</td>" +
            "<td>" + a.doctor + "</td>" +
            "<td>" + a.department + "</td>" +
            "<td>" + a.date + "</td>" +
            "<td><span class='badge " + badge + "'>" + a.status + "</span></td>" +
            "<td>" +
            "<button type='button' class='small-btn btn-green' onclick='changeAppointment(" + i + ", "Completed")'>Complete</button> " +
            "<button type='button' class='small-btn btn-red' onclick='changeAppointment(" + i + ", "Cancelled")'>Cancel</button>" +
            "</td>" +
            "</tr>";
    }
}

function changeAppointment(index, status) {
    var list = JSON.parse(localStorage.getItem("cms_appointments") || "[]");
    if (list[index]) {
        list[index].status = status;
        localStorage.setItem("cms_appointments", JSON.stringify(list));
        renderAppointmentsList();
    }
}

function addNewStaff() {
    var staffId = document.getElementById("StaffID").value.trim();
    var name = document.getElementById("StaffName").value.trim();
    var spec = document.getElementById("StaffDetail").value.trim();
    var exp = document.getElementById("StaffExperience").value.trim();
    var phone = document.getElementById("StaffPhone").value.trim();
    var res = document.getElementById("ResultText");

    showError("StaffIDError", "");
    showError("StaffNameError", "");
    showError("StaffDetailError", "");
    showError("StaffPhoneError", "");

    var ok = true;
    if (staffId === "") { showError("StaffIDError", "Doctor ID is required."); ok = false; }
    if (name === "") { showError("StaffNameError", "Full name is required."); ok = false; }
    if (spec === "") { showError("StaffDetailError", "Specialization is required."); ok = false; }
    if (phone === "") { showError("StaffPhoneError", "Phone number is required."); ok = false; }

    if (!ok) return false;

    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    doctors.push({
        id: staffId,
        name: name,
        specialization: spec,
        experience: exp || "2 years",
        phone: phone,
        status: "Verified"
    });
    localStorage.setItem("cms_doctors", JSON.stringify(doctors));

    res.style.color = "#16a34a";
    res.innerText = "Doctor added successfully!";
    document.getElementById("AddStaffForm").reset();
    renderStaffTable();
    return false;
}

function renderStaffTable() {
    var tbody = document.getElementById("StaffTableBody");
    if (!tbody) return;
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    tbody.innerHTML = "";

    for (var i = 0; i < doctors.length; i++) {
        var d = doctors[i];
        tbody.innerHTML += "<tr>" +
            "<td>" + d.id + "</td>" +
            "<td>" + d.name + "</td>" +
            "<td>" + d.specialization + "</td>" +
            "<td>" + d.experience + "</td>" +
            "<td>" + d.phone + "</td>" +
            "<td><button type='button' class='small-btn btn-red' onclick='removeStaff(" + i + ")'>Remove</button></td>" +
            "</tr>";
    }
}

function removeStaff(index) {
    var doctors = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    doctors.splice(index, 1);
    localStorage.setItem("cms_doctors", JSON.stringify(doctors));
    renderStaffTable();
}

function renderDepartments() {
    var tbody = document.getElementById("DepartmentsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_departments") || "[]");
    tbody.innerHTML = "";

    for (var i = 0; i < list.length; i++) {
        var d = list[i];
        tbody.innerHTML += "<tr>" +
            "<td>" + d.id + "</td>" +
            "<td>" + d.name + "</td>" +
            "<td>" + d.head + "</td>" +
            "<td>" + d.rooms + "</td>" +
            "<td><button type='button' class='small-btn btn-red' onclick='removeDepartment(" + i + ")'>Delete</button></td>" +
            "</tr>";
    }
}

function addDepartment() {
    var id = document.getElementById("DeptID").value.trim();
    var name = document.getElementById("DeptName").value.trim();
    var head = document.getElementById("DeptHead").value.trim();
    var rooms = document.getElementById("DeptRooms").value.trim();
    var res = document.getElementById("ResultText");

    if (id === "" || name === "" || head === "" || rooms === "") {
        res.style.color = "#dc2626";
        res.innerText = "Please fill in all fields.";
        return false;
    }

    var list = JSON.parse(localStorage.getItem("cms_departments") || "[]");
    list.push({ id: id, name: name, head: head, rooms: rooms });
    localStorage.setItem("cms_departments", JSON.stringify(list));

    res.style.color = "#16a34a";
    res.innerText = "Department added successfully!";
    document.getElementById("DeptForm").reset();
    renderDepartments();
    return false;
}

function removeDepartment(index) {
    var list = JSON.parse(localStorage.getItem("cms_departments") || "[]");
    list.splice(index, 1);
    localStorage.setItem("cms_departments", JSON.stringify(list));
    renderDepartments();
}

function generateClinicReport() {
    var fromDate = document.getElementById("FromDate").value;
    var toDate = document.getElementById("ToDate").value;
    var appointments = JSON.parse(localStorage.getItem("cms_appointments") || "[]");

    var completed = 0;
    var cancelled = 0;
    var pending = 0;

    for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].status === "Completed") completed++;
        else if (appointments[i].status === "Cancelled") cancelled++;
        else pending++;
    }

    document.getElementById("RepTotal").innerText = appointments.length;
    document.getElementById("RepCompleted").innerText = completed;
    document.getElementById("RepCancelled").innerText = cancelled;
    document.getElementById("RepPending").innerText = pending;

    var res = document.getElementById("ResultText");
    if (res) {
        res.style.color = "#16a34a";
        res.innerText = "Showing report from " + fromDate + " to " + toDate;
    }
}
