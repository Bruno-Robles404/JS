

let edad = parseInt(prompt("por favor ingrese su edad: "));

let mercado_Pago = parseInt(prompt("por favor ingrese su login de Mercado Libre :"))

const LOGIN = 567;

while (edad >= 18 && mercado_Pago === LOGIN) {

    alert("los datos son correctos. Bienvenido al HOT SALE!")

    let producto = prompt('por favor elija una marca para ver las promociones:  1: Nike 2: Adidas  3: Rebook   4:Converse ')

    switch (producto) {
        case "1":
            alert("tenes un 8% de descuento en remeras ")
            break;
        case "2":
            alert("tenes un 10% de descuento en short")
            break;
        case "3":
            alert("tenes un 12% de descuento en zapatillas")
            break;
        default:
            alert("tenes un 18% de descuento en Buzos pagando con Mercado Pago")
            break;
    }
    alert("¿Hay algo más que  quisiera consultar?");
}
alert("los datos ingresados som incorrectos");

edad = parseInt(prompt("por favor ingrese nuevamente su edad :"));

mercado_Pago = parseInt(prompt("por favor ingrese nuevamente su login de Mercado Libre"));

