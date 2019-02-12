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
function AuthorizationUser(email, fname){
    $.ajax({
        url: '/api/registrations',
        type: 'GET',

    })
}
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
    var form = document.forms["regForm"];
    form.reset();
}