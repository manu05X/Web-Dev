var add_form_div = document.getElementById("add_form_div");
add_form_div.style.display = "none";

var update_form_div = document.getElementById("update_form_div");
update_form_div.style.display = "none";

var show_form_div = document.getElementById("show_form_div");
show_form_div.style.display = "none";

var delete_form_div = document.getElementById("delete_form_div");
delete_form_div.style.display = "none";

document.getElementById("tableShow").style.display = "none";

//js action onclick of add btns 
function showAddForm() {
  add_form_div.style.display = "block";
  update_form_div.style.display = "none";
  show_form_div.style.display = "none";
  delete_form_div.style.display = "none";
  document.getElementById("tableShow").style.display = "none";
}
//js action onclick of Update btns 
function showUpdateForm() {
  update_form_div.style.display = "block";
  show_form_div.style.display = "none";
  delete_form_div.style.display = "none";
  add_form_div.style.display = "none";
  document.getElementById("tableShow").style.display = "none";
}

//js action onclick of show btns 
function showShowForm() {
  show_form_div.style.display = "block";
  update_form_div.style.display = "none";
  delete_form_div.style.display = "none";
  add_form_div.style.display = "none";
}

//js action onclick of delete btns 
function showDeleteForm() {
  delete_form_div.style.display = "block";
  show_form_div.style.display = "none";
  update_form_div.style.display = "none";
  add_form_div.style.display = "none";
  document.getElementById("tableShow").style.display = "none";
}

let db = null;

//ADD STUDENT IN DATABASE
function addStudentInDatabase() {
  const roll = document.getElementById("add_roll").value;
  const name = document.getElementById("add_name").value;
  const department = document.getElementById("add_department").value;
  const year = document.getElementById("add_year").value;
  const semester = document.getElementById("add_semester").value;

  const addStudentInfo = {
    Roll: roll,
    Name: name,
    Department: department,
    Year: year,
    Semester: semester
  };

  const tx = db.transaction("StudentTable", "readwrite");
  const studentInfo = tx.objectStore("StudentTable");
  studentInfo.add(addStudentInfo);
}

//DELETE STUDENT IN DATABASE
function deleteStudentFromDatabase() {
  const roll = document.getElementById("delete_student_info").value;

  const tx = db.transaction("StudentTable", "readwrite");
  const studentInfo = tx.objectStore("StudentTable");

  studentInfo.delete(roll);
}

//UPDATE STUDENT IN DATABASE
updateStudentFromDatabase = () => {
  const prev_roll = document.getElementById("update_prev_roll").value;
  const new_name = document.getElementById("update_name").value;
  const new_year = document.getElementById("update_year").value;
  const new_semester = document.getElementById("update_semester").value;
  const new_department = document.getElementById("update_department").value;

  const update_obj = {
    Roll: prev_roll,
    Name: new_name,
    Department: new_department,
    Year: new_year,
    Semester: new_semester
  };

  const tx = db.transaction("StudentTable", "readwrite");
  const studentInfo = tx.objectStore("StudentTable");

  var request = studentInfo.put(update_obj);

  request.onsuccess = function(e) {
    console.log("updated" + e);
  };
  request.onerror = function(e) {
    console.log("Error adding: " + e);
  };
};

//SHOW STUDENT IN DATABASE
function showStudentFromDatabase() {
  var ObjectStore = db.transaction("StudentTable").objectStore("StudentTable");
  var searchValue = document.getElementById("show_student_info").value;

  var table = document.getElementById("tableShow");

  ObjectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;

    if (cursor) {
      if (cursor.value.Roll !== searchValue) {
        cursor.continue();
      } else {
        var key = cursor.key;
        var value = cursor.value;

        var text = "<table id='showTable' class='showTable'>";
        text += "<thead>";
        text += "<tr><th style='font-size:16px'>Roll</th>";
        text += "<th style='font-size:16px'>Name</th>";
        text += "<th style='font-size:16px'>Year</th>";
        text += "<th style='font-size:16px'>Semester</th>";
        text += "<th style='font-size:16px'>Department</th>";
        text += "</tr>";
        text += "</thead>";
        text += "<tbody>";
        text += "<tr><td style='font-size:16px'>" + value.Roll + "</td>";
        text += "<td style='font-size:16px'>" + value.Name + "</td>";
        text += "<td style='font-size:16px'>" + value.Year + "</td>";
        text += "<td style='font-size:16px'>" + value.Semester + "</td>";
        text += "<td style='font-size:16px'>" + value.Department + "</td>";
        text += "</tr>";
        text += "</tbody>";
        text += "</table>";

        if (table.childNodes[0] === "undefined") {
          console.log("Undefined child");
        } else {
          console.log("Child is present");
        }

        document.getElementById("tableShow").innerHTML = text;
        document.getElementById("tableShow").style.display = "block";
      }
    } else {
      console.log("No more entries!");
      text = "<p class='noDataFound'>No match found for this roll number!</p>";
      document.getElementById("tableShow").innerHTML = text;
      document.getElementById("tableShow").style.display = "block";
    }
  };
}
//DATABASE CREATION 
function createDB() {
  window.indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  window.IDBTransaction =
    window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction;
  window.IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

  if (!window.indexedDB) {
    window.alert("Browser doesn't support a stable version of IndexDB");
  }

  const request = indexedDB.open("Student");

  //on upgrade needed
  request.onupgradeneeded = e => {
    alert("upgraded DB.");

    db = e.target.result;

    const studentTable = db.createObjectStore("StudentTable", {
      keyPath: "Roll"
    });
  };

  //on success
  request.onsuccess = e => {
    db = request.result;
    alert("Successfully created DB.");
  };

  //on error
  request.onerror = e => {
    alert("Error generated in DB.");
  };
}

const addButton = document.getElementById("add_student");
const updateButton = document.getElementById("update_student");
const showButton = document.getElementById("show_student");
const deleteButton = document.getElementById("delete_student");

function handleAddFormSubmit(event) {
  event.preventDefault();
  document.getElementById("add_form").reset();
}
function handleUpdateFormSubmit(event) {
  event.preventDefault();
  document.getElementById("update_form").reset();
}
function handleShowFormSubmit(event) {
  event.preventDefault();
  document.getElementById("show_form").reset();
}
function handleDeleteFormSubmit(event) {
  event.preventDefault();
  document.getElementById("delete_form").reset();
}

addButton.addEventListener("click", handleAddFormSubmit);
updateButton.addEventListener("click", handleUpdateFormSubmit);
showButton.addEventListener("click", handleShowFormSubmit);
deleteButton.addEventListener("click", handleDeleteFormSubmit);
