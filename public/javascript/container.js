const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const datosEquivocadosIn = document.getElementById('datosEquivocadosIn');
const datosEquivocadosUp = document.getElementById('datosEquivocadosIn');


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
        USERNAME: campoUser.value,
		EMAIL: campoCorreo.value,
		PASSWORD: campoPassword.value,
		FECHA_NACIMIENTO: campoFecha.value,
		PAIS: campoPais.value,
	});
	console.log(payLoad);
	const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.status === 200) {
		  location.href = "/pagina_web-The_Debugger/index.html";
		  console.log("La solicitud fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud fue exitosa
		} else {
		  console.log("La solicitud no fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud no fue exitosa
		}
		console.log("Estado de la respuesta:", xhr.status);
	  };
	// xhr.onload = () => {
	// 	result.innerText = xhr.responseText;	
    // };
	xhr.open('POST','/signup');
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.send(payLoad);
}

function iniciarSesion(){
	datosEquivocadosIn.style.display = "none";
	const payLoad = JSON.stringify({
        username: inicioNombre.value,
        password: inicioPassword.value
    });
    console.log(payLoad);
    const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.status === 200) {
		location.href = "/pagina_web-The_Debugger/index.html";
		  console.log("La solicitud fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud fue exitosa
		} else {
		  datosEquivocadosIn.style.display = "block";
		  console.log("La solicitud no fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud no fue exitosa
		}
		console.log("Estado de la respuesta:", xhr.status);
	  };
    // xhr.onload = () => {
    //     result.innerText = xhr.responseText;    
    // };
    xhr.open('POST','/signin3');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payLoad);
}


