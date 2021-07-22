<<<<<<< HEAD
<link rel="stylesheet" href='/css/validacionesFrontEnd.css' />


let errors = {};

let form = document.querySelector('form.formulario');

const firstName = document.getElementById('name');
const lastName = document.getElementById('lastname');
const email = document.getElementById('email');
const street = document.getElementById('street');
const number = document.getElementById('number');



// --- Validaciones --- //

//  Nombre
let validateFirstName = function () {
    let feedback = '';
    let feedbackElement = firstName.nextElementSibling;

    if (firstName.value.trim() == '') {
        feedback = 'El nombre no puede estar vacío';
    }

    if (feedback) {
        firstName.classList.add('error-input'); // crear estilos
        errors.firstName = feedback;
    }
    else {
        firstName.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.firstName;
    }

    feedbackElement.innerText = feedback;
}

// Apellido
let validateLastName = function () {
    let feedback = '';
    let feedbackElement = lastName.nextElementSibling;

    if (lastName.value.trim() == '') {
        feedback = 'El apellido no puede estar vacío';
    }

    if (feedback) {
        lastName.classList.add('error-input');
        errors.lastName = feedback;
    }
    else {
        lastName.classList.remove('error-input');
        delete errors.lastName;
    }

    feedbackElement.innerText = feedback;
}

// Street
let validateStreet = function () {
    let feedback = '';
    let feedbackElement = street.nextElementSibling;

    if (street.value.trim() == '') {
        feedback = 'La direccion no puede estar vacía';
    }

    if (feedback) {
        street.classList.add('error-input');
        errors.street = feedback;
    }
    else {
        street.classList.remove('error-input');
        delete errors.street;
    }

    feedbackElement.innerText = feedback;
}

// Email
let validateEmail = function () {
    let feedback = '';
    let feedbackElement = email.nextElementSibling;

    if (email.value.trim() == '') {
        feedback = 'El email no puede estar vacío';
    }
    //else if(expresión regular) -

    if (feedback) {
        email.classList.add('error-input');
        errors.email = feedback;
    }
    else {
        email.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.email;
    }

    feedbackElement.innerText = feedback;
}

// Number
let validateNumber = function () {
    let feedback = '';
    let feedbackElement = number.nextElementSibling;

    if (number.value.trim() == '0') {
        feedback = 'El numero de la direccion no puede estar vacío';
    }
    //else if(expresión regular) -
    if (feedback) {
        validateNumber.classList.add('error-input');
        errors.number = feedback;
    }
    else {
        number.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.number;
    }

    feedbackElement.innerText = feedback;
}

// --- Eventos --- //
firstName.addEventListener('blur', validateFirstName);
firstName.addEventListener('blur', validateLastName);

form.addEventListener('submit', function (e) {
    validateFirstName();
    validateLastName();
    validateStreet();
    validateEmail();
    validateNumber();
    if (Object.keys(errors).length) {
        e.preventDefault();
    }
});
=======
{/* <link rel="stylesheet" href='/css/validacionesFrontEnd.css'/> */}
>>>>>>> 4971854fc787d837ec66a9eb13571a86be6d8b4c
