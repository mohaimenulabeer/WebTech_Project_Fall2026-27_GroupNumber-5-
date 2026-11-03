console.log("Patient JS Connected");
// MediConnect Patient Portal: classroom demonstration only.
// No real login, payment, or patient records are stored here.


// ===================================
// COMMON PATIENT DATA
// ===================================

let doctors = [
    { id: "D0001", name: "Dr. S. Islam", specialty: "General Medicine", fee: 800 },
    { id: "D0002", name: "Dr. N. Rahman", specialty: "Cardiology", fee: 1200 },
    { id: "D0003", name: "Dr. M. Ahmed", specialty: "Dermatology", fee: 900 }
];

function readData(Name)
{
    let Saved = localStorage.getItem("mediconnect_" + Name);

    if(Saved != null)
    {
        try
        {
            let Data = JSON.parse(Saved);
            if(Array.isArray(Data))
            {
                return Data;
            }
        }
        catch(Error)
        {
            console.log("Invalid sample data for " + Name);
        }
    }
    return [];
}

function saveData(Name, Data)
{
    localStorage.setItem("mediconnect_" + Name, JSON.stringify(Data));
}

function today()
{
    let DateNow = new Date();
    let Month = ("0" + (DateNow.getMonth() + 1)).slice(-2);
    let Day = ("0" + DateNow.getDate()).slice(-2);
    return DateNow.getFullYear() + "-" + Month + "-" + Day;
}

function newId(Letter, Items)
{
    let Largest = 0;

    for(let i = 0; i < Items.length; i++)
    {
        let NumberPart = Number(Items[i].id.substring(1));
        if(NumberPart > Largest)
        {
            Largest = NumberPart;
        }
    }
    return Letter + ("0000" + (Largest + 1)).slice(-4);
}

function doctorInfo(ID)
{
    for(let i = 0; i < doctors.length; i++)
    {
        if(doctors[i].id == ID)
        {
            return doctors[i];
        }
    }
    return { name: "Unknown Doctor", specialty: "", fee: 0 };
}

function money(Amount)
{
    return "BDT " + Number(Amount).toLocaleString("en-US");
}

let patients = readData("patients");
let activeId = localStorage.getItem("mediconnect_active_patient_id");
let patient = null;

for(let i = 0; i < patients.length; i++)
{
    if(patients[i].id == activeId)
    {
        patient = patients[i];
        break;
    }
}

if(document.getElementById("menu-patient") != null)
{
    if(patient != null)
    {
        document.getElementById("menu-patient").textContent = patient.name + " | " + patient.id;
    }
    else
    {
        document.getElementById("menu-patient").innerHTML = "No patient registered";
    }
}

function patientItems(Name)
{
    let All = readData(Name);
    let Mine = [];

    if(patient == null)
    {
        return Mine;
    }

    for(let i = 0; i < All.length; i++)
    {
        if(All[i].patientId == patient.id)
        {
            Mine.push(All[i]);
        }
    }
    return Mine;
}


// ===================================
// PLAIN RED INNERHTML VALIDATION
// ===================================

