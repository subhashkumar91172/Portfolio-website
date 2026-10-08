let taskInput = document.getElementById("taskInput");
let addTaskBtn = document.getElementById("addTaskBtn");
let taskList = document.getElementById("taskList");

let totalTasks = document.getElementById("totalTasks");
let completedTasks = document.getElementById("completedTasks");
let remainingTasks = document.getElementById("remainingTasks");
let taskCount = document.getElementById("taskCount");
let emptyMessage = document.getElementById("emptyMessage");


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let completed = JSON.parse(localStorage.getItem("completedTasks")) || [];


function updateStats() {

    let total = tasks.length;

    let completedCount = completed.length;

    let remaining = total - completedCount;

    totalTasks.innerText = total;

    completedTasks.innerText = completedCount;

    remainingTasks.innerText = remaining;

    taskCount.innerText = total + (total === 1 ? " task" : " tasks");

    if (total === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }
}


function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function (task, index) {

        let li = document.createElement("li");


        let taskText = document.createElement("span");

        taskText.innerText = task;


        let deleteBtn = document.createElement("button");

        deleteBtn.innerText = "🗑";
        deleteBtn.title = "Delete task";


        /* COMPLETED TASK */

        if (completed.includes(index)) {

            taskText.style.textDecoration = "line-through";
            taskText.style.opacity = "0.5";
            taskText.style.color = "#64748b";

            taskText.classList.add("completed");

        } else {

            taskText.classList.remove("completed");

        }


        /* CLICK TASK */

        taskText.addEventListener("click", function () {

            if (completed.includes(index)) {

                completed = completed.filter(function (item) {
                    return item !== index;
                });

            } else {

                completed.push(index);

            }

            localStorage.setItem(
                "completedTasks",
                JSON.stringify(completed)
            );

            displayTasks();

        });


        /* DELETE */

        deleteBtn.addEventListener("click", function () {

            tasks.splice(index, 1);

            completed = completed
                .filter(function (item) {
                    return item !== index;
                })
                .map(function (item) {

                    if (item > index) {
                        return item - 1;
                    }

                    return item;

                });


            localStorage.setItem(
                "tasks",
                JSON.stringify(tasks)
            );

            localStorage.setItem(
                "completedTasks",
                JSON.stringify(completed)
            );

            displayTasks();

        });


        li.appendChild(taskText);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);

    });


    updateStats();

}


/* ADD TASK */

function addTask() {

    let task = taskInput.value.trim();


    if (task === "") {

        alert("Please enter a task!");

        return;

    }


    tasks.push(task);


    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );


    taskInput.value = "";


    displayTasks();

}


/* ADD BUTTON */

addTaskBtn.addEventListener("click", addTask);


/* ENTER KEY */

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {

        addTask();

    }

});


/* LOAD TASKS */

displayTasks();