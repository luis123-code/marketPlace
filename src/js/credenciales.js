    let usuarioCone = null;
    let usuarioID = 0;



    document.addEventListener('DOMContentLoaded', () => {
        let loguearse = document.querySelector('#login-btn');
        let registrarse = document.querySelector('#Registrarse-btn');
        let validacionDatos = document.querySelector('#validacionDatos-btn');

        if (loguearse) {
            loguearse.addEventListener('click', () => {
                let usuario = document.querySelector('#js-user-txt').value;
                let login = document.querySelector('#js-password-txt').value;
                let mensaje = document.querySelector('.error-message');
                if (!usuario.length || !login.length) {
                    mensaje.style.display = 'block';
                    setTimeout(() => mensaje.style.display = 'none', 1000);
                    return;
                } else {

                    if (existeClaveEnLocalStorage("bdUsuario")) {
                        let bdUsuario = JSON.parse(localStorage.getItem("bdUsuario"));
                        console.log(bdUsuario , usuario ,login )
                        if (bdUsuario.some(element => element.email === usuario && element.password === login)) {
                            window.location.href = "/src/views/home.html";
                            localStorage.setItem("usuario" , usuario )
                        } else {
                            mensaje.style.display = 'block';
                            setTimeout(() => mensaje.style.display = 'none', 1000);
                        }
                    } else {
                        console.log("registrarse")
                    }
                }
            });
        }

        if (registrarse) {
            registrarse.addEventListener('click', () => {
                let usuario = document.querySelector('#js-user-txt').value;
                let login = document.querySelector('#js-password-txt').value;
                let nombre = document.querySelector('#js-userName-txt').value;

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
                if (existeClaveEnLocalStorage("bdUsuario")) {
                    let bdUsuario = JSON.parse(localStorage.getItem("bdUsuario"));
                    if (bdUsuario.some(element => element.email === userInfo.email)) {
                        return
                    } else {
                        bdUsuario.push(userInfo);
                        localStorage.setItem("bdUsuario", JSON.stringify(bdUsuario));
                        window.location.href = "../index.html"
                    }
                } else {
                    localStorage.setItem("bdUsuario", JSON.stringify([userInfo]))
                }
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

                if (existeClaveEnLocalStorage("bdUsuario")) {
                    let bdUsuario = JSON.parse(localStorage.getItem("bdUsuario"));
                    let usuarioEncontrado = bdUsuario.find(element => element.email === usuario);
                    if (usuarioEncontrado) {
                        usuarioEncontrado.email = usuario
                        usuarioEncontrado.password = login
                        localStorage.setItem("bdUsuario", JSON.stringify(bdUsuario))
                        window.location.href = "../views/success-email.html";

                    } else {
                        mensaje.style.display = 'block';
                        setTimeout(() => mensaje.style.display = 'none', 1000);
                    }

                } else {
                    alert("registrarse")
                }



            });
        }

    });


    function existeClaveEnLocalStorage(clave) {
        return localStorage.getItem(clave) !== null;
    }