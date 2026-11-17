function generateClinicReport() {
    var fromDate = document.getElementById("FromDate").value;
    var toDate = document.getElementById("ToDate").value;
    var appointments = JSON.parse(localStorage.getItem("cms_appointments") || "[]");

    var total = appointments.length;
    var completed = 0;
    var cancelled = 0;
    var pending = 0;

    for (var i = 0; i < appointments.length; i++) {
        if (appointments[i].status === "Completed") completed++;
        else if (appointments[i].status === "Cancelled") cancelled++;
        else pending++;
    }

    document.getElementById("RepTotal").innerText = total;
    document.getElementById("RepCompleted").innerText = completed;
    document.getElementById("RepCancelled").innerText = cancelled;
    document.getElementById("RepPending").innerText = pending;

    var res = document.getElementById("ResultText");
    if (res) {
        res.style.color = "#16a34a";
        res.innerText = "Report generated for period: " + (fromDate || "All Time") + " to " + (toDate || "Present");
    }
}
