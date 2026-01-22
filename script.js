// Clase viaje (clase base)
class Viaje {
    constructor(codigo, destino, precio, disponibilidad = true) {
        this.codigo = codigo;
        this.destino = destino;
        this.precio = precio;
        this.disponibilidad = disponibilidad;
    }

    //metodo que devuelve un texto descriptivo del viaje
    getInfo() {
        return `Viaje [${this.codigo}] a ${this.destino}, precio: ${this.precio} euros`;
    }
}

// Clase vuelo (hereda de viaje)
class Vuelo extends Viaje {
    //Llamamos al constructor de viaje
    constructor(codigo, destino, precio, aerolinea, duracion) {
        super(codigo, destino, precio);
        //estas propiedades si son propias de la clase vuelo
        this.aerolinea = aerolinea;
        this.duracion = duracion;
    }

    // Con el super reutilizamos el metodo y le añadimos algo de informacion extra
    getInfo() {
        return `${super.getInfo()}, Aerolínea: ${this.aerolinea}, Duración: ${this.duracion} horas`;
    }
}

// Clase Hotel (hereda de Viaje)
class Hotel extends Viaje {
    // Es igual que la clase vuelo, llamamos al constructor de viaje
    constructor(codigo, destino, precio, estrellas, tipoHabitacion) {
        super(codigo, destino, precio);
        // Y estas propiedades son propias de la clase hotel
        this.estrellas = estrellas;
        this.tipoHabitacion = tipoHabitacion;
    }

    getInfo() {
        return `${super.getInfo()}, Hotel ${this.estrellas} estrellas, Habitación: ${this.tipoHabitacion}`;
    }
}

// Clase Paquete (hereda de Viaje)
class Paquete extends Viaje {
    constructor(codigo, destino, precio, vuelo, hotel) {
        super(codigo, destino, precio);
        // Objetos de la clase paquete
        this.vuelo = vuelo;
        this.hotel = hotel;
    }

    //LLamamos a metodos de otros objetos
    getInfo() {
        return `${super.getInfo()}
- Vuelo: ${this.vuelo.getInfo()}
- Hotel: ${this.hotel.getInfo()}`;
    }
}

// Clase Cliente ( es la que representa a una persona)
class Cliente {
    constructor(nombre, apellido, email, telefono) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
    }

    // Metodo que devuelve una version corta del cliente
    getResumen() {
        return `${this.nombre} ${this.apellido}`;
    }
}

// Clase Reserva (Relaciona cliente y viaje)
class Reserva {
    constructor(cliente, viaje) {
        this.cliente = cliente;
        this.viaje = viaje;
    }
    // Devuelve un resumen del cliente y del viaje
    getResumen() {
        return `${this.cliente.getResumen()} → ${this.viaje.destino}`;
    }
}

// Lee los clientes del localStorage y convierte el JSON en un array
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let viajes = JSON.parse(localStorage.getItem("viajes")) || [];
let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

// Estas son las referencias al DOM, permite leer valores y modificar el html de forma dinamica

// Clientes
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono");
const btnCliente = document.getElementById("btnCliente");
const listaClientes = document.getElementById("listaClientes");

// Viajes
const codigo = document.getElementById("codigo");
const destino = document.getElementById("destino");
const precio = document.getElementById("precio");
const tipoViaje = document.getElementById("tipoViaje");
const btnViaje = document.getElementById("btnViaje");
const listaViajes = document.getElementById("listaViajes");

// Reservas
const selectCliente = document.getElementById("selectCliente");
const selectViaje = document.getElementById("selectViaje");
const btnReserva = document.getElementById("btnReserva");
const listaReservas = document.getElementById("listaReservas");

// Funciones

