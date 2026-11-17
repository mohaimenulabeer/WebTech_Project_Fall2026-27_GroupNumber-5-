// Doctor Login - form validation
const MAX_ATTEMPTS = 3;
let attemptsLeft = MAX_ATTEMPTS;

const bmdcInput = document.getElementById("bmdc");
const passInput = document.getElementById("password");
const chamberInput = document.getElementById("chamber");

// BMDC format: one letter, hyphen, 4-6 digits (e.g. A-12345)
const bmdcPattern = /^[A-Za-z]-\d{4,6}$/;

function setError(input, errId, message) {
  document.getElementById(errId).textContent = message;
  input.classList.toggle("invalid", message !== "");
}

function showMessage(text, type) {
  const msg = document.getElementById("formMsg");
  msg.textContent = text;
  msg.className = "message " + (type || "");
}

function validateFields() {
  let ok = true;

  const bmdc = bmdcInput.value.trim();
  if (bmdc === "") {
    setError(bmdcInput, "bmdcErr", "BMDC Reg. No is required");
    ok = false;
  } else if (!bmdcPattern.test(bmdc)) {
    setError(bmdcInput, "bmdcErr", "Format must be like A-12345");
    ok = false;
  } else {
    setError(bmdcInput, "bmdcErr", "");
  }

  const pass = passInput.value;
  if (pass === "") {
    setError(passInput, "passErr", "Password is required");
    ok = false;
  } else if (pass.length < 8) {
    setError(passInput, "passErr", "Password must be at least 8 characters");
    ok = false;
  } else {
    setError(passInput, "passErr", "");
  }

  if (chamberInput.value === "") {
    setError(chamberInput, "chamberErr", "Please select a chamber");
    ok = false;
  } else {
    setError(chamberInput, "chamberErr", "");
  }

  return ok;
}


function checkCredentials(bmdc, password) {
  let doctors = [];
  try {
    doctors = JSON.parse(localStorage.getItem("doctors")) || [];
  } catch (e) {
    doctors = [];
  }
  if (doctors.length === 0) {
    return bmdc.toUpperCase() === "A-12345" && password === "Doctor123";
  }
  return doctors.some(function (d) {
    return d.bmdc.toUpperCase() === bmdc.toUpperCase() && d.password === password;
  });
}

function validateLogin(event) {
  event.preventDefault();
  showMessage("", "");

  if (!validateFields()) return false;

  const bmdc = bmdcInput.value.trim();
  const pass = passInput.value;

  if (checkCredentials(bmdc, pass)) {
    showMessage("Login successful. Redirecting...", "ok-msg");
    
    setTimeout(function () {
      window.location.href = "DoctorPrescription.html";
    }, 1000);
  } else {
    attemptsLeft--;
    if (attemptsLeft <= 0) {
      document.getElementById("attemptInfo").textContent = "No attempts left";
      document.getElementById("loginBtn").disabled = true;
      showMessage("Too many failed attempts. Login is locked.", "error-msg");
    } else {
      document.getElementById("attemptInfo").textContent =
        "You have " + attemptsLeft + " attempt" + (attemptsLeft === 1 ? "" : "s");
      showMessage("Wrong BMDC Reg. No or password.", "error-msg");
    }
  }
  return false;
}

function togglePassword() {
  passInput.type = document.getElementById("showPass").checked ? "text" : "password";
}

function resetForm() {
  document.getElementById("loginForm").reset();
  setError(bmdcInput, "bmdcErr", "");
  setError(passInput, "passErr", "");
  setError(chamberInput, "chamberErr", "");
  passInput.type = "password";
  showMessage("", "");
}