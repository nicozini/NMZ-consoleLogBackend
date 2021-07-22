let errors = {};

let form = document.querySelector('form.formulario');

const firstName = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const confirmpass = document.getElementById('confirmpass');


// --- Validaciones --- //

//  Nombre
let validateFirstName = function() {
    let feedback = '';
    let feedbackElement = firstName.nextElementSibling;

    let name = firstName.value;    
    let numbers ="0123456789";

    function haveNumbers(name){
        for(i=0; i<name.length; i++){
            if (numbers.indexOf(name.charAt(i),0)!=-1){
                return feedback = 'El nombre no puede contener números.';
            }
        }
    }

    if(name.trim() == '' ){
        feedback = 'El nombre no puede estar vacío.';
    } else if (name.length < 3) {
        feedback = 'El nombre debe tener tres o mas de tres caracteres.'
    } else {
        haveNumbers(name);
    }

    if(feedback){        
        firstName.classList.add('error-input');
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

    let last = lastName.value;
    let numbers ="0123456789";

    function haveNumbers(last){
        for(i=0; i<last.length; i++){
            if (numbers.indexOf(last.charAt(i),0)!=-1){
                return feedback = 'El apellido no puede contener números.';
            }
        }
    }

    if(last.trim() == '' ){
        feedback = 'El apellido no puede estar vacío';
    } else if (last.length < 3) {
        feedback = 'El apellido debe tener tres o mas de tres caracteres.'
    } else {
        haveNumbers(last)
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

// Email
let validateEmail = function(){
    let feedback = '';
    let feedbackElement = email.nextElementSibling;
    
    // let emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    let emailRegex = /[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,4}/


    if(email.value.trim() == '' ){
        feedback = 'El email no puede estar vacío';
    } else if (!emailRegex.test(email.value)) {
        feedback = 'Email incorrecto. Por favor ingrese un correo electrónico válido.'        
    }    
    
    if(feedback){
        email.classList.add('error-input');
        errors.email = feedback;
    }
    else{
        email.classList.remove('error-input');
        delete errors.email;
    }

    feedbackElement.innerText = feedback;    
}

// Contraseña
let validatePassword = function() {
    let feedback = '';
    let feedbackElement = password.nextElementSibling;

    let pass = password.value; 
    
    // Regular expression: 
    let regex = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    // Un dígito: \d
    // Una minúscula: [a-záéíóúüñ]
    // Una mayúscula: [A-ZÁÉÍÓÚÜÑ]

    if(pass.trim() == '' ) {
        feedback = 'La contraseña no puede estar vacía';
    } else if (pass.length < 8) {
        feedback = 'La contraseña debe tener al menos 8 caracteres.'
    } else if (!regex.test(pass)) {
        feedback = 'La contraseña debe contener una letra minúscula y una letra mayúscula.'
    }

    if(feedback){        
        password.classList.add('error-input'); 
        errors.password = feedback;
    }
    else{
        password.classList.remove('error-input');
        delete errors.password;
    }

    feedbackElement.innerText = feedback;
}

// Confirmar contraseña
let validateConfirmpass = function() {
    let feedback = '';
    let feedbackElement = confirmpass.nextElementSibling;

    let pass = password.value; 
    let conf = confirmpass.value;

    if(pass !=  conf) {
        feedback = 'Las contraseñas ingresadas no coinciden.';
    }

    if(feedback){        
        confirmpass.classList.add('error-input'); 
        errors.confirmpass = feedback;
    }
    else{
        confirmpass.classList.remove('error-input');
        delete errors.confirmpass;
    }

    feedbackElement.innerText = feedback;
}



// --- Eventos --- //
firstName.addEventListener('blur', validateFirstName);
lastName.addEventListener('blur', validateLastName);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
confirmpass.addEventListener('blur', validateConfirmpass);


form.addEventListener('submit', function(e){
    validateFirstName();    
    validateLastName();
    validateEmail();
    validatePassword();
    validateConfirmpass();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
});