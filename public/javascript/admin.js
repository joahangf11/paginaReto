
function iniciarSesion(){
	const payLoad = JSON.stringify({
        correo: inicioCorreo.value,
        password: inicioPassword.value
    });
    console.log(payLoad);
    const xhr = new XMLHttpRequest();
	xhr.onload = function() {
		if (xhr.status === 200) {
		location.href = "https://public.tableau.com/app/profile/joahan.javier.garcia.fernandez/viz/PruebaVentas_16823536745920/Dashboard1?publish=yes";
        //   location.href = "/juego/pag.html";
		  console.log("La solicitud fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud fue exitosa
		} else {
		  console.log("La solicitud no fue exitosa");
		  // Aquí puedes agregar el código que deseas ejecutar si la solicitud no fue exitosa
		}
		console.log("Estado de la respuesta:", xhr.status);
	  };
    // xhr.onload = () => {
    //     result.innerText = xhr.responseText;    
    // };
    xhr.open('POST','/signinadmin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(payLoad);
}