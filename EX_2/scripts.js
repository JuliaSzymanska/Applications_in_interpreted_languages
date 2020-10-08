"use strict"
let todoList = [];
//
// let initList = function () {
//     let savedList = window.localStorage.getItem("todos");
//     if (savedList != null)
//         todoList = JSON.parse(savedList);
//     else
//         todoList.push(
//             {
//                 title: "Learn JS",
//                 description: "Create a demo application for my TODO's",
//                 place: "445",
//                 dueDate: new Date(2019, 10, 16)
//             },
//             {
//                 title: "Lecture test",
//                 description: "Quick test from the first three lectures",
//                 place: "F6",
//                 dueDate: new Date(2019, 10, 17)
//             }
//         );
// }

$.ajax({
    url: 'https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5',
    type: 'GET',
    headers: {
        'secret-key': '$2b$10$IV.mOVlzxoKQ8My.jMcEJO1.q8w7dn.DQ2rF85vjyyxScHLV.XuOe'
    },
    success: (data) => {
        todoList = data;
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});

// TODO: wczytywanie do JSON'a nadal nie działa
let updateJSONbin = function () {
    // $.ajax({
    //     url: 'https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5',
    //     type: 'PUT',
    //     headers: {
    //         'secret-key': '$2b$10$IV.mOVlzxoKQ8My.jMcEJO1.q8w7dn.DQ2rF85vjyyxScHLV.XuOe'
    //     },
    //     contentType: 'application/json',
    //     data: JSON.stringify(todoList),
    //     success: (data) => {
    //         console.log(data);
    //     },
    //     error: (err) => {
    //         console.log(err.responseJSON);
    //     }
    // });
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5", true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", '$2b$10$IV.mOVlzxoKQ8My.jMcEJO1.q8w7dn.DQ2rF85vjyyxScHLV.XuOe');
    req.send(todoList);
}

//TODO: dodawane elementy są w odwrotnej kolejności
let updateTodoList = function () {
    let todoListDiv =
        document.getElementById("todoListView");

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInput = document.getElementById("inputSearch");
    let newElement = document.createElement("table");
    let thead = newElement.createTHead();
    let row = thead.insertRow();
    for (let key of Object.keys(todoList[0])) {
        if (key === "title" || key === "description") {
            let th = document.createElement("th");
            let text = document.createTextNode(key);
            th.appendChild(text);
            row.appendChild(th);
        }
    }
    let th = document.createElement("th");
    let text = document.createTextNode("delete");
    th.appendChild(text);
    row.appendChild(th);

    for (let element of todoList) {
        if (
            (filterInput.value === "") ||
            (todoList[element].title.includes(filterInput.value)) ||
            (todoList[element].description.includes(filterInput.value))
        ) {
            let row = newElement.insertRow();
            for (let key in element) {
                if (key === "title" || key === "description") {
                    let cell = row.insertCell();
                    let text = document.createTextNode(element[key]);
                    cell.appendChild(text);
                }
            }
            let cell = row.insertCell();
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(element);
                });
            cell.appendChild(newDeleteButton);
        }
    }
    todoListDiv.appendChild(newElement);
}

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateTodoList();
    updateJSONbin();
}

let addTodo = function () {
    let inputTitle = document.getElementById("inputTitle");
    let inputDescription = document.getElementById("inputDescription");
    let inputPlace = document.getElementById("inputPlace");
    let inputDate = document.getElementById("inputDate");

    let newTitle = inputTitle.value;
    let newDescription = inputDescription.value;
    let newPlace = inputPlace.value;
    let newDate = new Date(inputDate.value);

    let newTodo = {
        title: newTitle,
        description: newDescription,
        place: newPlace,
        dueDate: newDate
    };

    todoList.push(newTodo);
    updateJSONbin();
    alert(JSON.stringify(todoList));
    // window.localStorage.setItem("todos", JSON.stringify(todoList));
}