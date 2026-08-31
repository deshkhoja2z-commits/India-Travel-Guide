/* ==================================================
   DESH KHOJ A2Z
   JIM CORBETT TRAVEL GUIDE
   SCRIPT.JS
   MULTI COLOUR VERSION
================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       CURRENT LOCATION → GOOGLE MAPS
    ================================================== */

    const currentButtons =
        document.querySelectorAll(
            "[data-current-route]"
        );


    currentButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                const destination =
                    button.getAttribute(
                        "data-current-route"
                    );


                if (!destination) {
                    return;
                }


                /* --------------------------------
                   BUTTON LOADING
                -------------------------------- */

                const oldText =
                    button.innerHTML;


                button.innerHTML =
                    "📍 Getting location...";


                button.style.pointerEvents =
                    "none";


                /* --------------------------------
                   CURRENT LOCATION
                -------------------------------- */

                if (!navigator.geolocation) {

                    button.innerHTML =
                        oldText;

                    button.style.pointerEvents =
                        "auto";

                    alert(
                        "📍 Current location is not supported by this browser. Please use Chrome."
                    );

                    return;

                }


                navigator.geolocation.getCurrentPosition(

                    function (position) {

                        const latitude =
                            position.coords.latitude;

                        const longitude =
                            position.coords.longitude;


                        /* ----------------------------
                           GOOGLE MAPS ROUTE
                        ---------------------------- */

                        const mapsURL =
                            "https://www.google.com/maps/dir/?api=1" +
                            "&origin=" +
                            encodeURIComponent(
                                latitude +
                                "," +
                                longitude
                            ) +
                            "&destination=" +
                            encodeURIComponent(
                                destination
                            );


                        /*
                           Open direct route
                           in same tab
                        */

                        window.location.href =
                            mapsURL;

                    },


                    function (error) {

                        button.innerHTML =
                            oldText;

                        button.style.pointerEvents =
                            "auto";


                        if (
                            error.code ===
                            error.PERMISSION_DENIED
                        ) {

                            alert(
                                "📍 Location permission is blocked. Please allow Location permission for this website/browser and try again."
                            );

                        }

                        else if (
                            error.code ===
                            error.POSITION_UNAVAILABLE
                        ) {

                            alert(
                                "📍 Current location is unavailable. Please turn ON your phone's Location/GPS and try again."
                            );

                        }

                        else if (
                            error.code ===
                            error.TIMEOUT
                        ) {

                            alert(
                                "📍 Location request timed out. Please turn ON GPS and try again."
                            );

                        }

                        else {

                            alert(
                                "📍 Current location could not be found. Please check Location permission and GPS."
                            );

                        }

                    },


                    {
                        enableHighAccuracy: true,
                        timeout: 15000,
                        maximumAge: 0
                    }

                );

            }

        );

    });



    /* ==================================================
       MAP BUTTONS
       GOOGLE MAPS
    ================================================== */

    const mapButtons =
        document.querySelectorAll(
            'a[href*="google.com/maps"]'
        );


    mapButtons.forEach(function (button) {

        button.setAttribute(
            "target",
            "_blank"
        );


        button.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });



    /* ==================================================
       PHOTO BUTTONS
       GOOGLE IMAGES
    ================================================== */

    const photoButtons =
        document.querySelectorAll(
            'a[href*="google.com/search?tbm=isch"]'
        );


    photoButtons.forEach(function (button) {

        button.setAttribute(
            "target",
            "_blank"
        );


        button.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });



    /* ==================================================
       ALL EXTERNAL LINKS
    ================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });



    /* ==================================================
       SMOOTH SCROLL
       TOP MENU → ROUTE
    ================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetID =
                    link.getAttribute(
                        "href"
                    );


                /*
                   Current Location button
                   is handled separately
                */

                if (
                    !targetID ||
                    targetID === "#" ||
                    link.hasAttribute(
                        "data-current-route"
                    )
                ) {

                    return;

                }


                const target =
                    document.querySelector(
                        targetID
                    );


                if (target) {

                    event.preventDefault();


                    target.scrollIntoView({

                        behavior: "smooth",

                        block: "start"

                    });

                }

            }
        );

    });



    /* ==================================================
       BACK TO TOP
    ================================================== */

    const backLinks =
        document.querySelectorAll(
            'a[href="#top"]'
        );


    backLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    });



    /* ==================================================
       STICKY MENU
       ACTIVE ROUTE
    ================================================== */

    const sections =
        document.querySelectorAll(
            ".route-card"
        );


    const menuLinks =
        document.querySelectorAll(
            '.menu-card[href^="#route"]'
        );


    if (
        sections.length > 0 &&
        menuLinks.length > 0
    ) {


        const observer =
            new IntersectionObserver(

                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {


                                menuLinks.forEach(
                                    function (link) {

                                        link.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                const activeLink =
                                    document.querySelector(
                                        '.menu-card[href="#' +
                                        entry.target.id +
                                        '"]'
                                    );


                                if (activeLink) {

                                    activeLink.classList.add(
                                        "active"
                                    );


                                    /*
                                       Mobile menu
                                       automatically
                                       moves to active route
                                    */

                                    activeLink.scrollIntoView({

                                        behavior: "smooth",

                                        block: "nearest",

                                        inline: "center"

                                    });

                                }

                            }

                        }
                    );

                },


                {
                    threshold: 0.25
                }

            );


        sections.forEach(
            function (section) {

                observer.observe(
                    section
                );

            }
        );

    }



    /* ==================================================
       MULTI COLOUR CURRENT BUTTON
    ================================================== */

    currentButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {


                    button.classList.add(
                        "clicked"
                    );


                    /*
                       Multi-colour effect
                    */

                    const colours = [

                        "#e53935",
                        "#1e88e5",
                        "#43a047",
                        "#8e24aa",
                        "#fb8c00",
                        "#00897b"

                    ];


                    const randomColour =
                        colours[
                            Math.floor(
                                Math.random() *
                                colours.length
                            )
                        ];


                    button.style.backgroundColor =
                        randomColour;


                    button.style.color =
                        "#ffffff";


                    button.style.borderColor =
                        randomColour;


                    setTimeout(
                        function () {

                            button.classList.remove(
                                "clicked"
                            );

                        },
                        1000
                    );

                }
            );

        }
    );



    /* ==================================================
       MULTI COLOUR MENU CARDS
    ================================================== */

    const menuCards =
        document.querySelectorAll(
            ".menu-card"
        );


    const menuColours = [

        "#e53935",
        "#1e88e5",
        "#43a047",
        "#8e24aa",
        "#fb8c00",
        "#00897b",
        "#6d4c41"

    ];


    menuCards.forEach(
        function (card, index) {

            card.style.setProperty(
                "--menu-color",
                menuColours[
                    index %
                    menuColours.length
                ]
            );

        }
    );



    /* ==================================================
       MULTI COLOUR ACTION BUTTONS
    ================================================== */

    const actionButtons =
        document.querySelectorAll(
            ".action-btn"
        );


    const actionColours = [

        "#1565c0",
        "#2e7d32",
        "#ef6c00",
        "#6a1b9a",
        "#00838f",
        "#c62828"

    ];


    actionButtons.forEach(
        function (button, index) {

            button.style.setProperty(
                "--action-color",
                actionColours[
                    index %
                    actionColours.length
                ]
            );

        }
    );



    /* ==================================================
       CURRENT BUTTON HOVER / TOUCH FEEDBACK
    ================================================== */

    currentButtons.forEach(
        function (button) {

            button.addEventListener(
                "touchstart",
                function () {

                    button.style.transform =
                        "scale(0.96)";

                },
                {
                    passive: true
                }
            );


            button.addEventListener(
                "touchend",
                function () {

                    button.style.transform =
                        "";

                },
                {
                    passive: true
                }
            );

        }
    );



    /* ==================================================
       END OF JIM CORBETT SCRIPT
    ================================================== */

});