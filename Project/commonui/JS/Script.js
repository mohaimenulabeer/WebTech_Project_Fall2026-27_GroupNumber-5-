
console.log("JS Connected");
// alert("JS Connected");


// ===================================
// HOMEPAGE NAVIGATION
// ===================================

function active_nav()
{
    let Links = document.querySelectorAll(".topnav a");
    let CurrentSection = window.location.hash;

    for(let i = 0; i < Links.length; i++)
    {
        let Link = Links[i];
        let Address = Link.getAttribute("href");

        if(Address == "index.html" || Address.charAt(0) == "#")
        {
            if((CurrentSection == "" && Address == "index.html") || Address == CurrentSection)
            {
                Link.classList.add("active");
            }
            else
            {
                Link.classList.remove("active");
            }
        }
    }
}

if(document.querySelector(".topnav") != null)
{
    active_nav();
    window.addEventListener("hashchange", active_nav);
}


// ===================================
// COLLECT DATA FROM LOGIN FORM
// ===================================

function collect_data()
{
    let UserID = validUserID();
    let Password = validPassword();
    let Role = validRole();

    if(UserID && Password && Role)
    {
        let SelectedRole = document.getElementById("Role").value;

        console.log("Login Form Validated");
        console.log("Selected Role: " + SelectedRole);

        if(SelectedRole == "patient")
        {
            window.location.href = "../patient/dashboard.html";
        }
        else if(SelectedRole == "doctor")
        {
            window.location.href = "../doctor/dashboard.html";
        }
        else if(SelectedRole == "receptionist")
        {
            window.location.href = "../receptionist/dashboard.html";
        }
        else if(SelectedRole == "admin")
        {
            window.location.href = "../admin/dashboard.html";
        }
    }

    return false;
}


// ===================================
// VALIDATE USER ID
// ===================================

function validUserID()
{
    let UserID = document.getElementById("UserID").value.trim();
    let Error = document.getElementById("UserIDError");

    if(UserID == "")
    {
        Error.innerHTML = "* Please enter your Email or User ID";
        return false;
    }
    else if(UserID.length < 3)
    {
        Error.innerHTML = "* User ID must contain at least 3 characters";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}


// ===================================
// VALIDATE PASSWORD
// ===================================

function validPassword()
{
    let Password = document.getElementById("Password").value;
    let Error = document.getElementById("PasswordError");

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


// ===================================
// VALIDATE USER ROLE
// ===================================

function validRole()
{
    let Role = document.getElementById("Role").value;
    let Error = document.getElementById("RoleError");

    if(Role == "")
    {
        Error.innerHTML = "* Please select your User Role";
        return false;
    }
    else
    {
        Error.innerHTML = "";
        return true;
    }
}


// ===================================
// CLEAR VALIDATION ERRORS
// ===================================

function clear_errors()
{
    document.getElementById("UserIDError").innerHTML = "";
    document.getElementById("PasswordError").innerHTML = "";
    document.getElementById("RoleError").innerHTML = "";
}
