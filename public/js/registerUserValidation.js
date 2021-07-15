let errors = {};

let form = document.querySelector('form.formulario');

const firstName = document.getElementById('name');
const lastName = document.getElementById('lastname');




// --- Validaciones --- //

//  Nombre
let validateFirstName = function() {
    let feedback = '';
    let feedbackElement = firstName.nextElementSibling;

    if(firstName.value.trim() == '' ){
        feedback = 'El nombre no puede estar vacío';
    }

    if(feedback){        
        firstName.classList.add('error-input'); // crear estilos
        errors.firstName = feedback;
    }
    else{
        firstName.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.firstName;
    }

    feedbackElement.innerText = feedback;
}

// Apellido
let validateLastName = function() {
    let feedback = '';
    let feedbackElement = lastName.nextElementSibling;

    if(lastName.value.trim() == '' ){
        feedback = 'El apellido no puede estar vacío';
    }

    if(feedback){        
        lastName.classList.add('error-input'); 
        errors.lastName = feedback;
    }
    else{
        lastName.classList.remove('error-input');
        delete errors.lastName;
    }

    feedbackElement.innerText = feedback;
}






// --- Eventos --- //
firstName.addEventListener('blur', validateFirstName);
firstName.addEventListener('blur', validateLastName);

form.addEventListener('submit', function(e){
    validateFirstName();    
    validateLastName();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
});

















/// ------------------------------------------ 

// let errors = {};

// let form = document.querySelector('form.formulario');

// const firstName = document.getElementById('name');
// const lastName = document.getElementById('lastname');
// const email = document.getElementById('email');
// const password = document.getElementById('pass');
// const confirmPassword = document.getElementById('confirmpass');
// const profileAvatar = document.getElementById('avatar');
// const terms = document.getElementById('agree');


// const user = document.getElementById('user');
// const password = document.getElementById('password');


// --- Validaciones --- //

// //  Nombre
// let validateFirstName = function() {
//     let feedback = '';
//     let feedbackElement = firstName.nextElementSibling;

//     if(firstName.value.trim() == '' ){
//         feedback = 'El nombre no puede estar vacío';
//     }

//     if(feedback){        
//         firstName.classList.add('error-input'); // crear estilos
//         errors.firstName = feedback;
//     }
//     else{
//         firstName.classList.remove('error-input');
//         //feedbackElement.remove();
//         delete errors.firstName;
//     }

//     feedbackElement.innerText = feedback;
// }

// //  Apellido
// let validateLastName = function() {
//     let feedback = '';
//     let feedbackElement = lastName.nextElementSibling;

//     if(lastName.value.trim() == '' ){
//         feedback = 'El apellido no puede estar vacío';
//     }

//     if(feedback){        
//         lastName.classList.add('error-input'); 
//         errors.lastName = feedback;
//     }
//     else{
//         lastName.classList.remove('error-input');
//         delete errors.lastName;
//     }

//     feedbackElement.innerText = feedback;
// }

// // Email
// let validateEmail = function(){
//     let feedback = '';
//     let feedbackElement = email.nextElementSibling;

//     if(email.value.trim() == '' ){
//         feedback = 'El email no puede estar vacío';
//     }

//     //else if(expresión regular) -
//     // Agregar expresiones regulares 
//     // https://es.stackoverflow.com/questions/142/validar-un-email-en-javascript-que-acepte-todos-los-caracteres-latinos
//     if(feedback){
//         email.classList.add('error-input');
//         errors.email = feedback;
//     }
//     else{
//         email.classList.remove('error-input');
//         delete errors.email;
//     }

//     feedbackElement.innerText = feedback;
// }

// // Contraseña
// let validatePassword = function () {
//   let feedback = "";
//   let feedbackElement = password.nextElementSibling;

//   if (password.value.trim() == "") {
//     feedback = "El campo contraseña no puede estar vacío";
//   } else if (password.value.length < 6) {
//     feedback = "La contraseña tiene que tener por lo menos 6 caracteres";
//   }

//   if (feedback) {
//     password.classList.add("error-input");
//     errors.password = feedback;
//   } else {
//     password.classList.remove("error-input");
//     delete errors.password;
//   }

//   feedbackElement.innerText = feedback;
// };


// // Confirmar contraseña
// // Imagen de perfil
// // Terminos y condiciones


// firstName.addEventListener('blur', validateFirstName);
// lastName.addEventListener('blur', validateLastName);
// email.addEventListener('blur', validateEmail);
// password.addEventListener('blur', validatePassword);

// form.addEventListener('submit', function(e){
//     validateFirstName();
//     validateLastName();
//     validateEmail();
//     validatePassword();
//     if(Object.keys(errors).length){
//         e.preventDefault();
//     }
// })