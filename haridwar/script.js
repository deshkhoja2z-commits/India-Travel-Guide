/* =========================================================
   DESH KHOJ A2Z
   HARIDWAR TRAVEL GUIDE
   SIMPLE OLD-STYLE JS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* ================================
       BACK TO TOP BUTTON
    ================================= */

    var topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", function () {

        if (!topBtn) return;

        if (window.pageYOffset > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    });

    if (topBtn) {

        topBtn.onclick = function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        };

    }


    /* ================================
       MENU CARD CLICK
    ================================= */

    var menuCards = document.querySelectorAll(".menu-card");

    for (var i = 0; i < menuCards.length; i++) {

        menuCards[i].onclick = function () {

            for (var j = 0; j < menuCards.length; j++) {
                menuCards[j].classList.remove("active");
            }

            this.classList.add("active");

        };

    }


    /* ================================
       STAY MENU
       #stay → #hotels
    ================================= */

    var stayLinks = document.querySelectorAll('a[href="#stay"]');

    for (var i = 0; i < stayLinks.length; i++) {

        stayLinks[i].onclick = function (e) {

            e.preventDefault();

            var hotels = document.getElementById("hotels");

            if (hotels) {

                hotels.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        };

    }


    /* ================================
       SMOOTH SCROLL
    ================================= */

    var links = document.querySelectorAll('a[href^="#"]');

    for (var i = 0; i < links.length; i++) {

        links[i].onclick = function (e) {

            var id = this.getAttribute("href");

            if (!id || id === "#" || id === "#stay") {
                return;
            }

            var target = document.querySelector(id);

            if (!target) {
                return;
            }

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        };

    }


    /* ================================
       CURRENT LOCATION BUTTON
       GOOGLE MAPS NAVIGATION
    ================================= */

    var currentButtons =
        document.querySelectorAll("[data-current-route]");

    for (var i = 0; i < currentButtons.length; i++) {

        currentButtons[i].onclick = function (e) {

            e.preventDefault();

            var destination =
                this.getAttribute("data-current-route");

            if (!destination) {
                return;
            }


            /* --------------------------------
               GPS AVAILABLE
            -------------------------------- */

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(

                    function (position) {

                        var lat =
                            position.coords.latitude;

                        var lng =
                            position.coords.longitude;


                        var url =
                            "https://www.google.com/maps/dir/?api=1" +
                            "&origin=" +
                            encodeURIComponent(
                                lat + "," + lng
                            ) +
                            "&destination=" +
                            encodeURIComponent(
                                destination
                            );


                        window.open(
                            url,
                            "_blank"
                        );

                    },

                    function () {

                        /* GPS permission denied */

                        var url =
                            "https://www.google.com/maps/dir/?api=1" +
                            "&destination=" +
                            encodeURIComponent(
                                destination
                            );

                        window.open(
                            url,
                            "_blank"
                        );

                    }

                );

            }

            /* --------------------------------
               GPS NOT AVAILABLE
            -------------------------------- */

            else {

                var url =
                    "https://www.google.com/maps/dir/?api=1" +
                    "&destination=" +
                    encodeURIComponent(
                        destination
                    );

                window.open(
                    url,
                    "_blank"
                );

            }

        };

    }


    /* ================================
       EXTERNAL LINKS
    ================================= */

    var externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );

    for (var i = 0; i < externalLinks.length; i++) {

        externalLinks[i].setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }


    /* ================================
       MAP BUTTONS HIDE
       Extra safety
    ================================= */

    var mapButtons =
        document.querySelectorAll(
            ".mini-btn.map"
        );

    for (var i = 0; i < mapButtons.length; i++) {

        mapButtons[i].style.display = "none";

    }


    /* ================================
       INITIAL TOP BUTTON
    ================================= */

    if (topBtn) {

        if (window.pageYOffset > 300) {
            topBtn.style.display = "flex";
        } else {
            topBtn.style.display = "none";
        }

    }

});
