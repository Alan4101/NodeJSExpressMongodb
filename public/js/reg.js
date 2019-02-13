$(document).ready(function () {
    function RegNewUser(email, fname, lname, age, pass) {
        $.ajax({
            url:'/api/registrations',
            type: "POST",
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                firstName: fname,
                lastName: lname,
                ageU: age,
                password: pass
            }),
            success: function () {
                reset();
                alert("Registration will be successful!")
            }
        })
    }
    function AuthorizationUser(email, password){
        $.ajax({
            url: '/api/auth',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                email: email,
                password: password
            }),
            success: function (user) {
                console.log(user);

            }
        })
    }
    $('.authForm').submit(function (e) {
        e.preventDefault();

        var email = this.elements['email'];
        var pass = this.elements['pass'];

        if($('input').val()=== '' ){
            alert("заповныть поля");
        }else {
            AuthorizationUser(email, pass);
        }
    });
    $('.regisr-form').submit(function (e) {
        e.preventDefault();

        var fname = this.elements['firstName'].value;
        var lname = this.elements['lastName'].value;
        var email = this.elements['email'].value;
        var age = this.elements['age'].value;
        var pass = this.elements['password'].value;

        RegNewUser(email, fname, lname, age, pass);

    });
    function reset() {
        var form = document.forms["authForm"];
        form.reset();
    }
});
