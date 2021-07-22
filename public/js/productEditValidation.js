let errors = {};

let form = document.getElementById('form-control');

const productName = document.getElementById('name');
const price = document.getElementById('price');
const image = document.getElementById('image');
const description = document.getElementById('description');
const facts = document.getElementById('facts');


// --- Validaciones --- //
let validateName = function(){
    let feedback = '';
    let feedbackElement = productName.nextElementSibling;

    if(productName.value.trim() == '' ){
        feedback = 'El nombre no puede estar vacío';
    }
    else if (description.value.length < 4) {
        feedback = 'Debe contener al menos 4 caracteres';
        //kiwi tiene 4 
    };
    
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
        feedback = 'No puede estar vacío';
    }else if (price.value.trim() <= 0) {
        feedback = 'El valor no puede ser 0';
        //kiwi tiene 4 
    };

    if(feedback){        
       price.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.price = feedback;
    }
    else{
        price.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
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
        feedback = 'No puede estar vacío';
    }else if (description.value.length < 20) {
        feedback = 'Debe contener al menos 20 caracteres';
        //kiwi tiene 4 
    };

    if(feedback){        
        description.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.facts = feedback;
    }
    else{
        description.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.facts;
    }
    feedbackElement.innerText=feedback;
};

 let validateImage = function(){
    let feedback = '';
    let feedbackElement = image.nextElementSibling;
    let allowedExtensions = /(.jpg|.jpeg|.png|.gif)$/i;

    if (image.value==''|| image.value==''){
        feedback = 'Debes subir una imagen';
    }else if(!allowedExtensions.exec(image.value)){
        feedback = 'Solo podés subir imagenes .jpg ó jpeg ó png ó gif';
    };   

    if(feedback){        
        image.classList.add('error-input'); 
        feedbackElement.classList.add('error-input'); 
        errors.image = feedback;
    }
    else{
        image.classList.remove('error-input');
        feedbackElement.classList.remove('error-input'); 
        delete errors.image;
    }

    feedbackElement.innerText = feedback;
};

let validateFacts = function(){
    let feedback = '';
    let feedbackElement = facts.nextElementSibling;

    if(facts.value.trim() == '' ){
        feedback = 'No puede estar vacío';
    }else if (facts.value.length < 20) {
        feedback = 'Debe contener al menos 20 caracteres';
        //kiwi tiene 4 
    };

    if(feedback){        
        facts.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.facts = feedback;
    }
    else{
        facts.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.facts;
    }

    feedbackElement.innerText = feedback;
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
image.addEventListener('blur', validateImage);
description.addEventListener('blur', validateDescription);
facts.addEventListener('blur', validateFacts);
//inSale.addEventListener('blur', validateinSale);

form.addEventListener('submit', function(e){
    validateName();
    validatePrice();
    //validateCategory();
    validateImage();
    validateDescription();
    validateFacts();
    //validateinSale();
    if(Object.keys(errors).length){
        e.preventDefault();
    }
})

