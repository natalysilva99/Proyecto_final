//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

});
(function() {
    var staticPanel = $('.panel--static');
    var slidingPanel = $('.panel--sliding');
    
    var signupBtn = staticPanel.find('.btn.signup');
    var loginBtn = staticPanel.find('.btn.login');
    
    var signupContent = slidingPanel.find('.panel__content.signup');
    var loginContent = slidingPanel.find('.panel__content.login');

    signupBtn.on('click', function() {
        loginContent.hide('fast');
        signupContent.show('fast');
        slidingPanel.animate({
            'left': '4%'
        }, 550, 'easeInOutBack');
    });

    loginBtn.on('click', function() {
        signupContent.hide('fast');
        loginContent.show('fast');
        slidingPanel.animate({
            'left': '54%'
        }, 550, 'easeInOutBack');
    });
})();

//function limpiar(){
    
  //  document.getElementById("password").value = "";
   // document.getElementById("name").value = "";
    //document.getElementById("email").value = "";
//}



//creo variables constantes de el form y de lo que quiero que se guarde
const form = document.getElementById("signup");
const nombreusuario = document.getElementById("names");
const email = document.getElementById("emails");
const contraseña = document.getElementById("password");

document.addEventListener("DOMContentLoaded",function(e){  
form.addEventListener("submit", function(event){


//creo una variable local 
//extraigo los valores de las propiedades 
let users = {

        names: names.value,
        emails: emails.value,
        password: password.value
};

event.preventDefault(); //Cancela el evento si este es cancelable, sin detener el resto del funcionamiento del evento, es decir, puede ser llamado de nuevo.

//localStorage setItem para que me guarde los datos 
//convierto el objeto o valor javascript en una cadena JSON
localStorage.setItem("user",JSON.stringify(users));
window.location.href="home.html"
});
});
