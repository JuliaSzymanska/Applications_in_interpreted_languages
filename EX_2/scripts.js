"use strict"
let todoList = [];

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
    let todoListDiv = $('#todoListView')[0];

    while (todoListDiv.firstChild) {
        todoListDiv.removeChild(todoListDiv.firstChild);
    }

    let filterInputTitle = $('#inputSearch')[0];
    let filterInputFirstDate = $('#inputSearchFirstDate')[0];
    let filterInputLastDate = $('#inputSearchLastDate')[0];

    let newElement = $('<table id="todoTable"/>').addClass("table table-striped table-bordered").appendTo(todoListDiv);
    let tHead = $('<thead></thead>').addClass("thead-dark").appendTo(newElement);
    let row = $('<tr></tr>').appendTo(tHead);

    let text = Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].title);
    let $th_title = $('<th></th>').appendTo(row).text(text);
    $th_title.scope = "col";

    text = Object.keys(todoList[0]).find(key => todoList[0][key] === todoList[0].description);
    let th_desc = $('<th></th>').appendTo(row).text(text);
    th_desc.className = "col-sm-2";

    let th_del = $('<th></th>').appendTo(row).text("delete");
    th_del.className = "col-xs-4";

    let tBody = $('<tbody></tbody>').appendTo(newElement);
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

            let td_del = $('<td></td>').appendTo(row).addClass("col-xs-4");
            let newDeleteButton = $('<input type="button" value="x"/>').appendTo(row).addClass("btn btn-dark").appendTo(td_del);
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