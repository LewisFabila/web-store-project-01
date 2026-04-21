/**
 * CATÁLOGO DE PRODUCTOS
 * 
 * Este módulo maneja la funcionalidad principal de la tienda:
 * - Almacenamiento de catálogo de productos
 * - Renderizado dinámico de productos en la galería
 * - Filtrado por categorías (Vinilos y Peluches)
 * - Agregar productos al carrito
 * - Actualización del contador del carrito
 * - Sincronización con localStorage
 */

// Información de las figuras disponibles en formato JSON (Vinilos y Peluches).
const productos = [
    // Vinilos
    {
        id: "vinyl-01",
        titulo: "Heisenberg",
        imagen: "./img/vinyl/01.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-02",
        titulo: "All Might",
        imagen: "./img/vinyl/02.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-03",
        titulo: "Titan Eren",
        imagen: "./img/vinyl/03.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-04",
        titulo: "Web of Spider-Man #1",
        imagen: "./img/vinyl/04.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 800
    },
    {
        id: "vinyl-05",
        titulo: "Homelander",
        imagen: "./img/vinyl/05.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-06",
        titulo: "Demogorgon",
        imagen: "./img/vinyl/06.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-07",
        titulo: "Woah Crash",
        imagen: "./img/vinyl/07.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    {
        id: "vinyl-08",
        titulo: "Ezio",
        imagen: "./img/vinyl/08.jpg",
        categoria: {
            nombre: "Figuras Vinyl",
            id: "vinyl"
        },
        precio: 600
    },
    // Peluches
    {
        id: "plush-01",
        titulo: "Toph 9in",
        imagen: "./img/plush/01.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-02",
        titulo: "Reptar 9in",
        imagen: "./img/plush/02.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-03",
        titulo: "Puar 9in",
        imagen: "./img/plush/03.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-04",
        titulo: "Pochita 2ft",
        imagen: "./img/plush/04.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 1200
    },
    {
        id: "plush-05",
        titulo: "Mechagodzilla 9in",
        imagen: "./img/plush/05.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 700
    },
    {
        id: "plush-06",
        titulo: "Plankton 9in",
        imagen: "./img/plush/06.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-07",
        titulo: "Butters Bear 9in",
        imagen: "./img/plush/07.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    },
    {
        id: "plush-08",
        titulo: "Ghost Face 9in",
        imagen: "./img/plush/08.jpg",
        categoria: {
            nombre: "Peluches",
            id: "plush"
        },
        precio: 600
    }
];

// ========== ELEMENTOS DEL DOM ==========
// Referencias a contenedores y botones principales
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

// Renderiza dinámicamente los productos en la galería.
function cargarProductos(productosElegidos) {
    contenedorProductos.innerHTML = ""; // Limpia el contenedor de productos.
    productosElegidos.forEach(producto => { // Itera sobre cada producto y crea un elemento HTML.
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;
        contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}

cargarProductos(productos);

// Filtrar productos por categoría (Todos, Vinilos, Peluches).
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {
        botonesCategorias.forEach(boton => boton.classList.remove("active")); // Remueve la clase "active" de todos los botones.
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else { // Si se selecciona "Todos" muestra todos los productos.
            tituloPrincipal.innerText = "Todos los Productos";
            cargarProductos(productos);
        }
    })
});

// Actualiza los event listeners de los botones "Agregar".
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar"); // Reselecciona todos los botones de agregar del DOM.
    botonesAgregar.forEach(boton => { 
        boton.addEventListener("click", agregarAlCarrito); // Asigna un listener de click a cada botón.
    });
}

// ========== INICIALIZACIÓN DEL CARRITO ==========
// Recupera los productos del carrito desde el almacenamiento local del navegador.
let productosEnCarrito;
let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

// Si existe un carrito guardado, lo recupera; si no, inicializa un array vacío.
if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

// Agrega un producto al carrito o incrementa su cantidad.
function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id; // Obtiene el ID del producto desde el ID del botón.
    const productoAgregado = productos.find(producto => producto.id === idBoton);
    if(productosEnCarrito.some(producto => producto.id === idBoton)) { // Si el producto ya está en el carrito incrementa la cantidad.
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else { //Si es nuevo: agrega el producto con cantidad 1
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }
    actualizarNumerito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Guarda los cambios en localStorage.
}

// Actualiza el contador de productos en el carrito.
function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0); // Utiliza reduce() para sumar todas las cantidades de productos.
    numerito.innerText = nuevoNumerito; // Actualiza el texto del contador visible en la interfaz.
}