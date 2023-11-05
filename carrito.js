
//EL E-COMMERCE ESTARIA RELACIONNADO A LA VENTA DE PRODUCTOS Y ACCESORIOS DE UNA
//EMPRESA QUE SE DEDICA A LA CUSTOMIZACION DE MOTOS

// ESTE ARRAY CONTIENE LOS PRODUCTOS REMERAS QUE SE OFRECESN EN EL LOCAL 

const remerasCustom = [
    {
        id: "001",
        nombre: "MOTORCYCLE ",
        talle: "S  M  L  XL",
        precio: 12500,
        img: "./remeras/motorcycle-back.jpg",
        cantidad: 1
    },

    {
        id: "002",
        nombre: "OILY",
        talle: "S  M  L  XL",
        precio: 11500,
        img: "./remeras/OILY.jpg",
        cantidad: 1
    },

    {
        id: "003",
        nombre: "OR COMPANY",
        talle: "S  M  L  XL",
        precio: 13500,
        img: "./remeras/OR COMPANY.jpg",
        cantidad: 1
    },

    {
        id: "004",
        nombre: "SHAPPER NAR",
        talle: "S  M  L  XL",
        precio: 12800,
        img: "./remeras/shapper-nar.jpg",
        cantidad: 1
    },
]


//CAPTURO EL CONTENEDOR shopContainer
const shopContainer = document.getElementById("shopContainer");

//CAPTURO EL ICONO BOLSA bagCustom
const bagCustom = document.getElementById("bagCustom");

//CAPTURO EL CONTENEDOR bagContainer
const bagContainer = document.getElementById("bagContainer");

// EN ESTE ARRAY VACIO SE AGREGAN LOS PRODUCTOS QUE SE VAYAN COMPRANDO

let carritoCustom = JSON.parse(localStorage.getItem("bagCustom")) || [];

// RECORRO EL ARRAY Y AGREGO LOS ELEMENTOS dentro del  DIV

remerasCustom.forEach(remeras => {
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
            'tu producot esta en el carrito!',
            'success'
        )
    });
});


// la funcion flecha crea las estructura con un div con un titulo y un boton que oculta 
//el contenedor, ademas recorre el carrito q contiene los productos selecionados y calcula el precio total.

const carritoBolsa = () => {
    //cada vez q se haga click en el icono bolsita se limpia el contenedor
    bagContainer.innerHTML = ""
    //muestro el icono bolsita
    bagContainer.style.display = "grid";

    const bagHeader = document.createElement("div");
    bagHeader.className = "bag-header";
    bagHeader.innerHTML = ` <h1 class ="bag-header-title">CUSTOM-BAG<h1>`;

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
    <h3>Remera :${remeras.nombre}<h3>
    <p>Talle: ${remeras.talle}</p>
    <p>cantidad: ${remeras.cantidad}</p> 
    <h2>Precio: ${remeras.precio}$</h2>
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
//funcion flecha para eliminar los productos cuando se hace click en el icono "❌"

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

sesion.addEventListener("click", () => { 
    if (document.getElementById("username").value == "usuario") {
document.getElementById("mensaje").innerHTML=` <h2">acceso correcto <h2>`;
    }
})
