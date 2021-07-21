let errors = {};

let form = document.getElementById('form-control');

const productName = document.getElementById('name');
const price = document.getElementById('price');
const description = document.getElementById('description');
const facts = document.getElementById('facts');


// --- Validaciones --- //
let validateName = function(){
    let feedback = '';
    let feedbackElement = productName.nextElementSibling;

    if(productName.value.trim() == '' ){
        feedback = 'El nombre no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){        
        productName.classList.add('error-input'); // crear estilos
        errors.productName = feedback;
    }
    else{
        productName.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.productName;

    }
    feedbackElement.innerText=feedback;
};
let validatePrice = function(){
    let feedback = '';
    let feedbackElement = price.nextElementSibling;

    if(price.value.trim() == '' ){
        feedback = 'El precio no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){        
        price.classList.add('error-input'); // crear estilos
        errors.price = feedback;
    }
    else{
        price.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.price;

    }
    feedbackElement.innerText=feedback;
};

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
        feedback = 'La descripción no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){        
        description.classList.add('error-input'); // crear estilos
        errors.description = feedback;
    }
    else{
        description.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.description;

    }
    feedbackElement.innerText=feedback;
};

 let validateImage = function(){
    let feedback = '';
    let feedbackElement = Image.nextElementSibling;

    if(Image.value.trim() == '' ){
        feedback = 'La imagen no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){        
        Image.classList.add('error-input'); // crear estilos
        errors.Image = feedback;
    }
    else{
        Image.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.description;

    }
    feedbackElement.innerText=feedback;
 }

let validateFacts = function(){
    let feedback = '';
    let feedbackElement = facts.nextElementSibling;

    if(facts.value.trim() == '' ){
        feedback = 'La descripción no puede estar vacío';
    }
    //else if(expresión regular) -

    if(feedback){        
        facts.classList.add('error-input'); // crear estilos
        errors.facts = feedback;
    }
    else{
        facts.classList.remove('error-input');
        //feedbackElement.remove();
        delete errors.facts;

    }
    feedbackElement.innerText=feedback;
};

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
productName.addEventListener('blur', validateName);
price.addEventListener('blur', validatePrice);
//category.addEventListener('blur', validateCategory);
//image.addEventListener('blur', validateImage);
description.addEventListener('blur', validateDescription);
facts.addEventListener('blur', validateFacts);
//inSale.addEventListener('blur', validateinSale);

form.addEventListener('submit', function(e){
    validateName();
    validatePrice();
    //validateCategory();
    //validateImage();
    validateDescription();
    validateFacts();
    //validateinSale();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
})
