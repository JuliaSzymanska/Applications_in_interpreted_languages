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
    $.ajax({
        url: 'https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5',
        type: 'PUT',
        headers: {
            'secret-key': '$2b$10$IV.mOVlzxoKQ8My.jMcEJO1.q8w7dn.DQ2rF85vjyyxScHLV.XuOe'
        },
        contentType: 'application/json',
        data: JSON.stringify(todoList),
        success: (data) => {
            console.log(data);
        },
        error: (err) => {
            console.log(err.responseJSON);
        }
    });
    // let req = new XMLHttpRequest();
    //
    // req.onreadystatechange = () => {
    //     if (req.readyState === XMLHttpRequest.DONE) {
    //         console.log(req.responseText);
    //     }
    // };
    //
    // req.open("PUT", "https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5", true);
    // req.setRequestHeader("Content-Type", "application/json");
    // req.setRequestHeader("secret-key", '$2b$10$IV.mOVlzxoKQ8My.jMcEJO1.q8w7dn.DQ2rF85vjyyxScHLV.XuOe');
    // req.send(todoList);
}

//TODO: dodawane elementy w tablicy są dodane prawidłowo, natomiast w tabelii pokazują się elementy w odwrotnej kolejności
let updateTodoList = function () {
    let todoListDiv =
        document.getElementById("todoListView");

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInput = document.getElementById("inputSearch");
    let newElement = document.createElement("table");
    let tHead = document.createElement("thead");
    newElement.className = "table table-striped table-bordered";
    tHead.className = "thead-dark";
    newElement.id = "todoTable";
    // newElement.className = "thead-dark";
    let row = document.createElement("tr");
    let th_title = document.createElement("th");
    let text = document.createTextNode(Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].title));
    // th.classList.add("col-sm");
    // th_title.className = "col-xs-4";
    th_title.scope="col"
    th_title.appendChild(text);
    row.appendChild(th_title);
    let th_desc = document.createElement("th");
    th_desc.className = "col-sm-2";
    text = document.createTextNode(Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].description));
    th_desc.appendChild(text);
    row.appendChild(th_desc);
    let th_del = document.createElement("th");
    th_del.className = "col-xs-4";
    text = document.createTextNode("delete");
    th_del.appendChild(text);
    row.appendChild(th_del);
    tHead.appendChild(row);
    newElement.appendChild(tHead);
    let tBody = document.createElement("tbody");
    for (let element of todoList) {
        if (
            (filterInput.value === "") ||
            (todoList[element].title.includes(filterInput.value)) ||
            (todoList[element].description.includes(filterInput.value))
        ) {
            row = document.createElement("tr");
            let td_title = document.createElement("td");
            td_title.className = "col-xs-4";
            text = document.createTextNode(element.title);
            td_title.appendChild(text);
            row.appendChild(td_title);
            let td_desc = document.createElement("td");
            text = document.createTextNode(element.description);
            td_desc.className = "col-sm-2";
            td_desc.appendChild(text);
            row.appendChild(td_desc);
            let td_del = document.createElement("td");
            td_del.className = "col-xs-4";
            let newDeleteButton = document.createElement("input");
            newDeleteButton.type = "button";
            newDeleteButton.className = "btn btn-dark";
            newDeleteButton.value = "x";
            newDeleteButton.addEventListener("click",
                function () {
                    deleteTodo(todoList.indexOf(element));
                });
            td_del.appendChild(newDeleteButton);
            row.appendChild(td_del);
            tBody.appendChild(row);
        }
    }
    newElement.appendChild(tBody);
    todoListDiv.appendChild(newElement);
}

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateTodoList();
    updateJSONbin();
    // alert(JSON.stringify(todoList));
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
}