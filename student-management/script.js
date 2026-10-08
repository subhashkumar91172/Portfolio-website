let studentName = document.getElementById("studentName");
let rollNumber = document.getElementById("rollNumber");
let course = document.getElementById("course");
let email = document.getElementById("email");

let addStudentBtn = document.getElementById("addStudentBtn");
let studentList = document.getElementById("studentList");
let totalStudents = document.getElementById("totalStudents");
let cseStudents = document.getElementById("cseStudents");
let otherStudents = document.getElementById("otherStudents");


addStudentBtn.addEventListener("click", function() {

    let name = studentName.value.trim();
    let roll = rollNumber.value.trim();
    let courseName = course.value.trim();
    let emailAddress = email.value.trim();


    if (
        name === "" ||
        roll === "" ||
        courseName === "" ||
        emailAddress === ""
    ) {
        alert("Please fill all the fields!");
        return;
    }


    let row = document.createElement("tr");


    row.innerHTML = `
        <td>${name}</td>
        <td>${roll}</td>
        <td>${courseName}</td>
        <td>${emailAddress}</td>
      
        <td>
    <button class="btn btn-sm btn-warning edit-btn">
        Edit
    </button>

    <button class="btn btn-sm btn-danger delete-btn">
        Delete
    </button>
</td>

    `;


    studentList.appendChild(row);
    updateStats();


    studentName.value = "";
    rollNumber.value = "";
    course.value = "";
    email.value = "";

    row.querySelector(".edit-btn").addEventListener("click", function() {

    studentName.value = row.children[0].innerText;
    rollNumber.value = row.children[1].innerText;
    course.value = row.children[2].innerText;
    email.value = row.children[3].innerText;

    row.remove();

    updateStats();

});


  
    row.querySelector(".delete-btn").addEventListener("click", function() {

    row.remove();

    updateStats();

});

});

function updateStats() {

    let rows = studentList.querySelectorAll("tr");

    let total = rows.length;

    let cse = 0;

    rows.forEach(function(row) {

        let courseName = row.children[2].innerText.toLowerCase();

        if (courseName.includes("cse")) {
            cse++;
        }

    });

    totalStudents.innerText = total;

    cseStudents.innerText = cse;

    otherStudents.innerText = total - cse;
}