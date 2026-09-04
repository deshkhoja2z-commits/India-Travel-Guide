/* =========================================================
   DESH KHOJ A2Z
   KHAJURAHO TRAVEL GUIDE
   FINAL UPDATED SCRIPT.JS

   Features:
   • Active Menu Fix
   • Route 1–5
   • Travel
   • Stay & Food
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
========================================================= */

"use strict";


/* =========================================================
   PAGE READY
========================================================= */

document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const menuCards =
        document.querySelectorAll(".menu-card");

    const currentButtons =
        document.querySelectorAll(
            "[data-current-route]"
        );

    const horizontalMenu =
        document.querySelector(".horizontal-menu");

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


    backTopButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            scrollToTop
        );

    });


    function updateBackTop() {

        backTopButtons.forEach(function (button) {

            if (
                button.id === "topBtn"
            ) {

                if (window.scrollY > 350) {

                    button.style.display = "flex";

                } else {

                    button.style.display = "none";

                }

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateBackTop,
        { passive: true }
    );


    updateBackTop();


    /* =====================================================
       03. TARGET NORMALIZATION
       Converts #stay → #stay
       If old HTML has #hotels, it still works.
    ===================================================== */

    function normalizeTarget(href) {

        if (!href) {
            return "";
        }

        href = href.trim();

        if (href === "#") {
            return "";
        }

        /*
           New Khajuraho HTML:
           #stay

           Old HTML:
           #hotels

           Both supported.
        */

        if (
            href === "#stay" &&
            document.getElementById("stay")
        ) {

            return "#stay";

        }


        if (
            href === "#stay" &&
            !document.getElementById("stay") &&
            document.getElementById("hotels")
        ) {

            return "#hotels";

        }


        return href;

    }


    /* =====================================================
       04. ACTIVE MENU FUNCTION
    ===================================================== */

    function setActiveMenu(targetId) {

        if (!targetId) {
            return;
        }

        let finalTarget =
            normalizeTarget(targetId);


        menuCards.forEach(function (card) {

            const href =
                card.getAttribute("href");

            const normalized =
                normalizeTarget(href);


            if (
                normalized === finalTarget
            ) {

                card.classList.add("active");

            } else {

                card.classList.remove("active");

            }

        });


        /*
           Automatically bring active menu card
           into visible horizontal area.
        */

        menuCards.forEach(function (card) {

            const href =
                normalizeTarget(
                    card.getAttribute("href")
                );

            if (
                href === finalTarget
            ) {

                if (
                    horizontalMenu
                ) {

                    card.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center"
                    });

                }

            }

        });

    }


    /* =====================================================
       05. MENU CLICK
    ===================================================== */

    menuCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");

                const targetId =
                    normalizeTarget(href);


                /*
                   Normal external links are ignored.
                */

                if (
                    !href ||
                    !href.startsWith("#") ||
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


                /*
                   Immediately highlight
                   the clicked menu.
                */

                setActiveMenu(targetId);


                /*
                   Smooth scroll.
                */

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                   Update URL hash without
                   page reload.
                */

                try {

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                } catch (error) {

                    /* Ignore history errors */

                }

            }
        );

    });


    /* =====================================================
       06. ALL INTERNAL LINKS
       Smooth scrolling for #route1 etc.
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const href =
                    this.getAttribute("href");


                /*
                   Back-to-top
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
                   Menu cards are already handled
                   above. Avoid double handling.
                */

                if (
                    this.classList.contains(
                        "menu-card"
                    )
                ) {

                    return;

                }


                const targetId =
                    normalizeTarget(href);


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
                    behavior: "smooth",
                    block: "start"
                });

            }
        );

    });


    /* =====================================================
       07. ACTIVE MENU WHILE SCROLLING
       
       IMPORTANT:
       This replaces the old IntersectionObserver
       route detection.

       It checks the section nearest the top of
       the visible screen and highlights the
       correct menu.
    ===================================================== */


    function getMenuSections() {

        const sections = [];


        menuCards.forEach(function (card) {

            const href =
                normalizeTarget(
                    card.getAttribute("href")
                );


            if (!href) {
                return;
            }


            /*
               Only internal section links.
            */

            if (
                !href.startsWith("#")
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
                id: href,
                element: element
            });

        });


        return sections;

    }


    function updateActiveMenuOnScroll() {

        const sections =
            getMenuSections();


        if (!sections.length) {
            return;
        }


        /*
           Position where active section
           should be detected.

           Header + sticky menu के कारण
           approximately 180px रखा गया है.
        */

        const detectionPoint = 190;


        let currentSection = null;


        sections.forEach(function (item) {

            const rect =
                item.element.getBoundingClientRect();


            /*
               Section has reached detection line.
            */

            if (
                rect.top <= detectionPoint
            ) {

                currentSection = item;

            }

        });


        /*
           If page is near the very top,
           select first route.
        */

        if (
            !currentSection &&
            sections.length
        ) {

            currentSection =
                sections[0];

        }


        if (currentSection) {

            setActiveMenu(
                currentSection.id
            );

        }

    }


    let scrollTimer = null;


    window.addEventListener(
        "scroll",
        function () {

            if (scrollTimer) {
                return;
            }


            scrollTimer =
                requestAnimationFrame(
                    function () {

                        updateActiveMenuOnScroll();

                        scrollTimer = null;

                    }
                );

        },
        { passive: true }
    );


    /*
       Initial state.
    */

    updateActiveMenuOnScroll();


    /* =====================================================
       08. PAGE LOAD HASH
       
       Example:
       khajuraho.html#route3
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
                ? document.querySelector(hash)
                : null;


        if (target) {

            setTimeout(
                function () {

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });


                    setActiveMenu(hash);

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
           GPS not available
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


        /*
           Loading state
        */

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


                /*
                   If GPS permission fails,
                   open destination directly.
                */

                openFallback(
                    destination
                );

            },


            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 60000
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
               Mobile touch feedback
            */

            button.addEventListener(
                "touchstart",
                function () {

                    this.classList.add(
                        "pressed"
                    );

                },
                { passive: true }
            );


            button.addEventListener(
                "touchend",
                function () {

                    this.classList.remove(
                        "pressed"
                    );

                },
                { passive: true }
            );

        }
    );


    /* =====================================================
       10. EXTERNAL GOOGLE LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[href^="https://www.google.com/"]'
    ).forEach(function (link) {

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       11. ALL EXTERNAL TARGET BLANK LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(function (link) {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       12. MAP BUTTONS
       
       New design में Map button नहीं चाहिए.
       पुराने HTML में अगर मौजूद है तो hide.
    ===================================================== */

    document.querySelectorAll(
        ".mini-btn.map"
    ).forEach(function (button) {

        button.style.display =
            "none";

    });


    /*
       पुराने mini-actions में भी
       Map button hide.
    */

    document.querySelectorAll(
        ".mini-actions"
    ).forEach(function (container) {

        const mapButton =
            container.querySelector(
                ".mini-btn.map"
            );


        if (mapButton) {

            mapButton.style.display =
                "none";

        }

    });


    /* =====================================================
       13. OLD ROUTE ARROWS
       
       New card design में arrows नहीं चाहिए.
    ===================================================== */

    document.querySelectorAll(
        ".route-arrow"
    ).forEach(function (arrow) {

        arrow.style.display =
            "none";

    });


    /* =====================================================
       14. HORIZONTAL MENU
       
       Mobile swipe support.
       Native horizontal scrolling remains enabled.
    ===================================================== */

    if (
        horizontalMenu
    ) {

        let isDown = false;

        let startX = 0;

        let startScrollLeft = 0;


        horizontalMenu.addEventListener(
            "pointerdown",
            function (event) {

                isDown = true;

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
        ].forEach(function (eventName) {

            horizontalMenu.addEventListener(
                eventName,
                function () {

                    isDown = false;

                }
            );

        });

    }


    /* =====================================================
       15. CARD REVEAL
    ===================================================== */

    if (
        "IntersectionObserver" in window
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

                      