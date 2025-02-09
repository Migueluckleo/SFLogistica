document.addEventListener("DOMContentLoaded", function () {
    console.log("✅ scripts.js cargado");

    /** ================================
     * ✅ VARIABLES GLOBALES
     * ================================ */
    const navbar = document.getElementById("navbar");
    const menuToggle = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");
    let lastScrollY = window.scrollY;

    /** ================================
     * ✅ Mostrar/Ocultar Navbar en Scroll
     * ================================ */
    window.addEventListener("scroll", function () {
        if (window.scrollY > lastScrollY) {
            navbar.style.transform = "translateY(-100%)"; // Oculta navbar
        } else {
            navbar.style.transform = "translateY(0)"; // Muestra navbar
        }
        lastScrollY = window.scrollY;
    });

    /** ================================
     * ✅ Mostrar/Ocultar Menú Mobile
     * ================================ */
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener("click", function () {
            mobileMenu.classList.toggle("hidden");
        });
    }

    /** ================================
     * ✅ Cargar Navbar y Footer (Evitar Carga Doble)
     * ================================ */
    function cargarComponente(id, archivo) {
        fetch(archivo)
            .then(response => response.ok ? response.text() : Promise.reject(`Error al cargar ${archivo}`))
            .then(data => {
                const container = document.getElementById(id);
                if (container) {
                    container.innerHTML = data;
                    console.log(`✅ ${archivo} cargado`);
                    if (id === "navbar-container") {
                        activarMenuMovil();
                        activarScrollNavbar();
                    }
                }
            })
            .catch(error => console.error(`❌ ${error}`));
    }

    cargarComponente("navbar-container", "navbar.html");
    cargarComponente("footer-container", "footer.html");

    /** ================================
     * ✅ Activar Menú Móvil
     * ================================ */
    function activarMenuMovil() {
        const mobileMenuBtn = document.getElementById("mobile-menu-btn");
        const mobileMenu = document.getElementById("mobile-menu");
        if (!mobileMenuBtn || !mobileMenu) return;
        
        mobileMenuBtn.addEventListener("click", () => mobileMenu.classList.toggle("hidden"));
        document.querySelectorAll("#mobile-menu a").forEach(link => {
            link.addEventListener("click", () => mobileMenu.classList.add("hidden"));
        });
    }

    /** ================================
     * ✅ Ocultar Navbar en Scroll Down
     * ================================ */
    function activarScrollNavbar() {
        let lastScrollTop = 0;
        window.addEventListener("scroll", function () {
            let currentScroll = window.scrollY;
            if (currentScroll > 100) {
                navbar.classList.toggle("-translate-y-full", currentScroll > lastScrollTop);
            } else {
                navbar.classList.remove("-translate-y-full");
            }
            lastScrollTop = Math.max(0, currentScroll);
        });
    }

    /** ================================
     * ✅ Animación de Contadores
     * ================================ */
    const counters = document.querySelectorAll(".counter");
    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const counter = entry.target;
            let target = parseInt(counter.dataset.target, 10);
            let count = 0, increment = target / 100;

            const updateCount = () => {
                if (count < target) {
                    count += increment;
                    counter.innerText = Math.ceil(count) + (counter.dataset.suffix || "");
                    setTimeout(updateCount, 30);
                } else {
                    counter.innerText = target + (counter.dataset.suffix || "");
                }
            };
            updateCount();
            counterObserver.unobserve(counter);
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));

    /** ================================
     * ✅ Animación Carrusel de Logos
     * ================================ */
    const carousel = document.querySelector(".logos-carousel");
    if (carousel) {
        carousel.addEventListener("mouseenter", () => carousel.style.animationPlayState = "paused");
        carousel.addEventListener("mouseleave", () => carousel.style.animationPlayState = "running");
    }

    /** ================================
     * ✅ Sección de Camiones (Optimización)
     * ================================ */
    const truckData = {
        rabon1: {
            image: "https://tractopartespascal.com/wp-content/uploads/2019/04/Camion_Kenworth_T300.jpg",
            title: "Rabon 1",
            description: "El aliado ideal para cargas ligeras",
            details: "Optimiza tu logística con un camión diseñado para eficiencia y versatilidad.",
            features: ["Capacidad ideal", "Seguridad avanzada", "Eficiencia de combustible"],
            link: "detalle_rabon1.html"
        },
        rabon2: {
            image: "https://maquinariaw.com.mx/imagenes/INVOICE/2019/5001/DSCF3442.JPG",
            title: "Rabon 2",
            description: "Versatilidad y potencia en cada entrega",
            details: "Un camión diseñado para maximizar la eficiencia operativa en rutas largas.",
            features: ["Capacidad 3 toneladas", "Frenos avanzados", "Cabina espaciosa"],
            link: "detalle_rabon2.html"
        },
        camioneta: {
            image: "https://www.rentadeautoscdmx.com.mx/blog-renta-de-camionetas-de-carga/wp-content/uploads/2023/10/camioneta.png",
            title: "Camioneta",
            description: "Compacta, ágil y eficiente",
            details: "Perfecta para entregas rápidas en ciudad, con una maniobrabilidad inigualable.",
            features: ["Consumo eficiente", "Fácil de estacionar", "Diseño aerodinámico"],
            link: "detalle_camioneta.html"
        },
        thorton: {
            image: "https://transportesenlace.com/wp-content/uploads/2018/06/Torton.jpg",
            title: "Thorton",
            description: "Máxima capacidad y resistencia",
            details: "Diseñado para largas distancias y cargas pesadas.",
            features: ["Capacidad 5 toneladas", "Estructura reforzada", "Tecnología avanzada"],
            link: "detalle_thorton.html"
        }
    };

    let currentTruck = "rabon1";
    const truckImg = document.querySelector(".truck-img");
    const truckTitle = document.querySelector(".truck-info h2 span");
    const truckDesc = document.querySelector(".truck-description");
    const truckDetails = document.querySelector(".truck-details");
    const truckFeatures = document.querySelector(".truck-features");
    const truckLink = document.querySelector(".truck-link");
    const tabs = document.querySelectorAll(".tab-link");
    const chevronLeft = document.querySelector(".chevron-left");
    const chevronRight = document.querySelector(".chevron-right");

    function updateTruck(truckKey) {
        currentTruck = truckKey;
        truckImg.classList.add("opacity-0", "scale-95");
        setTimeout(() => {
            let data = truckData[truckKey];
            truckImg.src = data.image;
            truckTitle.textContent = data.title;
            truckDesc.textContent = data.description;
            truckDetails.textContent = data.details;
            truckFeatures.innerHTML = data.features.map(f => `<li>${f}</li>`).join("");
            truckLink.href = data.link;
            truckImg.classList.remove("opacity-0", "scale-95");
        }, 300);

        tabs.forEach(tab => tab.classList.toggle("text-[#185183]", tab.dataset.truck === truckKey));
    }

    tabs.forEach(tab => tab.addEventListener("click", () => updateTruck(tab.dataset.truck)));
    chevronLeft.addEventListener("click", () => updateTruck(Object.keys(truckData)[(Object.keys(truckData).indexOf(currentTruck) - 1 + 4) % 4]));
    chevronRight.addEventListener("click", () => updateTruck(Object.keys(truckData)[(Object.keys(truckData).indexOf(currentTruck) + 1) % 4]));
});
