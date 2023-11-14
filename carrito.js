
//EL E-COMMERCE ESTARIA RELACIONNADO A LA VENTA DE PRODUCTOS Y ACCESORIOS DE UNA
//EMPRESA QUE SE DEDICA A LA CUSTOMIZACION DE MOTOS

// ESTE ARRAY CONTIENE LOS PRODUCTOS REMERAS QUE SE OFRECESN EN EL LOCAL 



//CAPTURO EL CONTENEDOR shopContainer
const shopContainer = document.getElementById("shopContainer");

//CAPTURO EL ICONO BOLSA bagCustom
const bagCustom = document.getElementById("bagCustom");

//CAPTURO EL CONTENEDOR bagContainer
const bagContainer = document.getElementById("bagContainer");

//CAPTURO EL CONTENEDOR DEL LOGIN
const loginContainer = document.getElementById("loginContainer");


// EN ESTE ARRAY VACIO SE AGREGAN LOS PRODUCTOS QUE SE VAYAN COMPRANDO

let carritoCustom = JSON.parse(localStorage.getItem("bagCustom")) || [];

//
const getRemeras = async () => {
    const respuestaRemeras = await fetch("remeras.json");
    const dataRemeras = await respuestaRemeras.json();

    // RECORRO EL ARRAY Y AGREGO LOS ELEMENTOS dentro del  DIV

    dataRemeras.forEach(remeras => {
        let contenedor = document.createElement("div");
        contenedor.className = "card"
        contenedor.innerHTML = `
    <img class= "img" src="${remeras.img}">
    <h3 class="remeras">${remeras.nombre}<h3>
    <p class="talle">${remeras.talle}</p>
    <h2 class="precio">${remeras.precio} $</h2>
    `;

        //AGREGO LA ESTRUCTURA HTML AL CONTENEDOR shopContainer

        shopContainer.append(contenedor);

        // CREO UN BOTON Y LO AGREGO AL CONTENEDOR shopContainer

        let comprar = document.createElement("button");

        comprar.className = "comprar";
        comprar.innerText = "comprar";

        contenedor.append(comprar);

        //el boton comprar permite agregar a la bolsa las remeras

        comprar.addEventListener("click", () => {

            const repetida = carritoCustom.some((remeraRepetida) => remeraRepetida.id === remeras.id);

            console.log(repetida);

            if (repetida) {
                carritoCustom.map((rem) => {
                    if (rem.id === remeras.id) {
                        rem.cantidad++;
                    }
                });
            } else {
                carritoCustom.push({
                    id: remeras.id,
                    nombre: remeras.nombre,
                    img: remeras.img,
                    talle: remeras.talle,
                    cantidad: remeras.cantidad,
                    precio: remeras.precio,
                });
                //AGREGO LOS ELEMENTOS AL LOCAL STORAGE
                bagLocal();
            }

            Swal.fire(
                'buenismo!',
                'tu producto esta en el carrito!',
                'success'
            )
        });
    });
};

getRemeras();

// la funcion flecha crea las estructura con un div con un titulo y un boton que oculta 
//el contenedor, ademas recorre el carrito q contiene los productos selecionados y calcula el precio total.

const carritoBolsa = () => {
    //cada vez q se haga click en el icono bolsita se limpia el contenedor
    bagContainer.innerHTML = ""
    //muestro el icono bolsita

    const bagHeader = document.createElement("div");
    bagHeader.className = "bag-header";
    bagHeader.innerHTML = `<h1 class ="bag-header-title">CUSTOM-BAG</h1>`;

    bagContainer.append(bagHeader);

    const bagButton = document.createElement("h2");
    bagButton.innerText = "❎";
    bagButton.className = "bag-header-button";

    bagButton.addEventListener("click", () => {
        bagContainer.style.display = "none";
    })

    bagContainer.append(bagButton);

    carritoCustom.forEach((remeras) => {
        let bagCarrito = document.createElement("div");
        bagCarrito.className = "bag-carrito";
        bagCarrito.innerHTML = `
    <img class = "bag-img" src="${remeras.img}">
    <h3>Remera :${remeras.nombre}</h3>
    <p>Talle: ${remeras.talle}</p>
    <p>cantidad: ${remeras.cantidad}</p> 
    <h3>Precio: ${remeras.precio}$</h3>
    <p>subtotal: ${remeras.cantidad * remeras.precio}</p>
    <spam class ="bag-eliminar"> ❌</spam>
   
    `;
        bagContainer.append(bagCarrito);
        //ME DICE CUANATOS ELEMENTOS TIENE MI ARRAY CARRITOCUSTOM
        console.log(carritoCustom.length);

        let eliminar = bagCarrito.querySelector(".bag-eliminar");

        eliminar.addEventListener("click", () => {
            eliminarRemera(remeras.id);
        })
    });

    const Total = carritoCustom.reduce((acc, rem) => acc + rem.precio * rem.cantidad, 0);

    const bagTotal = document.createElement("div")
    bagTotal.className = "bag-total";
    bagTotal.innerHTML = `El importe total de su compra es ${Total} $`;

    bagContainer.append(bagTotal);
}
//funcion flecha para eliminar los productos cuando se hace click en el icono 