function mostrarClientes() {
    //Limpia la tabla 
    listaClientes.innerHTML = "";
    //Recorre el array de clientes
    clientes.forEach((c, index) => {
        // Esto inserta los datos dentro de la tabla
        listaClientes.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.apellido}</td>
                <td>${c.email}</td>
                <td>${c.telefono}</td>
                 <td>
                    <button onclick="eliminarCliente(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}


function mostrarViajes() {
    listaViajes.innerHTML = "";
    viajes.forEach((v, index) => {
        listaViajes.innerHTML += `
            <tr>
                <td>${v.codigo}</td>
                <td>${v.destino}</td>
                <td>${v.precio}</td>
                <td>${v.constructor.name}</td>
                <td>
                    <button onclick="eliminarViaje(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

// muestra la relacion de cliente y viaje
function mostrarReservas() {
    listaReservas.innerHTML = "";
    reservas.forEach((r, index) => {
        listaReservas.innerHTML += `
            <tr>
                <td>${r.cliente.nombre} ${r.cliente.apellido}</td>
                <td>${r.viaje.destino}</td>
                <td>
                    <button onclick="cancelarReserva(${index})">Cancelar</button>
                </td>
            </tr>
        `;
    });
}

// Se guarda el índice del array, es para saber qué cliente o viaje se seleccionó
function cargarSelects() {
    selectCliente.innerHTML = "";
    selectViaje.innerHTML = "";

    clientes.forEach((c, index) => {
        selectCliente.innerHTML += `<option value="${index}">${c.nombre} ${c.apellido}</option>`;
    });

    viajes.forEach((v, index) => {
        selectViaje.innerHTML += `<option value="${index}">${v.destino}</option>`;
    });

    if (clientes.length > 0) {
    selectCliente.selectedIndex = 0;
}

if (viajes.length > 0) {
    selectViaje.selectedIndex = 0;
}
}

// Función para eliminar clientes
function eliminarCliente(index) {
    clientes.splice(index, 1);
    localStorage.setItem("clientes", JSON.stringify(clientes));
    mostrarClientes();
    cargarSelects();
}

// Funcion para eliminar viajes
function eliminarViaje(index) {
    viajes.splice(index, 1);
    localStorage.setItem("viajes", JSON.stringify(viajes));
    mostrarViajes();
    cargarSelects();
}

// Funcion para eliminar reservas
function cancelarReserva(index) {
    reservas.splice(index, 1);
    localStorage.setItem("reservas", JSON.stringify(reservas));
    mostrarReservas();
}

//Eventos 

// Añadir cliente (crea un objeto cliente y lo añade al array)
btnCliente.addEventListener("click", () => {
    const cliente = new Cliente(
        nombre.value,
        apellido.value,
        email.value,
        telefono.value
    );

    clientes.push(cliente);
    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();
    cargarSelects();
});

// Añadir viaje
btnViaje.addEventListener("click", () => {
    let viaje;

    if (tipoViaje.value === "vuelo") {
        viaje = new Vuelo(codigo.value, destino.value, precio.value, "Aerolínea Genérica", 2);
    } 
    else if (tipoViaje.value === "hotel") {
        viaje = new Hotel(codigo.value, destino.value, precio.value, 4, "Doble");
    } 
    else {
        const vuelo = new Vuelo("V001", destino.value, 150, "Air JS", 2.5);
        const hotel = new Hotel("H001", destino.value, 100, 3, "Doble");
        viaje = new Paquete(codigo.value, destino.value, precio.value, vuelo, hotel);
    }

    viajes.push(viaje);
    localStorage.setItem("viajes", JSON.stringify(viajes));

    mostrarViajes();
    cargarSelects();
});

// Crear reserva
btnReserva.addEventListener("click", () => {

    if (clientes.length === 0 || viajes.length === 0) {
        alert("Se necesita al menos un cliente y un viaje para reservar");
        return;
    }

    if (selectCliente.value === "" || selectViaje.value === "") {
        alert("Selecciona un cliente y un viaje");
        return;
    }

    const cliente = clientes[selectCliente.value];
    const viaje = viajes[selectViaje.value];

    const reserva = new Reserva(cliente, viaje);
    reservas.push(reserva);

    localStorage.setItem("reservas", JSON.stringify(reservas));

    mostrarReservas();
});

// Inicio (Para que al recargar la página los datos cargados se vuelvan a mostrar)
mostrarClientes();
mostrarViajes();
mostrarReservas();
cargarSelects();
