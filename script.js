function showSection(section) {
  document.getElementById('home').classList.add('hidden');
  document.getElementById('teachers').classList.add('hidden');
  document.getElementById('students').classList.add('hidden');
  document.getElementById(section).classList.remove('hidden');
}

function filterStudents() {
  let sem = document.getElementById('semesterFilter').value;
  let dept = document.getElementById('deptFilter').value;
  let shift = document.getElementById('shiftFilter').value;

  let rows = document.querySelectorAll('#studentTable tr[data-sem]');

  rows.forEach(row => {
    let match = true;

    if (sem !== 'all' && row.dataset.sem !== sem) match = false;
    if (dept !== 'all' && row.dataset.dept !== dept) match = false;
    if (shift !== 'all' && row.dataset.shift !== shift) match = false;

    row.style.display = match ? '' : 'none';
  });
}

// 🔥 FIXED STUDENT LOAD
async function loadStudents() {
  const { collection, getDocs } = firebaseFns;

  let table = document.getElementById("studentTable");

  table.innerHTML = `
    <tr>
      <th>SL</th>
      <th>Name</th>
      <th>Roll</th>
      <th>Semester</th>
      <th>Department</th>
      <th>Shift</th>
      <th>Action</th>
    </tr>
  `;

  const querySnapshot = await getDocs(collection(db, "students"));

  let i = 1;

  querySnapshot.forEach((docSnap) => {
    let s = docSnap.data();
    let id = docSnap.id;

    let row = table.insertRow();

    row.innerHTML = `
      <td>${i++}</td>
      <td>${s.name}</td>
      <td>${s.roll}</td>
      <td>${s.sem}</td>
      <td>${s.dept}</td>
      <td>${s.shift}</td>
      <td>
        <button onclick="editStudent('${id}')">Edit</button>
        <button onclick="deleteStudent('${id}')">Delete</button>
      </td>
    `;
  });
}


// 🔥 FIXED TEACHER LOAD
async function loadTeachers() {
  const { collection, getDocs } = firebaseFns;

  let table = document.getElementById("teacherTable");

  table.innerHTML = `
    <tr>
      <th>SL</th>
      <th>Name</th>
      <th>Department</th>
      <th>Subject</th>
      <th>Action</th>
    </tr>
  `;

  const querySnapshot = await getDocs(collection(db, "teachers"));

  let i = 1;

  querySnapshot.forEach((docSnap) => {
    let t = docSnap.data();
    let id = docSnap.id;

    let row = table.insertRow();

    row.innerHTML = `
      <td>${i++}</td>
      <td>${t.name}</td>
      <td>${t.dept}</td>
      <td>${t.subject}</td>
      <td>
        <button onclick="editTeacher('${id}')">Edit</button>
        <button onclick="deleteTeacher('${id}')">Delete</button>
      </td>
    `;
  });
}

function searchStudents() {
  let input = document.getElementById("searchInput").value.toLowerCase();
  let rows = document.querySelectorAll("#studentTable tr[data-sem]");

  rows.forEach(row => {
    let name = row.cells[1].textContent.toLowerCase();
    let roll = row.cells[2].textContent.toLowerCase();

    if (name.includes(input) || roll.includes(input)) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}
async function editStudent(id) {
  const { doc, updateDoc } = firebaseFns;

  let pass = prompt("Enter admin password:");
  if (pass !== "12345admin") return alert("Wrong password!");

  let newName = prompt("New Name:");
  let newRoll = prompt("New Roll:");
  let newSem = prompt("New Semester:");
  let newDept = prompt("New Department:");
  let newShift = prompt("New Shift:");

  if (!newName) return;

  await updateDoc(doc(db, "students", id), {
    name: newName,
    roll: newRoll,
    sem: newSem,
    dept: newDept,
    shift: newShift
  });

  alert("Updated!");
  loadStudents();
}
async function deleteStudent(id) {
  const { deleteDoc, doc } = firebaseFns;

  let pass = prompt("Enter admin password:");
  if (pass !== "12345admin") return alert("Wrong password!");

  if (!confirm("Delete this student?")) return;

  await deleteDoc(doc(db, "students", id));

  alert("Deleted!");
  loadStudents();
}
async function editTeacher(id) {
  const { doc, updateDoc } = firebaseFns;

  let pass = prompt("Enter admin password:");
  if (pass !== "12345admin") {
    alert("Wrong password!");
    return;
  }

  let newName = prompt("New Name:");
  let newDept = prompt("New Department:");
  let newSubject = prompt("New Subject:");

  if (!newName || !newDept || !newSubject) return;

  await updateDoc(doc(db, "teachers", id), {
    name: newName,
    dept: newDept,
    subject: newSubject
  });

  alert("Teacher updated!");
  loadTeachers();
}
async function deleteTeacher(id) {
  const { deleteDoc, doc } = firebaseFns;

  let pass = prompt("Enter admin password:");
  if (pass !== "12345admin") {
    alert("Wrong password!");
    return;
  }

  let confirmDelete = confirm("Delete this teacher?");
  if (!confirmDelete) return;

  await deleteDoc(doc(db, "teachers", id));

  alert("Teacher deleted!");
  loadTeachers();
}
window.onload = function () {
  loadStudents();
  loadTeachers();
};