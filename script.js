document.addEventListener('DOMContentLoaded', () => {
    //
    // SECCIÓN: Lógica del Formulario de Registro (registro.html)
    // FUNCIONALIDAD: Maneja la validación del formulario de registro, la adición/eliminación dinámica de campos de mascota,
    //                y el almacenamiento de los datos del usuario en localStorage.
    //
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

        // Función para añadir un nuevo bloque de campos para registrar una mascota
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

            // Añade un event listener para eliminar la mascota
            nuevoItemMascota.querySelector('.eliminar-mascota').addEventListener('click', (evento) => {
                evento.target.closest('.item-mascota').remove();
            });
            contadorMascotas++;
        };

        // Asegura que siempre haya al menos un campo de mascota al cargar la página
        if (contenedorMascotas.querySelectorAll('.item-mascota').length === 0) {
            agregarNuevaMascota();
        }

        // Event listener para el botón "Añadir otra mascota"
        botonAgregarMascota.addEventListener('click', agregarNuevaMascota);

        // Event listener para el envío del formulario de registro
        formularioRegistro.addEventListener('submit', function (evento) {
            evento.preventDefault(); // Evita el envío por defecto del formulario
            evento.stopPropagation(); // Detiene la propagación del evento

            mensajeRegistro.classList.add('d-none'); // Oculta mensajes anteriores
            mensajeRegistro.classList.remove('alert-success', 'alert-danger');

            let formularioValido = true; // Bandera para controlar la validez del formulario

            // Validación del campo Nombre Completo
            const regexNombre = /^[A-Za-z\s]+$/;
            if (entradaNombreCompleto.value.trim() === '' || !regexNombre.test(entradaNombreCompleto.value) || entradaNombreCompleto.value.length > 50) {
                entradaNombreCompleto.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaNombreCompleto.classList.remove('is-invalid');
                entradaNombreCompleto.classList.add('is-valid');
            }

            // Validación del campo Correo Electrónico (formato @duoc.cl)
            const regexCorreoDuoc = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/;
            if (!regexCorreoDuoc.test(entradaCorreoElectronico.value)) {
                entradaCorreoElectronico.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaCorreoElectronico.classList.remove('is-invalid');
                entradaCorreoElectronico.classList.add('is-valid');
            }

            // Validación del campo Contraseña (complejidad)
            const valorContrasena = entradaContrasenaRegistro.value;
            const patronContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!*?])[A-Za-z\d@#$%^&!*?]{8,}$/;
            if (!patronContrasena.test(valorContrasena)) {
                entradaContrasenaRegistro.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaContrasenaRegistro.classList.remove('is-invalid');
                entradaContrasenaRegistro.classList.add('is-valid');
            }

            // Validación de Confirmar Contraseña (coincidencia)
            if (valorContrasena !== entradaConfirmarContrasenaRegistro.value || entradaConfirmarContrasenaRegistro.value.trim() === '') {
                entradaConfirmarContrasenaRegistro.classList.add('is-invalid');
                document.getElementById('retroalimentacionConfirmarContrasenaRegistro').textContent = 'Las contraseñas no coinciden.';
                formularioValido = false;
            } else {
                entradaConfirmarContrasenaRegistro.classList.remove('is-invalid');
                entradaConfirmarContrasenaRegistro.classList.add('is-valid');
            }

            // Validación del campo Teléfono (opcional, pero si se ingresa, debe ser válido)
            const valorTelefono = entradaTelefono.value.trim();
            const regexTelefono = /^\+?[0-9]{8,15}$/;
            if (valorTelefono !== '' && !regexTelefono.test(valorTelefono)) {
                entradaTelefono.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaTelefono.classList.remove('is-invalid');
                entradaTelefono.classList.add('is-valid');
            }

            // Validación de los campos de Mascota (Tipo y Nombre)
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

            // Si el formulario es válido, guarda el usuario y muestra mensaje de éxito
            if (formularioValido) {
                const usuarioRegistrado = {
                    nombreCompleto: entradaNombreCompleto.value.trim(),
                    correo: entradaCorreoElectronico.value.trim(),
                    contrasena: entradaContrasenaRegistro.value
                };
                localStorage.setItem('usuarioRegistrado', JSON.stringify(usuarioRegistrado)); // Guarda en localStorage

                mensajeRegistro.textContent = '¡Registro exitoso en KittyPatitasSuaves! Ahora puedes iniciar sesión.';
                mensajeRegistro.classList.remove('d-none');
                mensajeRegistro.classList.add('alert-success');

                // Resetea el formulario y los estilos de validación
                formularioRegistro.reset();
                formularioRegistro.classList.remove('was-validated');
                entradaNombreCompleto.classList.remove('is-valid', 'is-invalid');
                entradaCorreoElectronico.classList.remove('is-valid', 'is-invalid');
                entradaContrasenaRegistro.classList.remove('is-valid', 'is-invalid');
                entradaConfirmarContrasenaRegistro.classList.remove('is-valid', 'is-invalid');
                entradaTelefono.classList.remove('is-valid', 'is-invalid');
                contenedorMascotas.innerHTML = '<h5 class="text-primary mb-3">Registro de Mascotas</h5>'; // Limpia campos de mascota
                contadorMascotas = 0;
                agregarNuevaMascota(); // Añade un campo de mascota vacío de nuevo
            } else {
                // Si el formulario no es válido, muestra mensaje de error
                formularioRegistro.classList.add('was-validated'); // Muestra los mensajes de feedback de Bootstrap
                mensajeRegistro.textContent = 'Por favor, corrige los errores en el formulario de registro.';
                mensajeRegistro.classList.remove('d-none');
                mensajeRegistro.classList.add('alert-danger');
            }
        });
    }

    //
    // SECCIÓN: Lógica del Formulario de Acceso (acceso.html)
    // FUNCIONALIDAD: Maneja la validación del formulario de inicio de sesión y verifica las credenciales
    //                contra los datos almacenados en localStorage.
    //
    const formularioAcceso = document.getElementById('formularioAcceso');
    if (formularioAcceso) {
        const entradaCorreoAcceso = document.getElementById('correoAcceso');
        const entradaContrasenaAcceso = document.getElementById('contrasenaAcceso');
        const mensajeAcceso = document.getElementById('mensajeAcceso');

        // Event listener para el envío del formulario de acceso
        formularioAcceso.addEventListener('submit', function (evento) {
            evento.preventDefault(); // Evita el envío por defecto del formulario
            evento.stopPropagation(); // Detiene la propagación del evento

            mensajeAcceso.classList.add('d-none'); // Oculta mensajes anteriores
            mensajeAcceso.classList.remove('alert-success', 'alert-danger');

            // Limpia los estilos de validación anteriores
            entradaCorreoAcceso.classList.remove('is-valid', 'is-invalid');
            entradaContrasenaAcceso.classList.remove('is-valid', 'is-invalid');

            let accesoValido = true; // Bandera para controlar la validez del acceso

            // Validación del campo Correo Electrónico (formato específico)
            const valorCorreoAcceso = entradaCorreoAcceso.value.trim();
            const regexCorreoAcceso = /^(?=.{1,100}$)([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$/;
            if (valorCorreoAcceso === '' || !regexCorreoAcceso.test(valorCorreoAcceso)) {
                entradaCorreoAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaCorreoAcceso.classList.add('is-valid');
            }

            // Validación del campo Contraseña (longitud)
            const valorContrasenaAcceso = entradaContrasenaAcceso.value.trim();
            if (valorContrasenaAcceso === '' || valorContrasenaAcceso.length < 4 || valorContrasenaAcceso.length > 10) {
                entradaContrasenaAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaContrasenaAcceso.classList.add('is-valid');
            }

            // Si los campos son válidos, intenta iniciar sesión
            if (accesoValido) {
                const usuario = entradaCorreoAcceso.value.trim();
                const contrasena = entradaContrasenaAcceso.value;

                const usuarioRegistrado = JSON.parse(localStorage.getItem('usuarioRegistrado')); // Recupera el usuario de localStorage

                // Verifica si las credenciales coinciden con el usuario registrado
                if (usuarioRegistrado && usuario === usuarioRegistrado.correo && contrasena === usuarioRegistrado.contrasena) {
                    const nombreUsuario = usuarioRegistrado.nombreCompleto?.trim();

                    // Muestra mensaje de bienvenida personalizado
                    if (nombreUsuario) {
                        mensajeAcceso.textContent = `¡Inicio de sesión exitoso! Bienvenido, ${nombreUsuario} (${usuario})`;
                    } else {
                        mensajeAcceso.textContent = `¡Inicio de sesión exitoso! Bienvenido, ${usuario}`;
                    }

                    mensajeAcceso.classList.remove('d-none', 'alert-danger');
                    mensajeAcceso.classList.add('alert-success');

                    // Resetea el formulario
                    formularioAcceso.reset();
                    formularioAcceso.classList.remove('was-validated');
                } else {
                    // Muestra mensaje de error si las credenciales son incorrectas
                    mensajeAcceso.textContent = 'Correo electrónico o contraseña incorrectos.';
                    mensajeAcceso.classList.remove('d-none', 'alert-success');
                    mensajeAcceso.classList.add('alert-danger');
                    entradaCorreoAcceso.classList.remove('is-valid');
                    entradaCorreoAcceso.classList.add('is-invalid');
                    entradaContrasenaAcceso.classList.remove('is-valid');
                    entradaContrasenaAcceso.classList.add('is-invalid');
                }
            } else {
                // Si los campos no cumplen con la validación, muestra mensaje de error
                formularioAcceso.classList.add('was-validated');
                mensajeAcceso.textContent = 'Por favor, ingresa credenciales válidas.';
                mensajeAcceso.classList.remove('d-none', 'alert-success');
                mensajeAcceso.classList.add('alert-danger');
            }
        });
    }

    //
    // SECCIÓN: Lógica del Formulario de Soporte (Soporte.html)
    // FUNCIONALIDAD: Maneja la validación del formulario de contacto y muestra un mensaje de éxito o error.
    //
    const formularioSoporte = document.getElementById('formularioSoporte');
    if (formularioSoporte) {
        const nombreSoporte = document.getElementById('nombreSoporte');
        const correoSoporte = document.getElementById('correoSoporte');
        const comentarioSoporte = document.getElementById('comentarioSoporte');
        const mensajeSoporte = document.getElementById('mensajeSoporte');

        // Event listener para el envío del formulario de soporte
        formularioSoporte.addEventListener('submit', function (evento) {
            evento.preventDefault(); // Evita el envío por defecto del formulario
            evento.stopPropagation(); // Detiene la propagación del evento

            let formularioValido = true; // Bandera para controlar la validez del formulario
            mensajeSoporte.classList.add('d-none'); // Oculta mensajes anteriores
            mensajeSoporte.classList.remove('alert-success', 'alert-danger');

            // Validación del campo Nombre
            if (nombreSoporte.value.trim() === '' || nombreSoporte.value.length > 100) {
                nombreSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                nombreSoporte.classList.remove('is-invalid');
                nombreSoporte.classList.add('is-valid');
            }

            // Validación del campo Correo Electrónico (formato específico)
            const regexCorreoSoporte = /^(?=.{1,100}$)([a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com))$/;
            if (correoSoporte.value.trim() === '' || !regexCorreoSoporte.test(correoSoporte.value)) {
                correoSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                correoSoporte.classList.remove('is-invalid');
                correoSoporte.classList.add('is-valid');
            }

            // Validación del campo Comentario
            if (comentarioSoporte.value.trim() === '' || comentarioSoporte.value.length > 500) {
                comentarioSoporte.classList.add('is-invalid');
                formularioValido = false;
            } else {
                comentarioSoporte.classList.remove('is-invalid');
                comentarioSoporte.classList.add('is-valid');
            }

            // Si el formulario es válido, muestra mensaje de éxito y lo resetea
            if (formularioValido) {
                mensajeSoporte.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
                mensajeSoporte.classList.remove('d-none');
                mensajeSoporte.classList.add('alert-success');
                formularioSoporte.reset(); // Resetea el formulario
                formularioSoporte.classList.remove('was-validated');
                nombreSoporte.classList.remove('is-valid', 'is-invalid');
                correoSoporte.classList.remove('is-valid', 'is-invalid');
                comentarioSoporte.classList.remove('is-valid', 'is-invalid');
            } else {
                // Si el formulario no es válido, muestra mensaje de error
                formularioSoporte.classList.add('was-validated'); // Muestra los mensajes de feedback de Bootstrap
                mensajeSoporte.textContent = 'Por favor, corrige los errores en el formulario.';
                mensajeSoporte.classList.remove('d-none');
                mensajeSoporte.classList.add('alert-danger');
            }
        });
    }

    //
    // SECCIÓN: Lógica del Inventario de Productos (inventario.html)
    // FUNCIONALIDAD: Carga y muestra los productos, maneja la adición/eliminación de productos al carrito,
    //                actualiza el stock y habilita/deshabilita el botón de pago.
    //
    const parametrosURL = new URLSearchParams(window.location.search);
    const categoriaActual = parametrosURL.get('categoria'); // Obtiene la categoría de la URL
    const tituloCategoria = document.getElementById('tituloCategoria');
    const contenedorInventario = document.getElementById('contenedorInventario');
    const botonPagar = document.getElementById('btnPagar');

    // Definición de todos los productos disponibles, categorizados
    const todosLosProductos = {
        juguetes: [
            { id: 1, nombre: 'Pelota para perro', precio: 5000, stock: 10, imagen: 'img/pelotaperro.jpg', descripcion: 'Pelota resistente ideal para juegos de lanzar y buscar. Flota en el agua.' },
            { id: 2, nombre: 'Ratón de juguete para gato', precio: 3000, stock: 8, imagen: 'img/raton.jpeg', descripcion: 'Juguete suave con catnip para estimular el instinto de caza de tu gato.' },
            { id: 3, nombre: 'Cuerda para morder', precio: 7000, stock: 5, imagen: 'img/morder.jpg', descripcion: 'Cuerda de algodón duradera para perros, ayuda a limpiar los dientes.' },
            { id: 4, nombre: 'Juguete interactivo', precio: 12000, stock: 6, imagen: 'img/juguetepuzzleparaperros.webp', descripcion: 'Juguete dispensador de premios que desafía la mente de tu mascota.' },
            { id: 5, nombre: 'Pelota con sonido', precio: 8000, stock: 7, imagen: 'img/pelota.jpg', descripcion: 'Pelota que emite sonidos divertidos al ser mordida, ideal para mantener a tu perro entretenido.' },
            { id: 6, nombre: 'Juguete de peluche', precio: 9000, stock: 4, imagen: 'img/pelucheeees.jpg', descripcion: 'Peluche suave y abrazable para perros, con chirriador interno.' },
            { id: 7, nombre: 'Dispenser de premios', precio: 15000, stock: 3, imagen: 'img/dispenserr.jpg', descripcion: 'Dispensador automático de premios, programable para recompensar a tu mascota.' },
            { id: 8, nombre: 'Juguete para aves', precio: 4000, stock: 9, imagen: 'img/ave.jpg', descripcion: 'Juguete colgante con campanas y espejos para el entretenimiento de aves.' },
            { id: 9, nombre: 'Juguete para roedores', precio: 3500, stock: 10, imagen: 'img/roedor.jpg', descripcion: 'Juguete masticable de madera natural para roedores, ayuda a desgastar sus dientes.' },
            { id: 10, nombre: 'Juguete para gatos con plumas', precio: 6000, stock: 5, imagen: 'img/plumas.jpg', descripcion: 'Caña de pescar con plumas para interactuar y jugar con tu gato.' }
        ],
        accesorios: [
            { id: 11, nombre: 'Collar para perro', precio: 10000, stock: 10, imagen: 'img/collar.webp', descripcion: 'Collar ajustable y resistente para perros de tamaño mediano a grande.' },
            { id: 12, nombre: 'Correa ajustable', precio: 12000, stock: 8, imagen: 'img/accesorio.jpg', descripcion: 'Correa de nylon con longitud ajustable, ideal para paseos diarios.' },
            { id: 13, nombre: 'Arnés para perro', precio: 15000, stock: 5, imagen: 'img/collarcorrea.jpg', descripcion: 'Arnés cómodo y seguro que distribuye la presión uniformemente.' },
            { id: 14, nombre: 'Cama para gato', precio: 20000, stock: 6, imagen: 'img/cama.webp', descripcion: 'Cama suave y acogedora para gatos, con bordes elevados para mayor confort.' },
            { id: 15, nombre: 'Plato para comida', precio: 5000, stock: 4, imagen: 'img/elpepe.png', descripcion: 'Plato de acero inoxidable antideslizante, fácil de limpiar.' },
            { id: 16, nombre: 'Fuente de agua', precio: 18000, stock: 3, imagen: 'img/fuente.webp', descripcion: 'Fuente de agua automática que fomenta la hidratación de tu mascota.' },
            { id: 17, nombre: 'Rascador para gatos', precio: 22000, stock: 9, imagen: 'img/rasca.webp', descripcion: 'Rascador de sisal con plataforma, ideal para afilar garras y descansar.' },
            { id: 18, nombre: 'Juguete colgante', precio: 7000, stock: 10, imagen: 'img/colgante.jpg', descripcion: 'Juguete colgante para jaulas de aves, con cascabeles y cuentas de colores.' }
        ],
        alimentos: [
            { id: 19, nombre: 'Comida seca para perros', precio: 25000, stock: 10, imagen: 'img/master.jpeg', descripcion: 'Alimento completo y balanceado para perros adultos, con proteínas de alta calidad.' },
            { id: 20, nombre: 'Comida húmeda para gatos', precio: 15000, stock: 8, imagen: 'img/lata.jpg', descripcion: 'Paté delicioso y nutritivo para gatos, ideal para complementar su dieta.' },
            { id: 21, nombre: 'Snacks para perros', precio: 8000, stock: 5, imagen: 'img/snackperro.png', descripcion: 'Premios masticables para perros, ayudan a la higiene dental.' },
            { id: 22, nombre: 'Snacks para gatos', precio: 7000, stock: 6, imagen: 'img/sanac.jpg', descripcion: 'Bocadillos crujientes para gatos, con vitaminas y minerales.' },
            { id: 23, nombre: 'Alimento para aves', precio: 12000, stock: 7, imagen: 'img/aveees.png', descripcion: 'Mezcla de semillas y granos enriquecida para aves de jaula.' },
            { id: 24, nombre: 'Alimento para roedores', precio: 9000, stock: 4, imagen: 'img/ratata.jpg', descripcion: 'Pienso extrusionado para roedores, con todos los nutrientes necesarios.'},
            { id: 25, nombre: 'Comida Premium perros', precio: 30000, stock: 3, imagen: 'img/premium.jpg', descripcion: 'Alimento super premium para perros, con ingredientes naturales y sin cereales.' },
            { id: 26, nombre: 'Comida Premium gatos', precio: 28000, stock: 9, imagen: 'img/premiumm.jpg', descripcion: 'Alimento premium para gatos, formulado para una digestión óptima y pelaje brillante.' },
            { id: 27, nombre: 'Vitaminas para mascotas', precio: 10000, stock: 10, imagen: 'img/vitaminas.jpg', descripcion: 'Suplemento vitamínico para fortalecer el sistema inmunológico de perros y gatos.' },
            { id: 28, nombre: 'Suplementos para perros', precio: 15000, stock: 5, imagen: 'img/suplex.jpg', descripcion: 'Suplemento para la salud articular de perros, con glucosamina y condroitina.' }
        ]
    };

    // Combina todos los productos en una sola lista
    const productosDisponibles = Object.values(todosLosProductos).flat();

    // Inicializa el carrito y el stock actual desde sessionStorage o como objetos vacíos
    let carrito = JSON.parse(sessionStorage.getItem('carrito')) || {};
    let stockActual = JSON.parse(sessionStorage.getItem('stockActual')) || {};

    // Inicializa el stock de cada producto si no existe en sessionStorage
    productosDisponibles.forEach(producto => {
        if (stockActual[producto.id] === undefined) {
            stockActual[producto.id] = producto.stock;
        }
    });

    // Actualiza el título de la categoría si se especifica en la URL
    if (tituloCategoria) {
        if (categoriaActual) {
            tituloCategoria.textContent = categoriaActual.charAt(0).toUpperCase() + categoriaActual.slice(1);
        } else {
            tituloCategoria.textContent = 'Todos los Productos';
        }
    }

    // Función para habilitar/deshabilitar el botón "Proceder al Pago"
    function actualizarBotonPagar() {
        if (botonPagar) {
            const totalItemsEnCarrito = Object.values(carrito).reduce((acum, cant) => acum + cant, 0);
            botonPagar.disabled = totalItemsEnCarrito === 0; // Deshabilita si el carrito está vacío
        }
    }

    // Función para actualizar la cantidad en el carrito y el stock restante de un producto
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

        if (botonAgregar) botonAgregar.disabled = stockRestante === 0; // Deshabilita si no hay stock
        if (botonQuitar) botonQuitar.disabled = cantidadEnCarrito === 0; // Deshabilita si no hay en carrito

        sessionStorage.setItem('carrito', JSON.stringify(carrito)); // Guarda el carrito en sessionStorage
        sessionStorage.setItem('stockActual', JSON.stringify(stockActual)); // Guarda el stock en sessionStorage
        actualizarBotonPagar(); // Actualiza el estado del botón de pago
    }

    // Función para mostrar los productos en el inventario
    function mostrarInventario() {
        if (!contenedorInventario) return;
        contenedorInventario.innerHTML = ''; // Limpia el contenedor antes de mostrar

        let productosAMostrar;
        // Filtra productos por categoría si se especifica en la URL
        if (categoriaActual && todosLosProductos[categoriaActual]) {
            productosAMostrar = todosLosProductos[categoriaActual];
        } else {
            productosAMostrar = productosDisponibles; // Muestra todos si no hay categoría o es inválida
        }

        if (productosAMostrar.length === 0) {
            contenedorInventario.innerHTML = '<p class="text-center text-muted fs-5">No hay productos en esta categoría.</p>';
            return;
        }

        // Crea una tarjeta para cada producto y la añade al contenedor
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

            // Event listener para el botón "Agregar"
            if (botonAgregar) {
                botonAgregar.addEventListener('click', () => {
                    if (stockActual[producto.id] > 0) {
                        stockActual[producto.id]--; // Reduce el stock
                        carrito[producto.id] = (carrito[producto.id] || 0) + 1; // Añade al carrito
                        actualizarControles(producto.id); // Actualiza la UI
                    }
                });
            }

            // Event listener para el botón "Quitar"
            if (botonQuitar) {
                botonQuitar.addEventListener('click', () => {
                    const cantidadActual = carrito[producto.id] || 0;
                    if (cantidadActual > 0) {
                        carrito[producto.id] = cantidadActual - 1; // Reduce del carrito
                        stockActual[producto.id]++; // Aumenta el stock
                        if (carrito[producto.id] === 0) {
                            delete carrito[producto.id]; // Elimina el producto del carrito si la cantidad es 0
                        }
                        actualizarControles(producto.id); // Actualiza la UI
                    }
                });
            }

            actualizarControles(producto.id); // Inicializa los controles para cada producto
        });
    }

    // Event listener para el botón "Pagar"
    if (botonPagar) {
        botonPagar.addEventListener('click', () => {
            const totalItemsEnCarrito = Object.values(carrito).reduce((acum, cant) => acum + cant, 0);
            if (totalItemsEnCarrito > 0) {
                alert('¡Compra realizada con éxito! 🛒 Gracias por tu compra en KittyPatitasSuaves.');
                // Aquí podrías redirigir a una página de confirmación o procesar el pago.
                sessionStorage.clear(); // Limpia el carrito y el stock para una nueva compra
                location.reload(); // Recarga la página para reflejar los cambios
            } else {
                alert('El carrito está vacío. Por favor, agrega productos antes de proceder al pago.');
            }
        });
    }

    // Ejecuta la función para mostrar el inventario al cargar la página si el contenedor existe
    if (contenedorInventario) {
        mostrarInventario();
    }

    //
    // SECCIÓN: Lógica de la Página de Detalle de Producto (detalle_producto.html)
    // FUNCIONALIDAD: Muestra los detalles de un producto específico, incluyendo nombre, descripción, precio, stock e imagen.
    //
    const contenedorDetalle = document.getElementById('contenedorDetalleProducto');
    if (contenedorDetalle) {
        const parametrosURL = new URLSearchParams(window.location.search);
        const idProducto = parseInt(parametrosURL.get('id')); // Obtiene el ID del producto de la URL

        // Busca el producto en la lista de todos los productos disponibles
        const producto = productosDisponibles.find(p => p.id === idProducto);
        
        if (producto) {
            // Si el producto se encuentra, muestra sus detalles
            contenedorDetalle.innerHTML = `
                <div class="row align-items-center">
                    <div class="col-md-6 text-center mb-4 mb-md-0">
                        <img src="${producto.imagen}" class="img-fluid rounded shadow-sm" alt="${producto.nombre}" style="max-height: 400px; object-fit: contain;">
                    </div>
                    <div class="col-md-6">
                        <h1 class="display-4 fw-bold text-primary">${producto.nombre}</h1>
                        <hr>
                        <p class="lead text-muted">${producto.descripcion}</p>
                        <p class="fs-4 text-dark fw-bold">Precio: $${producto.precio.toLocaleString('es-CL')}</p>
                        <p class="fs-5 text-info">Stock disponible: <span id="detalleStock">${stockActual[producto.id]}</span> unidades</p>
                        <div class="d-flex align-items-center gap-3 mt-4">
                            <button class="btn btn-outline-danger btn-lg rounded-pill" id="btnQuitarDetalle">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span id="detalleCantidad" class="fs-2 fw-bold text-dark">0</span>
                            <button class="btn btn-outline-primary btn-lg rounded-pill" id="btnAgregarDetalle">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="d-grid mt-4">
                            <button class="btn btn-primary btn-lg" id="btnAnadirAlCarrito">Añadir al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            
            const btnAgregarDetalle = document.getElementById('btnAgregarDetalle');
            const btnQuitarDetalle = document.getElementById('btnQuitarDetalle');
            const spanDetalleCantidad = document.getElementById('detalleCantidad');
            const spanDetalleStock = document.getElementById('detalleStock');
            const btnAnadirAlCarrito = document.getElementById('btnAnadirAlCarrito');
            let cantidadEnDetalle = 0;

            // Función para actualizar la UI en la página de detalle
            const actualizarUIDetalle = () => {
                spanDetalleCantidad.textContent = cantidadEnDetalle;
                spanDetalleStock.textContent = stockActual[producto.id];
                btnAgregarDetalle.disabled = stockActual[producto.id] === 0;
                btnQuitarDetalle.disabled = cantidadEnDetalle === 0;
            };

            // Event listener para añadir cantidad temporalmente
            if (btnAgregarDetalle) {
                btnAgregarDetalle.addEventListener('click', () => {
                    if (stockActual[producto.id] > 0) {
                        stockActual[producto.id]--;
                        cantidadEnDetalle++;
                        actualizarUIDetalle();
                    }
                });
            }

            // Event listener para quitar cantidad temporalmente
            if (btnQuitarDetalle) {
                btnQuitarDetalle.addEventListener('click', () => {
                    if (cantidadEnDetalle > 0) {
                        stockActual[producto.id]++;
                        cantidadEnDetalle--;
                        actualizarUIDetalle();
                    }
                });
            }

            // Event listener para añadir al carrito
            if (btnAnadirAlCarrito) {
                btnAnadirAlCarrito.addEventListener('click', () => {
                    if (cantidadEnDetalle > 0) {
                        carrito[producto.id] = (carrito[producto.id] || 0) + cantidadEnDetalle;
                        sessionStorage.setItem('carrito', JSON.stringify(carrito));
                        sessionStorage.setItem('stockActual', JSON.stringify(stockActual));
                        alert(`Se han añadido ${cantidadEnDetalle} unidad(es) de ${producto.nombre} al carrito.`);
                        cantidadEnDetalle = 0; // Resetea la cantidad temporal
                        actualizarUIDetalle();
                    } else {
                        alert('Por favor, selecciona una cantidad mayor a cero.');
                    }
                });
            }

            actualizarUIDetalle(); // Inicializa la UI de detalle
        } else {
            // Si el producto no se encuentra, muestra un mensaje de error
            contenedorDetalle.innerHTML = '<div class="alert alert-danger text-center" role="alert">Producto no encontrado.</div>';
        }
    }

    const comunasPorRegion = {
metropolitana: ["Santiago", "Maipú", "Puente Alto", "Las Condes", "La Florida"],
valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"],
biobio: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel"]
};

document.getElementById("region")?.addEventListener("change", function () { // Añadido operador ?. para evitar errores si el elemento no existe
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


