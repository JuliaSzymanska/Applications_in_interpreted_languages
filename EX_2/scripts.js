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
}

let updateTodoList = function () {
    let todoListDiv = $('#todoListView')[0];

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInputTitle = $('#inputSearch').val();
    let filterInputFirstDate = $('#inputSearchFirstDate').val();
    let filterInputLastDate = $('#inputSearchLastDate').val();

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
        if ((filterInputTitle === "" ||
            element.title.includes(filterInputTitle) ||
            element.description.includes(filterInputTitle)) &&
            ((!filterInputFirstDate && !filterInputLastDate) ||
                (!filterInputFirstDate && element.dueDate <= filterInputLastDate) ||
                (filterInputFirstDate <= element.dueDate && !filterInputLastDate) ||
                (filterInputFirstDate <= element.dueDate && element.dueDate <= filterInputLastDate))
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