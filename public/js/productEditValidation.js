<link rel="stylesheet" href='/css/validacionesFrontEnd.css'/>

let errors = {};

let form = document.getElementById('form-control');

const name = document.getElementById('name');


let validatePrice = function(){
    let feedback = '';
    let feedbackElement = price.nextElementSibling;

    if(user.value.trim() == '' ){
        feedback = 'El precio no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){
        validatePrice.classList.add('error-input');
        errors.user = feedback;
    }
    else{
        price.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.user;
    }

    feedbackElement.innerText = feedback;
}

// let validateCategory = function(){
//     let feedback = '';
//     let feedbackElement = category.nextElementSibling;

//     if(user.value.trim() == '' ){
//         feedback = 'La categoría no puede estar vacía';
//     }
//     //else if(expresión regular) -

//     if(feedback){
//         validateCategory.classList.add('error-input');
//         errors.user = feedback;
//     }
//     else{
//         category.classList.remove('error-input');
//         //feedbackElement.remove();
//         delete errors.category;
//     }

//     feedbackElement.innerText = feedback;
// }

let validateDescription = function(){
    let feedback = '';
    let feedbackElement = description.nextElementSibling;

    if(description.value.trim() == '' ){
        feedback = 'La descripción no puede estar vacía';
    }
    //else if(expresión regular) -

    if(feedback){
        validateDescription.classList.add('error-input');
        errors.user = feedback;
    }
    else{
        description.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.description;
    }

    feedbackElement.innerText = feedback;
}

// let validateImage = function(){
//     let feedback = '';
//     let feedbackElement = price.nextElementSibling;

//     if(user.value.trim() == '' ){
//         feedback = 'El precio no puede estar vacío';
//     }
//     //else if(expresión regular) -

//     if(feedback){
//         validatePrice.classList.add('error-input');
//         errors.user = feedback;
//     }
//     else{
//         price.classList.remove('error-input');
//         //feedbackElement.remove();
//         delete errors.user;
//     }

//     feedbackElement.innerText = feedback;
// }

let validateFacts = function(){
    let feedback = '';
    let feedbackElement = facts.nextElementSibling;

    if(facts.value.trim() == '' ){
        feedback = 'El detalle nutricional no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){
        validateFacts.classList.add('error-input');
        errors.user = feedback;
    }
    else{
        facts.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.user;
    }

    feedbackElement.innerText = feedback;
}

// let validateinSale = function(){
//     let feedback = '';
//     let feedbackElement = inSale.nextElementSibling;

//     if(inSale.value.trim() == '' ){
//         feedback = 'Tiene que detallar si el producto está en oferta';
//     }
//     //else if(expresión regular) -

//     if(feedback){
//         validateinSale.classList.add('error-input');
//         errors.user = feedback;
//     }
//     else{
//         facts.classList.remove('error-input');
//         //feedbackElement.remove();
//         delete errors.user;
//     }

//     feedbackElement.innerText = feedback;
// }

price.addEventListener('blur', validatePrice);
category.addEventListener('blur', validateCategory);
image.addEventListener('blur', validateImage);
facts.addEventListener('blur', validateFacts);
inSale.addEventListener('blur', validateinSale);

form.addEventListener('submit', function(e){
    validatePrice();
    validateCategory();
    validateImage();
    validateFacts();
    validateinSale();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
})