const eliminarRemera = (id) => {

    const buscarId = carritoCustom.find((elremera) => elremera.id === id);

    carritoCustom = carritoCustom.filter((carritoId) => {
        return carritoId !== buscarId;
    });

    carritoBolsa();
    bagLocal();
}

//al hacer click en el icono bolsita muestra el contenido del carrito
bagCustom.addEventListener("click", carritoBolsa)


//LOCAL STORAGE SET

const bagLocal = () => {
    localStorage.setItem("bagCustom", JSON.stringify(carritoCustom));
};


//LOGIN 
//CREO LA ESTRUCTURA DEL FORM DONDE VOPY A PEDIR EL USUARIO Y SU CLAVE

let formLogin = document.createElement("form")
formLogin.id = "formLogin";
formLogin.innerHTML = `
 <input type="text" name="username" id="username-field" class="login-form-field" placeholder="Username">
<input type="password" name="password" id="password-field" class="login-form-field" placeholder="Password">
<input type="submit" value="Login" id="login-form-submit">
<p id="mensajeContainer"><p/>
`;
loginContainer.append(formLogin);

//CAPTURO LO QUE INGRESA EL USUARIO EN LOS INPUTS 

const loginForm = document.getElementById("formLogin");
const loginButton = document.getElementById("login-form-submit");

//COMPARO MEDIANTE UNA FUNCION LO QUE INGRESA EL USUARIO SI 
//LA CONDICION ES VERDADERA
loginButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = formLogin.username.value;
    const password = formLogin.password.value;

    if (username === "user" && password === "pass") {

        //MUESTRO EL SIGUIENTE MENSAJE

        const mensajeContainer = document.getElementById("mensajeContainer");


        mensajeContainer.innerHTML = `sus datos son correctos`;
        mensajeContainer.append(mensajeContainer);
        location.reload();
    } else {
        // SI ES FALSO MUESTRO ESTE MENSAJE
        mensajeContainer.innerHTML = `sus datos son incorrectos, por favor ingrese de nuevo`;
        mensajeContainer.append(mensajeContainer);
        location.reload();

    }
});


//FOOTER

//CAPTURO EL CONTENEDOR PARA PODER CREAR LA ESTRUCTURA HTML DEL FOOTER
const footerContainer = document.getElementById("footerContainer")

//CREO LA ESTRUCTURA HTML QUE VA A CONTENER EL LOGO, DOS PARRAFOS Y LAS REDES SOCIALES
let footerGrupouno = document.createElement("div");
footerGrupouno.className = "grupo-uno"
footerGrupouno.innerHTML = `
    <div class="box">
        <figure>
            <a href="#">
                <img src="./imagenes/logo.png" alt="logo de la empresa">
            </a>
        </figure>
    </div>
    <div class="box">
        <h2>SOBRE NOSOTROS</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quo, optio ipsam saepe vitae</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus quo, optio ipsam saepe vitae</p>
    </div>
    <div class="box">
        <h2>SIGUENOS</h2>
        <div class="red-social">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-instagram"></i></a>
            <a href="#"><i class="bi bi-twitter-x"></i></a>
            <a href="#"><i class="bi bi-threads"></i></a>
        </div>
    </div>
`;
//AGREGO LA ESTRUCTURA HTML AL CONTENEDOR
footerContainer.append(footerGrupouno);

//CREO LA ESTRUCTURA HTML 
let footerGrupodos = document.createElement("div")
footerGrupodos.className = "grupo-dos"
footerGrupodos.innerHTML = `<small> <i class="bi bi-c-circle"></i><b> TODOS LOS DERECHOS RESERVADOS<b/></small>`;
//AGREGO LA ESTRUCTURA HTML AL CONTENEDOR
footerContainer.append(footerGrupodos);
