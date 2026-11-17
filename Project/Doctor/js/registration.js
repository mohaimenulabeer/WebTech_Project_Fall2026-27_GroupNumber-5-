// Doctor Registration - form validation

function $(id) { return document.getElementById(id); }

function setError(input, errId, message) {
  $(errId).textContent = message;
  if (input) input.classList.toggle("invalid", message !== "");
}

function showMessage(text, type) {
  const msg = $("formMsg");
  msg.textContent = text;
  msg.className = "message " + (type || "");
}



function checkFullName() {
  const el = $("fullName");
  const v = el.value.trim();
  if (v === "") { setError(el, "fullNameErr", "Full name is required"); return false; }
  if (!/^[A-Za-z][A-Za-z .'-]{2,}$/.test(v)) {
    setError(el, "fullNameErr", "Use letters only, at least 3 characters");
    return false;
  }
  setError(el, "fullNameErr", "");
  return true;
}

function checkEmail() {
  const el = $("email");
  const v = el.value.trim();
  if (v === "") { setError(el, "emailErr", "Email is required"); return false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) {
    setError(el, "emailErr", "Enter a valid email address");
    return false;
  }
  setError(el, "emailErr", "");
  return true;
}

function checkPhone() {
  const el = $("phone");
  const v = el.value.trim();
  if (v === "") { setError(el, "phoneErr", "Phone number is required"); return false; }
  
  if (!/^01[3-9]\d{8}$/.test(v)) {
    setError(el, "phoneErr", "Enter 11 digits starting with 013-019 (e.g. 01712345678)");
    return false;
  }
  setError(el, "phoneErr", "");
  return true;
}

function checkGender() {
  const chosen = document.querySelector('input[name="gender"]:checked');
  if (!chosen) { setError(null, "genderErr", "Please select a gender"); return false; }
  setError(null, "genderErr", "");
  return true;
}

function getAge(dobString) {
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

function checkDob() {
  const el = $("dob");
  if (el.value === "") { setError(el, "dobErr", "Date of birth is required"); return false; }
  const age = getAge(el.value);
  if (new Date(el.value) > new Date()) {
    setError(el, "dobErr", "Date of birth cannot be in the future");
    return false;
  }
  if (age < 24) {
    setError(el, "dobErr", "Doctor must be at least 24 years old");
    return false;
  }
  if (age > 80) {
    setError(el, "dobErr", "Please enter a valid date of birth");
    return false;
  }
  setError(el, "dobErr", "");
  return true;
}

function checkBmdc() {
  const el = $("bmdc");
  const v = el.value.trim();
  if (v === "") { setError(el, "bmdcErr", "BMDC Reg. No is required"); return false; }
  if (!/^[A-Za-z]-\d{4,6}$/.test(v)) {
    setError(el, "bmdcErr", "Format must be like A-12345");
    return false;
  }
  if (isBmdcRegistered(v)) {
    setError(el, "bmdcErr", "This BMDC number is already registered");
    return false;
  }
  setError(el, "bmdcErr", "");
  return true;
}

function checkSpecialization() {
  const el = $("specialization");
  if (el.value === "") {
    setError(el, "specializationErr", "Please select a specialization");
    return false;
  }
  setError(el, "specializationErr", "");
  return true;
}

function checkExperience() {
  const el = $("experience");
  const v = el.value.trim();
  if (v === "") { setError(el, "experienceErr", "Experience is required"); return false; }
  const n = Number(v);
  if (!Number.isInteger(n) || n < 0 || n > 50) {
    setError(el, "experienceErr", "Enter a whole number between 0 and 50");
    return false;
  }
  




  if ($("dob").value !== "" && n > Math.max(getAge($("dob").value) - 22, 0)) {
    setError(el, "experienceErr", "Experience is too high for your age");
    return false;
  }
  setError(el, "experienceErr", "");
  return true;
}

function checkDays() {
  const count = document.querySelectorAll('input[name="days"]:checked').length;
  if (count < 2) { setError(null, "daysErr", "Select at least 2 days"); return false; }
  setError(null, "daysErr", "");
  return true;
}

function checkUsername() {
  const el = $("username");
  const v = el.value.trim();
  if (v === "") { setError(el, "usernameErr", "Username is required"); return false; }
  if (v.length < 4 || v.length > 15) {
    setError(el, "usernameErr", "Username must be 4 - 15 characters");
    return false;
  }
  if (!/^[A-Za-z][A-Za-z0-9_]*$/.test(v)) {
    setError(el, "usernameErr", "Start with a letter; use only letters, numbers and _");
    return false;
  }
  setError(el, "usernameErr", "");
  return true;
}

function checkPassword() {
  const el = $("password");
  const v = el.value;
  if (v === "") { setError(el, "passwordErr", "Password is required"); return false; }
  if (v.length < 8 || !/[A-Z]/.test(v) || !/[a-z]/.test(v) || !/\d/.test(v)) {
    setError(el, "passwordErr", "Need 8+ characters with uppercase, lowercase and a number");
    return false;
  }
  setError(el, "passwordErr", "");
  return true;
}

function checkConfirmPassword() {
  const el = $("confirmPassword");
  if (el.value === "") {
    setError(el, "confirmPasswordErr", "Please confirm your password");
    return false;
  }
  if (el.value !== $("password").value) {
    setError(el, "confirmPasswordErr", "Passwords do not match");
    return false;
  }
  setError(el, "confirmPasswordErr", "");
  return true;
}






function getDoctors() {
  try {
    return JSON.parse(localStorage.getItem("doctors")) || [];
  } catch (e) {
    return [];
  }
}

function isBmdcRegistered(bmdc) {
  return getDoctors().some(function (d) {
    return d.bmdc.toUpperCase() === bmdc.toUpperCase();
  });
}

// ---------- Submit ----------

function validateRegistration(event) {
  event.preventDefault();
  showMessage("", "");

  
  const results = [
    checkFullName(), checkEmail(), checkPhone(), checkGender(), checkDob(),
    checkBmdc(), checkSpecialization(), checkExperience(), checkDays(),
    checkUsername(), checkPassword(), checkConfirmPassword()
  ];

  if (results.includes(false)) {
    showMessage("Please fix the errors above and try again.", "error-msg");
    return false;
  }

  const days = Array.from(document.querySelectorAll('input[name="days"]:checked'))
    .map(function (c) { return c.value; });

  const doctor = {
    fullName: $("fullName").value.trim(),
    email: $("email").value.trim(),
    phone: $("phone").value.trim(),
    gender: document.querySelector('input[name="gender"]:checked').value,
    dob: $("dob").value,
    bmdc: $("bmdc").value.trim().toUpperCase(),
    specialization: $("specialization").value,
    experience: Number($("experience").value),
    days: days,
    username: $("username").value.trim(),
    password: $("password").value   
  };

  const doctors = getDoctors();
  doctors.push(doctor);
  localStorage.setItem("doctors", JSON.stringify(doctors));

  showMessage("Registration successful! Redirecting to login...", "ok-msg");
  setTimeout(function () { window.location.href = "DoctorLogin.html"; }, 1500);
  return false;
}

function resetForm() {
  $("regForm").reset();
  document.querySelectorAll(".error").forEach(function (e) { e.textContent = ""; });
  document.querySelectorAll(".invalid").forEach(function (e) { e.classList.remove("invalid"); });
  showMessage("", "");
}



$("fullName").addEventListener("blur", checkFullName);
$("email").addEventListener("blur", checkEmail);
$("phone").addEventListener("blur", checkPhone);
$("dob").addEventListener("change", checkDob);
$("bmdc").addEventListener("blur", checkBmdc);
$("specialization").addEventListener("change", checkSpecialization);
$("experience").addEventListener("blur", checkExperience);
$("username").addEventListener("blur", checkUsername);
$("password").addEventListener("blur", checkPassword);
$("confirmPassword").addEventListener("blur", checkConfirmPassword);
document.querySelectorAll('input[name="gender"]').forEach(function (r) {
  r.addEventListener("change", checkGender);
});
document.querySelectorAll('input[name="days"]').forEach(function (c) {
  c.addEventListener("change", checkDays);
});