"use strict"
class todo_item {
    title: string;
    description: string;
    place: string;
    dueDate: Date;

    constructor(title: string, description: string, place: string, dueDate: Date) {
        this.title = title;
        this.description = description;
        this.place = place;
        this.dueDate = dueDate;
    }
}

let todoList = []

$.ajax({
    // copy Your bin identifier here. It can be obtained in the dashboard
    url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c/latest',
    type: 'GET',
    headers: { //Required only if you are trying to access a private bin
        'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e"
    },
    success: (data) => {
        console.log(data)
        todoList = data;
    },
    error: (err) => {
        console.log(err.responseJSON);
    }
});

let updateJSONbin = function () {
    $.ajax({
        url: 'https://api.jsonbin.io/b/5f7f5a7365b18913fc5ccf2c',
        type: 'PUT',
        headers: { //Required only if you are trying to access a private bin
            'secret-key': "$2b$10$NTKfR.Ut9Z8el6x6WakuV.yUvORzT5RI.w3yTnSLcHInw6elnEB3e",
            'versioning': "false"
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

    let deleteTodo = function (index) {
        todoList.splice(index, 1);
        updateTodoList();
        updateJSONbin();
    }

    let todoListView = $("#todoListView")[0];

    //remove all elements
    while (todoListView.firstChild) {
        todoListView.removeChild(todoListView.firstChild);
    }

    let filterInputDesc = <HTMLInputElement>$("#inputSearch")[0];
    let filterInputDate1 = <HTMLInputElement>$("#inputSearchDate1")[0];
    let filterInputDate2 = <HTMLInputElement>$("#inputSearchDate2")[0];

    let dateStart = new Date(filterInputDate1.value);
    let dateEnd = new Date(filterInputDate2.value);

    // add all elementsD
    let containing_table = $('<table>').addClass("table");
    {
        let thead = $('<thead></thead>').addClass("thead-dark").appendTo(containing_table);
        let tr = $('<tr></tr>').appendTo(thead);
        for (let item in todoList[0]) {
            $('<th></th>').appendTo(tr).text(item);
        }
        $('<th></th>').appendTo(tr).text("remove");
    }

    for (let todo in todoList) {
        if (((filterInputDesc.value == "") ||
            (todoList[todo].title.includes(filterInputDesc.value)) ||
            (todoList[todo].description.includes(filterInputDesc.value))) && ((filterInputDate1.value == "") && (filterInputDate2.value == "")
            || ((dateStart <= new Date(todoList[todo].dueDate)) && (filterInputDate2.value == ""))
            || ((dateEnd >= new Date(todoList[todo].dueDate)) && (filterInputDate1.value == ""))
            || ((dateEnd >= new Date(todoList[todo].dueDate)) && (dateStart <= new Date(todoList[todo].dueDate))))) {

            let tr = $('<tr></tr>').appendTo(containing_table);

            let newDeleteButton = $('<input></input>').attr({
                type: 'button',
                value: 'x',
            })

            let onClickFun = function () { deleteTodo(todo); }
            newDeleteButton.click(onClickFun);


            for (let item in todoList[todo]) {
                if (item == "dueDate") {
                    let date: Date = new Date(todoList[todo][item]);
                    $('<td></td>').appendTo(tr).text(date.toDateString());
                }
                else {
                    $('<td></td>').appendTo(tr).text(todoList[todo][item]);
                }
            }

            $('<td></td>').appendTo(tr).append(newDeleteButton);
        }

    }
    if (todoList.length != 0)
        containing_table.appendTo(todoListView);
}

let addTodo = function () {
    let inputTitle = (<HTMLInputElement>$("#inputTitle")[0]).value;
    let inputDescription = (<HTMLInputElement>$("#inputDescription")[0]).value;
    let inputPlace = (<HTMLInputElement>$("#inputPlace")[0]).value;
    let inputDate = (<HTMLInputElement>$("#inputDate")[0]).value;
    let newTodo: todo_item = new todo_item(inputTitle, inputDescription, inputPlace, new Date(inputDate));
    todoList.push(newTodo);
    updateTodoList();
    updateJSONbin();
}

setInterval(updateTodoList, 1000);
