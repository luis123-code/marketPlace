        // ../assets/icons/selected-to-buy.svg
        //"../assets/icons/add_to_cart.svg"
        let usuario = localStorage.getItem("usuario")
        let Login = JSON.parse(localStorage.getItem("bdUsuario"));
        let nav = document.querySelector('.header-home-nav')
        let contenedorProduct = document.querySelector('.article-section')
        let contenedorSlider = document.querySelector('.product-detail-tab')
        let canasta = document.querySelector('.counter-circle')
        let sliderDetalle = document.querySelector('.shopping-card-tab')
        let contenedorProductos = document.querySelector('.shopping-card-top')
        let costoTotal = document.querySelector('.price-product')
        let menuImail = document.querySelector('.email-menu__list')
        let seccionContenido = document.querySelector('#home-nav-desk')
        let buscandoFiltro = document.querySelector('.general-input')
        let enviandoBD = document.querySelector('.enviandoDatos')
        let eliminarCredenciales = document.querySelector('.email-menu__list')
        document.addEventListener('DOMContentLoaded', () => {
            let dato = revisandoCredenciales()
            if (dato) {
                window.location.href = "../";
                return
            }
            revisandoSesion()
            document.querySelector('.email-menu__text').textContent = usuario
            productosGenerados(Products, contenedorProduct)
        })

        function productosGenerados(datosProd, contenedor) {
            vaciarContenedor(contenedor)
            datosProd.forEach(element => {
                let article = document.createElement('article')
                article.className = "article-section-item"
                article.id = element.id
                article.innerHTML =
                    `<div  class="article-section-item__img new-img" id="${element.id}" style="background-image: url('${element.imgs[0].img}');">
                    </div>
                    <div class="article-section-item__content ">
                    <div class="card-text">
                    <span class="grey__message price-product">${element.price}</span>
                    <span class="green__message name-product">${element.name}</span>
                    </div>
                    <div class="circle-border"></div>
                    <img id="${element.id}" class="add_to_card"    src="../assets/icons/add_to_cart.svg" alt="image of a shopping car">
                    </div>        
                    `
                contenedor.append(article)
            });
        }

        eventos()
        function eventos() {
            contenedorProduct.addEventListener("click", accionesContenedorPrincipal)
            contenedorSlider.addEventListener("click", accionesSlider)
            nav.addEventListener("click", accionNav)
            contenedorProductos.addEventListener("click", acccionesAniadir)
            seccionContenido.addEventListener("click", contenidoFiltrados)
            buscandoFiltro.addEventListener("input", inputFiltrdo)
            enviandoBD.addEventListener("click", seionStor)
            eliminarCredenciales.addEventListener("click", eliminandoCred)
        }


        function eliminandoCred(){
            sessionStorage.clear()
            localStorage.removeItem("usuario")
            window.location.href = "../";
        }

        function seionStor() {
            console.log("entre")
            Login.forEach(index => {
                if (index.email === usuario) {
                    sessionStorage.setItem("usuarioContenido", JSON.stringify(index));
                }
            })
        }

        function revisandoCredenciales(){
            if (!usuario) {
                console.log("no hay credencial")  
                return true
            }
            console.log("si hay credencial")  
            return false
        }

        function revisandoSesion(){
            let general = JSON.parse(sessionStorage.getItem("usuarioContenido"));
            if (general && general.currentSelectedProducts) {
                Login.forEach(index => {
                    if (index.email === usuario) {
                        index.currentSelectedProducts = general.currentSelectedProducts
                        agregandoProductosCanasta(general.currentSelectedProducts)
                    }
                })
                cantidadCanasta()
            }
        }

        function inputFiltrdo(e) {
            let datos = filtradoProductos(e.target.value)
            if (e.target.value === "") {
                datos = Products
            }

            productosGenerados(datos, contenedorProduct)
        }

        function contenidoFiltrados(e) {
            if (e.target.classList.contains("header-home-section__list-option")) {
                resteandoNav()
                e.target.classList.add("selected-item-desk")
                if (e.target.textContent === "All") {
                    productosGenerados(Products, contenedorProduct)
                    return
                }
                let datos = filtradoProductos(e.target.textContent)
                productosGenerados(datos, contenedorProduct)
            }
        }

        function filtradoProductos(data) {
            return Products.filter(element => element.type.toLowerCase().includes(data.toLowerCase()))
        }

        function accionesContenedorPrincipal(e) {
            if (e.target.classList.contains("article-section-item__img")) {
                let dato = buscandoObjeto(e.target.id)
                contenedorSlider.classList.add("show-product-detail")
                showProductDetails(dato)
            } else if (e.target.classList.contains("add_to_card")) {
                let dato = buscandoObjeto(e.target.id)
                if (e.target.getAttribute("src") === "../assets/icons/selected-to-buy.svg") {
                    e.target.src = "../assets/icons/add_to_cart.svg"
                    Login.forEach(index => {
                        if (index.email === usuario) {
                            index.currentSelectedProducts = eliminandoCarrito(index.currentSelectedProducts, dato)
                            agregandoProductosCanasta(index.currentSelectedProducts)
                        }
                    })

                    cantidadCanasta()
                } else {
                    e.target.src = "../assets/icons/selected-to-buy.svg"
                    Login.forEach(index => {
                        if (index.email === usuario) {
                            agregandoCarrito(index.currentSelectedProducts, dato)
                            agregandoProductosCanasta(index.currentSelectedProducts)
                        }
                    })

                    cantidadCanasta()
                }

                console.log(Login)

            }
        }


        function showProductDetails(productos) {
            let detallesProduc = document.querySelector(".product-detail-tab")
            detallesProduc.classList.add("show-product-detail")
            vaciarContenedor(detallesProduc)
            let {
                imgs,
                price,
                description,
                id,
                name
            } = productos
            let mostrarContenedo = document.createElement('article')
            mostrarContenedo.className = "shopping-card-item"
            mostrarContenedo.innerHTML = `
            <div class="">
            <div id="js-detail-img" class="new-img product-detail-img" style="background-image: url('${imgs[0].img}');height:351px">
                <div class="wrapper-close-btn"></div>
                <img class="close-icon" src="../assets/icons/x-icon.svg" alt="close icon">
                <div class="points-wrapper">
                    <div class="point selected-point"></div>
                    <div class="point"></div>
                    <div class="point"></div>
                </div>
            </div>
            
            <div class="product-detail-info">
                <span id="js-detail-price" class="price-product">${price}</span>
                <h3 id="js-detail-tittle" class="recovery-text">${name}</h3>
                <p id="js-detail-descrip" class="recovery-text">${description}</p>
            </div>

            <div class="product-detail-buttom">
                <button data-product=${id} style="background-color : #42c052" id="js-detail-btn" class="general-button green--btn" style="margin-top: 23px;">
                    <img class="normal--size" src="../assets/icons/shopping-icon.svg" alt="image of shopping car">
                    <span id="js-detail-btn-text" class="product-detail-buttom__text">Add to cart</span>
                </button>
            </div>
        </div>
            `
            detallesProduc.append(mostrarContenedo)
        }


        function agregandoProductosCanasta(arrays) {
            console.log(arrays)
            vaciarContenedor(contenedorProductos)
            arrays.forEach(index => {
                let article = document.createElement('article')
                article.className = "shopping-card-item"
                article.innerHTML =
                    `
                    <div class="front-container">
                    <div class="image-border" style="background-image: url(${index.imgs[0].img});"></div>
                    <span class="name-product">${index.name}</span>
                    </div><div class="back-container">
                    <span class="price-product">${index.price}</span>
                    <img  id=${index.id} class="close-icon close-item" src="../assets/icons/x-icon.svg" alt="close item">
                    </div>
                    `
                contenedorProductos.append(article)
            })

            costoTotal.innerHTML = `Total: $${arrays.reduce((acc, item) => acc + item.price,0)}`

        }

        function acccionesAniadir(e) {
            if (e.target.classList.contains("close-item")) {
                let id = {
                    id: e.target.id
                }
                Login.forEach(index => {
                    if (index.email === usuario) {
                        index.currentSelectedProducts = eliminandoCarrito(index.currentSelectedProducts, id)
                        agregandoProductosCanasta(index.currentSelectedProducts)
                    }
                })
                canastaVacia()
                cantidadCanasta()
            }
        }


        function accionesSlider(e) {
            if (e.target.classList.contains("close-icon")) {
                contenedorSlider.classList.remove("show-product-detail")
            }
            if (e.target.classList.contains("general-button")) {
                let dato = buscandoObjeto(e.target.dataset.product)
                Login.forEach(index => {
                    if (index.email === usuario) {
                        agregandoCarrito(index.currentSelectedProducts, dato)
                        agregandoProductosCanasta(index.currentSelectedProducts)
                    }
                })
                cantidadCanasta()
                console.log(Login)
            }
        }

        function accionNav(e) {
            if (sliderDetalle.classList.contains("show-section")) {
                sliderDetalle.classList.remove("show-section")
                return
            }
            if (menuImail.classList.contains("show-section")) {
                menuImail.classList.remove("show-section")
                return
            }


            if (e.target.classList.contains("shopping-cart")) {
                sliderDetalle.classList.add("show-section")
                canastaVacia()
            }

            if (e.target.classList.contains("arrow-down-icon")) {
                menuImail.classList.add("show-section")
            }
        }


        function buscandoObjeto(id) {
            return Products.find(index => index.id == id)
        }

        function agregandoCarrito(arrys, objeto) {
            const index = arrys.find(index => index.id === objeto.id);
            if (index) {
                index.cantidad += 1;
                index.price += index.price
            } else {
                arrys.push({
                    cantidad: 1,
                    ...objeto
                });
            }
        }

        function eliminandoCarrito(arrys, objeto) {
            return arrys.filter(index => index.id !== objeto.id)
        }

        function cantidadCanasta() {
            Login.forEach(index => {
                if (index.email === usuario) {
                    index.currentSelectedProducts.length
                    canasta.textContent = index.currentSelectedProducts.length
                }
            })


        }

        function vaciarContenedor(contenedor) {
            contenedor.innerHTML = ""
        }

        function resteandoNav() {
            document.querySelectorAll(".header-home-section__list-option").forEach(index => {
                if (index.classList.contains("selected-item-desk")) {
                    index.classList.remove("selected-item-desk")
                }
            })
        }

        function canastaVacia() {
            Login.forEach(index => {
                if (index.email === usuario) {
                    if (index.currentSelectedProducts.length === 0) {
                        let img = document.createElement("img")
                        img.src = "../assets/icons/noshop.svg"
                        img.classList.add("noshop-icon")
                        vaciarContenedor(contenedorProductos)
                        contenedorProductos.append(img)
                    }
                }
            })
        }