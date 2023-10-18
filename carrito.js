
//EL E-COMMERCE ESTARIA RELACIONNADO A LA VENTA DE PRODUCTOS Y ACCESORIOS DE UNA
//EMPRESA QUE SE DEDICA A LA CUSTOMIZACION DE MOTOS

// ESTE ARRAY CONTIENE LOS PRODUCTOS REMERAS QUE SE OFRECESN EN EL LOCAL 

const remerasCustom = [
    {
        id: "001",
        nombre: "MOTORCYCLE ",
        talle: "S  M  L  XL",
        precio: 12500,
        img: "./remeras/motorcycle-back.jpg"
    },

    {
        id: "002",
        nombre: "OILY",
        talle: "S  M  L  XL",
        precio: 11500,
        img: "./remeras/OILY.jpg"
    },

    {
        id: "003",
        nombre: "OR COMPANY",
        talle: "S  M  L  XL",
        precio: 13500,
        img: "./remeras/OR COMPANY.jpg",
    },

    {
        id: "004",
        nombre: "SHAPPER NAR",
        talle: "S  M  L  XL",
        precio: 12800,
        img: "./remeras/shapper-nar.jpg",
    },
]


//CAPTURO EL CONTENEDOR shopContainer
const shopContainer = document.getElementById("shopContainer");

//CAPTURO EL ICONO BOLSA bagCustom
const bagCustom = document.getElementById("bagCustom");

//CAPTURO EL CONTENEDOR bagContainer
const bagContainer = document.getElementById("bagContainer");

// EN ESTE ARRAY VACIO SE AGREGAN LOS PRODUCTOS QUE SE VAYAN COMPRANDO

let carritoCustom = []

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

    //AGREGO LA ESTRUCTURA HTMAL AL CONTENEDOR shopContainer

    shopContainer.append(contenedor);

    // CREO UN BOTON Y LO AGREGO AL CONTENEDOR shopContainer

    let comprar = document.createElement("button");

    comprar.className = "comprar";
    comprar.innerText = "comprar";

    contenedor.append(comprar);
//el boton comprar permite agregar a la bolsa las remeras

    comprar.addEventListener("click", () => {
        carritoCustom.push({
            id: remeras.id,
            nombre: remeras.nombre,
            img: remeras.img,
            talle: remeras.talle,
            precio: remeras.precio
        })

        //esto es para ver si funciona
        console.log(carritoCustom)
    })
});


// la funcion flecha crea las estructura me permite crear  un div con un titulo y un boton que oculta 
//el contenedor, ademas recorre el carrito q contiene los productos selecionados y calcula el precio total.

const carritoBolsa = () => {
//cada vez q se haga click en el icono bolsita se limpia el contenedor
    bagContainer.innerHTML = ""
//muestro el icono bolsita
    bagContainer.style.display = "flex";

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
    <h3>${remeras.nombre}<h3>
    <p>${remeras.talle}</p>
    <h2>${remeras.precio}$</h2>
    `;
        bagContainer.append(bagCarrito);

        let bagEliminar = document.createElement("spam");
        bagEliminar.innerText = "❌";
        bagEliminar.className = "bag-eliminar";

        bagContainer.append(bagEliminar)

        bagEliminar.addEventListener("click", eliminarRemera);
    });

    const Total = carritoCustom.reduce((acc, rem) => acc + rem.precio, 0);

    const bagTotal = document.createElement("div")
    bagTotal.className = "bag-total";
    bagTotal.innerHTML = `El importe total de su compra es ${Total} $`;

    bagContainer.append(bagTotal);
}
//funcion flecha para eliminar los productos cuando se hace click en el icono "❌"

const eliminarRemera = () => {

    const buscarId = carritoCustom.find((elremera) => elremera.id);

    carritoCustom = carritoCustom.filter((carritoId) => {
        return carritoId !== buscarId;
    });

    carritoBolsa();
}

//al hacer click en el icono bolsita muetra el contenmido de dle carrito
bagCustom.addEventListener("click", carritoBolsa)



