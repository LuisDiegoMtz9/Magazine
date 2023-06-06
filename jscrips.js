var cont;

function contador(){
	if(localStorage.getItem("visitas") == null){
		cont = 0;
		localStorage.setItem("visitas",cont)
	}
}

window.addEventListener("load",()=>{
	contador();
	cont = JSON.parse(localStorage.getItem("visitas")) + 1;
	localStorage.setItem("visitas",cont);
	if (document.getElementById("visitas") != null) {
		document.getElementById("visitas").innerHTML = localStorage.getItem("visitas");
	}
	
	if(localStorage.getItem("valUser") != null){
		document.getElementById("login").innerHTML = localStorage.getItem("valUser");
		document.getElementById("opeSec").style.display = "none";
	}else{
		document.getElementById("cloSec").style.display = "none";
	}
	
	if(localStorage.getItem("arrEstrenos") == null){
		localStorage.setItem("arrEstrenos", "[]");
		
		var cls1 = {
			titulo: "Trasher",
			txtTitu: "Revista interesante para las personas chismosasss huy huy uy huy!",
			likes: 0,
			dlikes : 0
		};
		
		var cls2 = {
			titulo: "Nat Geo",
			txtTitu: "Revista interesante para las personas con brotes de animal huy huy uy huy!",
			likes: 0,
			dlikes : 0
		};
		
		var cls3 = {
			titulo: "Rolex",
			txtTitu: "Revista interesante para las personas extravagantes huy huy uy huy!",
			likes: 0,
			dlikes : 0
		};
		
		var cls4 = {
			titulo: "Betterware",
			txtTitu: "Revista interesante para las personas que no conocen los super mercados huy huy uy huy!",
			likes: 0,
			dlikes : 0
		};
		
		let datos = JSON.parse(localStorage.getItem("arrEstrenos"));
		datos.push(cls1);
		localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
		datos = JSON.parse(localStorage.getItem("arrEstrenos"));
		datos.push(cls2);
		localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
		datos = JSON.parse(localStorage.getItem("arrEstrenos"));
		datos.push(cls3);
		localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
		datos = JSON.parse(localStorage.getItem("arrEstrenos"));
		datos.push(cls4);
		localStorage.setItem("arrEstrenos", JSON.stringify(datos));
	}
});

function closeSec(){
	localStorage.removeItem("valUser");
	document.getElementById("opeSec").style.display = "block";
	document.getElementById("cloSec").style.display = "none";
	document.getElementById("login").innerHTML = "------";
}

function registro(){
	var usuario = document.getElementById("txtUser").value;
	var contrase = document.getElementById("txtContra").value;
	var nombre = document.getElementById("txtNom").value;
	var correo = document.getElementById("txtCorr").value;
	
	var valUse = new RegExp("^[A-Za-z0-9ÑñÁáÉéÍíÓóÚú-]+");
	var valPas = new RegExp("^[A-Za-z0-9]{8,16}$");
	var valNom = new RegExp("^[A-Za-z0-9ÑñÁáÉéÍíÓóÚú-]+");
	var valCor = new RegExp("^[sgeaSGEA]{1}[0-9]{8}(@alumnos.itsur.edu.mx)$");
	
	var cont = 0;
	var cad = "Datos Erroneos Ingresados en:\n";
	
	if(valUse.test(usuario)){
		cont++;
	}else{
		cad = cad + "Nombre de Usuario\n";
	}
	
	if(valPas.test(contrase)){
		cont++;
	}else{
		cad = cad + "Contraseña\n";
	}
	
	if(valNom.test(nombre)){
		cont++;
	}else{
		cad = cad + "Nombre Completo\n";
	}
	
	if(valCor.test(correo)){
		cont++;
	}else{
		cad = cad + "Correo\n";
	}
	
	if (cont == 4){
		var cls = {
			user: usuario,
			contra: contrase,
			nombre: nombre,
			correo : correo
		};
		
		insert(cls);
		
		document.getElementById("txtUser").value = "";
		document.getElementById("txtContra").value = "";
		document.getElementById("txtNom").value = "";
		document.getElementById("txtCorr").value = "";
		
		alert("Usuario -> " + cls.user + " agregado correctamente!");
		
		window.location.href = "Login.html";
		
	}else{
		alert(cad);
	}
}

