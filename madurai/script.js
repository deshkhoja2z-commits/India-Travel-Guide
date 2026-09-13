/* =========================================================
   DESH KHOJ A2Z
   MADURAI TRAVEL GUIDE
   FINAL SHARED SCRIPT.JS
   Hindi + English दोनों pages के लिए

   FEATURES:
   ✓ Back To Top
   ✓ Smooth Scroll
   ✓ Active Horizontal Menu
   ✓ Current Location → Google Maps
   ✓ Full Card Click
   ✓ Keyboard Accessibility
   ✓ Touch Feedback
   ✓ External Link Safety
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       01. PAGE READY
    ===================================================== */

    function ready(callback) {

        if (document.readyState === "loading") {

            document.addEventListener(
                "DOMContentLoaded",
                callback
            );

        } else {

            callback();

        }

    }


    ready(function () {


        /* =================================================
           02. LANGUAGE DETECTION

           madurai.html     → Hindi
           madurai-en.html  → English

           एक ही JS दोनों pages पर चलेगा.
        ================================================= */

        var pageLanguage =
            (
                document.documentElement.lang || ""
            ).toLowerCase();

        var isHindi =
            pageLanguage.indexOf("hi") === 0;


        var UI = {

            location: isHindi
                ? "📍 लोकेशन खोज रहे हैं..."
                : "📍 Finding location...",

            locationFallback: isHindi
                ? "📍 Google Maps खोल रहे हैं..."
                : "📍 Opening Google Maps...",

            destination:
                "Madurai, Tamil Nadu",

            topHindi:
                "↑ ऊपर जाएँ",

            topEnglish:
                "↑ Back to Top"

        };


        /* =================================================
           03. COMMON ELEMENTS
        ================================================= */

        var topBtn =
            document.getElementById("topBtn");

        var menuCards =
            document.querySelectorAll(
                ".menu-card"
            );

        var currentButtons =
            document.querySelectorAll(
                "[data-current-route]"
            );

        var routeCards =
            document.querySelectorAll(
                ".route-card"
            );


        /* =================================================
           04. BACK TO TOP
        ================================================= */

        function updateTopButton() {

            if (!topBtn) {
                return;
            }

            if (window.pageYOffset > 350) {

                topBtn.style.display = "flex";

            } else {

                topBtn.style.display = "none";

            }

        }


        window.addEventListener(
            "scroll",
            updateTopButton,
            {
                passive: true
            }
        );


        updateTopButton();


        if (topBtn) {

            topBtn.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    window.scrollTo({

                        top: 0,

                        behavior: "smooth"

                    });

                }
            );

        }


        /* =================================================
           05. NORMALIZE SECTION TARGET

           पुराने HTML में कभी #stay
           और कभी #hotels हो सकता है.
        ================================================= */

        function normalizeTarget(target) {

            if (!target) {
                return target;
            }

            if (
                target === "#stay" &&
                document.getElementById("hotels")
            ) {

                return "#hotels";

            }

            return target;

        }


        /* =================================================
           06. ACTIVE MENU
        ================================================= */

        function setActiveMenu(targetId) {

            targetId =
                normalizeTarget(targetId);


            for (
                var i = 0;
                i < menuCards.length;
                i++
            ) {

                var card =
                    menuCards[i];

                var href =
                    card.getAttribute("href") || "";


                href =
                    normalizeTarget(href);


                if (
                    href === targetId
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

        }


        /* =================================================
           07. MENU CLICK
        ================================================= */

        for (
            var i = 0;
            i < menuCards.length;
            i++
        ) {

            menuCards[i].addEventListener(
                "click",
                function () {

                    var href =
                        this.getAttribute(
                            "href"
                        );

                    href =
                        normalizeTarget(href);

                    setActiveMenu(href);

                }
            );

        }


        /* =================================================
           08. SMOOTH INTERNAL LINKS
        ================================================= */

        var internalLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        for (
            var j = 0;
            j < internalLinks.length;
            j++
        ) {

            internalLinks[j].addEventListener(
                "click",
                function (event) {

                    var href =
                        this.getAttribute(
                            "href"
                        );


                    if (
                        !href ||
                        href === "#"
                    ) {

                        return;

                    }


                    var targetId =
                        normalizeTarget(href);


                    var target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {

                        return;

                    }


                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });


                    try {

                        history.replaceState(
                            null,
                            "",
                            targetId
                        );

                    } catch (error) {

                        /* Ignore history errors */

                    }


                    setActiveMenu(
                        targetId
                    );

                }
            );

        }


        /* =================================================
           09. HASH ON PAGE LOAD
        ================================================= */

        if (window.location.hash) {

            var hash =
                normalizeTarget(
                    window.location.hash
                );


            var hashTarget =
                document.querySelector(
                    hash
                );


            if (hashTarget) {

                setTimeout(
                    function () {

                        hashTarget.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                        setActiveMenu(hash);

                    },
                    150
                );

            }

        }


        /* =================================================
           10. ACTIVE MENU WHILE SCROLLING

           केवल section position देखकर active होगा.
           Menu खुद scroll नहीं करेगा.
        ================================================= */

        var sectionIds = [

            "route1",
            "route2",
            "route3",
            "route4",
            "route5",
            "travel",
            "stay",
            "hotels",
            "partner",
            "partner-service",
            "business-registration"

        ];


        function updateActiveMenuOnScroll() {

            var currentSection = "";


            for (
                var s = 0;
                s < sectionIds.length;
                s++
            ) {

                var section =
                    document.getElementById(
                        sectionIds[s]
                    );


                if (!section) {
                    continue;
                }


                var rect =
                    section.getBoundingClientRect();


                if (
                    rect.top <= 190 &&
                    rect.bottom >= 190
                ) {

                    currentSection =
                        "#" + sectionIds[s];

                }

            }


            if (currentSection) {

                setActiveMenu(
                    currentSection
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateActiveMenuOnScroll,
            {
                passive: true
            }
        );


        updateActiveMenuOnScroll();


        /* =================================================
           11. CURRENT LOCATION → GOOGLE MAPS

           Button:
           data-current-route="Madurai, Tamil Nadu"

           GPS available:
           Current Location → Destination

           GPS unavailable:
           Destination → Google Maps
        ================================================= */

        function openFallbackMaps(
            destination
        ) {

            var fallbackUrl =
                "https://www.google.com/maps/dir/?api=1" +
                "&destination=" +
                encodeURIComponent(
                    destination
                );


            window.open(
                fallbackUrl,
                "_blank",
                "noopener,noreferrer"
            );

        }


        function openCurrentRoute(
            destination,
            button
        ) {

            if (
                !navigator.geolocation
            ) {

                openFallbackMaps(
                    destination
                );

                return;

            }


            navigator.geolocation.getCurrentPosition(

                function (position) {

                    var latitude =
                        position.coords.latitude;

                    var longitude =
                        position.coords.longitude;


                    var origin =
                        latitude +
                        "," +
                        longitude;


                    var mapsUrl =
                        "https://www.google.com/maps/dir/?api=1" +
                        "&origin=" +
                        encodeURIComponent(
                            origin
                        ) +
                        "&destination=" +
                        encodeURIComponent(
                            destination
                        );


                    window.open(
                        mapsUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );


                    restoreCurrentButton(
                        button
                    );

                },


                function () {

                    openFallbackMaps(
                        destination
                    );


                    restoreCurrentButton(
                        button
                    );

                },


                {

                    enableHighAccuracy: true,

                    timeout: 10000,

                    maximumAge: 60000

                }

            );

        }


        function restoreCurrentButton(
            button
        ) {

            if (!button) {
                return;
            }


            var oldHTML =
                button.dataset.oldHtml;


            if (!oldHTML) {
                return;
            }


            setTimeout(
                function () {

                    button.innerHTML =
                        oldHTML;

                    button.style.opacity =
                        "";

                },
                500
            );

        }


        for (
            var c = 0;
            c < currentButtons.length;
            c++
        ) {

            currentButtons[c].addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    var button =
                        this;


                    var destination =
                        button.getAttribute(
                            "data-current-route"
                        );


                    if (!destination) {

                        destination =
                            UI.destination;

                    }


                    button.dataset.oldHtml =
                        button.innerHTML;


                    button.innerHTML =
                        UI.location;

                    button.style.opacity =
                        "0.7";


                    openCurrentRoute(
                        destination,
                        button
                    );

                }
            );

        }


        /* =================================================
           12. GOOGLE / EXTERNAL LINK SAFETY
        ================================================= */

        var externalLinks =
            document.querySelectorAll(
                'a[target="_blank"]'
            );


        for (
            var e = 0;
            e < externalLinks.length;
            e++
        ) {

            externalLinks[e].setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }


        /* =================================================
           13. HIDE OLD MAP BUTTON

           अगर पुराने route card में
           .mini-btn.map मौजूद है,
           तो वह दिखाई नहीं देगा.
        ================================================= */

        var oldMapButtons =
            document.querySelectorAll(
                ".mini-btn.map"
            );


        for (
            var m = 0;
            m < oldMapButtons.length;
            m++
        ) {

            oldMapButtons[m].style.display =
                "none";

        }


        /* =================================================
           14. HIDE OLD ROUTE ARROWS

           CSS के अलावा JS safety.
        ================================================= */

        var routeArrows =
            document.querySelectorAll(
                ".route-arrow"
            );


        for (
            var a = 0;
            a < routeArrows.length;
            a++
        ) {

            routeArrows[a].style.display =
                "none";

        }


        /* =================================================
           15. MARK JS READY
        ================================================= */

        document.body.classList.add(
            "js-ready"
        );


    });

})();

