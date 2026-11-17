// Handles Patients, Doctors, Receptionists, Staff, Departments, Appointments, Complaints, Settings

function renderPatients() {
    var tbody = document.getElementById("PatientsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_patients") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var p = list[i];
        tbody.innerHTML += "<tr><td>" + p.id + "</td><td>" + p.name + "</td><td>" + p.age + "</td><td>" + p.gender + "</td><td>" + p.phone + "</td><td>" + p.condition + "</td>" +
            "<td><button type='button' class='small-btn btn-danger' onclick='deleteItem("cms_patients", " + i + ", renderPatients)'>Remove</button></td></tr>";
    }
}

function renderDoctors() {
    var tbody = document.getElementById("DoctorsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var d = list[i];
        var badge = d.status === "Verified" ? "badge-verified" : "badge-pending";
        var btn = d.status === "Pending" ? "<button type='button' class='small-btn btn-success' onclick='approveDoctor(" + i + ")'>Verify</button> " : "";
        tbody.innerHTML += "<tr><td>" + d.id + "</td><td>" + d.name + "</td><td>" + d.specialization + "</td><td>" + d.experience + "</td><td>" + d.phone + "</td>" +
            "<td><span class='badge " + badge + "'>" + d.status + "</span></td>" +
            "<td>" + btn + "<button type='button' class='small-btn btn-danger' onclick='deleteItem("cms_doctors", " + i + ", renderDoctors)'>Delete</button></td></tr>";
    }
}

function approveDoctor(index) {
    var list = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
    if (list[index]) {
        list[index].status = "Verified";
        localStorage.setItem("cms_doctors", JSON.stringify(list));
        renderDoctors();
    }
}

function renderReceptionists() {
    var tbody = document.getElementById("ReceptionistsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_receptionists") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var r = list[i];
        tbody.innerHTML += "<tr><td>" + r.id + "</td><td>" + r.name + "</td><td>" + r.shift + "</td><td>" + r.phone + "</td><td><span class='badge badge-verified'>" + r.status + "</span></td>" +
            "<td><button type='button' class='small-btn btn-danger' onclick='deleteItem("cms_receptionists", " + i + ", renderReceptionists)'>Remove</button></td></tr>";
    }
}

function renderAppointments() {
    var tbody = document.getElementById("AppointmentsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_appointments") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var a = list[i];
        var badge = a.status === "Completed" ? "badge-completed" : (a.status === "Cancelled" ? "badge-cancelled" : "badge-pending");
        tbody.innerHTML += "<tr><td>" + a.id + "</td><td>" + a.patient + "</td><td>" + a.doctor + "</td><td>" + a.department + "</td><td>" + a.date + "</td>" +
            "<td><span class='badge " + badge + "'>" + a.status + "</span></td>" +
            "<td><button type='button' class='small-btn btn-success' onclick='updateApptStatus(" + i + ", "Completed")'>Complete</button> " +
            "<button type='button' class='small-btn btn-danger' onclick='updateApptStatus(" + i + ", "Cancelled")'>Cancel</button></td></tr>";
    }
}

function updateApptStatus(index, newStatus) {
    var list = JSON.parse(localStorage.getItem("cms_appointments") || "[]");
    if (list[index]) {
        list[index].status = newStatus;
        localStorage.setItem("cms_appointments", JSON.stringify(list));
        renderAppointments();
    }
}

function renderComplaints() {
    var tbody = document.getElementById("ComplaintsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_complaints") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var c = list[i];
        var badge = c.status === "Resolved" ? "badge-resolved" : "badge-pending";
        tbody.innerHTML += "<tr><td>" + c.id + "</td><td>" + c.sender + "</td><td>" + c.subject + "</td><td>" + c.date + "</td>" +
            "<td><span class='badge " + badge + "'>" + c.status + "</span></td>" +
            "<td><button type='button' class='small-btn btn-success' onclick='resolveComplaint(" + i + ")'>Mark Resolved</button></td></tr>";
    }
}

