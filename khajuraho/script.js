/* =========================================================
   DESH KHOJ A2Z
   KHAJURAHO TRAVEL GUIDE
   FINAL UPDATED SCRIPT.JS

   FEATURES
   • Active Menu Fix
   • Route 1–5
   • Travel
   • Stay
   • Partner Service
   • Smooth Scroll
   • Current Location → Google Maps
   • Back To Top
   • Horizontal Menu Support
   • Map Button Hide
   • Route Arrow Hide
   • External Link Safety
   • Mobile Touch Feedback
   • Scroll Reveal
   • Partner Registration
   • WhatsApp Registration
   • Email Registration
========================================================= */

"use strict";


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const menuCards =
        document.querySelectorAll(
            ".menu-card"
        );


    const currentButtons =
        document.querySelectorAll(
            "[data-current-route]"
        );


    const horizontalMenu =
        document.querySelector(
            ".horizontal-menu"
        );


    const backTopButtons =
        document.querySelectorAll(
            ".back-top, #topBtn"
        );


    /* =====================================================
       02. TOP / BACK TO TOP
    ===================================================== */

    function scrollToTop(event) {

        if (event) {

            event.preventDefault();

        }


        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    }


    backTopButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                scrollToTop
            );

        }
    );


    function updateBackTop() {

        backTopButtons.forEach(
            function (button) {

                if (
                    button.id === "topBtn"
                ) {

                    if (
                        window.scrollY > 350
                    ) {

                        button.style.display =
                            "flex";

                    } else {

                        button.style.display =
                            "none";

                    }

                }

            }
        );

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        {
            passive: true
        }
    );


    updateBackTop();


    /* =====================================================
       03. TARGET NORMALIZATION
    ===================================================== */

    function normalizeTarget(href) {

        if (!href) {

            return "";

        }


        href =
            href.trim();


        if (
            href === "#"
        ) {

            return "";

        }


        /*
           New HTML:
           #stay

           Old HTML:
           #hotels
        */

        if (
            href === "#stay" &&
            document.getElementById(
                "stay"
            )
        ) {

            return "#stay";

        }


        if (
            href === "#stay" &&
            !document.getElementById(
                "stay"
            ) &&
            document.getElementById(
                "hotels"
            )
        ) {

            return "#hotels";

        }


        return href;

    }


    /* =====================================================
       04. ACTIVE MENU
    ===================================================== */

    function setActiveMenu(
        targetId
    ) {

        if (!targetId) {

            return;

        }


        const finalTarget =
            normalizeTarget(
                targetId
            );


        menuCards.forEach(
            function (card) {

                const href =
                    card.getAttribute(
                        "href"
                    );


                const normalized =
                    normalizeTarget(
                        href
                    );


                if (
                    normalized ===
                    finalTarget
                ) {

                    card.classList.add(
                        "active"
                    );

                } else {

                    card.classList.remove(
                        "active"
                    );

                }

            }
        );


        /*
           Bring active menu
           into visible area.
        */

        if (
            horizontalMenu
        ) {

            menuCards.forEach(
                function (card) {

                    const href =
                        normalizeTarget(
                            card.getAttribute(
                                "href"
                            )
                        );


                    if (
                        href ===
                        finalTarget
                    ) {

                        card.scrollIntoView({
                            behavior:
                                "smooth",

                            block:
                                "nearest",

                            inline:
                                "center"
                        });

                    }

                }
            );

        }

    }


    /* =====================================================
       05. MENU CLICK
    ===================================================== */

    menuCards.forEach(
        function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    const targetId =
                        normalizeTarget(
                            href
                        );


                    /*
                       External links untouched.
                    */

                    if (
                        !href ||
                        !href.startsWith(
                            "#"
                        ) ||
                        !targetId
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    setActiveMenu(
                        targetId
                    );


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });


                    try {

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    } catch (error) {

                        /* Ignore */

                    }

                }
            );

        }
    );


    /* =====================================================
       06. ALL INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        this.getAttribute(
                            "href"
                        );


                    /*
                       Top button
                    */

                    if (
                        href === "#top"
                    ) {

                        event.preventDefault();

                        scrollToTop();

                        return;

                    }


                    /*
                       Empty #
                    */

                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    /*
                       Menu card already handled.
                    */

                    if (
                        this.classList.contains(
                            "menu-card"
                        )
                    ) {

                        return;

                    }


                    const targetId =
                        normalizeTarget(
                            href
                        );


                    if (!targetId) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });

                }
            );

        }
    );


    /* =====================================================
       07. ACTIVE MENU WHILE SCROLLING
    ===================================================== */

    function getMenuSections() {

        const sections = [];


        menuCards.forEach(
            function (card) {

                const href =
                    normalizeTarget(
                        card.getAttribute(
                            "href"
                        )
                    );


                if (!href) {

                    return;

                }


                if (
                    !href.startsWith(
                        "#"
                    )
                ) {

                    return;

                }


                const element =
                    document.querySelector(
                        href
                    );


                if (!element) {

                    return;

                }


                sections.push({

                    id:
                        href,

                    element:
                        element

                });

            }
        );


        return sections;

    }


    function updateActiveMenuOnScroll() {

        const sections =
            getMenuSections();


        if (
            !sections.length
        ) {

            return;

        }


        /*
           Header + sticky menu.
        */

        const detectionPoint =
            190;


        let currentSection =
            null;


        sections.forEach(
            function (item) {

                const rect =
                    item.element
                        .getBoundingClientRect();


                if (
                    rect.top <=
                    detectionPoint
                ) {

                    currentSection =
                        item;

                }

            }
        );


        /*
           Near top.
        */

        if (
            !currentSection
        ) {

            currentSection =
                sections[0];

        }


        if (
            currentSection
        ) {

            setActiveMenu(
                currentSection.id
            );

        }

    }


    let scrollTimer =
        null;


    window.addEventListener(
        "scroll",
        function () {

            if (
                scrollTimer
            ) {

                return;

            }


            scrollTimer =
                requestAnimationFrame(
                    function () {

                        updateActiveMenuOnScroll();

                        scrollTimer =
                            null;

                    }
                );

        },
        {
            passive: true
        }
    );


    updateActiveMenuOnScroll();


    /* =====================================================
       08. PAGE LOAD HASH
    ===================================================== */

    if (
        window.location.hash
    ) {

        const hash =
            normalizeTarget(
                window.location.hash
            );


        const target =
            hash
                ? document.querySelector(
                    hash
                )
                : null;


        if (target) {

            setTimeout(
                function () {

                    target.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "start"

                    });


                    setActiveMenu(
                        hash
                    );

                },
                250
            );

        }

    }


    /* =====================================================
       09. CURRENT LOCATION → GOOGLE MAPS
    ===================================================== */

    function openFallback(
        destination
    ) {

        const url =
            "https://www.google.com/maps/dir/?api=1" +
            "&destination=" +
            encodeURIComponent(
                destination
            );


        window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

    }


    function openCurrentRoute(
        button
    ) {

        const destination =
            button.getAttribute(
                "data-current-route"
            );


        if (!destination) {

            return;

        }


        /*
           GPS unavailable.
        */

        if (
            !navigator.geolocation
        ) {

            openFallback(
                destination
            );

            return;

        }


        const oldHTML =
            button.innerHTML;


        button.classList.add(
            "loading"
        );


        button.innerHTML =
            "📍 Location…";


        navigator.geolocation.getCurrentPosition(

            function (position) {

                const latitude =
                    position.coords.latitude;


                const longitude =
                    position.coords.longitude;


                const origin =
                    latitude +
                    "," +
                    longitude;


                const mapsURL =
                    "https://www.google.com/maps/dir/?api=1" +
                    "&origin=" +
                    encodeURIComponent(
                        origin
                    ) +
                    "&destination=" +
                    encodeURIComponent(
                        destination
                    );


                button.classList.remove(
                    "loading"
                );


                button.innerHTML =
                    oldHTML;


                window.open(
                    mapsURL,
                    "_blank",
                    "noopener,noreferrer"
                );

            },


            function () {

                button.classList.remove(
                    "loading"
                );


                button.innerHTML =
                    oldHTML;


                openFallback(
                    destination
                );

            },


            {
                enableHighAccuracy:
                    true,

                timeout:
                    10000,

                maximumAge:
                    60000
            }

        );

    }


    currentButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();


                    openCurrentRoute(
                        this
                    );

                }
            );


            /*
               Mobile touch feedback.
            */

            button.addEventListener(
                "touchstart",
                function () {

                    this.classList.add(
                        "pressed"
                    );

                },
                {
                    passive: true
                }
            );


            button.addEventListener(
                "touchend",
                function () {

                    this.classList.remove(
                        "pressed"
                    );

                },
                {
                    passive: true
                }
            );

        }
    );


    /* =====================================================
       10. GOOGLE LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="https://www.google.com/"]'
    ).forEach(
        function (link) {

            link.setAttribute(
                "target",
                "_blank"
            );


            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );


    /* =====================================================
       11. ALL EXTERNAL TARGET BLANK LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(
        function (link) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }
    );


    /* =====================================================
       12. MAP BUTTON HIDE
    ===================================================== */

    document.querySelectorAll(
        ".mini-btn.map"
    ).forEach(
        function (button) {

            button.style.display =
                "none";

        }
    );


    document.querySelectorAll(
        ".mini-actions"
    ).forEach(
        function (container) {

            const mapButton =
                container.querySelector(
                    ".mini-btn.map"
                );


            if (mapButton) {

                mapButton.style.display =
                    "none";

            }

        }
    );


    /* =====================================================
       13. ROUTE ARROW HIDE
    ===================================================== */

    document.querySelectorAll(
        ".route-arrow"
    ).forEach(
        function (arrow) {

            arrow.style.display =
                "none";

        }
    );


    /* =====================================================
       14. HORIZONTAL MENU
    ===================================================== */

    if (
        horizontalMenu
    ) {

        let isDown =
            false;


        let startX =
            0;


        let startScrollLeft =
            0;


        horizontalMenu.addEventListener(
            "pointerdown",
            function (event) {

                isDown =
                    true;


                startX =
                    event.clientX;


                startScrollLeft =
                    horizontalMenu.scrollLeft;

            }
        );


        horizontalMenu.addEventListener(
            "pointermove",
            function (event) {

                if (!isDown) {

                    return;

                }


                const distance =
                    event.clientX -
                    startX;


                horizontalMenu.scrollLeft =
                    startScrollLeft -
                    distance;

            }
        );


        [
            "pointerup",
            "pointercancel",
            "pointerleave"
        ].forEach(
            function (eventName) {

                horizontalMenu.addEventListener(
                    eventName,
                    function () {

                        isDown =
                            false;

                    }
                );

            }
        );

    }


    /* =====================================================
       15. SCROLL REVEAL
    ===================================================== */

    if (
        "IntersectionObserver"
        in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                function (
                    entries,
                    observer
                ) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {
                    threshold:
                        0.08
                }

            );


        /*
           Cards / sections.
        */

        document.querySelectorAll(
            ".route-card, " +
            ".place-info, " +
            ".service, " +
            ".partner-service-card, " +
            ".coming-soon"
        ).forEach(
            function (element) {

                revealObserver.observe(
                    element
                );

            }
        );

    }


    /* =====================================================
       16. PARTNER REGISTRATION
       
       Works only when the registration page
       contains these elements.
       
       Main pages are not affected.
    ===================================================== */


    const registrationSubmit =
        document.getElementById(
            "registrationSubmit"
        );


    if (
        registrationSubmit
    ) {


        /* =================================================
           PARTNER CONTACT
           
           These are used internally by the
           registration links.
        ================================================= */

        const partnerWhatsApp =
            "918200195546";


        const partnerEmail =
            "deshkhoja2z@gmail.com";


        /* =================================================
           SERVICE TYPE BUTTONS
        ================================================= */

        const serviceButtons =
            document.querySelectorAll(
                ".service-type-btn"
            );


        const serviceType =
            document.getElementById(
                "serviceType"
            );


        serviceButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {


                        serviceButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        button.classList.add(
                            "active"
                        );


                        if (
                            serviceType
                        ) {

                            serviceType.value =
                                button.getAttribute(
                                    "data-service"
                                );

                        }

                    }
                );

            }
        );


        /* =================================================
           CONTACT NUMBER
        ================================================= */

        const registrationNumber =
            document.getElementById(
                "contactNumber"
            );


        if (
            registrationNumber
        ) {

            registrationNumber.addEventListener(
                "input",
                function () {

                    this.value =
                        this.value
                            .replace(
                                /[^0-9]/g,
                                ""
                            )
                            .slice(
                                0,
                                10
                            );

                }
            );

        }


        /* =================================================
           SUBMIT
        ================================================= */

        registrationSubmit.addEventListener(
            "click",
            function () {


                /* =========================================
                   GET DATA
                ========================================= */

                const selectedService =
                    serviceType
                        ? serviceType.value.trim()
                        : "";


                const businessName =
                    document.getElementById(
                        "businessName"
                    ).value.trim();


                const contactName =
                    document.getElementById(
                        "contactName"
                    ).value.trim();


                const contactNumber =
                    document.getElementById(
                        "contactNumber"
                    ).value.trim();


                const address =
                    document.getElementById(
                        "address"
                    ).value.trim();


                const serviceDetailsElement =
                    document.getElementById(
                        "serviceDetails"
                    );


                const serviceDetails =
                    serviceDetailsElement
                        ? serviceDetailsElement.value.trim()
                        : "";


                /* =========================================
                   VALIDATION
                ========================================= */

                if (
                    !selectedService
                ) {

                    alert(
                        "कृपया Type of Service चुनें।"
                    );

                    return;

                }


                if (
                    !businessName
                ) {

                    alert(
                        "कृपया Business / Service Name भरें।"
                    );

                    return;

                }


                if (
                    !contactName
                ) {

                    alert(
                        "कृपया Contact Person का नाम भरें।"
                    );

                    return;

                }


                if (
                    !/^[0-9]{10}$/.test(
                        contactNumber
                    )
                ) {

                    alert(
                        "कृपया सही 10 digit Contact Number डालें।"
                    );

                    return;

                }


                if (
                    !address
                ) {

                    alert(
                        "कृपया Address भरें।"
                    );

                    return;

                }


                /* =========================================
                   MESSAGE
                ========================================= */

                const message =
`DESH KHOJ A2Z
Business Partner Registration

Type of Service:
${selectedService}

Business / Service Name:
${businessName}

Contact Person:
${contactName}

Contact Number:
${contactNumber}

Address:
${address}

Service Details:
${serviceDetails || "Not Provided"}

--------------------------------
DESH KHOJ A2Z
Partner Registration`;


                /* =========================================
                   WHATSAPP
                ========================================= */

                const whatsappURL =
                    "https://wa.me/" +
                    partnerWhatsApp +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                /* =========================================
                   EMAIL
                ========================================= */

                const emailSubject =
                    "DESH KHOJ A2Z - Business Partner Registration";


                const emailURL =
                    "mailto:" +
                    partnerEmail +
                    "?subject=" +
                    encodeURIComponent(
                        emailSubject
                    ) +
                    "&body=" +
                    encodeURIComponent(
                        message
                    );


                /* =========================================
                   SUCCESS BOX
                ========================================= */

                const successBox =
                    document.getElementById(
                        "registrationSuccess"
                    );


                if (
                    successBox
                ) {


                    successBox.innerHTML =

                        `
                        <div
                            style="
                                font-size:15px;
                                font-weight:800;
                                margin-bottom:10px;
                            "
                        >
                            ✅ Registration तैयार है
                        </div>

                        <div
                            style="
                                margin-bottom:12px;
                            "
                        >
                            नीचे से registration भेजें:
                        </div>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                            style="
                                display:block;
                                text-decoration:none;
                                text-align:center;
                                padding:13px;
                                margin:8px 0;
                                border-radius:11px;
                                background:#25D366;
                                color:#fff;
                                font-weight:800;
                            "
                        >
                            🟢 WhatsApp पर भेजें
                        </a>

                        <a
                            href="${emailURL}"
                            style="
                                display:block;
                                text-decoration:none;
                                text-align:center;
                                padding:13px;
                                margin:8px 0;
                                border-radius:11px;
                                background:#111827;
                                color:#fff;
                                font-weight:800;
                            "
                        >
                            📧 Email पर भेजें
                        </a>
                        `;


                    successBox.style.display =
                        "block";


                    successBox.scrollIntoView({

                        behavior:
                            "smooth",

                        block:
                            "center"

                    });

                }

            }
        );

    }


    /* =====================================================
       17. SAFE BUTTON TOUCH FEEDBACK
    ===================================================== */

    document.querySelectorAll(
        "button"
    ).forEach(
        function (button) {

            button.addEventListener(
                "touchstart",
                function () {

                    this.classList.add(
                        "pressed"
                    );

                },
                {
                    passive: true
                }
            );


            button.addEventListener(
                "touchend",
                function () {

                    this.classList.remove(
                        "pressed"
                    );

                },
                {
                    passive: true
                }
            );

        }
    );


    /* =====================================================
       18. FINAL PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );


});