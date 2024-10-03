let datos = [];

// Obtener datos iniciales
async function obtenerDatos() {
    try {
        let response = await fetch('https://run.mocky.io/v3/6c3f7e03-c7c9-4bbd-948c-572c3f36869b');
        datos = await response.json();
        mostrarTabla();
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
}

// Mostrar datos en la tabla
function mostrarTabla() {
    let cuerpoTabla = document.getElementById('cuerpo-tabla');
    cuerpoTabla.innerHTML = ''; // Limpiar el cuerpo de la tabla
    datos.sort((a, b) => a.id - b.id); // Ordenar por ID
    datos.forEach((articulo) => {
        let fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${articulo.id}</td>
            <td>${articulo.modelo}</td>
            <td>${articulo.color}</td>
            <td>${articulo.almacenamiento}</td>
            <td>${articulo.procesador}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// Agregar nuevo artículo
function agregarUno() {
    let id = document.getElementById('inputMarca').value; // Usar el campo de Marca como ID
    let modelo = document.getElementById('inputModelo').value;
    let color = document.getElementById('inputColor').value;
    let almacenamiento = document.getElementById('inputAlmacenamiento').value;
    let procesador = document.getElementById('inputProcesador').value;

    // Comprobar si el ID ya existe
    if (datos.find(articulo => articulo.id == id)) {
        alert('El ID ya existe. Por favor, ingrese un ID único.');
        return;
    }

    let nuevoArticulo = {
        id: parseInt(id), // Asegurarse de que el ID sea un número
        modelo,
        color,
        almacenamiento,
        procesador
    };

    datos.push(nuevoArticulo);
    mostrarTabla();
    document.getElementById('inputMarca').value = '';
    document.getElementById('inputModelo').value = '';
    document.getElementById('inputColor').value = '';
    document.getElementById('inputAlmacenamiento').value = '';
    document.getElementById('inputProcesador').value = '';
}

// Consultar un artículo por ID
function consultarUno() {
    let idConsulta = document.getElementById('txtConsulta').value;
    let articulo = datos.find(a => a.id == idConsulta);

    if (articulo) {
        document.getElementById('consultaNombre').value = articulo.id;
        document.getElementById('consultaModelo').value = articulo.modelo;
        document.getElementById('consultaColor').value = articulo.color;
        document.getElementById('consultaAlmacenamiento').value = articulo.almacenamiento;
        document.getElementById('consultaProcesador').value = articulo.procesador;
    } else {
        alert('Artículo no encontrado.');
    }
}

// Modificar un artículo
function modificarUno() {
    let id = document.getElementById('consultaNombre').value;
    let articulo = datos.find(a => a.id == id);

    if (articulo) {
        articulo.modelo = document.getElementById('consultaModelo').value;
        articulo.color = document.getElementById('consultaColor').value;
        articulo.almacenamiento = document.getElementById('consultaAlmacenamiento').value;
        articulo.procesador = document.getElementById('consultaProcesador').value;

        mostrarTabla();
        alert('Artículo modificado con éxito.');
    }
}

// Eliminar un artículo
function eliminarUno() {
    let id = document.getElementById('consultaNombre').value;
    datos = datos.filter(a => a.id != id);
    mostrarTabla();
    alert('Artículo eliminado con éxito.');
}

// Agregar nuevo artículo
function agregarUno() {
    let id = document.getElementById('inputMarca').value;
    let modelo = document.getElementById('inputModelo').value;
    let color = document.getElementById('inputColor').value;
    let almacenamiento = document.getElementById('inputAlmacenamiento').value;
    let procesador = document.getElementById('inputProcesador').value;

    // Verificar si alguno de los campos está vacío
    if (!id || !modelo || !color || !almacenamiento || !procesador) {
        alert('Por favor, completa todos los campos antes de agregar el artículo.');
        return; // Detener la ejecución si hay campos vacíos
    }

    // Comprobar si el ID ya existe
    if (datos.find(articulo => articulo.id == id)) {
        alert('El ID ya existe. Por favor, ingrese un ID único.');
        return;
    }

    let nuevoArticulo = {
        id: parseInt(id), // Asegurarse de que el ID sea un número
        modelo,
        color,
        almacenamiento,
        procesador
    };

    datos.push(nuevoArticulo);
    mostrarTabla();
    
    // Limpiar los campos después de agregar
    document.getElementById('inputMarca').value = '';
    document.getElementById('inputModelo').value = '';
    document.getElementById('inputColor').value = '';
    document.getElementById('inputAlmacenamiento').value = '';
    document.getElementById('inputProcesador').value = '';
}


// Inicializar los datos al cargar la página
window.onload = obtenerDatos;