function resolveComplaint(index) {
    var list = JSON.parse(localStorage.getItem("cms_complaints") || "[]");
    if (list[index]) {
        list[index].status = "Resolved";
        localStorage.setItem("cms_complaints", JSON.stringify(list));
        renderComplaints();
    }
}

function addNewStaff() {
    var role = document.getElementById("StaffRole").value;
    var staffId = document.getElementById("StaffID").value.trim();
    var name = document.getElementById("StaffName").value.trim();
    var specOrShift = document.getElementById("StaffDetail").value.trim();
    var phone = document.getElementById("StaffPhone").value.trim();
    var res = document.getElementById("ResultText");

    setError("StaffIDError", "");
    setError("StaffNameError", "");
    setError("StaffDetailError", "");
    setError("StaffPhoneError", "");

    var ok = true;
    if (staffId === "") { setError("StaffIDError", "Staff ID is required."); ok = false; }
    if (name === "") { setError("StaffNameError", "Full Name is required."); ok = false; }
    if (specOrShift === "") { setError("StaffDetailError", "Specialization or Shift is required."); ok = false; }
    if (phone === "") { setError("StaffPhoneError", "Phone number is required."); ok = false; }

    if (!ok) return false;

    if (role === "Doctor") {
        var docs = JSON.parse(localStorage.getItem("cms_doctors") || "[]");
        docs.push({ id: staffId, name: name, specialization: specOrShift, experience: "3 years", phone: phone, status: "Verified" });
        localStorage.setItem("cms_doctors", JSON.stringify(docs));
    } else {
        var recs = JSON.parse(localStorage.getItem("cms_receptionists") || "[]");
        recs.push({ id: staffId, name: name, shift: specOrShift, phone: phone, status: "Active" });
        localStorage.setItem("cms_receptionists", JSON.stringify(recs));
    }

    res.style.color = "#16a34a";
    res.innerText = role + " added successfully!";
    document.getElementById("AddStaffForm").reset();
    return false;
}

function renderDepartments() {
    var tbody = document.getElementById("DepartmentsTableBody");
    if (!tbody) return;
    var list = JSON.parse(localStorage.getItem("cms_departments") || "[]");
    tbody.innerHTML = "";
    for (var i = 0; i < list.length; i++) {
        var d = list[i];
        tbody.innerHTML += "<tr><td>" + d.id + "</td><td>" + d.name + "</td><td>" + d.head + "</td><td>" + d.rooms + "</td>" +
            "<td><button type='button' class='small-btn btn-danger' onclick='deleteItem("cms_departments", " + i + ", renderDepartments)'>Delete</button></td></tr>";
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
        res.innerText = "All department fields are required.";
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

function deleteItem(storageKey, index, callback) {
    var list = JSON.parse(localStorage.getItem(storageKey) || "[]");
    list.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(list));
    callback();
}

function saveAdminSettings() {
    var newPass = document.getElementById("NewPassword").value.trim();
    var confirmPass = document.getElementById("ConfirmPassword").value.trim();
    var res = document.getElementById("ResultText");

    if (newPass.length < 6) {
        res.style.color = "#dc2626";
        res.innerText = "New password must be at least 6 characters.";
        return false;
    }
    if (newPass !== confirmPass) {
        res.style.color = "#dc2626";
        res.innerText = "Passwords do not match.";
        return false;
    }

    var logged = JSON.parse(localStorage.getItem("cms_logged_in_admin") || "null");
    if (logged) {
        var admins = JSON.parse(localStorage.getItem("cms_admins") || "[]");
        for (var i = 0; i < admins.length; i++) {
            if (admins[i].adminId === logged.adminId) {
                admins[i].password = newPass;
                logged.password = newPass;
                break;
            }
        }
        localStorage.setItem("cms_admins", JSON.stringify(admins));
        localStorage.setItem("cms_logged_in_admin", JSON.stringify(logged));
    }

    res.style.color = "#16a34a";
    res.innerText = "Password updated successfully!";
    return false;
}
