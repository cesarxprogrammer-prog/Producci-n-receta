        /* =========================
           DATOS DESDE STORAGE
        ========================= */

        var insumos =
            JSON.parse(
                localStorage.getItem("insumos")
            ) || [];


        var compras =
            JSON.parse(
                localStorage.getItem("compras")
            ) || [];


        var recetas =
            JSON.parse(
                localStorage.getItem("recetas")
            ) || [];


        var productos =
            JSON.parse(
                localStorage.getItem("productos")
            ) || [];


        var producciones =
            JSON.parse(
                localStorage.getItem("producciones")
            ) || [];


        var ventas =
            JSON.parse(
                localStorage.getItem("ventas")
            ) || [];


        var insumoEditando = null;

        var recetaEditando = null;

        var productoEditando = null;

        var ingredientesReceta = [];


        /* =========================
           FORMULARIOS
        ========================= */

        function mostrarFormulario(id) {

            var formulario =
                document.getElementById(id);

            if (!formulario) {
                return;
            }

            formulario.classList.remove(
                "formulario-oculto"
            );

            formulario.classList.add(
                "formulario-visible"
            );

        }


        function ocultarFormulario(id) {

            var formulario =
                document.getElementById(id);

            if (!formulario) {
                return;
            }

            formulario.classList.remove(
                "formulario-visible"
            );

            formulario.classList.add(
                "formulario-oculto"
            );

        }


        /* =========================
           GUARDAR DATOS
        ========================= */

        function guardarInsumos() {

            localStorage.setItem(
                "insumos",
                JSON.stringify(insumos)
            );

        }


        function guardarCompras() {

            localStorage.setItem(
                "compras",
                JSON.stringify(compras)
            );

        }


        function guardarRecetas() {

            localStorage.setItem(
                "recetas",
                JSON.stringify(recetas)
            );

        }


        function guardarProductos() {

            localStorage.setItem(
                "productos",
                JSON.stringify(productos)
            );

        }


        function guardarProducciones() {

            localStorage.setItem(
                "producciones",
                JSON.stringify(producciones)
            );

        }


        function guardarVentas() {

            localStorage.setItem(
                "ventas",
                JSON.stringify(ventas)
            );

        }


        /* =========================
           CAMBIAR SECCIÓN
        ========================= */

        function mostrarSeccion(nombre, boton) {

            var secciones =
                document.getElementsByClassName(
                    "seccion"
                );


            for (
                var i = 0;
                i < secciones.length;
                i++
            ) {

                secciones[i]
                    .classList
                    .remove("activa");

            }


            var botones =
                document.querySelectorAll(
                    ".menu button"
                );


            for (
                var i = 0;
                i < botones.length;
                i++
            ) {

                botones[i]
                    .classList
                    .remove("activo");

            }


            document
                .getElementById(
                    "seccion-" + nombre
                )
                .classList
                .add("activa");


            boton.classList.add("activo");


            if (nombre === "recetas") {

                actualizarIngredientesDisponibles();

                actualizarUnidadesIngrediente();

                mostrarIngredientesReceta();

                mostrarRecetas();

            }


            if (nombre === "productos") {

                actualizarRecetasDisponiblesProducto();

                mostrarProductos();

            }


            if (nombre === "produccion") {

                actualizarProductosDisponiblesProduccion();

                mostrarProducciones();

            }


            if (nombre === "ventas") {

                actualizarProductosDisponiblesVenta();

                mostrarVentas();

            }

        }


        /* =========================
           CREAR INSUMO
        ========================= */

        function crearInsumo() {

            var nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            var unidad =
                document
                    .getElementById("unidad")
                    .value;


            var stock =
                document
                    .getElementById("stock")
                    .value;


            var costo =
                document
                    .getElementById("costo")
                    .value;


            if (nombre === "") {

                alert("Ingresá un nombre");

                return;

            }


            if (stock === "") {

                alert("Ingresá el stock");

                return;

            }


            if (costo === "") {

                alert("Ingresá el costo");

                return;

            }


            var insumo = {

                id: Date.now(),

                nombre: nombre,

                unidad: unidad,

                stock: Number(stock),

                costo: Number(costo)

            };


            insumos.push(insumo);


            guardarInsumos();


            limpiarFormulario();

            mostrarInsumos();

            actualizarListaCompras();

            actualizarIngredientesDisponibles();

            mostrarResumenProduccion();


            ocultarFormulario(
                "formularioInsumo"
            );

        }


        /* =========================
           MODIFICAR INSUMO
        ========================= */

        function modificarInsumo(id) {

            mostrarFormulario(
                "formularioInsumo"
            );


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                if (
                    insumos[i].id === id
                ) {

                    var insumo =
                        insumos[i];


                    document
                        .getElementById("nombre")
                        .value =
                        insumo.nombre;


                    document
                        .getElementById("unidad")
                        .value =
                        insumo.unidad;


                    document
                        .getElementById("stock")
                        .value =
                        insumo.stock;


                    document
                        .getElementById("costo")
                        .value =
                        insumo.costo;


                    insumoEditando =
                        id;


                    document
                        .getElementById(
                            "tituloFormulario"
                        )
                        .innerText =
                        "Modificar insumo";


                    document
                        .getElementById(
                            "botonGuardar"
                        )
                        .innerText =
                        "Guardar cambios";


                    document
                        .getElementById(
                            "botonGuardar"
                        )
                        .onclick =
                        function () {

                            guardarCambios();

                        };


                    document
                        .getElementById(
                            "botonCancelar"
                        )
                        .style.display =
                        "block";


                    break;

                }

            }

        }


        /* =========================
           GUARDAR CAMBIOS INSUMO
        ========================= */

        function guardarCambios() {

            var nombre =
                document
                    .getElementById("nombre")
                    .value
                    .trim();


            var unidad =
                document
                    .getElementById("unidad")
                    .value;


            var stock =
                document
                    .getElementById("stock")
                    .value;


            var costo =
                document
                    .getElementById("costo")
                    .value;


            if (nombre === "") {

                alert("Ingresá un nombre");

                return;

            }


            if (stock === "") {

                alert("Ingresá el stock");

                return;

            }


            if (costo === "") {

                alert("Ingresá el costo");

                return;

            }


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                if (
                    insumos[i].id ===
                    insumoEditando
                ) {

                    insumos[i].nombre =
                        nombre;

                    insumos[i].unidad =
                        unidad;

                    insumos[i].stock =
                        Number(stock);

                    insumos[i].costo =
                        Number(costo);

                    break;

                }

            }


            guardarInsumos();


            cancelarEdicion();

            mostrarInsumos();

            actualizarListaCompras();

            actualizarIngredientesDisponibles();

            mostrarRecetas();

            mostrarProductos();

            mostrarResumenProduccion();

        }


        /* =========================
           ELIMINAR INSUMO
        ========================= */

        function eliminarInsumo(id) {

            var confirmar =
                confirm(
                    "¿Querés eliminar este insumo?"
                );


            if (!confirmar) {
                return;
            }


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                if (
                    insumos[i].id === id
                ) {

                    insumos.splice(
                        i,
                        1
                    );

                    break;

                }

            }


            guardarInsumos();


            mostrarInsumos();

            actualizarListaCompras();

            actualizarIngredientesDisponibles();

            mostrarRecetas();

            mostrarProductos();

            mostrarResumenProduccion();

        }


        /* =========================
           CANCELAR EDICIÓN INSUMO
        ========================= */

        function cancelarEdicion() {

            insumoEditando =
                null;


            limpiarFormulario();


            document
                .getElementById(
                    "tituloFormulario"
                )
                .innerText =
                "Nuevo insumo";


            document
                .getElementById(
                    "botonGuardar"
                )
                .innerText =
                "Agregar insumo";


            document
                .getElementById(
                    "botonGuardar"
                )
                .onclick =
                function () {

                    crearInsumo();

                };


            document
                .getElementById(
                    "botonCancelar"
                )
                .style.display =
                "none";


            ocultarFormulario(
                "formularioInsumo"
            );

        }


        function limpiarFormulario() {

            document
                .getElementById("nombre")
                .value = "";


            document
                .getElementById("stock")
                .value = "";


            document
                .getElementById("costo")
                .value = "";

        }


        /* =========================
           MOSTRAR INSUMOS
        ========================= */

        function mostrarInsumos() {

            var lista =
                document.getElementById(
                    "listaInsumos"
                );


            lista.innerHTML = "";


            if (insumos.length === 0) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay insumos' +
                    '</div>';

                return;

            }


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                var insumo =
                    insumos[i];


                lista.innerHTML +=

                    '<div class="insumo">' +

                        '<div class="insumo-nombre">' +
                            insumo.nombre +
                        '</div>' +

                        '<div class="insumo-dato">' +
                            'Stock: ' +
                            insumo.stock +
                            ' ' +
                            insumo.unidad +
                        '</div>' +

                        '<div class="insumo-dato">' +
                            'Costo: $' +
                            insumo.costo.toLocaleString(
                                "es-AR"
                            ) +
                            ' / ' +
                            insumo.unidad +
                        '</div>' +

                        '<div class="botones">' +

                            '<button ' +
                                'class="boton-modificar" ' +
                                'onclick="modificarInsumo(' +
                                insumo.id +
                                ')">' +
                                'Modificar' +
                            '</button>' +

                            '<button ' +
                                'class="boton-eliminar" ' +
                                'onclick="eliminarInsumo(' +
                                insumo.id +
                                ')">' +
                                'Eliminar' +
                            '</button>' +

                        '</div>' +

                    '</div>';

            }

        }


        /* =========================
           COMPRAS
        ========================= */

        function actualizarListaCompras() {

            var select =
                document.getElementById(
                    "compraInsumo"
                );


            select.innerHTML =
                '<option value="">' +
                'Seleccionar insumo' +
                '</option>';


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                var insumo =
                    insumos[i];


                select.innerHTML +=

                    '<option value="' +
                    insumo.id +
                    '">' +
                    insumo.nombre +
                    '</option>';

            }


            actualizarUnidadesCompra();

        }


        function actualizarUnidadesCompra() {

            var selectInsumo =
                document.getElementById(
                    "compraInsumo"
                );


            var selectUnidad =
                document.getElementById(
                    "compraUnidad"
                );


            selectUnidad.innerHTML = "";


            var id =
                Number(
                    selectInsumo.value
                );


            if (!id) {

                selectUnidad.innerHTML =
                    '<option value="">' +
                    'Primero seleccioná un insumo' +
                    '</option>';

                return;

            }


            var insumo =
                obtenerInsumo(id);


            if (!insumo) {
                return;
            }


            if (insumo.unidad === "g") {

                selectUnidad.innerHTML =
                    '<option value="g">Gramos (g)</option>' +
                    '<option value="kg">Kilogramos (kg)</option>';

            }

            else if (
                insumo.unidad === "kg"
            ) {

                selectUnidad.innerHTML =
                    '<option value="kg">Kilogramos (kg)</option>' +
                    '<option value="g">Gramos (g)</option>';

            }

            else if (
                insumo.unidad === "ml"
            ) {

                selectUnidad.innerHTML =
                    '<option value="ml">Mililitros (ml)</option>' +
                    '<option value="litro">Litros (L)</option>';

            }

            else if (
                insumo.unidad === "litro"
            ) {

                selectUnidad.innerHTML =
                    '<option value="litro">Litros (L)</option>' +
                    '<option value="ml">Mililitros (ml)</option>';

            }

            else {

                selectUnidad.innerHTML =
                    '<option value="unidad">Unidades</option>';

            }

        }


        function convertirCantidad(
            cantidad,
            unidadCompra,
            unidadInsumo
        ) {

            if (
                unidadCompra === "kg" &&
                unidadInsumo === "g"
            ) {

                return cantidad * 1000;

            }


            if (
                unidadCompra === "g" &&
                unidadInsumo === "kg"
            ) {

                return cantidad / 1000;

            }


            if (
                unidadCompra === "litro" &&
                unidadInsumo === "ml"
            ) {

                return cantidad * 1000;

            }


            if (
                unidadCompra === "ml" &&
                unidadInsumo === "litro"
            ) {

                return cantidad / 1000;

            }


            return cantidad;

        }


        function registrarCompra() {

            var id =
                Number(
                    document
                        .getElementById(
                            "compraInsumo"
                        )
                        .value
                );


            var cantidad =
                Number(
                    document
                        .getElementById(
                            "compraCantidad"
                        )
                        .value
                );


            var unidadCompra =
                document
                    .getElementById(
                        "compraUnidad"
                    )
                    .value;


            var precio =
                Number(
                    document
                        .getElementById(
                            "compraPrecio"
                        )
                        .value
                );


            if (!id) {

                alert("Seleccioná un insumo");

                return;

            }


            if (
                !cantidad ||
                cantidad <= 0
            ) {

                alert(
                    "Ingresá una cantidad válida"
                );

                return;

            }


            if (
                !precio ||
                precio <= 0
            ) {

                alert(
                    "Ingresá el precio de la compra"
                );

                return;

            }


            var insumo =
                obtenerInsumo(id);


            if (!insumo) {

                alert(
                    "El insumo no existe"
                );

                return;

            }


            var cantidadConvertida =
                convertirCantidad(
                    cantidad,
                    unidadCompra,
                    insumo.unidad
                );


            var nuevoCosto =
                precio /
                cantidadConvertida;


            insumo.stock =
                insumo.stock +
                cantidadConvertida;


            insumo.costo =
                nuevoCosto;


            var compra = {

                id:
                    Date.now(),

                insumoId:
                    insumo.id,

                insumoNombre:
                    insumo.nombre,

                cantidad:
                    cantidad,

                unidad:
                    unidadCompra,

                cantidadConvertida:
                    cantidadConvertida,

                unidadInterna:
                    insumo.unidad,

                precio:
                    precio

            };


            compras.push(compra);


            guardarInsumos();

            guardarCompras();


            document
                .getElementById(
                    "compraCantidad"
                )
                .value = "";


            document
                .getElementById(
                    "compraPrecio"
                )
                .value = "";


            mostrarInsumos();

            mostrarCompras();

            mostrarRecetas();

            mostrarProductos();

            mostrarResumenProduccion();


            ocultarFormulario(
                "formularioCompra"
            );

        }


        function mostrarCompras() {

            var lista =
                document.getElementById(
                    "listaCompras"
                );


            lista.innerHTML = "";


            if (compras.length === 0) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay compras' +
                    '</div>';

                return;

            }


            for (
                var i = 0;
                i < compras.length;
                i++
            ) {

                var compra =
                    compras[i];


                lista.innerHTML +=

                    '<div class="compra">' +

                        '<div class="compra-nombre">' +
                            compra.insumoNombre +
                        '</div>' +

                        '<div class="compra-dato">' +
                            'Compra: ' +
                            compra.cantidad +
                            ' ' +
                            compra.unidad +
                        '</div>' +

                        '<div class="compra-dato">' +
                            'Ingresó al stock: ' +
                            compra.cantidadConvertida +
                            ' ' +
                            compra.unidadInterna +
                        '</div>' +

                        '<div class="compra-dato">' +
                            'Precio: $' +
                            compra.precio.toLocaleString(
                                "es-AR"
                            ) +
                        '</div>' +

                    '</div>';

            }

        }


        /* =========================
           RECETAS
        ========================= */

        function actualizarIngredientesDisponibles() {

            var select =
                document.getElementById(
                    "ingredienteInsumo"
                );


            if (!select) {
                return;
            }


            var valorActual =
                select.value;


            select.innerHTML =
                '<option value="">' +
                'Seleccionar insumo' +
                '</option>';


            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                var insumo =
                    insumos[i];


                select.innerHTML +=

                    '<option value="' +
                    insumo.id +
                    '">' +
                    insumo.nombre +
                    '</option>';

            }


            if (valorActual !== "") {

                select.value =
                    valorActual;

            }


            actualizarUnidadesIngrediente();

        }


        function actualizarUnidadesIngrediente() {

            var selectInsumo =
                document.getElementById(
                    "ingredienteInsumo"
                );


            var selectUnidad =
                document.getElementById(
                    "ingredienteUnidad"
                );


            selectUnidad.innerHTML = "";


            var id =
                Number(
                    selectInsumo.value
                );


            if (!id) {

                selectUnidad.innerHTML =
                    '<option value="">' +
                    'Primero seleccioná un insumo' +
                    '</option>';

                return;

            }


            var insumo =
                obtenerInsumo(id);


            if (!insumo) {
                return;
            }


            if (insumo.unidad === "g") {

                selectUnidad.innerHTML =
                    '<option value="g">Gramos (g)</option>' +
                    '<option value="kg">Kilogramos (kg)</option>';

            }

            else if (
                insumo.unidad === "kg"
            ) {

                selectUnidad.innerHTML =
                    '<option value="kg">Kilogramos (kg)</option>' +
                    '<option value="g">Gramos (g)</option>';

            }

            else if (
                insumo.unidad === "ml"
            ) {

                selectUnidad.innerHTML =
                    '<option value="ml">Mililitros (ml)</option>' +
                    '<option value="litro">Litros (L)</option>';

            }

            else if (
                insumo.unidad === "litro"
            ) {

                selectUnidad.innerHTML =
                    '<option value="litro">Litros (L)</option>' +
                    '<option value="ml">Mililitros (ml)</option>';

            }

            else {

                selectUnidad.innerHTML =
                    '<option value="unidad">Unidades</option>';

            }

        }


        function agregarIngrediente() {

            var insumoId =
                Number(
                    document
                        .getElementById(
                            "ingredienteInsumo"
                        )
                        .value
                );


            var cantidad =
                Number(
                    document
                        .getElementById(
                            "ingredienteCantidad"
                        )
                        .value
                );


            var unidad =
                document
                    .getElementById(
                        "ingredienteUnidad"
                    )
                    .value;


            if (!insumoId) {

                alert(
                    "Seleccioná un insumo"
                );

                return;

            }


            if (
                !cantidad ||
                cantidad <= 0
            ) {

                alert(
                    "Ingresá una cantidad válida"
                );

                return;

            }


            var insumo =
                obtenerInsumo(insumoId);


            if (!insumo) {

                alert(
                    "El insumo no existe"
                );

                return;

            }


            for (
                var i = 0;
                i < ingredientesReceta.length;
                i++
            ) {

                if (
                    ingredientesReceta[i]
                        .insumoId ===
                    insumoId
                ) {

                    alert(
                        "Ese insumo ya está en la receta"
                    );

                    return;

                }

            }


            ingredientesReceta.push({

                insumoId:
                    insumoId,

                cantidad:
                    cantidad,

                unidad:
                    unidad

            });


            document
                .getElementById(
                    "ingredienteCantidad"
                )
                .value = "";


            mostrarIngredientesReceta();

        }


        function eliminarIngrediente(indice) {

            ingredientesReceta.splice(
                indice,
                1
            );


            mostrarIngredientesReceta();

        }


        function obtenerInsumo(id) {

            for (
                var i = 0;
                i < insumos.length;
                i++
            ) {

                if (
                    insumos[i].id === id
                ) {

                    return insumos[i];

                }

            }


            return null;

        }


        function calcularCostoIngredientes(
            ingredientes
        ) {

            var total = 0;


            for (
                var i = 0;
                i < ingredientes.length;
                i++
            ) {

                var ingrediente =
                    ingredientes[i];


                var insumo =
                    obtenerInsumo(
                        ingrediente.insumoId
                    );


                if (!insumo) {
                    continue;
                }


                var cantidadConvertida =
                    convertirCantidad(
                        ingrediente.cantidad,
                        ingrediente.unidad,
                        insumo.unidad
                    );


                total =
                    total +
                    cantidadConvertida *
                    insumo.costo;

            }


            return total;

        }


        function mostrarIngredientesReceta() {

            var lista =
                document.getElementById(
                    "listaIngredientesReceta"
                );


            lista.innerHTML = "";


            if (
                ingredientesReceta.length === 0
            ) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay ingredientes' +
                    '</div>';


                mostrarCostoFormularioReceta();

                return;

            }


            for (
                var i = 0;
                i < ingredientesReceta.length;
                i++
            ) {

                var ingrediente =
                    ingredientesReceta[i];


                var insumo =
                    obtenerInsumo(
                        ingrediente.insumoId
                    );


                var nombre =
                    insumo
                        ? insumo.nombre
                        : "Insumo eliminado";


                lista.innerHTML +=

                    '<div class="ingrediente">' +

                        '<div class="ingrediente-nombre">' +
                            nombre +
                        '</div>' +

                        '<div class="ingrediente-dato">' +
                            'Cantidad: ' +
                            ingrediente.cantidad +
                            ' ' +
                            ingrediente.unidad +
                        '</div>' +

                        '<button ' +
                            'class="boton-eliminar" ' +
                            'onclick="eliminarIngrediente(' +
                            i +
                            ')">' +
                            'Eliminar' +
                        '</button>' +

                    '</div>';

            }


            mostrarCostoFormularioReceta();

        }


        function mostrarCostoFormularioReceta() {

            var contenedor =
                document.getElementById(
                    "costoFormularioReceta"
                );


            var costo =
                calcularCostoIngredientes(
                    ingredientesReceta
                );


            var rendimiento =
                Number(
                    document.getElementById(
                        "rendimientoReceta"
                    ).value
                );


            var texto =

                '<div class="costo-receta">' +

                    '<div class="receta-dato">' +
                        '<strong>Costo total de la receta:</strong> $' +
                        costo.toLocaleString(
                            "es-AR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>';


            if (rendimiento > 0) {

                var costoUnitario =
                    costo /
                    rendimiento;


                texto +=

                    '<div class="receta-dato">' +
                        '<strong>Costo por unidad:</strong> $' +
                        costoUnitario.toLocaleString(
                            "es-AR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>';

            }


            texto +=
                '</div>';


            contenedor.innerHTML =
                texto;

        }


        function crearReceta() {

            var nombre =
                document
                    .getElementById(
                        "nombreReceta"
                    )
                    .value
                    .trim();


            var rendimiento =
                Number(
                    document
                        .getElementById(
                            "rendimientoReceta"
                        )
                        .value
                );


            if (nombre === "") {

                alert(
                    "Ingresá un nombre para la receta"
                );

                return;

            }


            if (
                !rendimiento ||
                rendimiento <= 0
            ) {

                alert(
                    "Ingresá un rendimiento válido"
                );

                return;

            }


            if (
                ingredientesReceta.length === 0
            ) {

                alert(
                    "Agregá al menos un ingrediente"
                );

                return;

            }


            var receta = {

                id:
                    Date.now(),

                nombre:
                    nombre,

                rendimiento:
                    rendimiento,

                ingredientes:
                    copiarIngredientes(
                        ingredientesReceta
                    )

            };


            recetas.push(receta);


            guardarRecetas();


            cancelarEdicionReceta();

            mostrarRecetas();

            actualizarRecetasDisponiblesProducto();

        }


        function copiarIngredientes(
            ingredientes
        ) {

            var copia = [];


            for (
                var i = 0;
                i < ingredientes.length;
                i++
            ) {

                copia.push({

                    insumoId:
                        ingredientes[i].insumoId,

                    cantidad:
                        ingredientes[i].cantidad,

                    unidad:
                        ingredientes[i].unidad

                });

            }


            return copia;

        }


        function modificarReceta(id) {

            mostrarFormulario(
                "formularioReceta"
            );


            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                if (
                    recetas[i].id === id
                ) {

                    var receta =
                        recetas[i];


                    document
                        .getElementById(
                            "nombreReceta"
                        )
                        .value =
                        receta.nombre;


                    document
                        .getElementById(
                            "rendimientoReceta"
                        )
                        .value =
                        receta.rendimiento;


                    ingredientesReceta =
                        copiarIngredientes(
                            receta.ingredientes
                        );


                    recetaEditando =
                        id;


                    document
                        .getElementById(
                            "tituloFormularioReceta"
                        )
                        .innerText =
                        "Modificar receta";


                    document
                        .getElementById(
                            "botonGuardarReceta"
                        )
                        .innerText =
                        "Guardar cambios";


                    document
                        .getElementById(
                            "botonGuardarReceta"
                        )
                        .onclick =
                        function () {

                            guardarCambiosReceta();

                        };


                    document
                        .getElementById(
                            "botonCancelarReceta"
                        )
                        .style.display =
                        "block";


                    mostrarIngredientesReceta();

                    break;

                }

            }

        }


        function guardarCambiosReceta() {

            var nombre =
                document
                    .getElementById(
                        "nombreReceta"
                    )
                    .value
                    .trim();


            var rendimiento =
                Number(
                    document
                        .getElementById(
                            "rendimientoReceta"
                        )
                        .value
                );


            if (nombre === "") {

                alert(
                    "Ingresá un nombre para la receta"
                );

                return;

            }


            if (
                !rendimiento ||
                rendimiento <= 0
            ) {

                alert(
                    "Ingresá un rendimiento válido"
                );

                return;

            }


            if (
                ingredientesReceta.length === 0
            ) {

                alert(
                    "Agregá al menos un ingrediente"
                );

                return;

            }


            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                if (
                    recetas[i].id ===
                    recetaEditando
                ) {

                    recetas[i].nombre =
                        nombre;

                    recetas[i].rendimiento =
                        rendimiento;

                    recetas[i].ingredientes =
                        copiarIngredientes(
                            ingredientesReceta
                        );

                    break;

                }

            }


            guardarRecetas();


            cancelarEdicionReceta();

            mostrarRecetas();

            mostrarProductos();

            actualizarRecetasDisponiblesProducto();

            mostrarResumenProduccion();

        }


        function cancelarEdicionReceta() {

            recetaEditando =
                null;


            ingredientesReceta =
                [];


            document
                .getElementById(
                    "nombreReceta"
                )
                .value = "";


            document
                .getElementById(
                    "rendimientoReceta"
                )
                .value = "";


            document
                .getElementById(
                    "tituloFormularioReceta"
                )
                .innerText =
                "Nueva receta";


            document
                .getElementById(
                    "botonGuardarReceta"
                )
                .innerText =
                "Crear receta";


            document
                .getElementById(
                    "botonGuardarReceta"
                )
                .onclick =
                function () {

                    crearReceta();

                };


            document
                .getElementById(
                    "botonCancelarReceta"
                )
                .style.display =
                "none";


            mostrarIngredientesReceta();


            ocultarFormulario(
                "formularioReceta"
            );

        }


        function eliminarReceta(id) {

            var confirmar =
                confirm(
                    "¿Querés eliminar esta receta?"
                );


            if (!confirmar) {
                return;
            }


            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                if (
                    recetas[i].id === id
                ) {

                    recetas.splice(
                        i,
                        1
                    );

                    break;

                }

            }


            guardarRecetas();


            mostrarRecetas();

            actualizarRecetasDisponiblesProducto();

            mostrarProductos();

            mostrarResumenProduccion();

        }


        function mostrarRecetas() {

            var lista =
                document.getElementById(
                    "listaRecetas"
                );


            if (!lista) {
                return;
            }


            lista.innerHTML = "";


            if (recetas.length === 0) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay recetas' +
                    '</div>';

                return;

            }


            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                var receta =
                    recetas[i];


                var costoTotal =
                    calcularCostoIngredientes(
                        receta.ingredientes
                    );


                var costoUnitario =
                    costoTotal /
                    receta.rendimiento;


                var ingredientesHTML =
                    "";


                for (
                    var j = 0;
                    j < receta.ingredientes.length;
                    j++
                ) {

                    var ingrediente =
                        receta.ingredientes[j];


                    var insumo =
                        obtenerInsumo(
                            ingrediente.insumoId
                        );


                    var nombreIngrediente =
                        insumo
                            ? insumo.nombre
                            : "Insumo eliminado";


                    ingredientesHTML +=

                        '<div class="receta-dato">' +
                            nombreIngrediente +
                            ': ' +
                            ingrediente.cantidad +
                            ' ' +
                            ingrediente.unidad +
                        '</div>';

                }


                lista.innerHTML +=

                    '<div class="receta">' +

                        '<div class="receta-nombre">' +
                            receta.nombre +
                        '</div>' +

                        '<div class="receta-dato">' +
                            '<strong>Rendimiento de la receta:</strong> ' +
                            receta.rendimiento +
                            ' unidades' +
                        '</div>' +

                        '<div>' +
                            ingredientesHTML +
                        '</div>' +

                        '<div class="costo-receta">' +

                            '<div class="receta-dato">' +
                                '<strong>Costo total de la receta:</strong> $' +
                                costoTotal.toLocaleString(
                                    "es-AR",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                ) +
                            '</div>' +

                            '<div class="receta-dato">' +
                                '<strong>Costo por unidad:</strong> $' +
                                costoUnitario.toLocaleString(
                                    "es-AR",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                ) +
                            '</div>' +

                        '</div>' +

                        '<div class="botones">' +

                            '<button ' +
                                'class="boton-modificar" ' +
                                'onclick="modificarReceta(' +
                                receta.id +
                                ')">' +
                                'Modificar' +
                            '</button>' +

                            '<button ' +
                                'class="boton-eliminar" ' +
                                'onclick="eliminarReceta(' +
                                receta.id +
                                ')">' +
                                'Eliminar' +
                            '</button>' +

                        '</div>' +

                    '</div>';

            }

        }


        /* =========================
           PRODUCTOS
        ========================= */

        function obtenerReceta(id) {

            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                if (
                    recetas[i].id === id
                ) {

                    return recetas[i];

                }

            }


            return null;

        }


        function actualizarRecetasDisponiblesProducto() {

            var select =
                document.getElementById(
                    "recetaProducto"
                );


            if (!select) {
                return;
            }


            var valorActual =
                select.value;


            select.innerHTML =
                '<option value="">' +
                'Seleccionar receta' +
                '</option>';


            for (
                var i = 0;
                i < recetas.length;
                i++
            ) {

                var receta =
                    recetas[i];


                select.innerHTML +=

                    '<option value="' +
                    receta.id +
                    '">' +
                    receta.nombre +
                    '</option>';

            }


            if (valorActual !== "") {

                select.value =
                    valorActual;

            }


            mostrarCostoProductoFormulario();

        }


        function mostrarCostoProductoFormulario() {

            var contenedor =
                document.getElementById(
                    "costoProductoFormulario"
                );


            if (!contenedor) {
                return;
            }


            var recetaId =
                Number(
                    document.getElementById(
                        "recetaProducto"
                    ).value
                );


            var receta =
                obtenerReceta(
                    recetaId
                );


            if (!receta) {

                contenedor.innerHTML = "";

                return;

            }


            var costoTotal =
                calcularCostoIngredientes(
                    receta.ingredientes
                );


            var costoUnitario =
                costoTotal /
                receta.rendimiento;


            contenedor.innerHTML =

                '<div class="producto-costo">' +

                    '<div class="producto-dato">' +
                        '<strong>Receta:</strong> ' +
                        receta.nombre +
                    '</div>' +

                    '<div class="producto-dato">' +
                        '<strong>Costo por unidad:</strong> $' +
                        costoUnitario.toLocaleString(
                            "es-AR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>' +

                '</div>';

        }


        function crearProducto() {

            var nombre =
                document
                    .getElementById(
                        "nombreProducto"
                    )
                    .value
                    .trim();


            var recetaId =
                Number(
                    document
                        .getElementById(
                            "recetaProducto"
                        )
                        .value
                );


            var peso =
                Number(
                    document
                        .getElementById(
                            "pesoProducto"
                        )
                        .value
                );


            var diametro =
                Number(
                    document
                        .getElementById(
                            "diametroProducto"
                        )
                        .value
                );


            var precio =
                Number(
                    document
                        .getElementById(
                            "precioProducto"
                        )
                        .value
                );


            if (nombre === "") {

                alert(
                    "Ingresá un nombre para el producto"
                );

                return;

            }


            if (!recetaId) {

                alert(
                    "Seleccioná una receta"
                );

                return;

            }


            if (!peso || peso <= 0) {

                alert(
                    "Ingresá un peso válido"
                );

                return;

            }


            if (!diametro || diametro <= 0) {

                alert(
                    "Ingresá un diámetro válido"
                );

                return;

            }


            if (!precio || precio <= 0) {

                alert(
                    "Ingresá un precio de venta válido"
                );

                return;

            }


            var receta =
                obtenerReceta(
                    recetaId
                );


            if (!receta) {

                alert(
                    "La receta no existe"
                );

                return;

            }


            var producto = {

                id:
                    Date.now(),

                nombre:
                    nombre,

                recetaId:
                    recetaId,

                peso:
                    peso,

                diametro:
                    diametro,

                precioVenta:
                    precio,

                stock:
                    0

            };


            productos.push(
                producto
            );


            guardarProductos();


            cancelarEdicionProducto();

            mostrarProductos();

            actualizarProductosDisponiblesProduccion();

            actualizarProductosDisponiblesVenta();

        }


        function modificarProducto(id) {

            mostrarFormulario(
                "formularioProducto"
            );


            actualizarRecetasDisponiblesProducto();


            var producto =
                obtenerProducto(id);


            if (!producto) {
                return;
            }


            document
                .getElementById(
                    "nombreProducto"
                )
                .value =
                producto.nombre;


            document
                .getElementById(
                    "recetaProducto"
                )
                .value =
                producto.recetaId;


            document
                .getElementById(
                    "pesoProducto"
                )
                .value =
                producto.peso;


            document
                .getElementById(
                    "diametroProducto"
                )
                .value =
                producto.diametro;


            document
                .getElementById(
                    "precioProducto"
                )
                .value =
                producto.precioVenta;


            productoEditando =
                id;


            document
                .getElementById(
                    "tituloFormularioProducto"
                )
                .innerText =
                "Modificar producto";


            document
                .getElementById(
                    "botonGuardarProducto"
                )
                .innerText =
                "Guardar cambios";


            document
                .getElementById(
                    "botonGuardarProducto"
                )
                .onclick =
                function () {

                    guardarCambiosProducto();

                };


            document
                .getElementById(
                    "botonCancelarProducto"
                )
                .style.display =
                "block";


            mostrarCostoProductoFormulario();

        }


        function obtenerProducto(id) {

            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                if (
                    productos[i].id === id
                ) {

                    return productos[i];

                }

            }


            return null;

        }


        function guardarCambiosProducto() {

            var nombre =
                document
                    .getElementById(
                        "nombreProducto"
                    )
                    .value
                    .trim();


            var recetaId =
                Number(
                    document
                        .getElementById(
                            "recetaProducto"
                        )
                        .value
                );


            var peso =
                Number(
                    document
                        .getElementById(
                            "pesoProducto"
                        )
                        .value
                );


            var diametro =
                Number(
                    document
                        .getElementById(
                            "diametroProducto"
                        )
                        .value
                );


            var precio =
                Number(
                    document
                        .getElementById(
                            "precioProducto"
                        )
                        .value
                );


            if (nombre === "") {

                alert(
                    "Ingresá un nombre para el producto"
                );

                return;

            }


            if (!recetaId) {

                alert(
                    "Seleccioná una receta"
                );

                return;

            }


            if (!peso || peso <= 0) {

                alert(
                    "Ingresá un peso válido"
                );

                return;

            }


            if (!diametro || diametro <= 0) {

                alert(
                    "Ingresá un diámetro válido"
                );

                return;

            }


            if (!precio || precio <= 0) {

                alert(
                    "Ingresá un precio de venta válido"
                );

                return;

            }


            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                if (
                    productos[i].id ===
                    productoEditando
                ) {

                    productos[i].nombre =
                        nombre;

                    productos[i].recetaId =
                        recetaId;

                    productos[i].peso =
                        peso;

                    productos[i].diametro =
                        diametro;

                    productos[i].precioVenta =
                        precio;

                    if (
                        productos[i].stock === undefined
                    ) {

                        productos[i].stock =
                            0;

                    }

                    break;

                }

            }


            guardarProductos();


            cancelarEdicionProducto();

            mostrarProductos();

            actualizarProductosDisponiblesProduccion();

            actualizarProductosDisponiblesVenta();

        }


        function cancelarEdicionProducto() {

            productoEditando =
                null;


            document
                .getElementById(
                    "nombreProducto"
                )
                .value = "";


            document
                .getElementById(
                    "recetaProducto"
                )
                .value = "";


            document
                .getElementById(
                    "pesoProducto"
                )
                .value = "";


            document
                .getElementById(
                    "diametroProducto"
                )
                .value = "";


            document
                .getElementById(
                    "precioProducto"
                )
                .value = "";


            document
                .getElementById(
                    "tituloFormularioProducto"
                )
                .innerText =
                "Nuevo producto";


            document
                .getElementById(
                    "botonGuardarProducto"
                )
                .innerText =
                "Crear producto";


            document
                .getElementById(
                    "botonGuardarProducto"
                )
                .onclick =
                function () {

                    crearProducto();

                };


            document
                .getElementById(
                    "botonCancelarProducto"
                )
                .style.display =
                "none";


            document
                .getElementById(
                    "costoProductoFormulario"
                )
                .innerHTML = "";


            ocultarFormulario(
                "formularioProducto"
            );

        }


        function eliminarProducto(id) {

            var confirmar =
                confirm(
                    "¿Querés eliminar este producto?"
                );


            if (!confirmar) {
                return;
            }


            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                if (
                    productos[i].id === id
                ) {

                    productos.splice(
                        i,
                        1
                    );

                    break;

                }

            }


            guardarProductos();

            mostrarProductos();

            actualizarProductosDisponiblesProduccion();

            actualizarProductosDisponiblesVenta();

        }


        function mostrarProductos() {

            var lista =
                document.getElementById(
                    "listaProductos"
                );


            if (!lista) {
                return;
            }


            lista.innerHTML = "";


            if (productos.length === 0) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay productos' +
                    '</div>';

                return;

            }


            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                var producto =
                    productos[i];


                var receta =
                    obtenerReceta(
                        producto.recetaId
                    );


                var nombreReceta =
                    receta
                        ? receta.nombre
                        : "Receta eliminada";


                var costoUnitario =
                    0;


                if (receta) {

                    var costoTotal =
                        calcularCostoIngredientes(
                            receta.ingredientes
                        );


                    costoUnitario =
                        costoTotal /
                        receta.rendimiento;

                }


                var stockProducto =
                    Number(
                        producto.stock || 0
                    );


                lista.innerHTML +=

                    '<div class="producto">' +

                        '<div class="producto-nombre">' +
                            producto.nombre +
                        '</div>' +

                        '<div class="producto-dato">' +
                            '<strong>Receta:</strong> ' +
                            nombreReceta +
                        '</div>' +

                        '<div class="producto-dato">' +
                            '<strong>Peso:</strong> ' +
                            producto.peso +
                            ' g' +
                        '</div>' +

                        '<div class="producto-dato">' +
                            '<strong>Diámetro:</strong> ' +
                            producto.diametro +
                            ' cm' +
                        '</div>' +

                        '<div class="producto-dato">' +
                            '<strong>Stock:</strong> ' +
                            stockProducto +
                            ' unidades' +
                        '</div>' +

                        '<div class="producto-dato">' +
                            '<strong>Precio de venta:</strong> $' +
                            producto.precioVenta.toLocaleString(
                                "es-AR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            ) +
                        '</div>' +

                        '<div class="producto-costo">' +

                            '<div class="producto-dato">' +
                                '<strong>Costo:</strong> $' +
                                costoUnitario.toLocaleString(
                                    "es-AR",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                ) +
                            '</div>' +

                            '<div class="producto-dato">' +
                                '<strong>Margen bruto:</strong> $' +
                                (
                                    producto.precioVenta -
                                    costoUnitario
                                ).toLocaleString(
                                    "es-AR",
                                    {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2
                                    }
                                ) +
                            '</div>' +

                        '</div>' +

                        '<div class="botones">' +

                            '<button ' +
                                'class="boton-modificar" ' +
                                'onclick="modificarProducto(' +
                                producto.id +
                                ')">' +
                                'Modificar' +
                            '</button>' +

                            '<button ' +
                                'class="boton-eliminar" ' +
                                'onclick="eliminarProducto(' +
                                producto.id +
                                ')">' +
                                'Eliminar' +
                            '</button>' +

                        '</div>' +

                    '</div>';

            }

        }


        /* =========================
           PRODUCCIÓN
        ========================= */

        function abrirFormularioProduccion() {

            actualizarProductosDisponiblesProduccion();


            document
                .getElementById(
                    "productoProduccion"
                )
                .value = "";


            document
                .getElementById(
                    "cantidadProduccion"
                )
                .value = "";


            document
                .getElementById(
                    "resumenProduccion"
                )
                .innerHTML = "";


            mostrarFormulario(
                "formularioProduccion"
            );

        }


        function actualizarProductosDisponiblesProduccion() {

            var select =
                document.getElementById(
                    "productoProduccion"
                );


            if (!select) {
                return;
            }


            var valorActual =
                select.value;


            select.innerHTML =
                '<option value="">' +
                'Seleccionar producto' +
                '</option>';


            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                var producto =
                    productos[i];


                select.innerHTML +=

                    '<option value="' +
                    producto.id +
                    '">' +
                    producto.nombre +
                    '</option>';

            }


            if (valorActual !== "") {

                select.value =
                    valorActual;

            }


            mostrarResumenProduccion();

        }


        function mostrarResumenProduccion() {

            var contenedor =
                document.getElementById(
                    "resumenProduccion"
                );


            if (!contenedor) {
                return;
            }


            var productoId =
                Number(
                    document.getElementById(
                        "productoProduccion"
                    ).value
                );


            var cantidad =
                Number(
                    document.getElementById(
                        "cantidadProduccion"
                    ).value
                );


            if (
                !productoId ||
                !cantidad ||
                cantidad <= 0
            ) {

                contenedor.innerHTML = "";

                return;

            }


            var producto =
                obtenerProducto(
                    productoId
                );


            if (!producto) {

                contenedor.innerHTML = "";

                return;

            }


            var receta =
                obtenerReceta(
                    producto.recetaId
                );


            if (!receta) {

                contenedor.innerHTML =

                    '<div class="produccion-resumen">' +

                        '<div class="produccion-resumen-dato">' +
                            'La receta asociada no existe.' +
                        '</div>' +

                    '</div>';

                return;

            }


            var factor =
                cantidad /
                receta.rendimiento;


            var html =

                '<div class="produccion-resumen">' +

                    '<div class="produccion-resumen-titulo">' +
                        'Insumos necesarios' +
                    '</div>' +

                    '<div class="produccion-resumen-dato">' +
                        'Producto: ' +
                        producto.nombre +
                    '</div>' +

                    '<div class="produccion-resumen-dato">' +
                        'Cantidad a producir: ' +
                        cantidad +
                        ' unidades' +
                    '</div>' +

                    '<div class="produccion-resumen-dato">' +
                        'Rendimiento de la receta: ' +
                        receta.rendimiento +
                        ' unidades' +
                    '</div>';


            for (
                var i = 0;
                i < receta.ingredientes.length;
                i++
            ) {

                var ingrediente =
                    receta.ingredientes[i];


                var insumo =
                    obtenerInsumo(
                        ingrediente.insumoId
                    );


                if (!insumo) {

                    html +=

                        '<div class="produccion-resumen-dato">' +
                            '⚠ Insumo eliminado' +
                        '</div>';

                    continue;

                }


                var cantidadReceta =
                    convertirCantidad(
                        ingrediente.cantidad,
                        ingrediente.unidad,
                        insumo.unidad
                    );


                var cantidadNecesaria =
                    cantidadReceta *
                    factor;


                var suficiente =
                    insumo.stock >=
                    cantidadNecesaria;


                html +=

                    '<div class="produccion-insumo">' +

                        insumo.nombre +
                        ': ' +

                        cantidadNecesaria.toLocaleString(
                            "es-AR",
                            {
                                maximumFractionDigits: 4
                            }
                        ) +
                        ' ' +
                        insumo.unidad +

                        ' — stock: ' +

                        insumo.stock.toLocaleString(
                            "es-AR",
                            {
                                maximumFractionDigits: 4
                            }
                        ) +
                        ' ' +
                        insumo.unidad +

                        (
                            suficiente
                                ? ''
                                : ' ⚠ STOCK INSUFICIENTE'
                        ) +

                    '</div>';

            }


            html +=
                '</div>';


            contenedor.innerHTML =
                html;

        }


        function registrarProduccion() {

            var productoId =
                Number(
                    document
                        .getElementById(
                            "productoProduccion"
                        )
                        .value
                );


            var cantidad =
                Number(
                    document
                        .getElementById(
                            "cantidadProduccion"
                        )
                        .value
                );


            if (!productoId) {

                alert(
                    "Seleccioná un producto"
                );

                return;

            }


            if (
                !cantidad ||
                cantidad <= 0
            ) {

                alert(
                    "Ingresá una cantidad válida"
                );

                return;

            }


            var producto =
                obtenerProducto(
                    productoId
                );


            if (!producto) {

                alert(
                    "El producto no existe"
                );

                return;

            }


            var receta =
                obtenerReceta(
                    producto.recetaId
                );


            if (!receta) {

                alert(
                    "El producto no tiene una receta válida"
                );

                return;

            }


            var factor =
                cantidad /
                receta.rendimiento;


            var consumos = [];


            for (
                var i = 0;
                i < receta.ingredientes.length;
                i++
            ) {

                var ingrediente =
                    receta.ingredientes[i];


                var insumo =
                    obtenerInsumo(
                        ingrediente.insumoId
                    );


                if (!insumo) {

                    alert(
                        "La receta contiene un insumo que ya no existe"
                    );

                    return;

                }


                var cantidadReceta =
                    convertirCantidad(
                        ingrediente.cantidad,
                        ingrediente.unidad,
                        insumo.unidad
                    );


                var cantidadNecesaria =
                    cantidadReceta *
                    factor;


                if (
                    insumo.stock <
                    cantidadNecesaria
                ) {

                    alert(
                        "Stock insuficiente de " +
                        insumo.nombre +
                        ". Necesitás " +
                        cantidadNecesaria +
                        " " +
                        insumo.unidad +
                        " y tenés " +
                        insumo.stock +
                        " " +
                        insumo.unidad +
                        "."
                    );

                    return;

                }


                consumos.push({

                    insumoId:
                        insumo.id,

                    insumoNombre:
                        insumo.nombre,

                    cantidad:
                        cantidadNecesaria,

                    unidad:
                        insumo.unidad

                });

            }


            for (
                var i = 0;
                i < consumos.length;
                i++
            ) {

                var consumo =
                    consumos[i];


                var insumo =
                    obtenerInsumo(
                        consumo.insumoId
                    );


                insumo.stock =
                    Math.max(
                        0,
                        insumo.stock -
                        consumo.cantidad
                    );

            }


            if (
                producto.stock === undefined
            ) {

                producto.stock =
                    0;

            }


            producto.stock =
                producto.stock +
                cantidad;


            var produccion = {

                id:
                    Date.now(),

                productoId:
                    producto.id,

                productoNombre:
                    producto.nombre,

                recetaId:
                    receta.id,

                recetaNombre:
                    receta.nombre,

                cantidad:
                    cantidad,

                fecha:
                    new Date().toISOString(),

                consumos:
                    consumos

            };


            producciones.push(
                produccion
            );


            guardarInsumos();

            guardarProductos();

            guardarProducciones();


            mostrarInsumos();

            mostrarProductos();

            mostrarProducciones();

            actualizarProductosDisponiblesVenta();


            document
                .getElementById(
                    "productoProduccion"
                )
                .value = "";


            document
                .getElementById(
                    "cantidadProduccion"
                )
                .value = "";


            document
                .getElementById(
                    "resumenProduccion"
                )
                .innerHTML = "";


            ocultarFormulario(
                "formularioProduccion"
            );

        }


        function mostrarProducciones() {

            var lista =
                document.getElementById(
                    "listaProducciones"
                );


            if (!lista) {
                return;
            }


            lista.innerHTML = "";


            if (
                producciones.length === 0
            ) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay producciones' +
                    '</div>';

                return;

            }


            for (
                var i = producciones.length - 1;
                i >= 0;
                i--
            ) {

                var produccion =
                    producciones[i];


                var fecha =
                    new Date(
                        produccion.fecha
                    );


                var fechaTexto =
                    fecha.toLocaleString(
                        "es-AR"
                    );


                var consumosHTML =
                    "";


                for (
                    var j = 0;
                    j < produccion.consumos.length;
                    j++
                ) {

                    var consumo =
                        produccion.consumos[j];


                    consumosHTML +=

                        '<div class="produccion-insumo">' +

                            consumo.insumoNombre +
                            ': ' +
                            consumo.cantidad.toLocaleString(
                                "es-AR",
                                {
                                    maximumFractionDigits: 4
                                }
                            ) +
                            ' ' +
                            consumo.unidad +

                        '</div>';

                }


                lista.innerHTML +=

                    '<div class="produccion">' +

                        '<div class="produccion-nombre">' +
                            produccion.productoNombre +
                        '</div>' +

                        '<div class="produccion-dato">' +
                            '<strong>Cantidad:</strong> ' +
                            produccion.cantidad +
                            ' unidades' +
                        '</div>' +

                        '<div class="produccion-dato">' +
                            '<strong>Receta:</strong> ' +
                            produccion.recetaNombre +
                        '</div>' +

                        '<div class="produccion-dato">' +
                            '<strong>Fecha:</strong> ' +
                            fechaTexto +
                        '</div>' +

                        '<div class="produccion-insumos">' +

                            '<div class="produccion-dato">' +
                                '<strong>Insumos consumidos:</strong>' +
                            '</div>' +

                            consumosHTML +

                        '</div>' +

                    '</div>';

            }

        }


        /* ==================================================
           VENTAS
        ================================================== */


        function abrirFormularioVenta() {

            actualizarProductosDisponiblesVenta();


            document
                .getElementById(
                    "productoVenta"
                )
                .value = "";


            document
                .getElementById(
                    "cantidadVenta"
                )
                .value = "";


            document
                .getElementById(
                    "resumenVenta"
                )
                .innerHTML = "";


            mostrarFormulario(
                "formularioVenta"
            );

        }


        function actualizarProductosDisponiblesVenta() {

            var select =
                document.getElementById(
                    "productoVenta"
                );


            if (!select) {
                return;
            }


            var valorActual =
                select.value;


            select.innerHTML =
                '<option value="">' +
                'Seleccionar producto' +
                '</option>';


            for (
                var i = 0;
                i < productos.length;
                i++
            ) {

                var producto =
                    productos[i];


                select.innerHTML +=

                    '<option value="' +
                    producto.id +
                    '">' +
                    producto.nombre +
                    '</option>';

            }


            if (valorActual !== "") {

                select.value =
                    valorActual;

            }


            mostrarResumenVenta();

        }


        function mostrarResumenVenta() {

            var contenedor =
                document.getElementById(
                    "resumenVenta"
                );


            if (!contenedor) {
                return;
            }


            var productoId =
                Number(
                    document.getElementById(
                        "productoVenta"
                    ).value
                );


            var cantidad =
                Number(
                    document.getElementById(
                        "cantidadVenta"
                    ).value
                );


            if (
                !productoId ||
                !cantidad ||
                cantidad <= 0
            ) {

                contenedor.innerHTML = "";

                return;

            }


            var producto =
                obtenerProducto(
                    productoId
                );


            if (!producto) {

                contenedor.innerHTML = "";

                return;

            }


            var stock =
                Number(
                    producto.stock || 0
                );


            var total =
                cantidad *
                producto.precioVenta;


            var suficiente =
                stock >= cantidad;


            contenedor.innerHTML =

                '<div class="venta-resumen">' +

                    '<div class="venta-resumen-titulo">' +
                        'Resumen de venta' +
                    '</div>' +

                    '<div class="venta-resumen-dato">' +
                        'Producto: ' +
                        producto.nombre +
                    '</div>' +

                    '<div class="venta-resumen-dato">' +
                        'Stock disponible: ' +
                        stock +
                        ' unidades' +
                    '</div>' +

                    '<div class="venta-resumen-dato">' +
                        'Cantidad: ' +
                        cantidad +
                        ' unidades' +
                    '</div>' +

                    '<div class="venta-resumen-dato">' +
                        'Precio unitario: $' +
                        producto.precioVenta.toLocaleString(
                            "es-AR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                    '</div>' +

                    '<div class="venta-total">' +
                        '<strong>Total: $' +
                        total.toLocaleString(
                            "es-AR",
                            {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                            }
                        ) +
                        '</strong>' +
                    '</div>' +

                    (
                        suficiente
                            ? ''
                            :
                            '<div class="venta-resumen-dato">' +
                                '⚠ STOCK INSUFICIENTE' +
                            '</div>'
                    ) +

                '</div>';

        }


        function registrarVenta() {

            var productoId =
                Number(
                    document
                        .getElementById(
                            "productoVenta"
                        )
                        .value
                );


            var cantidad =
                Number(
                    document
                        .getElementById(
                            "cantidadVenta"
                        )
                        .value
                );


            if (!productoId) {

                alert(
                    "Seleccioná un producto"
                );

                return;

            }


            if (
                !cantidad ||
                cantidad <= 0
            ) {

                alert(
                    "Ingresá una cantidad válida"
                );

                return;

            }


            var producto =
                obtenerProducto(
                    productoId
                );


            if (!producto) {

                alert(
                    "El producto no existe"
                );

                return;

            }


            var stock =
                Number(
                    producto.stock || 0
                );


            if (stock < cantidad) {

                alert(
                    "Stock insuficiente de " +
                    producto.nombre +
                    ". Tenés " +
                    stock +
                    " unidades y querés vender " +
                    cantidad +
                    "."
                );

                return;

            }


            var precioUnitario =
                Number(
                    producto.precioVenta
                );


            var total =
                cantidad *
                precioUnitario;


            /*
               Primero descontamos el stock.
            */

            producto.stock =
                stock -
                cantidad;


            /*
               Guardamos la venta como
               un hecho histórico.

               El precio unitario y el
               total quedan guardados para
               conservar el valor de la
               venta aunque posteriormente
               cambie el precio del producto.
            */

            var venta = {

                id:
                    Date.now(),

                productoId:
                    producto.id,

                productoNombre:
                    producto.nombre,

                cantidad:
                    cantidad,

                precioUnitario:
                    precioUnitario,

                total:
                    total,

                fecha:
                    new Date().toISOString()

            };


            ventas.push(
                venta
            );


            guardarProductos();

            guardarVentas();


            mostrarProductos();

            mostrarVentas();

            actualizarProductosDisponiblesVenta();


            document
                .getElementById(
                    "productoVenta"
                )
                .value = "";


            document
                .getElementById(
                    "cantidadVenta"
                )
                .value = "";


            document
                .getElementById(
                    "resumenVenta"
                )
                .innerHTML = "";


            ocultarFormulario(
                "formularioVenta"
            );

        }


        function cancelarVenta() {

            document
                .getElementById(
                    "productoVenta"
                )
                .value = "";


            document
                .getElementById(
                    "cantidadVenta"
                )
                .value = "";


            document
                .getElementById(
                    "resumenVenta"
                )
                .innerHTML = "";


            ocultarFormulario(
                "formularioVenta"
            );

        }


        function mostrarVentas() {

            var lista =
                document.getElementById(
                    "listaVentas"
                );


            if (!lista) {
                return;
            }


            lista.innerHTML = "";


            if (
                ventas.length === 0
            ) {

                lista.innerHTML =
                    '<div class="vacio">' +
                    'Todavía no hay ventas' +
                    '</div>';

                return;

            }


            for (
                var i = ventas.length - 1;
                i >= 0;
                i--
            ) {

                var venta =
                    ventas[i];


                var fecha =
                    new Date(
                        venta.fecha
                    );


                var fechaTexto =
                    fecha.toLocaleString(
                        "es-AR"
                    );


                lista.innerHTML +=

                    '<div class="venta">' +

                        '<div class="venta-nombre">' +
                            venta.productoNombre +
                        '</div>' +

                        '<div class="venta-dato">' +
                            '<strong>Cantidad:</strong> ' +
                            venta.cantidad +
                            ' unidades' +
                        '</div>' +

                        '<div class="venta-dato">' +
                            '<strong>Precio unitario:</strong> $' +
                            venta.precioUnitario.toLocaleString(
                                "es-AR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            ) +
                        '</div>' +

                        '<div class="venta-total">' +
                            '<strong>Total:</strong> $' +
                            venta.total.toLocaleString(
                                "es-AR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            ) +
                        '</div>' +

                        '<div class="venta-dato">' +
                            '<strong>Fecha:</strong> ' +
                            fechaTexto +
                        '</div>' +

                    '</div>';

            }

        }


        /* =========================
           EVENTOS
        ========================= */

        document
            .getElementById(
                "rendimientoReceta"
            )
            .addEventListener(
                "input",
                function () {

                    mostrarCostoFormularioReceta();

                }
            );


        document
            .getElementById(
                "recetaProducto"
            )
            .addEventListener(
                "change",
                function () {

                    mostrarCostoProductoFormulario();

                }
            );


        /* =========================
           INICIALIZAR
        ========================= */

        mostrarInsumos();

        actualizarListaCompras();

        actualizarIngredientesDisponibles();

        mostrarCompras();

        mostrarRecetas();

        actualizarRecetasDisponiblesProducto();

        mostrarProductos();

        actualizarProductosDisponiblesProduccion();

        mostrarProducciones();

        actualizarProductosDisponiblesVenta();

        mostrarVentas()