/*
 * CARRITO DE COMPRAS
 * 
 * Este módulo maneja toda la lógica del carrito de compras:
 * - Carga de productos almacenados en localStorage.
 * - Renderizado de productos en la interfaz.
 * - Eliminación de productos individuales.
 * - Vaciado del carrito.
 * - Cálculo del total.
 * - Proceso de "compra".
 */

// Recupera los productos del carrito desde el almacenamiento local del navegador.
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

// ========== ELEMENTOS DEL DOM ==========
// Referencias a los contenedores principales del carrito.
const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");

// Botones y elementos de interacción.
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

// Renderiza los productos del carrito en la interfaz del usuario.
function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){ // Si hay productos en el carrito muestra la lista de productos.
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
        contenedorCarritoProductos.innerHTML = "";
        productosEnCarrito.forEach(producto => { // Genera el HTML dinámico para cada producto con sus detalles.
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                    <div class="carrito-producto-titulo">
                        <small> Nombre </small>
                        <h3> ${producto.titulo} </h3>
                    </div>
                    <div class="carrito-producto-cantidad">
                        <small> Cantidad </small>
                        <p> ${producto.cantidad} </p>
                    </div>
                    <div class="carrito-producto-precio">
                        <small> Precio </small>
                        <p> $${producto.precio} </p>
                    </div>
                    <div class="carrito-producto-subtotal">
                        <small> Subtotal </small>
                        <p> $${producto.precio * producto.cantidad} </p>
                    </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"> <i class="bi bi-trash3-fill"></i> </button>
            `;
            contenedorCarritoProductos.append(div);
        })
    } else { //Si el carrito está vacío muestra mensaje de "carrito vacío".
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    actualizarBotonesEliminar(); //Actualiza los botones de eliminar y el total.
    actualizarTotal();
}

cargarProductosCarrito();

/* Actualiza los event listeners de todos los botones eliminar.
 * Nota: Se llama después de cargar productos para evitar perder referencias.
 */
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

// Elimina un producto específico del carrito.
function eliminarDelCarrito(e){
    const idBoton = e.currentTarget.id; // Obtiene el ID del botón pulsado.
    const index = productosEnCarrito.findIndex(producto => producto.id === idBoton); // Obtiene el ID del producto desde idBoton.
    productosEnCarrito.splice(index, 1); // Encuentra y elimina el producto del array.
    cargarProductosCarrito();
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualiza el localStorage.
}

botonVaciar.addEventListener("click", vaciarCarrito);
// Elimina todos los productos del carrito.
function vaciarCarrito(){
    productosEnCarrito.length = 0; // Limpia el array de productos.
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualiza el localStorage.
    cargarProductosCarrito();
}

// Calcula y muestra el precio total del carrito.
function actualizarTotal(){
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); // Utiliza reduce() para sumar todos los subtotales.
    total.innerText = `$${totalCalculado}`; // Actualiza el texto del contenedor de total en la interfaz.
}

botonComprar.addEventListener("click", comprarCarrito);
// Completa la "compra" y actualiza la interfaz de confirmación.
function comprarCarrito(){
    productosEnCarrito.length = 0; // Vacía el array de productos.
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito)); // Actualiza el localStorage.
    // Oculta elementos del carrito.
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled"); // Muestra mensaje de compra completada.
}