/* =========================================================
   PART 2
   FULL CARD CLICK ACTIVATION
========================================================= */


/* =====================================================
   16. CARD ACTIVATION FUNCTION
===================================================== */

function activateFullCard(card) {

    if (!card) {
        return;
    }


    /* -----------------------------------------------
       पहले से activate है तो दोबारा event न लगाएँ
    ----------------------------------------------- */

    if (
        card.dataset.cardActivated === "true"
    ) {

        return;

    }


    /* -----------------------------------------------
       Card के अंदर पहला usable link खोजें
    ----------------------------------------------- */

    var link =
        card.querySelector(
            'a[href]:not([href="#"])'
        );


    /*
       अगर link नहीं है तो card को
       जबरदस्ती clickable नहीं बनाना
    */

    if (!link) {

        return;

    }


    card.dataset.cardActivated =
        "true";


    card.style.cursor =
        "pointer";


    /* =================================================
       17. FULL CARD CLICK
    ================================================= */

    card.addEventListener(
        "click",
        function (event) {


            /*
               अगर user ने actual link पर
               click किया है तो browser को
               normal link खोलने दें.
            */

            if (
                event.target.closest("a") ||
                event.target.closest("button") ||
                event.target.closest("input") ||
                event.target.closest("select") ||
                event.target.closest("textarea")
            ) {

                return;

            }


            /*
               Card के किसी भी खाली हिस्से पर
               click → पहला link खुलेगा.
            */

            link.click();

        }
    );


    /* =================================================
       18. KEYBOARD ACCESSIBILITY
    ================================================= */

    card.setAttribute(
        "tabindex",
        "0"
    );


    card.setAttribute(
        "role",
        "link"
    );


    card.addEventListener(
        "keydown",
        function (event) {


            if (
                event.key === "Enter" ||
                event.key === " "
            ) {

                event.preventDefault();

                link.click();

            }

        }
    );


    /* =================================================
       19. TOUCH FEEDBACK
    ================================================= */

    card.addEventListener(
        "touchstart",
        function () {

            card.classList.add(
                "card-touch-active"
            );

        },
        {
            passive: true
        }
    );


    card.addEventListener(
        "touchend",
        function () {

            setTimeout(
                function () {

                    card.classList.remove(
                        "card-touch-active"
                    );

                },
                120
            );

        },
        {
            passive: true
        }
    );


    card.addEventListener(
        "touchcancel",
        function () {

            card.classList.remove(
                "card-touch-active"
            );

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   20. ACTIVATE ALL IMPORTANT CARDS
===================================================== */


/*
   Travel Information cards
   जैसे:

   ✈️ Airport
   🚆 Railway Station
   🚌 Bus / Road
   🚕 Local Taxi
   🚗 Car Rental
   🧑‍💼 Tour Guide
*/


var serviceCards =
    document.querySelectorAll(
        ".service"
    );


for (
    var sc = 0;
    sc < serviceCards.length;
    sc++
) {

    activateFullCard(
        serviceCards[sc]
    );

}


/* =====================================================
   21. STAY CARDS
===================================================== */

var stayCards =
    document.querySelectorAll(
        ".stay-card"
    );


for (
    var st = 0;
    st < stayCards.length;
    st++
) {

    activateFullCard(
        stayCards[st]
    );

}


/* =====================================================
   22. FOOD CARDS
===================================================== */

var foodCards =
    document.querySelectorAll(
        ".food-card"
    );


for (
    var fc = 0;
    fc < foodCards.length;
    fc++
) {

    activateFullCard(
        foodCards[fc]
    );

}


/* =====================================================
   23. HOTEL CARDS
===================================================== */

var hotelCards =
    document.querySelectorAll(
        ".hotel-card"
    );


for (
    var hc = 0;
    hc < hotelCards.length;
    hc++
) {

    activateFullCard(
        hotelCards[hc]
    );

}


/* =====================================================
   24. HOMESTAY CARDS
===================================================== */

var homestayCards =
    document.querySelectorAll(
        ".homestay-card"
    );


for (
    var hs = 0;
    hs < homestayCards.length;
    hs++
) {

    activateFullCard(
        homestayCards[hs]
    );

}


/* =====================================================
   25. HERITAGE CARDS
===================================================== */

var heritageCards =
    document.querySelectorAll(
        ".heritage-card"
    );


for (
    var hr = 0;
    hr < heritageCards.length;
    hr++
) {

    activateFullCard(
        heritageCards[hr]
    );

}


/* =====================================================
   26. PARTNER SERVICE CARDS
===================================================== */

var partnerCards =
    document.querySelectorAll(
        ".partner-service-card"
    );


for (
    var pc = 0;
    pc < partnerCards.length;
    pc++
) {

    activateFullCard(
        partnerCards[pc]
    );

}


/* =====================================================
   27. ROUTE CARDS
===================================================== */


/*
   Route card में कई links हो सकते हैं.
   इसलिए route card को automatic
   full-click नहीं करेंगे.

   Route के individual buttons/links
   normal तरीके से काम करेंगे.
*/


/* =====================================================
   28. GENERIC .CARD SUPPORT
===================================================== */

var genericCards =
    document.querySelectorAll(
        ".card"
    );


for (
    var gc = 0;
    gc < genericCards.length;
    gc++
) {

    var genericCard =
        genericCards[gc];


    /*
       जिन cards को ऊपर already handle किया गया है
       उन्हें दोबारा process न करें.
    */

    if (
        genericCard.matches(
            ".service, " +
            ".stay-card, " +
            ".food-card, " +
            ".hotel-card, " +
            ".homestay-card, " +
            ".heritage-card, " +
            ".partner-service-card"
        )
    ) {

        continue;

    }


    activateFullCard(
        genericCard
    );

}


/* =====================================================
   29. CARD VISUAL FEEDBACK CSS
===================================================== */

if (
    !document.getElementById(
        "full-card-style"
    )
) {

    var cardStyle =
        document.createElement(
            "style"
        );


    cardStyle.id =
        "full-card-style";


    cardStyle.textContent = `

        /* -------------------------------------------
           Full clickable cards
        ------------------------------------------- */

        .service,
        .stay-card,
        .food-card,
        .hotel-card,
        .homestay-card,
        .heritage-card,
        .partner-service-card,
        .card {

            cursor: pointer;

            -webkit-tap-highlight-color:
                transparent;

        }


        /* -------------------------------------------
           Touch effect
        ------------------------------------------- */

        .card-touch-active {

            transform:
                scale(0.985);

            transition:
                transform 0.12s ease;

        }


        /* -------------------------------------------
           Keyboard focus
        ------------------------------------------- */

        .service:focus-visible,
        .stay-card:focus-visible,
        .food-card:focus-visible,
        .hotel-card:focus-visible,
        .homestay-card:focus-visible,
        .heritage-card:focus-visible,
        .partner-service-card:focus-visible,
        .card:focus-visible {

            outline:
                3px solid #ff9800;

            outline-offset:
                3px;

        }

    `;


    document.head.appendChild(
        cardStyle
    );

}


/* =====================================================
   30. DIRECT LINK TOUCH SAFETY
===================================================== */

var allCardLinks =
    document.querySelectorAll(
        ".service a, " +
        ".stay-card a, " +
        ".food-card a, " +
        ".hotel-card a, " +
        ".homestay-card a, " +
        ".heritage-card a, " +
        ".partner-service-card a"
    );


for (
    var al = 0;
    al < allCardLinks.length;
    al++
) {

    allCardLinks[al].addEventListener(
        "touchstart",
        function () {

            this.style.opacity =
                "0.75";

        },
        {
            passive: true
        }
    );


    allCardLinks[al].addEventListener(
        "touchend",
        function () {

            this.style.opacity =
                "";

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   PART 2 END
========================================================= */

/* =========================================================
   PART 3 / 3
   DESH KHOJ A2Z — MADURAI
   Partner • Service Buttons • Reveal • Final Safety
========================================================= */


/* =====================================================
   31. PARTNER SERVICE BUTTONS
===================================================== */

var serviceButtons =
    document.querySelectorAll(
        ".service-button[data-service]"
    );


var partnerWhatsApp =
    "918200195546";


var partnerEmail =
    "deshkhoja2z@gmail.com";


var partnerDestination =
    "Madurai, Tamil Nadu";


for (
    var sb = 0;
    sb < serviceButtons.length;
    sb++
) {

    serviceButtons[sb].addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            var service =
                this.getAttribute(
                    "data-service"
                );


            if (!service) {
                return;
            }


            /*
               Selected service display
            */

            var selectedService =
                document.getElementById(
                    "selectedService"
                );

            var selectedServiceName =
                document.getElementById(
                    "selectedServiceName"
                );


            if (selectedService) {

                selectedService.style.display =
                    "block";

            }


            if (selectedServiceName) {

                selectedServiceName.textContent =
                    service;

            }


            /*
               WhatsApp button
            */

            var whatsappButton =
                document.getElementById(
                    "partnerWhatsApp"
                );


            /*
               Email button
            */

            var emailButton =
                document.getElementById(
                    "partnerEmail"
                );


            var message =
                "Namaste DESH KHOJ A2Z,%0A%0A" +
                "Main Madurai mein " +
                service +
                " service ke liye partner banna chahta/chahti hoon.%0A%0A" +
                "Location: " +
                partnerDestination +
                "%0A%0AKripya mujhe registration ki jankari dein.";


            if (whatsappButton) {

                whatsappButton.href =
                    "https://wa.me/" +
                    partnerWhatsApp +
                    "?text=" +
                    message;

                whatsappButton.target =
                    "_blank";

                whatsappButton.rel =
                    "noopener noreferrer";

            }


            if (emailButton) {

                emailButton.href =
                    "mailto:" +
                    partnerEmail +
                    "?subject=" +
                    encodeURIComponent(
                        "Madurai Partner Registration - " +
                        service
                    ) +
                    "&body=" +
                    encodeURIComponent(
                        "Namaste DESH KHOJ A2Z,\n\n" +
                        "Main Madurai mein " +
                        service +
                        " service ke liye partner banna chahta/chahti hoon.\n\n" +
                        "Location: " +
                        partnerDestination
                    );

            }


            /*
               Contact choice area दिखाएँ
            */

            var contactChoice =
                document.getElementById(
                    "contactChoice"
                );


            if (contactChoice) {

                contactChoice.style.display =
                    "grid";

            }

        }
    );

}


/* =====================================================
   32. OLD PARTNER REGISTRATION FORM
===================================================== */

var registrationForm =
    document.getElementById(
        "registrationForm"
    );


if (registrationForm) {

    var serviceType =
        document.getElementById(
            "serviceType"
        );

    var businessName =
        document.getElementById(
            "businessName"
        );

    var contactName =
        document.getElementById(
            "contactName"
        );

    var contactNumber =
        document.getElementById(
            "contactNumber"
        );

    var address =
        document.getElementById(
            "address"
        );

    var serviceDetails =
        document.getElementById(
            "serviceDetails"
        );

    var registrationSuccess =
        document.getElementById(
            "registrationSuccess"
        );

    var registrationSubmit =
        document.getElementById(
            "registrationSubmit"
        );


    /* -----------------------------------------------
       Service Type Buttons
    ----------------------------------------------- */

    var serviceTypeButtons =
        document.querySelectorAll(
            ".service-type-btn"
        );


    for (
        var stb = 0;
        stb < serviceTypeButtons.length;
        stb++
    ) {

        serviceTypeButtons[stb].addEventListener(
            "click",
            function () {

                for (
                    var x = 0;
                    x < serviceTypeButtons.length;
                    x++
                ) {

                    serviceTypeButtons[x]
                        .classList.remove(
                            "active"
                        );

                }


                this.classList.add(
                    "active"
                );


                if (serviceType) {

                    serviceType.value =
                        this.getAttribute(
                            "data-service"
                        ) || this.textContent.trim();

                }

            }
        );

    }


    /* -----------------------------------------------
       Contact Number — केवल 10 digits
    ----------------------------------------------- */

    if (contactNumber) {

        contactNumber.addEventListener(
            "input",
            function () {

                this.value =
                    this.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .slice(
                        0,
                        10
                    );

            }
        );

    }


    /* -----------------------------------------------
       FORM SUBMIT
    ----------------------------------------------- */

    if (registrationSubmit) {

        registrationSubmit.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                var selectedService =
                    serviceType
                    ? serviceType.value.trim()
                    : "";


                var business =
                    businessName
                    ? businessName.value.trim()
                    : "";


                var person =
                    contactName
                    ? contactName.value.trim()
                    : "";


                var phone =
                    contactNumber
                    ? contactNumber.value.trim()
                    : "";


                var location =
                    address
                    ? address.value.trim()
                    : "";


                var details =
                    serviceDetails
                    ? serviceDetails.value.trim()
                    : "";


                /* ---------------------------------------
                   Basic Validation
                --------------------------------------- */

                if (!selectedService) {

                    alert(
                        isHindi
                            ? "कृपया Service Type चुनें।"
                            : "Please select a Service Type."
                    );

                    return;

                }


                if (!business) {

                    alert(
                        isHindi
                            ? "कृपया Business Name डालें।"
                            : "Please enter Business Name."
                    );

                    if (businessName) {
                        businessName.focus();
                    }

                    return;

                }


                if (!person) {

                    alert(
                        isHindi
                            ? "कृपया Contact Name डालें।"
                            : "Please enter Contact Name."
                    );

                    if (contactName) {
                        contactName.focus();
                    }

                    return;

                }


                if (
                    phone.length !== 10
                ) {

                    alert(
                        isHindi
                            ? "कृपया 10 अंकों का मोबाइल नंबर डालें।"
                            : "Please enter a valid 10-digit mobile number."
                    );

                    if (contactNumber) {
                        contactNumber.focus();
                    }

                    return;

                }


                if (!location) {

                    alert(
                        isHindi
                            ? "कृपया Address डालें।"
                            : "Please enter Address."
                    );

                    if (address) {
                        address.focus();
                    }

                    return;

                }


                /* ---------------------------------------
                   WhatsApp Message
                --------------------------------------- */

                var whatsappText =

                    "DESH KHOJ A2Z - Madurai Partner Registration\n\n" +

                    "Service: " +
                    selectedService +
                    "\n" +

                    "Business Name: " +
                    business +
                    "\n" +

                    "Contact Name: " +
                    person +
                    "\n" +

                    "Mobile: " +
                    phone +
                    "\n" +

                    "Address: " +
                    location +
                    "\n" +

                    "Service Details: " +
                    (details || "Not provided") +
                    "\n";


                var whatsappUrl =

                    "https://wa.me/" +
                    partnerWhatsApp +
                    "?text=" +
                    encodeURIComponent(
                        whatsappText
                    );


                /* ---------------------------------------
                   Email Message
                --------------------------------------- */

                var emailSubject =
                    "Madurai Partner Registration - " +
                    selectedService;


                var emailBody =

                    "DESH KHOJ A2Z - Madurai Partner Registration\n\n" +

                    "Service: " +
                    selectedService +
                    "\n" +

                    "Business Name: " +
                    business +
                    "\n" +

                    "Contact Name: " +
                    person +
                    "\n" +

                    "Mobile: " +
                    phone +
                    "\n" +

                    "Address: " +
                    location +
                    "\n" +

                    "Service Details: " +
                    (details || "Not provided");


                var emailUrl =

                    "mailto:" +
                    partnerEmail +
                    "?subject=" +
                    encodeURIComponent(
                        emailSubject
                    ) +
                    "&body=" +
                    encodeURIComponent(
                        emailBody
                    );


                /* ---------------------------------------
                   Success Box
                --------------------------------------- */

                if (registrationSuccess) {

                    registrationSuccess.style.display =
                        "block";


                    registrationSuccess.innerHTML =

                        (isHindi
                            ? "<h3>✅ जानकारी तैयार है</h3>"
                            : "<h3>✅ Registration Details Ready</h3>"
                        ) +

                        "<p>" +

                        (isHindi
                            ? "नीचे दिए गए विकल्प से DESH KHOJ A2Z से संपर्क करें।"
                            : "Contact DESH KHOJ A2Z using one of the options below."
                        ) +

                        "</p>" +

                        '<div class="mini-actions">' +

                        '<a class="mini-btn current" ' +
                        'href="' +
                        whatsappUrl +
                        '" target="_blank" ' +
                        'rel="noopener noreferrer">' +

                        "📱 WhatsApp" +

                        "</a>" +

                        '<a class="mini-btn" ' +
                        'href="' +
                        emailUrl +
                        '">' +

                        "✉️ Email" +

                        "</a>" +

                        "</div>";

                }


                /* ---------------------------------------
                   Scroll Success Box
                --------------------------------------- */

                if (registrationSuccess) {

                    setTimeout(
                        function () {

                            registrationSuccess.scrollIntoView({
                                behavior: "smooth",
                                block: "center"
                            });

                        },
                        100
                    );

                }

            }
        );

    }

}


/* =====================================================
   33. SCROLL REVEAL
===================================================== */

if (
    "IntersectionObserver" in window
) {

    var revealItems =
        document.querySelectorAll(
            ".route-card, " +
            ".service, " +
            ".stay-card, " +
            ".food-card, " +
            ".hotel-card, " +
            ".homestay-card, " +
            ".heritage-card, " +
            ".partner-service-card, " +
            ".suggested"
        );


    var revealObserver =
        new IntersectionObserver(

            function (entries) {

                for (
                    var r = 0;
                    r < entries.length;
                    r++
                ) {

                    var entry =
                        entries[r];


                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal-visible"
                        );


                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                }

            },

            {

                root: null,

                threshold: 0.08,

                rootMargin:
                    "0px 0px -40px 0px"

            }

        );


    for (
        var ri = 0;
        ri < revealItems.length;
        ri++
    ) {

        revealItems[ri].classList.add(
            "reveal-item"
        );


        revealObserver.observe(
            revealItems[ri]
        );

    }

}


/* =====================================================
   34. REVEAL CSS
===================================================== */

if (
    !document.getElementById(
        "reveal-style"
    )
) {

    var revealStyle =
        document.createElement(
            "style"
        );


    revealStyle.id =
        "reveal-style";


    revealStyle.textContent = `

        .reveal-item {

            opacity: 0;

            transform:
                translateY(18px);

            transition:
                opacity .45s ease,
                transform .45s ease;

        }


        .reveal-visible {

            opacity: 1;

            transform:
                translateY(0);

        }


        @media (
            prefers-reduced-motion: reduce
        ) {

            .reveal-item {

                opacity: 1;

                transform: none;

                transition: none;

            }

        }

    `;


    document.head.appendChild(
        revealStyle
    );

}


/* =====================================================
   35. BUTTON TOUCH FEEDBACK
===================================================== */

var allButtons =
    document.querySelectorAll(
        "button, " +
        ".action-btn, " +
        ".mini-btn, " +
        ".language-btn, " +
        ".service-button"
    );


for (
    var bt = 0;
    bt < allButtons.length;
    bt++
) {

    allButtons[bt].addEventListener(
        "touchstart",
        function () {

            this.classList.add(
                "button-touch-active"
            );

        },
        {
            passive: true
        }
    );


    allButtons[bt].addEventListener(
        "touchend",
        function () {

            var element =
                this;


            setTimeout(
                function () {

                    element.classList.remove(
                        "button-touch-active"
                    );

                },
                120
            );

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   36. HORIZONTAL MENU DRAG
===================================================== */

var horizontalMenu =
    document.querySelector(
        ".horizontal-menu"
    );


if (horizontalMenu) {

    var isDragging = false;

    var startX = 0;

    var scrollStart = 0;


    horizontalMenu.addEventListener(
        "pointerdown",
        function (event) {

            isDragging = true;

            startX =
                event.clientX;

            scrollStart =
                horizontalMenu.scrollLeft;

            horizontalMenu.setPointerCapture(
                event.pointerId
            );

        }
    );


    horizontalMenu.addEventListener(
        "pointermove",
        function (event) {

            if (!isDragging) {
                return;
            }


            var distance =
                event.clientX -
                startX;


            horizontalMenu.scrollLeft =
                scrollStart -
                distance;

        }
    );


    function stopMenuDrag() {

        isDragging = false;

    }


    horizontalMenu.addEventListener(
        "pointerup",
        stopMenuDrag
    );


    horizontalMenu.addEventListener(
        "pointercancel",
        stopMenuDrag
    );


    horizontalMenu.addEventListener(
        "pointerleave",
        stopMenuDrag
    );

}


/* =====================================================
   37. CURRENT LOCATION BUTTON VISUAL EFFECT
===================================================== */
var currentMiniButtons =
    document.querySelectorAll(
        ".mini-btn.current"
    );


for (
    var cm = 0;
    cm < currentMiniButtons.length;
    cm++
) {

    currentMiniButtons[cm].addEventListener(
        "touchstart",
        function () {

            this.style.transform =
                "scale(.97)";

        },
        {
            passive: true
        }
    );


    currentMiniButtons[cm].addEventListener(
        "touchend",
        function () {

            this.style.transform =
                "";

        },
        {
            passive: true
        }
    );

}


/* =====================================================
   38. OLD MAP BUTTON SAFETY
===================================================== */

var miniMapButtons =
    document.querySelectorAll(
        ".mini-btn.map"
    );


for (
    var mb = 0;
    mb < miniMapButtons.length;
    mb++
) {

    miniMapButtons[mb].style.display =
        "none";

}


/* =====================================================
   39. ROUTE ARROW SAFETY
===================================================== */

var arrows =
    document.querySelectorAll(
        ".route-arrow"
    );


for (
    var ar = 0;
    ar < arrows.length;
    ar++
) {

    arrows[ar].style.display =
        "none";

}


/* =====================================================
   40. ACCESSIBILITY — IMAGES
===================================================== */

var images =
    document.querySelectorAll(
        "img"
    );


for (
    var im = 0;
    im < images.length;
    im++
) {

    if (
        !images[im].hasAttribute(
            "loading"
        )
    ) {

        images[im].setAttribute(
            "loading",
            "lazy"
        );

    }

}


/* =====================================================
   41. FINAL CARD CHECK
===================================================== */


/*
   अगर किसी .service card में link है,
   लेकिन ऊपर से activate नहीं हुआ,
   तो एक बार फिर activate करें.
*/

var finalServices =
    document.querySelectorAll(
        ".service"
    );


for (
    var fs = 0;
    fs < finalServices.length;
    fs++
) {

    if (
        finalServices[fs].dataset
            .cardActivated !== "true"
    ) {

        activateFullCard(
            finalServices[fs]
        );

    }

}


/* =====================================================
   42. FINAL BODY READY
===================================================== */

document.body.classList.add(
    "js-ready"
);


/* =========================================================
   FINAL SCRIPT END
========================================================= */