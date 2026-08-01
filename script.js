const API_URL = "https://yv6y31pvab.execute-api.ap-south-1.amazonaws.com/todos";

window.onload = loadTasks;

async function loadTasks() {

    try {

        const response = await fetch(API_URL);

        const data = await response.json();

        const list = document.getElementById("todoList");

        list.innerHTML = "";

        data.forEach(task => {

            list.innerHTML += `
                <li>
                    <span>${task.task}</span>

                    <button class="delete-btn"
                    onclick="deleteTask('${task.id}')">
                        Delete
                    </button>

                </li>
            `;

        });

    } catch (error) {

        console.error(error);

        alert("Unable to load tasks.");

    }

}

async function addTask() {

    const input = document.getElementById("taskInput");

    const task = input.value.trim();

    if (task === "") {

        alert("Please enter your task.");

        return;

    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                task: task

            })

        });

        if (response.ok) {

            input.value = "";

            loadTasks();

        } else {

            alert("Failed to Add Task");

        }

    } catch (error) {

        console.error(error);

        alert("Server Error");

    }

}

async function deleteTask(id){

    if(!confirm("Delete this task?")){

        return;

    }

    try{

        const response = await fetch(`${API_URL}/${id}`,{

            method:"DELETE"

        });

        if(response.ok){

            loadTasks();

        }else{

            alert("Delete Failed");

        }

    }catch(error){

        console.error(error);

        alert("Server Error");

    }

}