function validName(FieldID, ErrorID)
{
    let Name = document.getElementById(FieldID).value.trim();
    let Error = document.getElementById(ErrorID);

    if(Name == "")
    {
        Error.innerHTML = "* Please enter your Full Name";
        return false;
    }
    else if(Name.length < 3)
    {
        Error.innerHTML = "* Name must contain at least 3 characters";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validDateOfBirth(FieldID, ErrorID)
{
    let BirthDate = document.getElementById(FieldID).value;
    let Error = document.getElementById(ErrorID);

    if(BirthDate == "")
    {
        Error.innerHTML = "* Please select your Date of Birth";
        return false;
    }
    else if(BirthDate > today())
    {
        Error.innerHTML = "* Date of Birth cannot be in the future";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validChoice(FieldID, ErrorID, Label)
{
    let Value = document.getElementById(FieldID).value;
    let Error = document.getElementById(ErrorID);

    if(Value == "")
    {
        Error.innerHTML = "* Please select your " + Label;
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validEmail(FieldID, ErrorID)
{
    let Email = document.getElementById(FieldID).value.trim();
    let Error = document.getElementById(ErrorID);
    let RegularExpression = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(Email == "")
    {
        Error.innerHTML = "* Please enter your Email Address";
        return false;
    }
    else if(!RegularExpression.test(Email))
    {
        Error.innerHTML = "* Please enter a valid Email Address";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validPhone(FieldID, ErrorID, Optional)
{
    let Phone = document.getElementById(FieldID).value.trim();
    let Error = document.getElementById(ErrorID);
    let RegularExpression = /^01[0-9]{9}$/;

    if(Phone == "" && Optional == true)
    {
        Error.innerHTML = "";
        return true;
    }
    else if(Phone == "")
    {
        Error.innerHTML = "* Please enter your Mobile Number";
        return false;
    }
    else if(!RegularExpression.test(Phone))
    {
        Error.innerHTML = "* Enter an 11-digit mobile number starting with 01";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validAddress(FieldID, ErrorID)
{
    let Address = document.getElementById(FieldID).value.trim();
    let Error = document.getElementById(ErrorID);

    if(Address == "")
    {
        Error.innerHTML = "* Please enter your Address";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validPassword()
{
    let Password = document.getElementById("reg-password").value;
    let Error = document.getElementById("reg-password-error");

    if(Password == "")
    {
        Error.innerHTML = "* Please enter your Password";
        return false;
    }
    else if(Password.length < 6)
    {
        Error.innerHTML = "* Password must contain at least 6 characters";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validConfirmPassword()
{
    let Password = document.getElementById("reg-password").value;
    let ConfirmPassword = document.getElementById("reg-confirm").value;
    let Error = document.getElementById("reg-confirm-error");

    if(ConfirmPassword == "")
    {
        Error.innerHTML = "* Please confirm your Password";
        return false;
    }
    else if(Password != ConfirmPassword)
    {
        Error.innerHTML = "* Passwords do not match";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validConsent(FieldID, ErrorID)
{
    let IsChecked = document.getElementById(FieldID).checked;
    let Error = document.getElementById(ErrorID);

    if(IsChecked == false)
    {
        Error.innerHTML = "* Please confirm the agreement";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validAppointmentDate()
{
    let DateValue = document.getElementById("book-date").value;
    let Error = document.getElementById("book-date-error");

    if(DateValue == "")
    {
        Error.innerHTML = "* Please select an Appointment Date";
        return false;
    }
    else if(DateValue < today())
    {
        Error.innerHTML = "* Please choose today or a future date";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function validReason()
{
    let Reason = document.getElementById("book-reason").value.trim();
    let Error = document.getElementById("book-reason-error");

    if(Reason == "")
    {
        Error.innerHTML = "* Please enter a Reason for Visit";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}

function clear_errors(IDs)
{
    for(let i = 0; i < IDs.length; i++)
    {
        document.getElementById(IDs[i]).innerHTML = "";
    }
}

function clear_registration_errors()
{
    let IDs = ["reg-name-error", "reg-dob-error", "reg-gender-error", "reg-blood-error",
        "reg-email-error", "reg-phone-error", "reg-address-error", "reg-emergency-error",
        "reg-password-error", "reg-confirm-error", "reg-consent-error", "registration-message"];
    clear_errors(IDs);
}

function clear_profile_errors()
{
    let IDs = ["profile-name-error", "profile-dob-error", "profile-gender-error", "profile-blood-error",
        "profile-email-error", "profile-phone-error", "profile-emergency-error", "profile-address-error",
        "profile-message"];
    clear_errors(IDs);
}

function clear_booking_errors()
{
    let IDs = ["book-specialty-error", "book-doctor-error", "book-date-error",
        "book-time-error", "book-reason-error", "book-confirm-error", "booking-message"];
    clear_errors(IDs);

    // Reset the doctor preview without changing the page layout.
    document.getElementById("book-doctor").innerHTML = '<option value="">Choose specialty first</option>';
    document.getElementById("doctor-name").innerHTML = "Choose a doctor";
    document.getElementById("doctor-specialty").innerHTML = "Specialty will appear here.";
    document.getElementById("doctor-fee").innerHTML = "Not selected";
}


// ===================================
// PAGE 1: PATIENT REGISTRATION
// ===================================

function collect_registration_data()
{
    let Name = validName("reg-name", "reg-name-error");
    let BirthDate = validDateOfBirth("reg-dob", "reg-dob-error");
    let Gender = validChoice("reg-gender", "reg-gender-error", "Gender");
    let BloodGroup = validChoice("reg-blood", "reg-blood-error", "Blood Group");
    let Email = validEmail("reg-email", "reg-email-error");
    let Phone = validPhone("reg-phone", "reg-phone-error", false);
    let Address = validAddress("reg-address", "reg-address-error");
    let Emergency = validPhone("reg-emergency", "reg-emergency-error", true);
    let Password = validPassword();
    let ConfirmPassword = validConfirmPassword();
    let Consent = validConsent("reg-consent", "reg-consent-error");

    if(Name && BirthDate && Gender && BloodGroup && Email && Phone && Address && Emergency && Password && ConfirmPassword && Consent)
    {
        let EmailAddress = document.getElementById("reg-email").value.trim();
        let SavedPatients = readData("patients");

        for(let i = 0; i < SavedPatients.length; i++)
        {
            if(SavedPatients[i].email.toLowerCase() == EmailAddress.toLowerCase())
            {
                document.getElementById("reg-email-error").innerHTML = "* This Email Address is already registered";
                return false;
            }
        }

        let NewPatient = {
            id: newId("P", SavedPatients),
            name: document.getElementById("reg-name").value.trim(),
            dob: document.getElementById("reg-dob").value,
            gender: document.getElementById("reg-gender").value,
            bloodGroup: document.getElementById("reg-blood").value,
            email: EmailAddress,
            phone: document.getElementById("reg-phone").value.trim(),
            address: document.getElementById("reg-address").value.trim(),
            emergency: document.getElementById("reg-emergency").value.trim()
        };

        SavedPatients.push(NewPatient);
        saveData("patients", SavedPatients);
        localStorage.setItem("mediconnect_active_patient_id", NewPatient.id);

        // Passwords are checked here, but are not stored or used for real login.
        window.location.href = "dashboard.html";
    }
    return false;
}

if(document.getElementById("registration-form") != null)
{
    document.getElementById("reg-dob").max = today();
}


// ===================================
// PAGE 2: PATIENT DASHBOARD
// ===================================

function cell(Row, Value)
{
    let TableCell = document.createElement("td");
    TableCell.textContent = Value;
    Row.appendChild(TableCell);
    return TableCell;
}

function statusCell(Row, Status)
{
    let TableCell = cell(Row, Status);
    TableCell.className = "status status-" + Status.toLowerCase();
}

function actionButton(Row, Title, Action, Danger)
{
    let TableCell = document.createElement("td");
    let Button = document.createElement("button");
    Button.type = "button";
    Button.textContent = Title;

    if(Danger == true)
    {
        Button.className = "table-button danger";
    }
    else
    {
        Button.className = "table-button";
    }
    Button.addEventListener("click", Action);
    TableCell.appendChild(Button);
    Row.appendChild(TableCell);
}

function detailLine(BoxID, Title, Value)
{
    let Paragraph = document.createElement("p");
    let Bold = document.createElement("strong");
    Bold.textContent = Title + ": ";
    Paragraph.appendChild(Bold);
    Paragraph.appendChild(document.createTextNode(Value));
    document.getElementById(BoxID).appendChild(Paragraph);
}

function displayDashboard()
{
    if(patient != null)
    {
        document.getElementById("welcome-name").textContent = patient.name;
        document.getElementById("dashboard-patient-id").textContent = patient.id;
    }
    else
    {
        document.getElementById("welcome-name").textContent = "Patient";
        document.getElementById("dashboard-patient-id").textContent = "Not assigned";
    }

    let Appointments = patientItems("appointments");
    let Prescriptions = patientItems("prescriptions");
    let Bills = patientItems("bills");
    let Upcoming = 0;
    let Completed = 0;
    let Due = 0;

    for(let i = 0; i < Appointments.length; i++)
    {
        let Appointment = Appointments[i];
        if(Appointment.status == "Completed")
        {
            Completed++;
        }
        if(Appointment.date >= today() && (Appointment.status == "Pending" || Appointment.status == "Confirmed"))
        {
            Upcoming++;
            let Row = document.createElement("tr");
            cell(Row, Appointment.id);
            cell(Row, doctorInfo(Appointment.doctorId).name);
            cell(Row, Appointment.date);
            cell(Row, Appointment.time);
            statusCell(Row, Appointment.status);
            document.getElementById("dashboard-appointments").appendChild(Row);
        }
    }

    for(let i = 0; i < Bills.length; i++)
    {
        if(Bills[i].status == "Unpaid")
        {
            Due = Due + Number(Bills[i].amount);
        }
    }

    document.getElementById("stat-upcoming").innerHTML = Upcoming;
    document.getElementById("stat-completed").innerHTML = Completed;
    document.getElementById("stat-prescriptions").innerHTML = Prescriptions.length;
    document.getElementById("stat-due").innerHTML = money(Due);
    document.getElementById("dashboard-empty").hidden = Upcoming > 0;
}

if(document.getElementById("welcome-name") != null)
{
    displayDashboard();
}


// ===================================
// PAGE 3: MY PROFILE
// ===================================

function showProfile()
{
    if(patient == null)
    {
        document.getElementById("profile-summary-name").innerHTML = "Patient";
        document.getElementById("profile-summary-id").innerHTML = "Patient ID: Not assigned";
        document.getElementById("profile-message").innerHTML = "Register first to create your profile.";
        document.getElementById("profile-message").className = "error-message";
        return;
    }

    document.getElementById("profile-id").value = patient.id;
    document.getElementById("profile-name").value = patient.name;
    document.getElementById("profile-dob").value = patient.dob;
    document.getElementById("profile-gender").value = patient.gender;
    document.getElementById("profile-blood").value = patient.bloodGroup;
    document.getElementById("profile-email").value = patient.email;
    document.getElementById("profile-phone").value = patient.phone;
    document.getElementById("profile-emergency").value = patient.emergency;
    document.getElementById("profile-address").value = patient.address;
    document.getElementById("profile-summary-name").textContent = patient.name;
    document.getElementById("profile-summary-id").textContent = "Patient ID: " + patient.id;
}

function collect_profile_data()
{
    if(patient == null)
    {
        document.getElementById("profile-message").innerHTML = "* Please register as a patient first";
        document.getElementById("profile-message").className = "error-message";
        return false;
    }

    let Name = validName("profile-name", "profile-name-error");
    let BirthDate = validDateOfBirth("profile-dob", "profile-dob-error");
    let Gender = validChoice("profile-gender", "profile-gender-error", "Gender");
    let BloodGroup = validChoice("profile-blood", "profile-blood-error", "Blood Group");
    let Email = validEmail("profile-email", "profile-email-error");
    let Phone = validPhone("profile-phone", "profile-phone-error", false);
    let Emergency = validPhone("profile-emergency", "profile-emergency-error", true);
    let Address = validAddress("profile-address", "profile-address-error");

    if(Name && BirthDate && Gender && BloodGroup && Email && Phone && Emergency && Address)
    {
        let EditedEmail = document.getElementById("profile-email").value.trim();
        let SavedPatients = readData("patients");

        for(let i = 0; i < SavedPatients.length; i++)
        {
            if(SavedPatients[i].id != patient.id && SavedPatients[i].email.toLowerCase() == EditedEmail.toLowerCase())
            {
                document.getElementById("profile-email-error").innerHTML = "* This Email Address belongs to another patient";
                return false;
            }
        }

        patient.name = document.getElementById("profile-name").value.trim();
        patient.dob = document.getElementById("profile-dob").value;
        patient.gender = document.getElementById("profile-gender").value;
        patient.bloodGroup = document.getElementById("profile-blood").value;
        patient.email = EditedEmail;
        patient.phone = document.getElementById("profile-phone").value.trim();
        patient.emergency = document.getElementById("profile-emergency").value.trim();
        patient.address = document.getElementById("profile-address").value.trim();

        for(let i = 0; i < SavedPatients.length; i++)
        {
            if(SavedPatients[i].id == patient.id)
            {
                SavedPatients[i] = patient;
            }
        }
        saveData("patients", SavedPatients);
        document.getElementById("menu-patient").textContent = patient.name + " | " + patient.id;
        document.getElementById("profile-summary-name").textContent = patient.name;
        document.getElementById("profile-message").className = "success-message";
        document.getElementById("profile-message").innerHTML = "Profile updated successfully.";
    }
    return false;
}

function reset_profile_form()
{
    clear_profile_errors();
    showProfile();
    return false;
}

if(document.getElementById("profile-form") != null)
{
    document.getElementById("profile-dob").max = today();
    showProfile();
}


// ===================================
// PAGE 4: BOOK APPOINTMENT
// ===================================

function changeSpecialty()
{
    let Specialty = document.getElementById("book-specialty").value;
    let Select = document.getElementById("book-doctor");
    Select.innerHTML = '<option value="">Choose doctor</option>';

    for(let i = 0; i < doctors.length; i++)
    {
        if(doctors[i].specialty == Specialty)
        {
            let Option = document.createElement("option");
            Option.value = doctors[i].id;
            Option.textContent = doctors[i].name;
            Select.appendChild(Option);
        }
    }
    document.getElementById("doctor-name").innerHTML = "Choose a doctor";
    document.getElementById("doctor-specialty").textContent = Specialty || "Specialty will appear here.";
    document.getElementById("doctor-fee").innerHTML = "Not selected";
    document.getElementById("book-specialty-error").innerHTML = "";
    document.getElementById("book-doctor-error").innerHTML = "";
}

function changeDoctor()
{
    let Doctor = doctorInfo(document.getElementById("book-doctor").value);
    document.getElementById("doctor-name").textContent = Doctor.name;
    document.getElementById("doctor-specialty").textContent = Doctor.specialty;
    document.getElementById("doctor-fee").textContent = money(Doctor.fee);
    document.getElementById("book-doctor-error").innerHTML = "";
}

function collect_booking_data()
{
    let Specialty = validChoice("book-specialty", "book-specialty-error", "Specialty");
    let Doctor = validChoice("book-doctor", "book-doctor-error", "Doctor");
    let Date = validAppointmentDate();
    let Time = validChoice("book-time", "book-time-error", "Preferred Time");
    let Reason = validReason();
    let Consent = validConsent("book-confirm", "book-confirm-error");

    if(patient == null)
    {
        document.getElementById("booking-message").innerHTML = "* Please register as a patient before booking";
        return false;
    }
    else
    {
        document.getElementById("booking-message").innerHTML = "";
    }

    if(Specialty && Doctor && Date && Time && Reason && Consent)
    {
        let DoctorID = document.getElementById("book-doctor").value;
        let VisitDate = document.getElementById("book-date").value;
        let VisitTime = document.getElementById("book-time").value;
        let Appointments = readData("appointments");

        for(let i = 0; i < Appointments.length; i++)
        {
            let Appointment = Appointments[i];
            if(Appointment.doctorId == DoctorID && Appointment.date == VisitDate && Appointment.time == VisitTime && Appointment.status != "Cancelled")
            {
                document.getElementById("book-time-error").innerHTML = "* This doctor already has an appointment at this time";
                return false;
            }
        }

        let NewAppointment = {
            id: newId("A", Appointments),
            patientId: patient.id,
            doctorId: DoctorID,
            date: VisitDate,
            time: VisitTime,
            type: document.getElementById("book-type").value,
            reason: document.getElementById("book-reason").value.trim(),
            symptoms: document.getElementById("book-symptoms").value.trim(),
            status: "Pending"
        };

        Appointments.push(NewAppointment);
        saveData("appointments", Appointments);
        window.location.href = "myAppointment.html";
    }
    return false;
}

if(document.getElementById("booking-form") != null)
{
    document.getElementById("book-date").min = today();
    document.getElementById("book-specialty").addEventListener("change", changeSpecialty);
    document.getElementById("book-doctor").addEventListener("change", changeDoctor);
}


// ===================================
// PAGE 5: MY APPOINTMENTS
// ===================================

function displayAppointments()
{
    let Appointments = patientItems("appointments");
    let Search = document.getElementById("appointment-search").value.toLowerCase();
    let Filter = document.getElementById("appointment-filter").value;
    let TableBody = document.getElementById("appointments-table");
    let Matches = 0;
    let Confirmed = 0;
    let Pending = 0;
    TableBody.innerHTML = "";

    for(let i = 0; i < Appointments.length; i++)
    {
        let Appointment = Appointments[i];
        if(Appointment.status == "Confirmed")
        {
            Confirmed++;
        }
        if(Appointment.status == "Pending")
        {
            Pending++;
        }
        if(Filter != "" && Appointment.status != Filter)
        {
            continue;
        }
        if(!Appointment.id.toLowerCase().includes(Search) && !doctorInfo(Appointment.doctorId).name.toLowerCase().includes(Search))
        {
            continue;
        }

        Matches++;
        let Row = document.createElement("tr");
        cell(Row, Appointment.id);
        cell(Row, doctorInfo(Appointment.doctorId).name);
        cell(Row, doctorInfo(Appointment.doctorId).specialty);
        cell(Row, Appointment.date);
        cell(Row, Appointment.time);
        statusCell(Row, Appointment.status);

        if((Appointment.status == "Pending" || Appointment.status == "Confirmed") && Appointment.date >= today())
        {
            addCancelButton(Row, Appointment.id);
        }
        else
        {
            cell(Row, "View");
        }
        TableBody.appendChild(Row);
    }
    document.getElementById("appointment-total").innerHTML = Appointments.length;
    document.getElementById("appointment-confirmed").innerHTML = Confirmed;
    document.getElementById("appointment-pending").innerHTML = Pending;
    document.getElementById("appointments-empty").hidden = Matches > 0;
}

function addCancelButton(Row, AppointmentID)
{
    actionButton(Row, "Cancel", function()
    {
        let Appointments = readData("appointments");
        for(let i = 0; i < Appointments.length; i++)
        {
            if(patient != null && Appointments[i].id == AppointmentID && Appointments[i].patientId == patient.id)
            {
                Appointments[i].status = "Cancelled";
            }
        }
        saveData("appointments", Appointments);
        displayAppointments();
        document.getElementById("appointments-message").innerHTML = "Appointment " + AppointmentID + " cancelled (demo).";
    }, true);
}

if(document.getElementById("appointments-table") != null)
{
    document.getElementById("appointment-search").addEventListener("input", displayAppointments);
    document.getElementById("appointment-filter").addEventListener("change", displayAppointments);
    displayAppointments();
}


// ===================================
// PAGE 6: MEDICAL RECORDS
// ===================================

function viewRecord(Record)
{
    document.getElementById("record-detail").innerHTML = "";
    detailLine("record-detail", "Record ID", Record.id);
    detailLine("record-detail", "Visit Date", Record.date);
    detailLine("record-detail", "Doctor", doctorInfo(Record.doctorId).name);
    detailLine("record-detail", "Diagnosis", Record.diagnosis);
    detailLine("record-detail", "Treatment", Record.treatment);
    detailLine("record-detail", "Follow-up Date", Record.followUp || "Not set");
}

function addRecordView(Row, Record)
{
    actionButton(Row, "View", function()
    {
        viewRecord(Record);
    }, false);
}

function displayRecords()
{
    let Records = patientItems("records");
    let Search = document.getElementById("record-search").value.toLowerCase();
    let TableBody = document.getElementById("records-table");
    let Matches = 0;
    TableBody.innerHTML = "";

    for(let i = 0; i < Records.length; i++)
    {
        let Record = Records[i];
        if(!Record.diagnosis.toLowerCase().includes(Search) && !doctorInfo(Record.doctorId).name.toLowerCase().includes(Search))
        {
            continue;
        }
        Matches++;
        let Row = document.createElement("tr");
        cell(Row, Record.id);
        cell(Row, Record.date);
        cell(Row, doctorInfo(Record.doctorId).name);
        cell(Row, Record.diagnosis);
        addRecordView(Row, Record);
        TableBody.appendChild(Row);
    }
    document.getElementById("records-empty").hidden = Matches > 0;
    if(Records.length == 0)
    {
        document.getElementById("record-detail").innerHTML = "No medical records for this patient yet.";
    }
}

function printPage()
{
    window.print();
}

if(document.getElementById("records-table") != null)
{
    document.getElementById("record-search").addEventListener("input", displayRecords);
    document.getElementById("record-print").addEventListener("click", printPage);
    displayRecords();
    let Records = patientItems("records");
    if(Records.length > 0)
    {
        viewRecord(Records[0]);
    }
}


// ===================================
// PAGE 7: PRESCRIPTIONS
// ===================================

function viewPrescription(Prescription)
{
    document.getElementById("prescription-detail").innerHTML = "";
    detailLine("prescription-detail", "Prescription ID", Prescription.id);
    detailLine("prescription-detail", "Doctor", doctorInfo(Prescription.doctorId).name);
    detailLine("prescription-detail", "Date", Prescription.date);
    detailLine("prescription-detail", "Diagnosis", Prescription.diagnosis);
    detailLine("prescription-detail", "Medication", Prescription.medicine);
    detailLine("prescription-detail", "Dosage", Prescription.dosage);
    detailLine("prescription-detail", "Duration", Prescription.duration);
    detailLine("prescription-detail", "Instructions", Prescription.instructions || "Sample prescription only");
}

function addPrescriptionView(Row, Prescription)
{
    actionButton(Row, "View", function()
    {
        viewPrescription(Prescription);
    }, false);
}

if(document.getElementById("prescriptions-table") != null)
{
    let Prescriptions = patientItems("prescriptions");
    for(let i = 0; i < Prescriptions.length; i++)
    {
        let Prescription = Prescriptions[i];
        let Row = document.createElement("tr");
        cell(Row, Prescription.id);
        cell(Row, Prescription.date);
        cell(Row, doctorInfo(Prescription.doctorId).name);
        cell(Row, Prescription.diagnosis);
        addPrescriptionView(Row, Prescription);
        document.getElementById("prescriptions-table").appendChild(Row);
    }
    if(Prescriptions.length > 0)
    {
        viewPrescription(Prescriptions[0]);
    }
    else
    {
        document.getElementById("prescription-detail").innerHTML = "No prescriptions for this patient yet.";
    }
    document.getElementById("prescription-print").addEventListener("click", printPage);
}


// ===================================
// PAGE 8: BILLS AND PAYMENTS
// ===================================

let selectedBillId = "";

function viewBill(Bill)
{
    selectedBillId = Bill.id;
    document.getElementById("bill-detail").innerHTML = "";
    detailLine("bill-detail", "Bill ID", Bill.id);
    if(patient != null)
    {
        detailLine("bill-detail", "Patient", patient.name);
    }
    detailLine("bill-detail", "Service", Bill.service);
    detailLine("bill-detail", "Date", Bill.date);
    detailLine("bill-detail", "Amount", money(Bill.amount));
    detailLine("bill-detail", "Payment Status", Bill.status);
    detailLine("bill-detail", "Method", Bill.method);
    document.getElementById("bill-demo-pay").hidden = Bill.status == "Paid";
}

function addBillView(Row, Bill)
{
    actionButton(Row, "View", function()
    {
        viewBill(Bill);
    }, false);
}

function displayBills()
{
    let Bills = patientItems("bills");
    let Search = document.getElementById("bill-search").value.toLowerCase();
    let Filter = document.getElementById("bill-filter").value;
    let TableBody = document.getElementById("bills-table");
    let Total = 0;
    let Paid = 0;
    let Matches = 0;
    TableBody.innerHTML = "";

    for(let i = 0; i < Bills.length; i++)
    {
        let Bill = Bills[i];
        Total = Total + Number(Bill.amount);
        if(Bill.status == "Paid")
        {
            Paid = Paid + Number(Bill.amount);
        }
        if(Filter != "" && Bill.status != Filter)
        {
            continue;
        }
        if(!Bill.id.toLowerCase().includes(Search) && !Bill.service.toLowerCase().includes(Search))
        {
            continue;
        }

        Matches++;
        let Row = document.createElement("tr");
        cell(Row, Bill.id);
        cell(Row, Bill.service);
        cell(Row, Bill.date);
        cell(Row, money(Bill.amount));
        statusCell(Row, Bill.status);
        addBillView(Row, Bill);
        TableBody.appendChild(Row);
    }
    document.getElementById("bill-total").innerHTML = money(Total);
    document.getElementById("bill-paid").innerHTML = money(Paid);
    document.getElementById("bill-unpaid").innerHTML = money(Total - Paid);
    document.getElementById("bills-empty").hidden = Matches > 0;
    if(Bills.length == 0)
    {
        document.getElementById("bill-detail").innerHTML = "No bills for this patient yet.";
        document.getElementById("bill-demo-pay").hidden = true;
    }
}

function payDemoBill()
{
    if(patient == null)
    {
        return;
    }
    let Bills = readData("bills");
    for(let i = 0; i < Bills.length; i++)
    {
        if(Bills[i].id == selectedBillId && Bills[i].patientId == patient.id)
        {
            Bills[i].status = "Paid";
            Bills[i].method = "Cash (Demo)";
            saveData("bills", Bills);
            viewBill(Bills[i]);
            displayBills();
            document.getElementById("bills-message").innerHTML = "Invoice marked paid (demo). No real payment was made.";
            break;
        }
    }
}

if(document.getElementById("bills-table") != null)
{
    document.getElementById("bill-search").addEventListener("input", displayBills);
    document.getElementById("bill-filter").addEventListener("change", displayBills);
    document.getElementById("bill-print").addEventListener("click", printPage);
    document.getElementById("bill-demo-pay").addEventListener("click", payDemoBill);
    displayBills();
    let Bills = patientItems("bills");
    if(Bills.length > 0)
    {
        viewBill(Bills[0]);
    }
}
