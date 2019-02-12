var cType = 'application/json';

function GetUsers() {
    $.ajax({
        url: "/api/users",
        type: "GET",
        contentType: cType,
        success: function (users) {
            var rows = '';
            $.each(users, function (insex, user) {
                rows += row(user);
            });
            $("table tbody").append(rows);
        }
    })
}
function GetUser(id) {
    $.ajax({
        url: "/api/users/"+id,
        type: "GET",
        contentType: cType,
        success: function (user) {
            var form = document.forms["userForm"];
            form.elements["id"].value = user._id;
            form.elements["name"].value = user.name;
            form.elements["age"].value = user.age;
        }
    })
}
function CreateUser(userName, userAge) {
    $.ajax({
        url: "api/users",
        contentType: cType,
        type: "POST",
        data: JSON.stringify({
            name: userName,
            age: userAge
        }),
        success: function (user) {
            reset();
            $("table tbody").append(row(user));
        }
    })
}
function EditUser(userId, userName, userAge){
    $.ajax({
        url: "api/users",
        contentType: cType,
        type: "PUT",
        data: JSON.stringify({
            id: userId,
            name: userName,
            age: userAge
        }),
        success: function (user) {

            console.log(user);
            $("tr[data-rowid='" + user._id + "']").replaceWith(row(user));
            reset();
        }
    })
}
function reset() {
    var form = document.forms["userForm"];
    form.reset();
    form.elements["id"].value = 0;
}

function DeleteUser(id) {
    $.ajax({
        url: "api/users/"+id,
        contentType: cType,
        method: "DELETE",
        success: function (user) {
            console.log(user);
            $('tr[data-rowid="' + user._id+ '"]').remove();
        }
    })
};

var row = function (user) {
    return "<tr data-rowid='" + user._id + "'><td>" + user._id + "</td>" +
        "<td>" + user.name + "</td> <td>" + user.age + "</td>" +
        "<td><a class='editLink' data-id='" + user._id + "'>Edit</a> | " +
        "<a class='removeLink' data-id='" + user._id + "'>Delete</a></td></tr>";
}
$('form').submit(function (e) {
    e.preventDefault();
    var id = this.elements['id'].value;
    var name = this.elements['name'].value;
    var age = this.elements['age'].value;
    if(id == 0){
        CreateUser(name,age);
    }
    else {
        EditUser(id, name, age);
    }

});
$('body').on("click", ".editLink", function () {
    var id = $(this).data("id");
    GetUser(id);
});
$('body').on("click", ".removeLink", function () {
    var id = $(this).data("id");
    DeleteUser(id);
});


GetUsers();