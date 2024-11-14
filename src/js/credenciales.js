document.addEventListener('DOMContentLoaded', () => {
    let loguearse = document.querySelector('#login-btn');
    let registrarse = document.querySelector('#Registrarse-btn');
    let validacionDatos = document.querySelector('#validacionDatos-btn');
    let usuarioID = 0;
    if (loguearse) {
        loguearse.addEventListener('click', () => {
            let usuario = document.querySelector('#js-user-txt').value;
            let login = document.querySelector('#js-password-txt').value;
            let mensaje = document.querySelector('.error-message');
            if (!usuario.length || !login.length) {
                mensaje.style.display = 'block';
                setTimeout(() => mensaje.style.display = 'none', 1000);
                return;
            }else{
                Login.forEach( (index , indice) => {
                    if (index.email === usuario) {
                        index.email = usuario
                        index.password = login
                        window.location.href = "../views/success-email.html"
                    }
                })
            }
        });
    }

    if (registrarse) {
        registrarse.addEventListener('click', () => {
            let usuario = document.querySelector('#js-user-txt').value;
            let login = document.querySelector('#js-password-txt').value;
            let nombre = document.querySelector('#js-userName-txt').value; // suponiendo que tienes otro campo para el nombre

            let mensaje = document.querySelector('.error-message');
            if (!usuario.length || !login.length || !nombre.length) {
                mensaje.style.display = 'block';
                setTimeout(() => mensaje.style.display = 'none', 1000);
                return;
            }


            const userInfo = {
                id: usuarioID += 1,
                name: nombre,
                email: usuario,
                password: login,
                orderHistory: [],
                currentSelectedProducts: [],
            };

            Login.push(userInfo)

            console.log("Valores guardados son:", userInfo);
        });
    }

    if (validacionDatos) {
        validacionDatos.addEventListener('click', () => {
            let login = document.querySelector('#Contrasenia-txt').value;
            let usuario = document.querySelector('#user-txt').value;
            let mensaje = document.querySelector('.error-message');

            if (!usuario.length || !login.length) {
                mensaje.style.display = 'block';
                setTimeout(() => mensaje.style.display = 'none', 1000);
                return;
            }

            Login.forEach( (index , indice) => {
                if (index.email === usuario) {
                    index.email = usuario
                    index.password = login
                    window.location.href = "../views/success-email.html"
                }
            })
        })
    }

});