// botones de las cards para abrir la modal 
let botones = document.querySelectorAll(".btn-modal");

botones.forEach(boton => {
    boton.addEventListener("click", function(){
        let modal = new bootstrap.Modal(document.getElementById("miModal"));
        modal.show();
    })
    
});
// validacion del formulario
document.getElementById("LOGIN").addEventListener("submit", function(e){
    e.preventDefault();

     let correo = document.getElementById("email").value
     let password = document.getElementById("password").value
     let mensaje = document.getElementById("mensaje");

     console.log("correo", correo)
      console.log("password", password)
     const USER_DEFAULT = "prueba@gmail.com";
     const PASSWORD_DEFAULT = "123456";

     if (correo === "" || password === ""){
        mensaje.innerHTML = "todos los campos som obligatorios";
        mensaje.className = "text-warning";
        }else if (correo === USER_DEFAULT && password === PASSWORD_DEFAULT){
            mensaje.innerHTML = "bienvenido al sistema";
            mensaje.className = "text-success";
        }else {
            mensaje.innerHTML = "error al procesar los datos !";
            mensaje.className = "text-danger";
        }
     }

)