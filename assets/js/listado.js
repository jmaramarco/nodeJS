document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const entrenamientosTableBody = document.getElementById('entrenamientosTable').getElementsByTagName('tbody')[0];

    // Función para llenar la tabla con los datos
    function fillTable(data) {
        entrenamientosTableBody.innerHTML = ''; // Limpiar la tabla antes de llenarla

        data.forEach(item => {
            const row = entrenamientosTableBody.insertRow();

            row.insertCell(0).textContent = `${item.atleta_nombre} ${item.atleta_apellido}`;
            row.insertCell(1).textContent = `${item.profesor_nombre} ${item.profesor_apellido}`;
            row.insertCell(2).textContent = item.nom_entrenamiento;
            row.insertCell(3).textContent = item.nom_box;
            row.insertCell(4).textContent = item.dias_entrena;
            row.insertCell(5).textContent = item.compite ? 'Sí' : 'No';
        });
    }

    // Función para obtener los datos del servidor
    function fetchEntrenamientos() {
        fetch('http://localhost:3000/entrenamientos') // Ajusta la URL a tu endpoint
            .then(response => response.json())
            .then(data => {
                fillTable(data);
                entrenamientos = data; // Guardar los datos para la búsqueda
            })
            .catch(error => console.error('Error:', error));
    }

    // Función para filtrar los datos
    function filterData(query) {
        const filteredData = entrenamientos.filter(item => 
            `${item.atleta_nombre} ${item.atleta_apellido}`.toLowerCase().includes(query) ||
            `${item.profesor_nombre} ${item.profesor_apellido}`.toLowerCase().includes(query) ||
            item.nom_entrenamiento.toLowerCase().includes(query) ||
            item.nom_box.toLowerCase().includes(query)
        );
        fillTable(filteredData);
    }

    // Escuchar el evento de entrada en el campo de búsqueda
    searchInput.addEventListener('input', (event) => {
        const query = event.target.value.toLowerCase();
        filterData(query);
    });

    // Obtener los datos inicialmente
    let entrenamientos = [];
    fetchEntrenamientos();
});