function insert(obj){
	if(localStorage.getItem("arrUsuarios") == null){
		localStorage.setItem("arrUsuarios", "[]");
	}
	
	let datos = JSON.parse(localStorage.getItem("arrUsuarios"));
	datos.push(obj);
	localStorage.setItem("arrUsuarios", JSON.stringify(datos));
}

function login(){
	var user = document.getElementById("txtUser").value;
    var contra = document.getElementById("txtContra").value;
	
	var valCont = false;
	var valUser = false;
	
	if(localStorage.getItem("valUser") != null){
		alert("No puede iniciar sesion si ya tiene un usuario loggeado en la pagina!\n Cierre la sesion e intente ingresar con el nuevo usuario");
	}else {
		
		if(localStorage.getItem("arrUsuarios") != null){
			var datos = JSON.parse(localStorage.getItem("arrUsuarios"));

			for(let i = 0; i < datos.length; i++){
				var obj = datos[i];

				if(obj.user == user){
					if(obj.contra == contra){
						valCont = true;
					}
					valUser = true;
				}
			}
		}

		if(valCont == true && valUser == true){
			alert("Bienvenido " + user);

			if(localStorage.getItem("valUser") == null){
				localStorage.setItem("valUser", user);
			}

			window.location.href = "index.html";
			document.getElementById("login").innerHTML = user;
			document.getElementById("txtContra").value = "";
			document.getElementById("txtUser").value = "";
		}else{
			alert("Usuario o contraseña incorrectos");
		}
	}
}

function opPop(){
	var datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	document.getElementById("popUpEst").style.display = "flex";
	
	document.getElementById("tUno").innerHTML = datos[0].titulo;
	document.getElementById("pUno").innerHTML = datos[0].txtTitu;
	document.getElementById("lblLUno").innerHTML = datos[0].likes;
	document.getElementById("lblDUno").innerHTML = datos[0].dlikes;
	
	document.getElementById("tdos").innerHTML = datos[1].titulo;
	document.getElementById("pdos").innerHTML = datos[1].txtTitu;
	document.getElementById("lbldos").innerHTML = datos[1].likes;
	document.getElementById("lblddos").innerHTML = datos[1].dlikes;
	
	document.getElementById("ttres").innerHTML = datos[2].titulo;
	document.getElementById("ptres").innerHTML = datos[2].txtTitu;
	document.getElementById("lblltres").innerHTML = datos[2].likes;
	document.getElementById("lbldtres").innerHTML = datos[2].dlikes;
	
	document.getElementById("tcua").innerHTML = datos[3].titulo;
	document.getElementById("pcua").innerHTML = datos[3].txtTitu;
	document.getElementById("lbllcua").innerHTML = datos[3].likes;
	document.getElementById("lbldcua").innerHTML = datos[3].dlikes;
}

function cloPop(){
	document.getElementById("popUpEst").style.display = "none";
}

function actLikes(){
	var datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	
	document.getElementById("tUno").innerHTML = datos[0].titulo;
	document.getElementById("pUno").innerHTML = datos[0].txtTitu;
	document.getElementById("lblLUno").innerHTML = datos[0].likes;
	document.getElementById("lblDUno").innerHTML = datos[0].dlikes;
	
	document.getElementById("tdos").innerHTML = datos[1].titulo;
	document.getElementById("pdos").innerHTML = datos[1].txtTitu;
	document.getElementById("lbldos").innerHTML = datos[1].likes;
	document.getElementById("lblddos").innerHTML = datos[1].dlikes;
	
	document.getElementById("ttres").innerHTML = datos[2].titulo;
	document.getElementById("ptres").innerHTML = datos[2].txtTitu;
	document.getElementById("lblltres").innerHTML = datos[2].likes;
	document.getElementById("lbldtres").innerHTML = datos[2].dlikes;
	
	document.getElementById("tcua").innerHTML = datos[3].titulo;
	document.getElementById("pcua").innerHTML = datos[3].txtTitu;
	document.getElementById("lbllcua").innerHTML = datos[3].likes;
	document.getElementById("lbldcua").innerHTML = datos[3].dlikes;
}

