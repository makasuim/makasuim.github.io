document.addEventListener('DOMContentLoaded', () => {
    // Registro
    const formularioRegistro = document.getElementById('formularioRegistro');
    if (formularioRegistro) {
        const entradaNombreCompleto = document.getElementById('nombreCompleto');
        const entradaCorreoElectronico = document.getElementById('correoElectronico');
        const entradaContrasenaRegistro = document.getElementById('contrasenaRegistro');
        const entradaConfirmarContrasenaRegistro = document.getElementById('confirmarContrasenaRegistro');
        const entradaTelefono = document.getElementById('telefono');
        const contenedorMascotas = document.getElementById('contenedorMascotas');
        const botonAgregarMascota = document.getElementById('agregarMascota');
        let contadorMascotas = 0;

        botonAgregarMascota.addEventListener('click', () => {
            contadorMascotas++;
            const nuevoItemMascota = document.createElement('div');
            nuevoItemMascota.classList.add('item-mascota', 'mb-3', 'p-2', 'border', 'rounded', 'bg-light');
            nuevoItemMascota.innerHTML = `
                <div class="mb-2">
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
                <div class="mb-2">
                    <label for="nombreMascota_${contadorMascotas}" class="form-label">Nombre de Mascota</label>
                    <input type="text" class="form-control" id="nombreMascota_${contadorMascotas}" name="nombreMascota[]" required maxlength="50" />
                    <div class="invalid-feedback">Por favor, ingresa el nombre de la mascota (máx. 50 caracteres).</div>
                </div>
                <button type="button" class="btn btn-danger btn-sm eliminar-mascota">Eliminar Mascota</button>
            `;
            contenedorMascotas.appendChild(nuevoItemMascota);

            nuevoItemMascota.querySelector('.eliminar-mascota').addEventListener('click', (e) => {
                e.target.closest('.item-mascota').remove();
            });
        });

        formularioRegistro.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            let formularioValido = true;

            const regexNombre = /^[A-Za-z\s]+$/;
            if (entradaNombreCompleto.value.trim() === '' || !regexNombre.test(entradaNombreCompleto.value) || entradaNombreCompleto.value.length > 50) {
                entradaNombreCompleto.classList.add('is-invalid');
                formularioValido = false;
            } else {
                entradaNombreCompleto.classList.remove('is-invalid');
                entradaNombreCompleto.classList.add('is-valid');
            }

            const regexCorreo = /^[a-zA-Z0-9._%+-]+@duoc\.cl$/;
            if (!regexCorreo.test(entradaCorreoElectronico.value)) {
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
            const regexTelefono = /^[0-9]{9,15}$/;
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
                alert('¡Registro exitoso en GUAU&MIAU! Ahora puedes iniciar sesión.');
                formularioRegistro.reset();
                formularioRegistro.classList.remove('was-validated');
                while (contadorMascotas > 0) {
                    contenedorMascotas.lastChild.remove();
                    contadorMascotas--;
                }
                if (document.querySelectorAll('.item-mascota').length === 0) {
                    botonAgregarMascota.click();
                    contadorMascotas = 0;
                    contenedorMascotas.querySelector('.eliminar-mascota').remove();
                }
            } else {
                formularioRegistro.classList.add('was-validated');
            }
        });
    }

    // Acceso
    const formularioAcceso = document.getElementById('formularioAcceso');
    if (formularioAcceso) {
        const entradaCorreoAcceso = document.getElementById('correoAcceso');
        const entradaContrasenaAcceso = document.getElementById('contrasenaAcceso');
        const mensajeAcceso = document.getElementById('mensajeAcceso');

        formularioAcceso.addEventListener('submit', function (evento) {
            evento.preventDefault();
            evento.stopPropagation();

            mensajeAcceso.classList.add('d-none');

            let accesoValido = true;

            if (entradaCorreoAcceso.value.trim() === '') {
                entradaCorreoAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaCorreoAcceso.classList.remove('is-invalid');
                entradaCorreoAcceso.classList.add('is-valid');
            }

            if (entradaContrasenaAcceso.value.trim() === '') {
                entradaContrasenaAcceso.classList.add('is-invalid');
                accesoValido = false;
            } else {
                entradaContrasenaAcceso.classList.remove('is-invalid');
                entradaContrasenaAcceso.classList.add('is-valid');
            }

            if (accesoValido) {
                const usuario = entradaCorreoAcceso.value;
                const contrasena = entradaContrasenaAcceso.value;

                if (usuario === 'test@duoc.cl' && contrasena === 'Password123!') {
                    alert('¡Inicio de sesión exitoso! Bienvenido, ' + usuario);
                    formularioAcceso.reset();
                    formularioAcceso.classList.remove('was-validated');
                    entradaCorreoAcceso.classList.remove('is-valid', 'is-invalid');
                    entradaContrasenaAcceso.classList.remove('is-valid', 'is-invalid');
                } else {
                    mensajeAcceso.textContent = 'Correo electrónico o contraseña incorrectos.';
                    mensajeAcceso.classList.remove('d-none');
                    entradaCorreoAcceso.classList.add('is-invalid');
                    entradaContrasenaAcceso.classList.add('is-invalid');
                }
            } else {
                formularioAcceso.classList.add('was-validated');
            }
        });
    }

    // Productos en index.html
    const contenedorProductos = document.getElementById('contenedorProductos');
    if (contenedorProductos) {
        const productos = [
            { id: 1, nombre: 'Juguete para Perro', precio: 15000, stock: 5, imagen: '' },
            { id: 2, nombre: 'Rascador para Gato', precio: 22000, stock: 3, imagen: '' },
            { id: 3, nombre: 'Comedero Automático', precio: 35000, stock: 2, imagen: '' },
            { id: 4, nombre: 'Cama para Mascotas', precio: 28000, stock: 4, imagen: '' }
        ];

        function mostrarProductos() {
            contenedorProductos.innerHTML = '';
            productos.forEach(producto => {
                const divProducto = document.createElement('div');
                divProducto.classList.add('col-md-3', 'mb-4');
                divProducto.innerHTML = `
                    <div class="card h-100 shadow-sm">
                        <div class="placeholder-img bg-secondary d-flex align-items-center justify-content-center" style="height:180px; color:#fff; font-weight:bold;">
                            Imagen aquí
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${producto.nombre}</h5>
                            <p class="card-text">Precio: $${producto.precio.toLocaleString('es-CL')}</p>
                            <p class="card-text">Stock: <span id="stock-${producto.id}">${producto.stock}</span></p>
                            <button class="btn btn-primary mt-auto" id="btnComprar-${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>Comprar</button>
                        </div>
                    </div>
                `;
                contenedorProductos.appendChild(divProducto);

                const botonComprar = document.getElementById(`btnComprar-${producto.id}`);
                botonComprar.addEventListener('click', () => {
                    if (producto.stock > 0) {
                        producto.stock--;
                        document.getElementById(`stock-${producto.id}`).textContent = producto.stock;
                        if (producto.stock === 0) {
                            botonComprar.disabled = true;
                        }
                        alert(`Has comprado: ${producto.nombre}`);
                    }
                });
            });
        }

        mostrarProductos();
    }
});