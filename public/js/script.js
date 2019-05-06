$(document).ready(function () {
    var cType = 'application/json';

    function GetUsers() {
        $.ajax({
            url: "/api/docs",
            type: "GET",
            contentType: cType,
            success: function (users) {
                var rows = '';
                $.each(users, function (index, user) {
                    rows += row(user);
                });
                $("table tbody").append(rows);
            }
        })
    }
    function GetUser(id) {
        $.ajax({
            url: "/api/docs/"+id,
            type: "GET",
            contentType: cType,
            success: function (user) {
                var form = document.forms["userForm"];
                form.elements["id"].value = user._id;
                form.elements["name"].value = user.name;
                form.elements["login"].value = user.login;
                form.elements["pass"].value = user.pass;
            }
        })
    }
    function CreateUser(siteName, login, pass ) {
        $.ajax({
            url: "api/docs",
            contentType: cType,
            type: "POST",
            data: JSON.stringify({
                name: siteName,
                login: login,
                pass: pass
            }),
            success: function (doc) {
                reset();
                $("table tbody").append(row(doc));
            }
        })
    }
    function EditUser(userId, siteName, login, pass){
        $.ajax({
            url: "api/docs",
            contentType: cType,
            type: "PUT",
            data: JSON.stringify({
                id: userId,
                name: siteName,
                login: login,
                pass: pass
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
            url: "api/docs/"+id,
            contentType: cType,
            method: "DELETE",
            success: function (user) {
                console.log(user);
                $('tr[data-rowid="' + user._id+ '"]').remove();
            }
        })
    };

    var row = function (user) {
        return "<tr data-rowid='" + user._id + "'>" +
            "<td>" + user.name + "</td><td>" + user.login + "</td>" +
            "<td>" + user.pass + "</td>"+
            "<td><a class='editLink' data-id='" + user._id + "'>Edit</a> | " +
            "<a class='removeLink' data-id='" + user._id + "'>Delete</a></td></tr>";
    }
    $('form').submit(function (e) {
        e.preventDefault();
        var id = this.elements['id'].value;
        var name_site = this.elements['name'].value;
        var login = this.elements['login'].value;
        var pass = this.elements['pass'].value;
        if(id == 0){
            CreateUser(name_site, login, pass);
        }
        else {
            EditUser(id, name_site, login, pass );
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
});
