document.addEventListener('DOMContentLoaded', () => {
    const formularioRegistro = document.getElementById('formularioRegistro');
    if (formularioRegistro) {
        const entradaNombreCompleto = document.getElementById('nombreCompleto');
        const entradaCorreoElectronico = document.getElementById('correoElectronico');
        const entradaContrasenaRegistro = document.getElementById('contrasenaRegistro');
        const entradaConfirmarContrasenaRegistro = document.getElementById('confirmarContrasenaRegistro');
        const entradaTelefono = document.getElementById('telefono');
        const contenedorMascotas = document.getElementById('contenedorMascotas');
        const botonAgregarMascota = document.getElementById('agregarMascota');
        const mensajeRegistro = document.getElementById('mensajeRegistro');
        let contadorMascotas = 0;

        const agregarNuevaMascota = () => {
            const nuevoItemMascota = document.createElement('div');
            nuevoItemMascota.classList.add('item-mascota', 'mb-3', 'p-3', 'border', 'rounded', 'bg-white', 'shadow-sm');
            nuevoItemMascota.innerHTML = `
                <div class="mb-3">
                    <label for="tipoMascota_${contadorMascotas}" class="form-label">Tipo de Mascota</label>
                    <select class="form-select" id="tipoMascota_${contadorMascotas}" name="tipoMascota[]" required>
                        <option value="">Selecciona...</option>
                        <option value="Gato">Gato</option>
                        <option value="Perro">Perro</option>
                        <option value="Ave">Ave</option>
                        <option value="Otro">Otro</option>
                    </select>
                    <div class="invalid-feedback">Por favor, selecciona el tipo de mascota.</div>
                </div>
                <div class="mb-3">
                    <label for="nombreMascota_${contadorMascotas}" class="form-label">Nombre de Mascota</label>
                    <input type="text" class="form-control" id="nombreMascota_${contadorMascotas}" name="nombreMascota[]" required maxlength="50" placeholder="Nombre de tu mascota" />
                    <div class="invalid-feedback">Por favor, ingresa el nombre de la mascota (máx. 50 caracteres).</div>
                </div>
                <button type="button" class="btn btn-outline-danger btn-sm mt-2 eliminar-mascota">Eliminar Mascota</button>
            `;
            contenedorMascotas.appendChild(nuevoItemMascota);

            nuevoItemMascota.querySelector('.eliminar-mascota').addEventListener('click', (evento) => {
                evento.target.closest('.item-mascota').remove();
            });
            contadorMascotas++;
        };

        if (contenedorMascotas.querySelectorAll('.item-mascota').length === 0) {
            agregarNuevaMascota();
        }

        botonAgregarMascota.addEventListener('click', agregarNuevaMascota);

        formularioRegistro.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            mensajeRegistro.classList.add('d-none');
            mensajeRegistro.classList.remove('alert-success', 'alert-danger');

            let formularioValido = true;

            const regexNombre = /^[A-Za-z\s]+$/;
            if (entradaNombreCompleto.value.trim() === '' || !regexNombre.test(entradaNombreCompleto.value) || entradaNombreCompleto.value.length > 50) {
                entradaNombreCompleto.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaNombreCompleto.classList.remove('is-invalid');
                entradaNombreCompleto.classList.add('is-valid');
            }

            const regexCorreoRegistro = /^(?=.{1,100}$)([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$/;
            if (!regexCorreoRegistro.test(entradaCorreoElectronico.value)) {
            entradaCorreoElectronico.classList.add('is-invalid');
            formularioValido = false;
            } else {
             entradaCorreoElectronico.classList.remove('is-invalid');
             entradaCorreoElectronico.classList.add('is-valid');
            }

            const valorContrasena = entradaContrasenaRegistro.value;
            const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!*?])[A-Za-z\d@#$%^&!*?]{8,}$/;
            if (!patronContrasena.test(valorContrasena)) {
                entradaContrasenaRegistro.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaContrasenaRegistro.classList.remove('is-invalid');
                entradaContrasenaRegistro.classList.add('is-valid');
            }

            if (valorContrasena !== entradaConfirmarContrasenaRegistro.value || entradaConfirmarContrasenaRegistro.value.trim() === '') {
                entradaConfirmarContrasenaRegistro.classList.add('is-invalid');
                document.getElementById('retroalimentacionConfirmarContrasenaRegistro').textContent = 'Las contraseñas no coinciden.';
                formularioValido = false;
            } else {
                entradaConfirmarContrasenaRegistro.classList.remove('is-invalid');
                entradaConfirmarContrasenaRegistro.classList.add('is-valid');
            }

            const valorTelefono = entradaTelefono.value.trim();
            const regexTelefono = /^\+?[0-9]{8,15}$/;
            if (valorTelefono !== '' && !regexTelefono.test(valorTelefono)) {
                entradaTelefono.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaTelefono.classList.remove('is-invalid');
                entradaTelefono.classList.add('is-valid');
            }

            const entradasTipoMascota = document.querySelectorAll('select[name="tipoMascota[]"]');
            const entradasNombreMascota = document.querySelectorAll('input[name="nombreMascota[]"]');

            entradasTipoMascota.forEach((entrada) => {
                if (entrada.value === '') {
                    entrada.classList.add('is-invalid');
                    formularioValido = false;
                } else {
                    entrada.classList.remove('is-invalid');
                    entrada.classList.add('is-valid');
                }
            });

            entradasNombreMascota.forEach((entrada) => {
                if (entrada.value.trim() === '' || entrada.value.length > 50) {
                    entrada.classList.add('is-invalid');
                    formularioValido = false;
                } else {
                    entrada.classList.remove('is-invalid');
                    entrada.classList.add('is-valid');
                }
            });

            if (formularioValido) {
                const usuarioRegistrado = {
                    nombreCompleto: entradaNombreCompleto.value.trim(),
                    correo: entradaCorreoElectronico.value.trim(),
                    contrasena: entradaContrasenaRegistro.value
                };
                localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado));

                mensajeRegistro.textContent = '¡Registro exitoso en KittyPatitasSuaves! Ahora puedes iniciar sesión.';
                mensajeRegistro.classList.remove('d-none');
                mensajeRegistro.classList.add('alert-success');

                formularioRegistro.reset();
                formularioRegistro.classList.remove('was-validated');
                entradaNombreCompleto.classList.remove('is-valid', 'is-invalid');
                entradaCorreoElectronico.classList.remove('is-valid', 'is-invalid');
                entradaContrasenaRegistro.classList.remove('is-valid', 'is-invalid');
                entradaConfirmarContrasenaRegistro.classList.remove('is-valid', 'is-invalid');
                entradaTelefono.classList.remove('is-valid', 'is-invalid');
                contenedorMascotas.innerHTML = '<h5 class="text-primary mb-3">Registro de Mascotas</h5>';
                contadorMascotas = 0;
                agregarNuevaMascota();
            } else {
                formularioRegistro.classList.add('was-validated');
                mensajeRegistro.textContent = 'Por favor, corrige los errores en el formulario de registro.';
                mensajeRegistro.classList.remove('d-none');
                mensajeRegistro.classList.add('alert-danger');
            }
        });
    }

    const formularioAcceso = document.getElementById('formularioAcceso');
    if (formularioAcceso) {
        const entradaCorreoAcceso = document.getElementById('correoAcceso');
        const entradaContrasenaAcceso = document.getElementById('contrasenaAcceso');
        const mensajeAcceso = document.getElementById('mensajeAcceso');

        formularioAcceso.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            mensajeAcceso.classList.add('d-none');
            mensajeAcceso.classList.remove('alert-success', 'alert-danger');

            entradaCorreoAcceso.classList.remove('is-valid', 'is-invalid');
            entradaContrasenaAcceso.classList.remove('is-valid', 'is-invalid');

            let accesoValido = true;

            const valorCorreoAcceso = entradaCorreoAcceso.value.trim();
            const regexCorreoAcceso = /^(?=.{1,100}$)([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$/;
            if (valorCorreoAcceso === '' || !regexCorreoAcceso.test(valorCorreoAcceso)) {
                entradaCorreoAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaCorreoAcceso.classList.add('is-valid');
            }

            const valorContrasenaAcceso = entradaContrasenaAcceso.value.trim();
            if (valorContrasenaAcceso === '' || valorContrasenaAcceso.length < 4 || valorContrasenaAcceso.length > 10) {
                entradaContrasenaAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaContrasenaAcceso.classList.add('is-valid');
            }

            if (accesoValido) {
                const usuario = entradaCorreoAcceso.value.trim();
                const contrasena = entradaContrasenaAcceso.value;

                const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado'));

                if (usuarioRegistrado && usuario === usuarioRegistrado.correo && contrasena === usuarioRegistrado.contrasena) {
                    const nombreUsuario = usuarioRegistrado.nombreCompleto?.trim();
                    
                    if (nombreUsuario) {
                        mensajeAcceso.textContent = `¡Inicio de sesión exitoso! Bienvenido, ${nombreUsuario} (${usuario})`;
                    } else {
                        mensajeAcceso.textContent = `¡Inicio de sesión exitoso! Bienvenido, ${usuario}`;
                    }

                    mensajeAcceso.classList.remove('d-none', 'alert-danger');
                    mensajeAcceso.classList.add('alert-success');

                    formularioAcceso.reset();
                    formularioAcceso.classList.remove('was-validated');
                } else {
                    mensajeAcceso.textContent = 'Correo electrónico o contraseña incorrectos.';
                    mensajeAcceso.classList.remove('d-none', 'alert-success');
                    mensajeAcceso.classList.add('alert-danger');
                    entradaCorreoAcceso.classList.remove('is-valid');
                    entradaCorreoAcceso.classList.add('is-invalid');
                    entradaContrasenaAcceso.classList.remove('is-valid');
                    entradaContrasenaAcceso.classList.add('is-invalid');
                }
            } else {
                formularioAcceso.classList.add('was-validated');
                mensajeAcceso.textContent = 'Por favor, ingresa credenciales válidas.';
                mensajeAcceso.classList.remove('d-none', 'alert-success');
                mensajeAcceso.classList.add('alert-danger');
            }
        });
    }

    const formularioSoporte = document.getElementById('formularioSoporte');
    if (formularioSoporte) {
        const nombreSoporte = document.getElementById('nombreSoporte');
        const correoSoporte = document.getElementById('correoSoporte');
        const comentarioSoporte = document.getElementById('comentarioSoporte');
        const mensajeSoporte = document.getElementById('mensajeSoporte');

        formularioSoporte.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            let formularioValido = true;
            mensajeSoporte.classList.add('d-none');
            mensajeSoporte.classList.remove('alert-success', 'alert-danger');

            if (nombreSoporte.value.trim() === '' || nombreSoporte.value.length > 100) {
                nombreSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                nombreSoporte.classList.remove('is-invalid');
                nombreSoporte.classList.add('is-valid');
            }

            const regexCorreoSoporte = /^(?=.{1,100}$)([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$/;
            if (correoSoporte.value.trim() === '' || !regexCorreoSoporte.test(correoSoporte.value)) {
                correoSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                correoSoporte.classList.remove('is-invalid');
                correoSoporte.classList.add('is-valid');
            }

            if (comentarioSoporte.value.trim() === '' || comentarioSoporte.value.length > 500) {
                comentarioSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                comentarioSoporte.classList.remove('is-invalid');
                comentarioSoporte.classList.add('is-valid');
            }

            if (formularioValido) {
                mensajeSoporte.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                mensajeSoporte.classList.remove('d-none');
                mensajeSoporte.classList.add('alert-success');
                formularioSoporte.reset();
                formularioSoporte.classList.remove('was-validated');
                nombreSoporte.classList.remove('is-valid', 'is-invalid');
                correoSoporte.classList.remove('is-valid', 'is-invalid');
                comentarioSoporte.classList.remove('is-valid', 'is-invalid');
            } else {
                formularioSoporte.classList.add('was-validated');
                mensajeSoporte.textContent = 'Por favor, corrige los errores en el formulario.';
                mensajeSoporte.classList.remove('d-none');
                mensajeSoporte.classList.add('alert-danger');
            }
        });
    }

    const parametrosURL = new URLSearchParams(window.location.search);
    const categoriaActual = parametrosURL.get('categoria');
    const tituloCategoria = document.getElementById('tituloCategoria');
    const contenedorInventario = document.getElementById('contenedorInventario');
    const botonPagar = document.getElementById('btnPagar');

    const todosLosProductos = {
        juguetes: [
            { id: 1, nombre: 'Pelota para perro', precio: 5000, stock: 10, imagen: 'img/pelotaperro.jpg', descripcion: 'Pelota resistente ideal para juegos de lanzar y buscar. Flota en el agua.', imagenesAdicionales: ['img/pelota2.webp', 'img/pelota3.jpg'] },
            { id: 2, nombre: 'Ratón de juguete para gato', precio: 3000, stock: 8, imagen: 'img/raton.jpeg', descripcion: 'Juguete suave con catnip para estimular el instinto de caza de tu gato.', imagenesAdicionales: ['img/ratomcito.jpg', 'img/ratomcitos.webp'] },
            { id: 3, nombre: 'Cuerda para morder', precio: 7000, stock: 5, imagen: 'img/morder.jpg', descripcion: 'Cuerda de algodón duradera para perros, ayuda a limpiar los dientes.', imagenesAdicionales: ['img/cuerda2.jpg', 'img/cuerda3.jpg'] },
            { id: 4, nombre: 'Juguete interactivo', precio: 12000, stock: 26, imagen: 'img/juguetepuzzleparaperros.webp', descripcion: 'Juguete dispensador de premios que desafía la mente de tu mascota.', imagenesAdicionales: ['img/interactivo.webp', 'img/interactivo2.jpg'] },
            { id: 5, nombre: 'Pelota con sonido', precio: 8000, stock: 17, imagen: 'img/pelota.jpg', descripcion: 'Pelota que emite sonidos divertidos al ser mordida, ideal para mantener a tu perro entretenido.', imagenesAdicionales: ['img/sound.webp', 'img/sound2.webp'] }
        ],
        accesorios: [
            { id: 6, nombre: 'Collar para perro', precio: 10000, stock: 10, imagen: 'img/collar.webp', descripcion: 'Collar ajustable y resistente para perros de tamaño mediano a grande.', imagenesAdicionales: ['img/colgante.jpg', 'img/collarcorrea.jpg'] },
            { id: 7, nombre: 'Correa ajustable', precio: 12000, stock: 8, imagen: 'img/accesorio.jpg', descripcion: 'Correa de nylon con longitud ajustable, ideal para paseos diarios.', imagenesAdicionales: ['img/collarcorrea.jpg', 'img/accesorio.jpg'] },
            { id: 8, nombre: 'Arnés para perro', precio: 15000, stock: 5, imagen: 'img/collarcorrea.jpg', descripcion: 'Arnés cómodo y seguro que distribuye la presión uniformemente.', imagenesAdicionales: ['img/collar.webp', 'img/accesorio.jpg'] },
            { id: 9, nombre: 'Cama para gato', precio: 20000, stock: 6, imagen: 'img/cama.webp', descripcion: 'Cama suave y acogedora para gatos, con bordes elevados para mayor confort.', imagenesAdicionales: ['img/rasca.webp', 'img/pelucheeees.jpg'] }
        ],
        alimentos: [
            { id: 10, nombre: 'Comida seca para perros', precio: 25000, stock: 10, imagen: 'img/master.jpeg', descripcion: 'Alimento completo y balanceado para perros adultos, con proteínas de alta calidad.', imagenesAdicionales: ['img/premium.jpg', 'img/premiumm.jpg'] },
            { id: 11, nombre: 'Comida húmeda para gatos', precio: 15000, stock: 18, imagen: 'img/lata.jpg', descripcion: 'Paté delicioso y nutritivo para gatos, ideal para complementar su dieta.', imagenesAdicionales: ['img/gatocomida.png', 'img/lata.jpg'] },
            { id: 12, nombre: 'Snacks para perros', precio: 8000, stock: 15, imagen: 'img/snackperro.png', descripcion: 'Premios masticables para perros, ayudan a la higiene dental.', imagenesAdicionales: ['img/snackperro.png', 'img/guau.png'] },
            { id: 13, nombre: 'Snacks para gatos', precio: 7000, stock: 16, imagen: 'img/sanac.jpg', descripcion: 'Bocadillos crujientes para gatos, con vitaminas y minerales.', imagenesAdicionales: ['img/sanac.jpg', 'img/ratata.jpg'] },
            { id: 14, nombre: 'Alimento para aves', precio: 12000, stock: 7, imagen: 'img/aveees.png', descripcion: 'Mezcla de semillas y granos enriquecida para aves de jaula.', imagenesAdicionales: ['img/ave.jpg', 'img/plumas.jpg'] }
        ]
    };

    const productosDisponibles = Object.values(todosLosProductos).flat();

    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || {};
    let stockActual = JSON.parse(sessionStorage.getItem('stockActual')) || {};

    productosDisponibles.forEach(producto => {
        if (stockActual[producto.id] === undefined) {
            stockActual[producto.id] = producto.stock;
        }
    });

    if (tituloCategoria) {
        if (categoriaActual) {
            tituloCategoria.textContent = categoriaActual.charAt(0).toUpperCase() + categoriaActual.slice(1);
        } else {
            tituloCategoria.textContent = 'Todos los Productos';
        }
    }

    function actualizarBotonPagar() {
        if (botonPagar) {
            const totalItemsEnCarrito = Object.values(carrito).reduce((acum, cant) => acum + cant, 0);
            botonPagar.disabled = totalItemsEnCarrito === 0;
        }
    }

    function actualizarControles(idProducto) {
        const producto = productosDisponibles.find(p => p.id === idProducto);
        if (!producto) return;

        const cantidadEnCarrito = carrito[producto.id] || 0;
        const stockRestante = stockActual[producto.id];

        const botonAgregar = document.getElementById(`btnAgregar-${producto.id}`);
        const botonQuitar = document.getElementById(`btnQuitar-${producto.id}`);
        const spanCantidad = document.getElementById(`cantidad-${producto.id}`);
        const spanStock = document.getElementById(`stock-${producto.id}`);

        if (spanCantidad) spanCantidad.textContent = cantidadEnCarrito;
        if (spanStock) spanStock.textContent = stockRestante;

        if (botonAgregar) botonAgregar.disabled = stockRestante === 0;
        if (botonQuitar) botonQuitar.disabled = cantidadEnCarrito === 0;

        sessionStorage.setItem('carrito', JSON.stringify(carrito));
        sessionStorage.setItem('stockActual', JSON.stringify(stockActual));
        actualizarBotonPagar();
    }

    function mostrarInventario() {
        if (!contenedorInventario) return;
        contenedorInventario.innerHTML = '';

        let productosAMostrar;
        if (categoriaActual && todosLosProductos[categoriaActual]) {
            productosAMostrar = todosLosProductos[categoriaActual];
        } else {
            productosAMostrar = productosDisponibles;
        }

        if (productosAMostrar.length === 0) {
            contenedorInventario.innerHTML = '<p class="text-center text-muted fs-5">No hay productos en esta categoría.</p>';
            return;
        }

        productosAMostrar.forEach(producto => {
            const columna = document.createElement('div');
            columna.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');
            columna.innerHTML = `
                <div class="card h-100 shadow-sm border-0 rounded-lg overflow-hidden product-card">
                    <a href="detalle_producto.html?id=${producto.id}" class="text-decoration-none d-block">
                        <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" style="height:180px; object-fit:contain;">
                    </a>
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-primary fw-bold mb-2">${producto.nombre}</h5>
                        <p class="card-text text-muted mb-2">Precio: <span class="fw-bold text-dark">$${producto.precio.toLocaleString('es-CL')}</span></p>
                        <p class="card-text text-muted mb-3">Stock: <span id="stock-${producto.id}" class="fw-bold text-info">${stockActual[producto.id]}</span></p>
                        <div class="mt-auto d-flex gap-2 align-items-center justify-content-center">
                            <button class="btn btn-outline-danger btn-sm rounded-pill" id="btnQuitar-${producto.id}" aria-label="Quitar ${producto.nombre}">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span id="cantidad-${producto.id}" class="fw-bold fs-5 text-dark px-2">0</span>
                            <button class="btn btn-outline-primary btn-sm rounded-pill" id="btnAgregar-${producto.id}" aria-label="Agregar ${producto.nombre}">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedorInventario.appendChild(columna);

            const botonAgregar = document.getElementById(`btnAgregar-${producto.id}`);
            const botonQuitar = document.getElementById(`btnQuitar-${producto.id}`);

            if (botonAgregar) {
                botonAgregar.addEventListener('click', () => {
                    if (stockActual[producto.id] > 0) {
                        stockActual[producto.id]--;
                        carrito[producto.id] = (carrito[producto.id] || 0) + 1;
                        actualizarControles(producto.id);
                    }
                });
            }

            if (botonQuitar) {
                botonQuitar.addEventListener('click', () => {
                    const cantidadActual = carrito[producto.id] || 0;
                    if (cantidadActual > 0) {
                        carrito[producto.id] = cantidadActual - 1;
                        stockActual[producto.id]++;
                        if (carrito[producto.id] === 0) {
                            delete carrito[producto.id];
                        }
                        actualizarControles(producto.id);
                    }
                });
            }

            actualizarControles(producto.id);
        });
    }

    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            const carritoFiltrado = Object.fromEntries(
                Object.entries(carrito).filter(([, cantidad]) => cantidad > 0)
            );

            const itemsSeleccionados = Object.entries(carritoFiltrado).map(([id, cantidad]) => {
                const producto = productosDisponibles.find(p => p.id === Number(id));
                return {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precio,
                    cantidad,
                    subtotal: producto.precio * cantidad
                };
            });

            sessionStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
            sessionStorage.setItem('itemsSeleccionados', JSON.stringify(itemsSeleccionados));
            sessionStorage.setItem('productosDisponibles', JSON.stringify(productosDisponibles));

            window.location.href = 'pago.html';
        });
    }

    if (contenedorInventario && tituloCategoria && botonPagar) {
        mostrarInventario();
        actualizarBotonPagar();
    }

    const formularioPago = document.getElementById('formularioPago');
    if (formularioPago) {
        const resumenCompra = document.getElementById('resumenCompra');
        const botonConfirmarPago = document.getElementById('btnConfirmarPago');
        const detallesTarjeta = document.getElementById('detallesTarjeta');

        let carritoPago = JSON.parse(sessionStorage.getItem('carrito')) || {};
        const productosDisponiblesPago = JSON.parse(sessionStorage.getItem('productosDisponibles')) || [];
        let stockActualPago = JSON.parse(sessionStorage.getItem('stockActual')) || {};

        function calcularTotal() {
            return Object.entries(carritoPago).reduce((total, [id, cantidad]) => {
                const producto = productosDisponiblesPago.find(p => p.id == id);
                if (producto) return total + producto.precio * cantidad;
                return total;
            }, 0);
        }

        function actualizarResumen() {
            resumenCompra.innerHTML = '';
            const keys = Object.keys(carritoPago).filter(id => carritoPago[id] > 0);

            if (keys.length === 0) {
                resumenCompra.innerHTML = '<p class="text-danger text-center fw-bold">No hay productos en el carrito para pagar.</p>';
                if (botonConfirmarPago) botonConfirmarPago.disabled = true;
                return;
            }

            const lista = document.createElement('ul');
            lista.classList.add('list-group', 'mb-3');

            keys.forEach(id => {
                const cantidad = carritoPago[id];
                const producto = productosDisponiblesPago.find(p => p.id == id);
                if (!producto) return;

                const item = document.createElement('li');
                item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center', 'shadow-sm', 'rounded-3', 'mb-2');
                item.innerHTML = `
                    <span class="nombre-producto fw-semibold">${producto.nombre} <span class="text-muted">x${cantidad}</span></span>
                    <span class="fw-bold text-primary">$${(producto.precio * cantidad).toLocaleString('es-CL')}</span>
                    <button type="button" class="eliminar-producto btn btn-sm btn-outline-danger border-0" title="Eliminar producto">
                        <i class="fas fa-times-circle"></i>
                    </button>
                `;
                
                const btnEliminar = item.querySelector('.eliminar-producto');
                if (btnEliminar) {
                    btnEliminar.addEventListener('click', () => {
                        stockActualPago[id] = (stockActualPago[id] || 0) + carritoPago[id];
                        delete carritoPago[id];
                        
                        sessionStorage.setItem('carrito', JSON.stringify(carritoPago));
                        sessionStorage.setItem('stockActual', JSON.stringify(stockActualPago));
                        actualizarResumen();
                    });
                }
                lista.appendChild(item);
            });
            resumenCompra.appendChild(lista);

            const divTotal = document.createElement('div');
            divTotal.id = 'totalCompra';
            divTotal.classList.add('p-3', 'rounded-3', 'text-center', 'fw-bold', 'fs-4', 'mt-4');
            divTotal.textContent = `Total a pagar: $${calcularTotal().toLocaleString('es-CL')}`;
            resumenCompra.appendChild(divTotal);

            if (botonConfirmarPago) botonConfirmarPago.disabled = false;
        }

        document.querySelectorAll('input[name="metodoPago"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'transferencia') {
                    detallesTarjeta.classList.add('oculto');
                    document.querySelectorAll('#detallesTarjeta input').forEach(input => {
                        input.required = false;
                        input.removeAttribute('data-bs-toggle');
                        input.classList.remove('is-invalid', 'is-valid');
                    });
                } else {
                    detallesTarjeta.classList.remove('oculto');
                    document.querySelectorAll('#detallesTarjeta input').forEach(input => {
                        input.required = true;
                        input.setAttribute('data-bs-toggle', 'tooltip');
                    });
                }
            });
        });

        if (formularioPago) {
            formularioPago.addEventListener('submit', (e) => {
                e.preventDefault();
                if (formularioPago.checkValidity()) {
                    alert('Pago confirmado. ¡Gracias por tu compra en KittyPatitasSuaves!');
                    sessionStorage.removeItem('carrito');
                    sessionStorage.removeItem('stockActual');
                    sessionStorage.removeItem('itemsSeleccionados');
                    sessionStorage.removeItem('productosDisponibles');
                    window.location.href = 'index.html';
                } else {
                    formularioPago.classList.add('was-validated');
                }
            });
        }

        if (resumenCompra && botonConfirmarPago && detallesTarjeta) {
            actualizarResumen();
        }
    }

   
    const detalleProductoContainer = document.getElementById('detalleProductoContainer');
    if (detalleProductoContainer && window.location.pathname.includes('detalle_producto.html')) {
        const mensajeCarga = document.getElementById('mensajeCarga');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));

        if (isNaN(productId)) {
            detalleProductoContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger fs-4">Producto no encontrado. ID inválido.</p></div>';
            if (mensajeCarga) mensajeCarga.style.display = 'none';
            return;
        }

        const producto = productosDisponibles.find(p => p.id === productId);

        if (producto) {
            if (mensajeCarga) mensajeCarga.style.display = 'none';
            
            const allImages = [producto.imagen, ...(producto.imagenesAdicionales || [])];
            let carouselItemsHTML = '';
            let carouselIndicatorsHTML = '';

            allImages.forEach((imgSrc, index) => {
                carouselItemsHTML += `
                    <div class="carousel-item ${index === 0 ? 'active' : ''}">
                        <img src="${imgSrc}" class="d-block w-100 product-detail-img" alt="${producto.nombre} - Imagen ${index + 1}">
                    </div>
                `;
                carouselIndicatorsHTML += `
                    <button type="button" data-bs-target="#productImageCarousel" data-bs-slide-to="${index}" 
                            class="${index === 0 ? 'active' : ''}" aria-current="${index === 0 ? 'true' : 'false'}" 
                            aria-label="Slide ${index + 1}">
                        <img src="${imgSrc}" class="d-block w-100 img-thumbnail" alt="Miniatura ${index + 1}">
                    </button>
                `;
            });

            detalleProductoContainer.innerHTML = `
                <div class="col-md-8 col-lg-6">
                    <div class="card shadow-lg p-4">
                        <div class="row g-4">
                            <div class="col-md-6 text-center">
                                <div id="productImageCarousel" class="carousel slide" data-bs-ride="carousel">
                                    <div class="carousel-inner" id="carouselInner">
                                        ${carouselItemsHTML}
                                    </div>
                                    <button class="carousel-control-prev" type="button" data-bs-target="#productImageCarousel" data-bs-slide="prev">
                                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Previous</span>
                                    </button>
                                    <button class="carousel-control-next" type="button" data-bs-target="#productImageCarousel" data-bs-slide="next">
                                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span class="visually-hidden">Next</span>
                                    </button>
                                </div>
                                <div class="carousel-indicators mt-3 d-flex justify-content-center gap-2" style="position: static;">
                                    ${carouselIndicatorsHTML}
                                </div>
                            </div>
                            <div class="col-md-6 d-flex flex-column justify-content-center">
                                <h2 class="card-title text-primary fw-bold mb-3">${producto.nombre}</h2>
                                <p class="card-text text-muted mb-2"><strong>Precio:</strong> <span class="fw-bold text-dark fs-5">$${producto.precio.toLocaleString('es-CL')}</span></p>
                                <p class="card-text text-muted mb-3"><strong>Stock Disponible:</strong> <span id="stockDetalle-${producto.id}" class="fw-bold text-info">${stockActual[producto.id]}</span></p>
                                <p class="card-text text-dark mb-4">${producto.descripcion}</p>
                                <div class="d-flex align-items-center gap-3 mb-4">
                                    <button class="btn btn-outline-danger btn-sm rounded-pill" id="btnQuitarDetalle-${producto.id}" aria-label="Quitar ${producto.nombre}">
                                        <i class="fas fa-minus"></i>
                                    </button>
                                    <span id="cantidadDetalle-${producto.id}" class="fw-bold fs-4 text-dark">0</span>
                                    <button class="btn btn-outline-primary btn-sm rounded-pill" id="btnAgregarDetalle-${producto.id}" aria-label="Agregar ${producto.nombre}">
                                        <i class="fas fa-plus"></i>
                                    </button>
                                </div>
                                <button id="btnAnadirCarritoDetalle-${producto.id}" class="btn btn-primary btn-lg w-100">
                                    <i class="fas fa-cart-plus me-2"></i>Añadir al Carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            const btnAgregarDetalle = document.getElementById(`btnAgregarDetalle-${producto.id}`);
            const btnQuitarDetalle = document.getElementById(`btnQuitarDetalle-${producto.id}`);
            const spanCantidadDetalle = document.getElementById(`cantidadDetalle-${producto.id}`);
            const btnAnadirCarritoDetalle = document.getElementById(`btnAnadirCarritoDetalle-${producto.id}`);

            let cantidadSeleccionada = 0; 

            const actualizarControlesDetalle = () => {
                spanCantidadDetalle.textContent = cantidadSeleccionada;
                document.getElementById(`stockDetalle-${producto.id}`).textContent = stockActual[producto.id];
                btnAgregarDetalle.disabled = stockActual[producto.id] === 0;
                btnQuitarDetalle.disabled = cantidadSeleccionada === 0;
                btnAnadirCarritoDetalle.disabled = cantidadSeleccionada === 0;
            };

            btnAgregarDetalle.addEventListener('click', () => {
                if (stockActual[producto.id] > 0) {
                    stockActual[producto.id]--;
                    cantidadSeleccionada++;
                    actualizarControlesDetalle();
                }
            });

            btnQuitarDetalle.addEventListener('click', () => {
                if (cantidadSeleccionada > 0) {
                    stockActual[producto.id]++;
                    cantidadSeleccionada--;
                    actualizarControlesDetalle();
                }
            });

            btnAnadirCarritoDetalle.addEventListener('click', () => {
                if (cantidadSeleccionada > 0) {
                    carrito[producto.id] = (carrito[producto.id] || 0) + cantidadSeleccionada;
                    sessionStorage.setItem('carrito', JSON.stringify(carrito));
                    sessionStorage.setItem('stockActual', JSON.stringify(stockActual));
                    alert(`Se añadieron ${cantidadSeleccionada} unidades de ${producto.nombre} al carrito.`);
                    cantidadSeleccionada = 0;
                    actualizarControlesDetalle();
                    window.location.href = 'inventario.html';
                }
            });

            actualizarControlesDetalle();
        } else {
            detalleProductoContainer.innerHTML = '<div class="col-12 text-center"><p class="text-danger fs-4">Producto no encontrado.</p></div>';
            if (mensajeCarga) mensajeCarga.style.display = 'none';
        }
    }
    
    const comunasPorRegion = {
    metropolitana: ["Santiago", "Maipú", "Puente Alto", "Las Condes", "La Florida"],
    valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
    biobio: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel"]
  };

  document.getElementById("region").addEventListener("change", function () {
    const region = this.value;
    const comunaSelect = document.getElementById("comuna");
    comunaSelect.innerHTML = "<option selected disabled>Seleccione comuna</option>";

    if (comunasPorRegion[region]) {
      comunasPorRegion[region].forEach(comuna => {
        const option = document.createElement("option");
        option.value = comuna.toLowerCase();
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });
    }
  });
});