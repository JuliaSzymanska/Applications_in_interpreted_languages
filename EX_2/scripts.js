"use strict"
let todoList = [];

$.ajax({
    url: 'https://api.jsonbin.io/b/5f7e132565b18913fc5c3ad5/latest',
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

let updateJSONbin = function () {
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

let updateTodoList = function () {
    let todoListDiv = $('#todoListView')[0];

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInputTitle = $('#inputSearch')[0];
    let filterInputFirstDate = $('#inputSearchFirstDate')[0];
    let filterInputLastDate = $('#inputSearchLastDate')[0];

    let table = $('<table id="todoTable"/>').addClass("table table-striped table-bordered").appendTo(todoListDiv);
    let tHead = $('<thead></thead>').addClass("thead-dark").appendTo(table);
    let row = $('<tr></tr>').appendTo(tHead);

    let text = Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].title);
    let $thTitle = $('<th></th>').appendTo(row).text(text);
    $thTitle.scope = "col";

    text = Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].description);
    let thDescription = $('<th></th>').appendTo(row).text(text);
    thDescription.className = "col-sm-2";

    let thDelete = $('<th></th>').appendTo(row).text("delete");
    thDelete.className = "col-xs-4";

    let tBody = $('<tbody></tbody>').appendTo(table);
    for (let element of todoList) {
        //TODO: nowe elementy nie działaja na wyszukiwanie data
        if ((filterInputTitle.value === "" ||
            todoList[element].title.includes(filterInputTitle.value) ||
            todoList[element].description.includes(filterInputTitle.value)) &&
            ((!filterInputFirstDate.value && !filterInputLastDate.value) ||
                (!filterInputFirstDate.value && element.dueDate <= filterInputLastDate.value) ||
                (filterInputFirstDate.value <= element.dueDate && !filterInputLastDate.value) ||
                (filterInputFirstDate.value <= element.dueDate && element.dueDate <= filterInputLastDate.value))
        ) {
            row = $('<tr></tr>').appendTo(tBody);

            $('<td></td>').appendTo(row).addClass("col-xs-4").text(element.title);
            $('<td></td>').appendTo(row).addClass("col-sm-2").text(element.description);

            let tdDelete = $('<td></td>').appendTo(row).addClass("col-xs-4");
            let newDeleteButton = $('<input type="button" value="x"/>').appendTo(row).addClass("btn btn-dark").appendTo(tdDelete);
            newDeleteButton.click(function () {
                deleteTodo(todoList.indexOf(element));
            });
        }
    }
}

setInterval(updateTodoList, 1000);

let deleteTodo = function (index) {
    todoList.splice(index, 1);
    updateTodoList();
    updateJSONbin();
    // alert(JSON.stringify(todoList));
}

let addTodo = function () {
    let inputTitle = $('#inputTitle')[0];
    let inputDescription = $('#inputDescription')[0];
    let inputPlace = $('#inputPlace')[0];
    let inputDate = $('#inputDate')[0];

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