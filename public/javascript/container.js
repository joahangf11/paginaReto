const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
	container.classList.add("right-panel-active");
});

signInButton.addEventListener('click', () => {
	container.classList.remove("right-panel-active");
});

enviarboton.addEventListener('click', () => {
	console.log("enviado");
});

function saveData(){
	const payLoad = JSON.stringify({
		nombre: campoNombre.value,
        username: campoUser.value,
		fecha: campoFecha.value,
		pais: campoPais.value,
        correo: campoCorreo.value,
        password: campoPassword.value
	});
	const xhr = new XMLHttpRequest();
	// xhr.onload = () => {
	// 	result.innerText = xhr.responseText;	
    // };
	xhr.open('POST','/signin');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(payLoad);
}

