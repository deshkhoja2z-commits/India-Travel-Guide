/* ==================================================
   DESH KHOJ A2Z
   JODHPUR TRAVEL GUIDE
   SCRIPT.JS
================================================== */

document.addEventListener("DOMContentLoaded", function () {


    /* ==================================================
       CURRENT LOCATION → GOOGLE MAPS
    ================================================== */

    const currentButtons =
        document.querySelectorAll("[data-current-route]");


    currentButtons.forEach(function (button) {

        button.addEventListener("click", function (event) {

            event.preventDefault();


            const destination =
                button.getAttribute("data-current-route");


            if (!destination) {
                return;
            }


            /*
              Google Maps will automatically use
              the device current location when
              location permission is available.
            */

            const mapsURL =
                "https://www.google.com/maps/dir/?api=1" +
                "&destination=" +
                encodeURIComponent(destination);


            window.open(
                mapsURL,
                "_blank"
            );

        });

    });



    /* ==================================================
       MAP BUTTONS
       Normal Google Maps links already work
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
       Google Images links
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
       EXTERNAL LINKS
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
       TOP MENU → ROUTE SECTIONS
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
                    link.getAttribute("href");


                /*
                  Current Location buttons also use href="#"
                  so they are handled separately.
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

    const backTop =
        document.querySelector(
            ".back-top a"
        );


    if (backTop) {

        backTop.addEventListener(
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



    /* ==================================================
       STICKY MENU ACTIVE ROUTE
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
                                      Automatically bring
                                      active menu card into
                                      view on mobile.
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
       CURRENT BUTTON VISUAL FEEDBACK
    ================================================== */

    currentButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    button.classList.add(
                        "clicked"
                    );


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
       END OF JODHPUR SCRIPT
    ================================================== */

});