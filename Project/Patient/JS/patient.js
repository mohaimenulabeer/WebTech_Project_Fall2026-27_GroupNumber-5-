console.log("Patient JS Connected");

function today()
{
    let DateNow = new Date();
    let Month = ("0" + (DateNow.getMonth() + 1)).slice(-2);
    let Day = ("0" + DateNow.getDate()).slice(-2);
    return DateNow.getFullYear() + "-" + Month + "-" + Day;
}

function validName(FieldID, ErrorID)
{
    let Name = document.getElementById(FieldID).value.trim();
    let Error = document.getElementById(ErrorID);

    if(Name == "")
    {
        Error.innerHTML = "* Please enter your Full Name";
        return false;
    }
    else if(Name.length < 6)
    {
        Error.innerHTML = "* Name must contain at least 6 characters";
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

function clear_errors(FormID)
{
    let Errors = document.querySelectorAll("#" + FormID + " .error-message");

    for(let i = 0; i < Errors.length; i++)
    {
        Errors[i].innerHTML = "";
    }
}

function clear_registration_errors()
{
    clear_errors("registration-form");
    document.getElementById("registration-message").innerHTML = "";
}

function clear_profile_errors()
{
    clear_errors("profile-form");
    document.getElementById("profile-message").innerHTML = "";
}

function clear_booking_errors()
{
    clear_errors("booking-form");
    document.getElementById("booking-message").innerHTML = "";
    document.getElementById("booking-message").className = "error-message";
    document.getElementById("book-doctor").innerHTML = '<option value="">Choose specialty first</option>';
    document.getElementById("doctor-name").innerHTML = "Choose a doctor";
    document.getElementById("doctor-specialty").innerHTML = "Specialty will appear here.";
    document.getElementById("doctor-fee").innerHTML = "Not selected";
}

// PAGE 1: PATIENT REGISTRATION

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
        document.getElementById("registration-message").innerHTML =
            "All registration fields are valid. This is a frontend demo; no data was saved.";
    }
    else
    {
        document.getElementById("registration-message").innerHTML = "";
    }
    return false;
}

if(document.getElementById("registration-form") != null)
{
    document.getElementById("reg-dob").max = today();
}

//page 2: dashboard

function displayDashboard()
{
    document.getElementById("dashboard-empty").hidden = false;
}

if(document.getElementById("dashboard-empty") != null)
{
    displayDashboard();
}

// page 3: profile

function collect_profile_data()
{
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
        document.getElementById("profile-summary-name").textContent =
            document.getElementById("profile-name").value.trim();
        document.getElementById("profile-message").innerHTML =
            "All profile fields are valid. No changes were saved.";
    }
    else
    {
        document.getElementById("profile-message").innerHTML = "";
    }
    return false;
}

function reset_profile_form()
{
    clear_profile_errors();
    document.getElementById("profile-summary-name").innerHTML = "Patient";
    return true;
}

if(document.getElementById("profile-form") != null)
{
    document.getElementById("profile-dob").max = today();
}

// PAGE 4: BOOK APPOINTMENT

function changeSpecialty()
{
    let Specialty = document.getElementById("book-specialty").value;
    let Select = document.getElementById("book-doctor");
    Select.innerHTML = '<option value="">Choose doctor</option>';

    if(Specialty == "General Medicine")
    {
        Select.innerHTML += '<option value="Dr. S. Islam">Dr. S. Islam</option>';
    }
    else if(Specialty == "Cardiology")
    {
        Select.innerHTML += '<option value="Dr. N. Rahman">Dr. N. Rahman</option>';
    }
    else if(Specialty == "Dermatology")
    {
        Select.innerHTML += '<option value="Dr. M. Ahmed">Dr. M. Ahmed</option>';
    }

    document.getElementById("doctor-name").innerHTML = "Choose a doctor";
    document.getElementById("doctor-specialty").textContent = Specialty || "Specialty will appear here.";
    document.getElementById("doctor-fee").innerHTML = "Not selected";
    document.getElementById("book-specialty-error").innerHTML = "";
    document.getElementById("book-doctor-error").innerHTML = "";
}

function changeDoctor()
{
    let Doctor = document.getElementById("book-doctor").value;
    let Specialty = document.getElementById("book-specialty").value;
    let Fee = "Not selected";

    if(Doctor == "Dr. S. Islam")
    {
        Fee = "BDT 800";
    }
    else if(Doctor == "Dr. N. Rahman")
    {
        Fee = "BDT 1,200";
    }
    else if(Doctor == "Dr. M. Ahmed")
    {
        Fee = "BDT 900";
    }

    document.getElementById("doctor-name").textContent = Doctor || "Choose a doctor";
    document.getElementById("doctor-specialty").textContent = Specialty || "Specialty will appear here.";
    document.getElementById("doctor-fee").textContent = Fee;
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
    let Message = document.getElementById("booking-message");

    if(Specialty && Doctor && Date && Time && Reason && Consent)
    {
        Message.className = "success-message";
        Message.innerHTML = "Appointment form is valid. No appointment was booked or saved.";
    }
    else
    {
        Message.className = "error-message";
        Message.innerHTML = "";
    }
    return false;
}

if(document.getElementById("booking-form") != null)
{
    document.getElementById("book-date").min = today();
    document.getElementById("book-specialty").addEventListener("change", changeSpecialty);
    document.getElementById("book-doctor").addEventListener("change", changeDoctor);
}


function filterTable(TableID, SearchID, FilterID, StatusColumn, EmptyID)
{
    let TableBody = document.getElementById(TableID);
    let Search = document.getElementById(SearchID).value.toLowerCase();
    let Filter = "";
    let Visible = 0;

    if(FilterID != "")
    {
        Filter = document.getElementById(FilterID).value;
    }

    let Rows = TableBody.querySelectorAll("tr");
    for(let i = 0; i < Rows.length; i++)
    {
        let Text = Rows[i].textContent.toLowerCase();
        let Status = "";

        if(StatusColumn >= 0 && Rows[i].cells.length > StatusColumn)
        {
            Status = Rows[i].cells[StatusColumn].textContent.trim();
        }

        if(Text.includes(Search) && (Filter == "" || Status == Filter))
        {
            Rows[i].hidden = false;
            Visible++;
        }
        else
        {
            Rows[i].hidden = true;
        }
    }

    document.getElementById(EmptyID).hidden = Visible > 0;
}

// page 5 appointments

function displayAppointments()
{
    filterTable("appointments-table", "appointment-search", "appointment-filter", 5, "appointments-empty");
}

if(document.getElementById("appointments-table") != null)
{
    document.getElementById("appointment-search").addEventListener("input", displayAppointments);
    document.getElementById("appointment-filter").addEventListener("change", displayAppointments);
    displayAppointments();
}

// page 6: medical records

function displayRecords()
{
    filterTable("records-table", "record-search", "", -1, "records-empty");
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
}

// Page 7: prescription

if(document.getElementById("prescriptions-table") != null)
{
    document.getElementById("prescription-print").addEventListener("click", printPage);
}

// page 8 : bills and payment

function displayBills()
{
    filterTable("bills-table", "bill-search", "bill-filter", 4, "bills-empty");
}

if(document.getElementById("bills-table") != null)
{
    document.getElementById("bill-search").addEventListener("input", displayBills);
    document.getElementById("bill-filter").addEventListener("change", displayBills);
    document.getElementById("bill-print").addEventListener("click", printPage);
    displayBills();
}
