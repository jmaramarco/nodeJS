document.getElementById('createAccountLink').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace recargue la página
    document.getElementById('registrationFormContainer').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('loginTitle').style.display = 'none';
    document.getElementById('createAccountLink').style.display = 'none';
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    validateRegistrationForm();
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    validateLoginForm();
});

function validateRegistrationForm() {
    // Obtener los valores de los campos
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Limpiar mensajes de error previos
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirmPasswordError').textContent = '';

    let valid = true;

    // Validar email
    if (!validateEmail(email)) {
        document.getElementById('emailError').textContent = 'Email inválido';
        valid = false;
    }

    // Validar contraseña
    if (!validatePassword(password)) {
        document.getElementById('passwordError').textContent = 'La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un carácter especial';
        valid = false;
    }

    // Validar repetición de contraseña
    if (password !== confirmPassword) {
        document.getElementById('confirmPasswordError').textContent = 'Las contraseñas no coinciden';
        valid = false;
    }

    if (valid) {
        // Obtener registros anteriores del localStorage de manera segura
        let registrations;
        try {
            registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        } catch (error) {
            registrations = [];
        }

        // Verificar si el email ya está registrado
        if (registrations.some(reg => reg.email === email)) {
            document.getElementById('emailError').textContent = 'Este email ya está registrado';
        } else {
            // Agregar el nuevo registro
            registrations.push({
                email: email,
                password: password
            });

            // Guardar el array actualizado en el localStorage
            localStorage.setItem('registrations', JSON.stringify(registrations));

            alert('Cuenta creada exitosamente');

            // Limpiar los campos del formulario después de enviar
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            document.getElementById('confirmPassword').value = '';

            // Mostrar el formulario de inicio de sesión y ocultar el de registro
            document.getElementById('registrationFormContainer').style.display = 'none';
            document.getElementById('loginForm').style.display = 'block';
            document.getElementById('loginTitle').style.display = 'block';
            document.getElementById('createAccountLink').style.display = 'block';
        }
    }
}

function validateLoginForm() {
    // Obtener los valores de los campos
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Limpiar mensajes de error previos
    document.getElementById('loginEmailError').textContent = '';
    document.getElementById('loginPasswordError').textContent = '';

    let valid = true;

    // Validar email
    if (!validateEmail(email)) {
        document.getElementById('loginEmailError').textContent = 'Email inválido';
        valid = false;
    }

    if (valid) {
        // Obtener registros del localStorage de manera segura
        let registrations;
        try {
            registrations = JSON.parse(localStorage.getItem('registrations')) || [];
        } catch (error) {
            registrations = [];
        }

        // Buscar el registro
        let user = registrations.find(reg => reg.email === email);

        if (!user) {
            document.getElementById('loginEmailError').textContent = 'Cuenta no encontrada';
        } else if (user.password !== password) {
            document.getElementById('loginPasswordError').textContent = 'Contraseña incorrecta';
        } else {
            // alert('Inicio de sesión exitoso');
            // Redireccionar a formulario.html
            window.location.href = 'formulario.html';
        }
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

function validatePassword(password) {
    // Expresión regular para validar la contraseña
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
}
