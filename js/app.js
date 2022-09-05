// creamos 3 secciones
// Variables
const btnEnviar = document.querySelector('#enviar');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const btnReset = document.querySelector('#resetBtn');



//Variables para campos
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');

eventListeners();
function eventListeners(){
    //cuando la app arranca
    document.addEventListener('DOMContentLoaded', iniciarApp);

    // campos del formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);

    //Reinicia el formulario
    btnReset.addEventListener('click', resetearFormulario );


  //Enviar email
  formulario.addEventListener('submit', enviarEmail);


}


//funciones
function iniciarApp() {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');

    
}

// Validar formulario
function validarFormulario(e)   {


   if(e.target.value.length > 0 ) {
 //Elimina los errores...

 const error = document.querySelector('p.error');
  if (error){
error.remove();
  };     

e.target.classList.remove('border', 'border-red-500');
e.target.classList.add('border,border-green-500');
   }   else {   
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');   
    mostrarError('Todos los campos son obligatorios');
    
   }




   // Vamos a pasarlo a una Expresion Regular 
   if(e.target.type === 'email') {
      

       if (er.test( e.target.value )) {
      //Elimina los errores...

 const error = document.querySelector('p.error');
 if (error){
error.remove();
 };    
       
       e.target.classList.remove('border', 'border-red-500');
       e.target.classList.add('border,border-green-500');
   }else{
    e.target.classList.remove('border', 'border-green-500');
    e.target.classList.add('border', 'border-red-500');      
      mostrarError('El email no es valido');
    }    
} 
      

      if( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '') {
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
      }     

    }




function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border', 'border-red-500', 'background-color-100', 'text-red-500', 'p-3', 'mt-5', 'text-center', 'error');

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0) {
        formulario.appendChild(mensajeError);
    }
}



// Envia el Mail

function enviarEmail(e) {
    e.preventDefault();
    
    // Mostrar un spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';


    //Despues de 3 Segundos ocultar el spinnery mostrar el mensaje
    setTimeout( () => {
        spinner.style.display = 'none';

    
    
        // mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.textContent = 'El mensaje se envio correctamente';
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white');


    // Inserta el parrafo ante del primer spinner
      formulario.insertBefore(parrafo, spinner);
        

    setTimeout(() => {
        parrafo.remove(); // Eliminar mensajes de texto

    }, 5000);
}, 3000);
    
}

// Funcion que resetea el formulario 
function  resetearFormulario() {
    formulario.reset();

    iniciarApp();
}


