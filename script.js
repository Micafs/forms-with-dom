// declaracion de variables
const form = document.querySelector('.form');
const email = document.querySelector("#email");
const passwordUno = document.querySelector("#password");
const passwordDos = document.querySelector("#password-2");
const learner = document.querySelector("#learner");
const tutor = document.querySelector("#tutor");
const submit = document.querySelector("#submit");

const formData = {
  values: {
    email: '',
    password: '',
    role: ''
  },
  validators: {
    isEmail: (value) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (emailRegex.test(value.trim())) {
        showSucces(email);
        formData.values.email = value.trim();
      } else {
        showError(email, '* El email no es válido');
      }
    },
    password: (value) => {
      if (value.trim().length >= 6) {
        showSucces(passwordUno);
      } else {
        showError(passwordUno, '* El password debe contener al menos 6 caracteres');
      }
    },
    rePassword: (value) => {
      if (value.trim().length >= 6 && passwordUno.value.trim() === value.trim()) {
        showSucces(passwordDos);
        formData.values.password = value.trim();
      } else {
        showError(passwordDos, '* El password debe coincidir con la primera entrada');
      }
    },
  }
}


// definicion de funciones
const showError = (node, message) => {
  if (node.classList.contains('error')) {
    return;
  }

  node.classList.add('error');
  node.classList.remove('success');
  // Creamos un nodo de tipo span para mostrar el mensaje de error
  const msg = document.createElement('span'); // <span></span>
  msg.classList.add('error-msg'); // <span class="error-msg"></span>
  msg.innerText = message;  // <span class="error-msg">* El email no es válido</span>
  node.parentElement.appendChild(msg);
}

const showSucces = (node) => {
  if (node.classList.contains('success')) {
    return;
  }
  node.classList.add('success');
  node.classList.remove('error');

  node.parentElement.removeChild(node.parentElement.lastChild);
  // const span = node.parentElement.querySelector('.error-msg');
  // node.parentElement.removeChild(span);

}
// eventos
email.addEventListener("input", (event) => {
  formData.validators.isEmail(event.target.value)
})

passwordUno.addEventListener("input", (event) => {
  formData.validators.password(event.target.value)
});

passwordDos.addEventListener("input", (e) => {
  formData.validators.rePassword(e.target.value)
})


learner.addEventListener('change', (e) => {

  if (e.target.checked) {
    e.target.parentElement.classList.add('selected');
    formData.values.role = "learner";
  }

  if (tutor.checked) {
    tutor.checked = false;
    tutor.parentElement.classList.remove('selected');
  }
})

tutor.addEventListener('change', (e) => {
  ;
  if (e.target.checked) {
    e.target.parentElement.classList.add('selected');
    formData.values.role = "tutor";
  }

  if (learner.checked) {
    learner.checked = false;
    learner.parentElement.classList.remove('selected');
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(e);

  // Corro las validaciones de los campos
  formData.validators.isEmail(e.target[0].value)
  formData.validators.password(e.target[1].value)
  formData.validators.rePassword(e.target[2].value)

  // Verifico si alguno de los campos tiene un error
  if (!email.classList.contains('error') && !passwordDos.classList.contains('error')) {
    // 2. Enviar los datos del formulario a un servidor
    console.log('Enviando datos...', formData.values);
  }else{
    console.error('uno o mas campos tienen errores')
  }

})

// ejecuciones inmediatas

