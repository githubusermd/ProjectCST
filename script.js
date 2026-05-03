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

window.onload = function () {
  loadStudents();
  loadTeachers();
};

// 🔥 FIXED STUDENT LOAD
function loadStudents() {
  let students = JSON.parse(localStorage.getItem("students")) || [];
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

  students.forEach((s, index) => {
    let row = table.insertRow();

    row.dataset.index = index;
    row.dataset.sem = s.sem;
    row.dataset.dept = s.dept;
    row.dataset.shift = s.shift;

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${s.name}</td>
      <td>${s.roll}</td>
      <td>${s.sem}</td>
      <td>${s.dept}</td>
      <td>${s.shift}</td>
      <td>
      <button onclick="editStudent(${index})">Edit</button>
       <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
  });
}

// 🔥 FIXED TEACHER LOAD
function loadTeachers() {
  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
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

  teachers.forEach((t, index) => {
    let row = table.insertRow();

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${t.name}</td>
      <td>${t.dept}</td>
      <td>${t.subject}</td>
      <td>
        <button onclick="editTeacher(${index})">Edit</button>
        <button onclick="deleteTeacher(${index})">Delete</button>
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
function editStudent(index) {
  const FIXED_PASS = "12345admin";

  let pass = prompt("Enter admin password:");
  if (pass !== FIXED_PASS) {
    alert("Wrong password! Access denied.");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];
  let s = students[index];

  let newName = prompt("Edit Name:", s.name);
  let newRoll = prompt("Edit Roll:", s.roll);
  let newSem = prompt("Edit Semester:", s.sem);
  let newDept = prompt("Edit Department:", s.dept);
  let newShift = prompt("Edit Shift:", s.shift);

  // If user cancels
  if (
    newName === null ||
    newRoll === null ||
    newSem === null ||
    newDept === null ||
    newShift === null
  ) {
    return;
  }

  students[index] = {
    name: newName,
    roll: newRoll,
    sem: newSem,
    dept: newDept,
    shift: newShift
  };

  localStorage.setItem("students", JSON.stringify(students));

  alert("Student updated successfully!");
  loadStudents();
}
function deleteStudent(index) {
  const FIXED_PASS = "12345admin";

  let pass = prompt("Enter admin password:");
  if (pass !== FIXED_PASS) {
    alert("Wrong password! Cannot delete.");
    return;
  }

  let students = JSON.parse(localStorage.getItem("students")) || [];

  let confirmDelete = confirm("Are you sure you want to delete this student?");
  if (!confirmDelete) return;

  students.splice(index, 1); // remove student

  localStorage.setItem("students", JSON.stringify(students));

  alert("Student deleted successfully!");
  loadStudents(); // refresh table
}
function editTeacher(index) {
  const FIXED_PASS = "12345admin";

  let pass = prompt("Enter admin password:");
  if (pass !== FIXED_PASS) {
    alert("Wrong password!");
    return;
  }

  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];
  let t = teachers[index];

  let newName = prompt("Edit Name:", t.name);
  let newDept = prompt("Edit Department:", t.dept);
  let newSubject = prompt("Edit Subject:", t.subject);

  if (newName === null || newDept === null || newSubject === null) return;

  teachers[index] = {
    name: newName,
    dept: newDept,
    subject: newSubject
  };

  localStorage.setItem("teachers", JSON.stringify(teachers));

  alert("Teacher updated!");
  loadTeachers();
}
function deleteTeacher(index) {
  const FIXED_PASS = "12345admin";

  let pass = prompt("Enter admin password:");
  if (pass !== FIXED_PASS) {
    alert("Wrong password!");
    return;
  }

  let confirmDelete = confirm("Are you sure you want to delete this teacher?");
  if (!confirmDelete) return;

  let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

  teachers.splice(index, 1);

  localStorage.setItem("teachers", JSON.stringify(teachers));

  alert("Teacher deleted!");
  loadTeachers();
}