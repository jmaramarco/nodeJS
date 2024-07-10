        let currentIndex = 0;
        let atletas = [];

        document.getElementById('inscripcionForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            fetch('http://localhost:3000/atletas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                alert('Atleta inscrito exitosamente');
                this.reset();
                fetchAtletas();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al inscribir al atleta');
            });
        });

       document.getElementById('updateBtn').addEventListener('click', function() {
    const id_atleta = document.getElementById('id_atleta').value;

    // Verifica que el id_atleta no esté vacío
    if (!id_atleta) {
        alert('Por favor, ingrese el ID del atleta para actualizar.');
        return;
    }

    const formData = new FormData(document.getElementById('inscripcionForm'));
    const data = Object.fromEntries(formData.entries());

    fetch(`http://localhost:3000/atletas/${id_atleta}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert('Atleta actualizado exitosamente');
        document.getElementById('inscripcionForm').reset();
        fetchAtletas();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al actualizar al atleta');
    });
});

        document.getElementById('deleteBtn').addEventListener('click', function() {
            const id_atleta = document.getElementById('id_atleta').value;
            fetch(`http://localhost:3000/atletas/${id_atleta}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                alert('Atleta eliminado exitosamente');
                document.getElementById('inscripcionForm').reset();
                fetchAtletas();
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Hubo un error al eliminar al atleta');
            });
        });

        document.getElementById('prevBtn').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                displayAtleta(currentIndex);
            }
        });

        document.getElementById('nextBtn').addEventListener('click', function() {
            if (currentIndex < atletas.length - 1) {
                currentIndex++;
                displayAtleta(currentIndex);
            }
        });

        function fetchAtletas() {
            fetch('http://localhost:3000/atletas')
                .then(response => response.json())
                .then(data => {
                    console.log(data); // Verificar los datos recibidos
                    atletas = data;
                    if (atletas.length > 0) {
                        currentIndex = 0;
                        displayAtleta(atletas[currentIndex]);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
        

        function displayAtleta(index) {
            if (atletas.length === 0 || index < 0 || index >= atletas.length) {
                console.error('Índice fuera de rango o arreglo vacío');
                return;
            }
            const atleta = atletas[index];
            document.getElementById('id_atleta').value = atleta.id_atleta || '';
            document.getElementById('nombre').value = atleta.nombre || '';
            document.getElementById('apellido').value = atleta.apellido || '';
            document.getElementById('dni').value = atleta.dni || '';
            document.getElementById('nacionalidad').value = atleta.nacionalidad || '';
            // Validar y asignar la fecha de nacimiento
                const fec_nac = validarFecha(atleta.fec_nac);
                document.getElementById('fec_nac').value = fec_nac;
            
                document.getElementById('peso').value = atleta.peso || '';
                document.getElementById('email').value = atleta.email || '';
                document.getElementById('coments').value = atleta.coments || '';
            
        }

        function validarFecha(fecha) {
            const date = new Date(fecha);
            // Verificar si la fecha es válida
            if (isNaN(date.getTime())) {
                return ""; // Devolver una cadena vacía o algún valor predeterminado en caso de fecha inválida
            } else {
                // Formatear la fecha según el formato deseado (por ejemplo, YYYY-MM-DD)
                const formattedDate = date.toISOString().slice(0, 10);
                return formattedDate;
            }
        }

        // Fetch initial data
        fetchAtletas();

       