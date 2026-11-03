// ---------- Sample data (replace with your backend later) ----------
const patients = [
    { n: "Anika Chowdhury", age: 34, c: "Hypertension", last: "28 Oct", next: "05 Nov", s: "Stable" },
    { n: "Rafiq Hasan", age: 58, c: "Coronary artery disease", last: "01 Nov", next: "03 Nov", s: "Follow-up" },
    { n: "Meher Sultana", age: 46, c: "Arrhythmia", last: "20 Oct", next: "10 Nov", s: "Follow-up" },
    { n: "Tanvir Ahmed", age: 29, c: "Chest pain evaluation", last: "02 Nov", next: "09 Nov", s: "Stable" },
    { n: "Nasrin Akter", age: 67, c: "Heart failure", last: "30 Oct", next: "04 Nov", s: "Critical" },
    { n: "Imran Hossain", age: 52, c: "High cholesterol", last: "15 Oct", next: "19 Nov", s: "Stable" },
    { n: "Sadia Islam", age: 41, c: "Post-bypass recovery", last: "27 Oct", next: "06 Nov", s: "Follow-up" },
    { n: "Jahid Karim", age: 63, c: "Atrial fibrillation", last: "22 Oct", next: "12 Nov", s: "Stable" }
];

const today = [
    { t: "09:00", n: "Anika Chowdhury", r: "Blood pressure check", s: "Done" },
    { t: "09:30", n: "Jahid Karim", r: "ECG review", s: "Done" },
    { t: "10:00", n: "Rafiq Hasan", r: "Follow-up after stent", s: "In room", now: true },
    { t: "10:30", n: "Meher Sultana", r: "Medication review", s: "Waiting" },
    { t: "11:00", n: "Nasrin Akter", r: "Heart failure review", s: "Waiting" },
    { t: "11:30", n: "Tanvir Ahmed", r: "Test results", s: "Upcoming" }
];

const days = [
    ["Sunday", true, ["09:00–13:00", "16:00–19:00"]],
    ["Monday", true, ["09:00–13:00"]],
    ["Tuesday", true, ["09:00–13:00", "16:00–19:00"]],
    ["Wednesday", true, ["10:00–14:00"]],
    ["Thursday", true, ["09:00–13:00"]],
    ["Friday", false, []],
    ["Saturday", false, []]
];

// ---------- Helpers ----------
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const initials = name => name.replace("Dr. ", "").split(" ").map(w => w[0]).slice(0, 2).join("");
const pillClass = { Stable: "p-ok", "Follow-up": "p-warn", Critical: "p-bad", Done: "p-mute", "In room": "p-ok", Waiting: "p-warn", Upcoming: "p-mute" };

// ---------- Dashboard ----------
$("#today").textContent =
    new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" }) + " · Room 304";
$("#cnt").textContent = patients.length;

$("#sched").innerHTML = today.map(a => `
  <li class="${a.now ? "now" : ""}">
    <time>${a.t}</time>
    <div class="who"><b>${a.n}</b><small>${a.r}</small></div>
    <span class="pill ${pillClass[a.s]}">${a.s}</span>
  </li>`).join("");

$("#recent").innerHTML = patients.slice(-3).reverse().map(p => `
  <li class="mini">
    <span class="av sm">${initials(p.n)}</span>
    <div class="who"><b>${p.n}</b><small>${p.c}</small></div>
    <span class="pill ${pillClass[p.s]}">${p.s}</span>
  </li>`).join("");

// ---------- Patients table (search + filter) ----------
function renderPatients() {
    const q = ($("#q").value || $("#gsearch").value).toLowerCase();
    const f = $("#f").value;
    const list = patients.filter(p => (!f || p.s === f) && (p.n + " " + p.c).toLowerCase().includes(q));
    $("#pbody").innerHTML = list.map(p => `
    <tr>
      <td><div class="pt"><span class="av">${initials(p.n)}</span><div><b>${p.n}</b><small>${p.age} yrs</small></div></div></td>
      <td>${p.c}</td><td>${p.last}</td><td>${p.next}</td>
      <td><span class="pill ${pillClass[p.s]}">${p.s}</span></td>
    </tr>`).join("");
    $("#none").hidden = list.length > 0;
}
renderPatients();
$("#q").addEventListener("input", renderPatients);
$("#f").addEventListener("change", renderPatients);
$("#gsearch").addEventListener("input", e => {
    $("#q").value = e.target.value;
    show("patients");
    renderPatients();
});

// ---------- Availability ----------
function renderDays() {
    $("#days").innerHTML = days.map((d, i) => `
    <div class="day ${d[1] ? "" : "off"}">
      <b>${d[0]}</b>
      <div class="slots">${d[1] ? d[2].map(s => `<span class="slot">${s}</span>`).join("") : "Not available"}</div>
      <label class="sw"><input type="checkbox" data-i="${i}" ${d[1] ? "checked" : ""} aria-label="${d[0]} available"><i></i></label>
    </div>`).join("");

    $$("#days input").forEach(box => box.addEventListener("change", () => {
        const d = days[box.dataset.i];
        d[1] = box.checked;
        if (box.checked && !d[2].length) d[2] = ["09:00–13:00"];
        renderDays();
    }));
}
renderDays();

// ---------- Navigation ----------
function show(view) {
    $$(".view").forEach(s => s.classList.toggle("on", s.id === view));
    $$("#nav button").forEach(b => b.classList.toggle("on", b.dataset.v === view));
    $("#side").classList.remove("open");
    window.scrollTo(0, 0);
}
$$("[data-v]").forEach(b => b.addEventListener("click", () => show(b.dataset.v)));
$("#menu").addEventListener("click", () => $("#side").classList.toggle("open"));

// ---------- Toast messages ----------
function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => t.classList.remove("show"), 2200);
}
$("#save").addEventListener("click", () => toast("Availability saved"));
$("#edit").addEventListener("click", () => toast("Profile editing opens here"));
$("#bell").addEventListener("click", () => toast("2 new patients assigned today"));


