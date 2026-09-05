/* =========================================================
   DESH KHOJ A2Z
   KONARK TRAVEL GUIDE
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
   • FULL CARD CLICK
   • Travel Card Click
   • Stay Card Click
   • Food Card Click
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
       02. BACK TO TOP
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
        targetId,
        scrollMenu
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
                    normalizeTarget(
                        card.getAttribute(
                            "href"
                        )
                    );


                if (
                    href ===
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
           Horizontal menu is moved only
           when user clicks menu.

           Normal page scrolling will NOT
           move the menu.
        */

        if (
            horizontalMenu &&
            scrollMenu === true
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
                       External / normal links
                       remain untouched.
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
                        targetId,
                        true
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
                       Back to top
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
                       Menu cards already handled.
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


        if (
            !currentSection
        ) {

            currentSection =
                sections[0];

        }


        if (
            currentSection
        ) {

            /*
               FALSE is important.

               Menu will not jump horizontally
               during normal page scrolling.
            */

            setActiveMenu(
                currentSection.id,
                false
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
                        hash,
                        true
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
       END PART 1
    ===================================================== */

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
       16. FULL CARD CLICK — MAIN SYSTEM
       
       IMPORTANT:

       पूरा card clickable होगा।

       Travel Information:
       • Airport
       • Railway
       • Bus / Road
       • Local Taxi
       • Car Rental
       • Tour Guide

       Stay & Food:
       • Hotels
       • Homestays
       • Heritage Stay
       • Hotels Near Sun Temple
       • Restaurants
       • Vegetarian Food
       • Local Food
       • Cafes

       Partner cards:
       • Partner Service cards
    ===================================================== */


    function activateFullCard(
        card
    ) {

        if (!card) {

            return;

        }


        /*
           अगर card खुद <a> है,
           उसे दोबारा handle नहीं करेंगे।
        */

        if (
            card.tagName &&
            card.tagName.toLowerCase() ===
            "a"
        ) {

            card.style.cursor =
                "pointer";

            return;

        }


        /*
           Card के अंदर सभी links।
        */

        const links =
            card.querySelectorAll(
                "a[href]"
            );


        if (
            !links.length
        ) {

            return;

        }


        /*
           Main action link खोजें।

           ऐसे links को ignore करेंगे:
           #
           #top
        */

        let mainLink =
            null;


        for (
            let i = 0;
            i < links.length;
            i++
        ) {

            const link =
                links[i];


            const href =
                link.getAttribute(
                    "href"
                );


            if (
                !href ||
                href === "#" ||
                href === "#top"
            ) {

                continue;

            }


            mainLink =
                link;


            break;

        }


        if (
            !mainLink
        ) {

            return;

        }


        /*
           पूरा card clickable cursor।
        */

        card.style.cursor =
            "pointer";


        /*
           Mobile tap highlight हटाएँ।
        */

        card.style.webkitTapHighlightColor =
            "transparent";


        /*
           Accessibility.
        */

        if (
            !card.hasAttribute(
                "tabindex"
            )
        ) {

            card.setAttribute(
                "tabindex",
                "0"
            );

        }


        /*
           Card click.
        */

        card.addEventListener(
            "click",
            function (event) {

                /*
                   अगर नीचे वाले actual
                   link पर click हुआ है,
                   तो browser को normal
                   link action करने दें।
                */

                if (
                    event.target.closest(
                        "a, button"
                    )
                ) {

                    return;

                }


                /*
                   अब card के किसी भी दूसरे
                   हिस्से पर click करने पर
                   main link चलेगा।
                */

                const href =
                    mainLink.getAttribute(
                        "href"
                    );


                if (
                    !href ||
                    href === "#"
                ) {

                    return;

                }


                /*
                   Target blank.
                */

                if (
                    mainLink.target ===
                    "_blank"
                ) {

                    window.open(
                        mainLink.href,
                        "_blank",
                        "noopener,noreferrer"
                    );

                    return;

                }


                /*
                   Normal link.
                */

                mainLink.click();

            }
        );


        /*
           Keyboard support.
        */

        card.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Enter"
                ) {

                    event.preventDefault();

                    mainLink.click();

                }


                if (
                    event.key ===
                    " "
                ) {

                    event.preventDefault();

                    mainLink.click();

                }

            }
        );


        /*
           Touch feedback.
        */

        card.addEventListener(
            "touchstart",
            function () {

                this.classList.add(
                    "card-pressed"
                );

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "touchend",
            function () {

                this.classList.remove(
                    "card-pressed"
                );

            },
            {
                passive: true
            }
        );


        card.addEventListener(
            "touchcancel",
            function () {

                this.classList.remove(
                    "card-pressed"
                );

            },
            {
                passive: true
            }
        );

    }


    /* =====================================================
       17. TRAVEL INFORMATION CARDS
       
       Screenshot वाले cards:
       Airport
       Railway
       Bus / Road
       Local Taxi
       Car Rental
       Tour Guide
    ===================================================== */

    document.querySelectorAll(
        ".service"
    ).forEach(
        function (card) {

            activateFullCard(
                card
            );

        }
    );


    /* =====================================================
       18. STAY & FOOD CARDS
       
       Hotels
       Homestays
       Heritage Stay
       Hotels Near Sun Temple
       Restaurants
       Vegetarian Food
       Local Food
       Cafes
    ===================================================== */

    document.querySelectorAll(
        ".stay-card, " +
        ".food-card, " +
        ".hotel-card, " +
        ".homestay-card, " +
        ".heritage-card"
    ).forEach(
        function (card) {

            activateFullCard(
                card
            );

        }
    );


    /* =====================================================
       19. PARTNER SERVICE CARDS
    ===================================================== */

    document.querySelectorAll(
        ".partner-service-card"
    ).forEach(
        function (card) {

            activateFullCard(
                card
            );

        }
    );


    /* =====================================================
       20. GENERIC CARD FALLBACK
       
       अगर किसी future HTML card में
       ऊपर की class नहीं है लेकिन उसमें
       केवल एक main link है, तो वह भी
       पूरा clickable हो जाएगा।
    ===================================================== */

    document.querySelectorAll(
        ".card"
    ).forEach(
        function (card) {

            /*
               पहले से processed card
               को दोबारा process नहीं करेंगे।
            */

            if (
                card.getAttribute(
                    "data-full-card"
                ) ===
                "yes"
            ) {

                return;

            }


            const links =
                card.querySelectorAll(
                    "a[href]"
                );


            /*
               केवल one-link card.
            */

            if (
                links.length !== 1
            ) {

                return;

            }


            card.setAttribute(
                "data-full-card",
                "yes"
            );


            activateFullCard(
                card
            );

        }
    );


    /* =====================================================
       END PART 2
    ===================================================== */

          /* =====================================================
       21. OLD PARTNER REGISTRATION FORM
       
       Compatible with old registration form.

       Main Konark pages are not affected.
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


                const selectedService =
                    serviceType
                        ? serviceType.value.trim()
                        : "";


                const businessNameElement =
                    document.getElementById(
                        "businessName"
                    );


                const contactNameElement =
                    document.getElementById(
                        "contactName"
                    );


                const contactNumberElement =
                    document.getElementById(
                        "contactNumber"
                    );


                const addressElement =
                    document.getElementById(
                        "address"
                    );


                const businessName =
                    businessNameElement
                        ? businessNameElement.value.trim()
                        : "";


                const contactName =
                    contactNameElement
                        ? contactNameElement.value.trim()
                        : "";


                const contactNumber =
                    contactNumberElement
                        ? contactNumberElement.value.trim()
                        : "";


                const address =
                    addressElement
                        ? addressElement.value.trim()
                        : "";


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

Destination:
Konark, Odisha

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
                    "DESH KHOJ A2Z - Konark Business Partner Registration";


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
       22. NEW SIMPLE PARTNER SERVICE BUTTONS
       
       Used by:
       konark-reg.html

       Hotel
       Travel / Taxi
       Tour Guide
       Restaurant
       Homestay
       Other Tourism Service
    ===================================================== */


    const simpleServiceButtons =
        document.querySelectorAll(
            ".service-button[data-service]"
        );


    if (
        simpleServiceButtons.length
    ) {

        const simpleWhatsApp =
            "918200195546";


        const simpleEmail =
            "deshkhoja2z@gmail.com";


        const selectedServiceBox =
            document.getElementById(
                "selectedService"
            );


        const contactChoice =
            document.getElementById(
                "contactChoice"
            );


        const selectedServiceName =
            document.getElementById(
                "selectedServiceName"
            );


        simpleServiceButtons.forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function (event) {

                        event.preventDefault();


                        const service =
                            this.getAttribute(
                                "data-service"
                            );


                        if (!service) {

                            return;

                        }


                        simpleServiceButtons.forEach(
                            function (item) {

                                item.classList.remove(
                                    "active"
                                );

                            }
                        );


                        this.classList.add(
                            "active"
                        );


                        if (
                            selectedServiceBox
                        ) {

                            selectedServiceBox.style.display =
                                "block";

                        }


                        if (
                            selectedServiceName
                        ) {

                            selectedServiceName.textContent =
                                service;

                        }


                        if (
                            contactChoice
                        ) {

                            contactChoice.style.display =
                                "block";

                        }


                        /* =================================
                           WHATSAPP MESSAGE
                        ================================= */

                        const message =
`DESH KHOJ A2Z
Business Partner Registration

Destination:
Konark, Odisha

Selected Service:
${service}

I want to join / offer my tourism service
through DESH KHOJ A2Z.

Please share the partner registration
process and required details.

--------------------------------
DESH KHOJ A2Z`;


                        const whatsappURL =
                            "https://wa.me/" +
                            simpleWhatsApp +
                            "?text=" +
                            encodeURIComponent(
                                message
                            );


                        /* =================================
                           EMAIL
                        ================================= */

                        const emailSubject =
                            "DESH KHOJ A2Z - Konark Partner Registration - " +
                            service;


                        const emailBody =
`DESH KHOJ A2Z
Business Partner Registration

Destination:
Konark, Odisha

Selected Service:
${service}

I want to join / offer my tourism service
through DESH KHOJ A2Z.

Please share the partner registration
process and required details.`;


                        const emailURL =
                            "mailto:" +
                            simpleEmail +
                            "?subject=" +
                            encodeURIComponent(
                                emailSubject
                            ) +
                            "&body=" +
                            encodeURIComponent(
                                emailBody
                            );


                        /* =================================
                           WHATSAPP BUTTON
                        ================================= */

                        const whatsappButton =
                            document.getElementById(
                                "partnerWhatsApp"
                            );


                        if (
                            whatsappButton
                        ) {

                            whatsappButton.href =
                                whatsappURL;


                            whatsappButton.target =
                                "_blank";


                            whatsappButton.rel =
                                "noopener noreferrer";

                        }


                        /* =================================
                           EMAIL BUTTON
                        ================================= */

                        const emailButton =
                            document.getElementById(
                                "partnerEmail"
                            );


                        if (
                            emailButton
                        ) {

                            emailButton.href =
                                emailURL;

                        }


                        /* =================================
                           SCROLL TO CONTACT
                        ================================= */

                        if (
                            contactChoice
                        ) {

                            setTimeout(
                                function () {

                                    contactChoice.scrollIntoView({

                                        behavior:
                                            "smooth",

                                        block:
                                            "center"

                                    });

                                },
                                100
                            );

                        }

                    }
                );

            }
        );

    }


    /* =====================================================
       23. BUTTON TOUCH FEEDBACK
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


            button.addEventListener(
                "touchcancel",
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
       24. SERVICE BUTTON TOUCH FEEDBACK
    ===================================================== */

    document.querySelectorAll(
        ".service-button"
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


            button.addEventListener(
                "touchcancel",
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
       25. FINAL PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );


});