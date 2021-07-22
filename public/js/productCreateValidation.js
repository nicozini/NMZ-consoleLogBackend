{/* <link rel="stylesheet" href='/css/validacionesFrontEnd.css'/> */}
let errors = {};

let form = document.querySelector('form.formulario');

const productName   = document.getElementById('name');
const price         = document.getElementById('price');
const description   = document.getElementById('description');
const image         = document.getElementById('avProducts');

// --- Validaciones --- //
//  Nombre
let validateName = function() {
    let feedback = '';
    let feedbackElement = productName.nextElementSibling;


    if(productName.value.trim() == '' ){
        feedback = 'El nombre no puede estar vacío';
    }else if (productName.value.length < 5) {
        feedback = 'El nombre debe contener al menos 4 caracteres';
        //kiwi tiene 4 
    };

    if(feedback){        
        productName.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.productName = feedback;
    }
    else{
        productName.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.productName;
    }

    feedbackElement.innerText = feedback;
};

// precio
let validatePrice = function() {
    let feedback = '';
    let feedbackElement = price.nextElementSibling;

    if(price.value.trim() == '' ){
        feedback = 'El precio no puede estar vacío';
    // }else if( typeof(price.value)  != 'number'){
    //     feedback = 'El precio debe ser numérico positivo'
    };

    if(feedback){        
        price.classList.add('error-input'); 
        feedbackElement.classList.toggle('error-input'); 
        errors.price = feedback;
    }
    else{
        price.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.price;
    }

    feedbackElement.innerText = feedback;
};
//validacion de descripción
//  Nombre
let validateDescription = function() {
    let feedback = '';
    let feedbackElement = description.nextElementSibling;
    
    if(description.value.trim() == '' ){
        feedback = 'La descripcion del producto debe contener al menos 20 caracteres';
    }else if (description.value.length < 21) {
        feedback = 'La descripcion del producto debe contener al menos 20 caracteres';
    }

    if(feedback){        
        description.classList.add('error-input'); // crear estilos
        feedbackElement.classList.toggle('error-input'); 
        errors.productName = feedback;
    }
    else{
        description.classList.remove('error-input');
        feedbackElement.classList.toggle('error-input'); 
        delete errors.productName;
    }

    feedbackElement.innerText = feedback;
};

//Validacion de Imagen
let validateImg = function() {
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
        errors.price = feedback;
    }
    else{
        image.classList.remove('error-input');
        feedbackElement.classList.remove('error-input'); 
        delete errors.price;
    }

    feedbackElement.innerText = feedback;
};

// --- Eventos --- //
productName.addEventListener('blur',function(){validateName()   });
price.addEventListener      ('blur',function(){validatePrice()  });
description.addEventListener('blur',function(){validateDescription()  });



form.addEventListener('submit', function(e){
    validateName();    
    validatePrice();
    validateDescription();
    validateImg();
    console.log(errors);
    if(Object.keys(errors).length){
        e.preventDefault();
    }
});