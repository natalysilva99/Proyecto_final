//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
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

function limpiar(){
    
    document.getElementById("password").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";

}
});