function btnLike(fl){
	var dat = JSON.parse(localStorage.getItem("arrEstrenos"));
	
	var auxU = parseInt(dat[0].likes);
	var auxD = parseInt(dat[1].likes);
	var auxT = parseInt(dat[2].likes);
	var auxC = parseInt(dat[3].likes);
	
	if(fl == 1){
		auxU++;
	}else{
		auxU = parseInt(dat[0].likes);
	}
	
	if(fl == 2){
		auxD++;
	}else{
		auxD = parseInt(dat[1].likes);
	}
	
	if(fl == 3){
		auxT++;
	}else{
		auxT = parseInt(dat[2].likes);
	}
	
	if(fl == 4){
		auxC++;
	}else{
		auxC = parseInt(dat[3].likes);
	}
	
	var cls1 = {
		titulo: "Trasher",
		txtTitu: "Revista interesante para las personas chismosasss huy huy uy huy!",
		likes: auxU,
		dlikes : dat[0].dlikes
	};
		
	var cls2 = {
		titulo: "Nat Geo",
		txtTitu: "Revista interesante para las personas con brotes de animal huy huy uy huy!",
		likes: auxD,
		dlikes : dat[1].dlikes
	};
		
	var cls3 = {
		titulo: "Rolex",
		txtTitu: "Revista interesante para las personas extravagantes huy huy uy huy!",
		likes: auxT,
		dlikes : dat[2].dlikes
	};
		
	var cls4 = {
		titulo: "Betterware",
		txtTitu: "Revista interesante para las personas que no conocen los super mercados huy huy uy huy!",
		likes: auxC,
		dlikes : dat[3].dlikes
	};
	
	localStorage.removeItem("arrEstrenos");
	localStorage.setItem("arrEstrenos", "[]");
		
	let datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls1);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls2);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls3);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls4);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
	
	actLikes();
}

function btnDislike(fl){
	var dat = JSON.parse(localStorage.getItem("arrEstrenos"));
	
	var auxU = parseInt(dat[0].dlikes);
	var auxD = parseInt(dat[1].dlikes);
	var auxT = parseInt(dat[2].dlikes);
	var auxC = parseInt(dat[3].dlikes);
	
	if(fl == 1){
		auxU++;
	}else{
		auxU = parseInt(dat[0].dlikes);
	}
	
	if(fl == 2){
		auxD++;
	}else{
		auxD = parseInt(dat[1].dlikes);
	}
	
	if(fl == 3){
		auxT++;
	}else{
		auxT = parseInt(dat[2].dlikes);
	}
	
	if(fl == 4){
		auxC++;
	}else{
		auxC = parseInt(dat[3].dlikes);
	}
	
	var cls1 = {
		titulo: "Trasher",
		txtTitu: "Revista interesante para las personas chismosasss huy huy uy huy!",
		likes: dat[0].likes,
		dlikes : auxU
	};
		
	var cls2 = {
		titulo: "Nat Geo",
		txtTitu: "Revista interesante para las personas con brotes de animal huy huy uy huy!",
		likes: dat[1].likes,
		dlikes : auxD
	};
		
	var cls3 = {
		titulo: "Rolex",
		txtTitu: "Revista interesante para las personas extravagantes huy huy uy huy!",
		likes: dat[2].likes,
		dlikes : auxT
	};
		
	var cls4 = {
		titulo: "Betterware",
		txtTitu: "Revista interesante para las personas que no conocen los super mercados huy huy uy huy!",
		likes: dat[3].likes,
		dlikes : auxC
	};
	
	localStorage.removeItem("arrEstrenos");
	localStorage.setItem("arrEstrenos", "[]");
		
	let datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls1);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls2);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls3);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
		
	datos = JSON.parse(localStorage.getItem("arrEstrenos"));
	datos.push(cls4);
	localStorage.setItem("arrEstrenos", JSON.stringify(datos));
	
	actLikes();
}