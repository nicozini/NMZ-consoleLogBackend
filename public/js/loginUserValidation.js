let errors = {};

let form = document.querySelector('form.formulario');

const email = document.getElementById('email');
const password = document.getElementById('password');


// --- Validaciones --- //

// Email
let validateEmail = function(){
    let feedback = '';
    let feedbackElement = email.nextElementSibling;
    
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


// --- Eventos --- //
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);


form.addEventListener('submit', function(e){
    validateEmail();
    validatePassword();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
});