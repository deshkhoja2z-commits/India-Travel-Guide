/* ==================================================
   DESH KHOJ A2Z
   JAIPUR TRAVEL GUIDE
   SCRIPT.JS
================================================== */


/* ==================================================
   DOM READY
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function(){

        /* ==========================================
           CURRENT LOCATION BUTTONS
        ========================================== */

        const currentButtons =
            document.querySelectorAll(
                "[data-current-route]"
            );


        currentButtons.forEach(
            function(button){

                button.addEventListener(
                    "click",
                    function(event){

                        event.preventDefault();


                        const destination =
                            button.getAttribute(
                                "data-current-route"
                            );


                        if(
                            !destination
                        ){

                            return;

                        }


                        /* --------------------------------
                           Browser GPS support
                        -------------------------------- */

                        if(
                            !navigator.geolocation
                        ){

                            alert(
                                "आपके device में Location सुविधा उपलब्ध नहीं है।"
                            );

                            return;

                        }


                        /* --------------------------------
                           Loading state
                        -------------------------------- */

                        button.classList.add(
                            "location-active",
                            "locating"
                        );


                        button.innerHTML =
                            "📍 Locating...";


                        /* --------------------------------
                           Get current position
                        -------------------------------- */

                        navigator.geolocation.getCurrentPosition(

                            function(position){

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


                                window.open(
                                    mapsURL,
                                    "_blank",
                                    "noopener,noreferrer"
                                );


                                button.classList.remove(
                                    "locating"
                                );


                                button.innerHTML =
                                    "📍 Current";

                            },


                            function(error){

                                button.classList.remove(
                                    "location-active",
                                    "locating"
                                );


                                button.innerHTML =
                                    "📍 Current";


                                let message =
                                    "आपकी location प्राप्त नहीं हो सकी।";


                                switch(
                                    error.code
                                ){

                                    case 1:

                                        message =
                                            "Location permission बंद है। कृपया browser में Location permission Allow करें।";

                                        break;


                                    case 2:

                                        message =
                                            "Location उपलब्ध नहीं है। GPS/Location चालू करके दोबारा प्रयास करें।";

                                        break;


                                    case 3:

                                        message =
                                            "Location प्राप्त करने में समय लग गया। कृपया दोबारा प्रयास करें।";

                                        break;

                                }


                                alert(message);

                            },


                            {
                                enableHighAccuracy:true,

                                timeout:12000,

                                maximumAge:0

                            }

                        );

                    }
                );

            }
        );



        /* ==========================================
           STICKY MENU LINKS
        ========================================== */

        const menuLinks =
            document.querySelectorAll(
                ".menu-card"
            );


        menuLinks.forEach(
            function(link){

                link.addEventListener(
                    "click",
                    function(event){

                        const targetID =
                            link.getAttribute(
                                "href"
                            );


                        if(
                            !targetID ||
                            targetID === "#"
                        ){

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetID
                            );


                        if(target){

                            event.preventDefault();


                            target.scrollIntoView({

                                behavior:"smooth",

                                block:"start"

                            });

                        }

                    }
                );

            }
        );



        /* ==========================================
           ACTIVE ROUTE MENU
        ========================================== */

        const observedSections =
            document.querySelectorAll(
                ".route-card, .section-title"
            );


        if(
            observedSections.length &&
            menuLinks.length
        ){

            const sectionObserver =
                new IntersectionObserver(

                    function(entries){

                        entries.forEach(
                            function(entry){

                                if(
                                    !entry.isIntersecting
                                ){

                                    return;

                                }


                                const sectionID =
                                    entry.target.id;


                                menuLinks.forEach(
                                    function(link){

                                        link.classList.remove(
                                            "active"
                                        );

                                    }
                                );


                                const activeLink =
                                    document.querySelector(
                                        '.menu-card[href="#' +
                                        sectionID +
                                        '"]'
                                    );


                                if(activeLink){

                                    activeLink.classList.add(
                                        "active"
                                    );


                                    /* --------------------
                                       Automatically bring
                                       active menu into view
                                    -------------------- */

                                    activeLink.scrollIntoView({

                                        behavior:"smooth",

                                        block:"nearest",

                                        inline:"center"

                                    });

                                }

                            }
                        );

                    },

                    {

                        root:null,

                        rootMargin:
                            "-20% 0px -65% 0px",

                        threshold:0

                    }

                );


            observedSections.forEach(
                function(section){

                    sectionObserver.observe(
                        section
                    );

                }
            );

        }



        /* ==========================================
           BACK TO TOP — OLD BUTTON
        ========================================== */

        const oldBackTop =
            document.querySelector(
                ".back-top a"
            );


        if(oldBackTop){

            oldBackTop.addEventListener(
                "click",
                function(event){

                    event.preventDefault();


                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }
            );

        }



        /* ==========================================
           FLOATING BACK TO TOP
        ========================================== */

        const backToTop =
            document.getElementById(
                "backToTop"
            );


        if(backToTop){

            function updateBackToTop(){

                if(
                    window.scrollY > 350
                ){

                    backToTop.classList.add(
                        "show"
                    );

                }
                else{

                    backToTop.classList.remove(
                        "show"
                    );

                }

            }


            window.addEventListener(
                "scroll",
                updateBackToTop,
                {
                    passive:true
                }
            );


            updateBackToTop();


            backToTop.addEventListener(
                "click",
                function(){

                    window.scrollTo({

                        top:0,

                        behavior:"smooth"

                    });

                }
            );

        }



        /* ==========================================
           EXTERNAL LINKS
        ========================================== */

        const externalLinks =
            document.querySelectorAll(
                'a[target="_blank"]'
            );


        externalLinks.forEach(
            function(link){

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );



        /* ==========================================
           PREVENT EMPTY # LINKS
        ========================================== */

        const emptyLinks =
            document.querySelectorAll(
                'a[href="#"]'
            );


        emptyLinks.forEach(
            function(link){

                /*
                   Current buttons are handled separately.
                   Other empty links should not jump to top.
                */

                if(
                    !link.hasAttribute(
                        "data-current-route"
                    )
                ){

                    link.addEventListener(
                        "click",
                        function(event){

                            event.preventDefault();

                        }
                    );

                }

            }
        );



        /* ==========================================
           PAGE START AT TOP
        ========================================== */

        if(
            window.location.hash === ""
        ){

            window.scrollTo(
                0,
                0
            );

        }



        /* ==========================================
           TOUCH FEEDBACK
        ========================================== */

        const clickableItems =
            document.querySelectorAll(
                ".menu-card, .route-stop, .service, .action-btn, .mini-btn"
            );


        clickableItems.forEach(
            function(item){

                item.addEventListener(
                    "touchstart",
                    function(){

                        item.style.webkitTapHighlightColor =
                            "transparent";

                    },
                    {
                        passive:true
                    }
                );

            }
        );



        /* ==========================================
           CONSOLE CHECK
        ========================================== */

        console.log(
            "DESH KHOJ A2Z — Jaipur Travel Guide Loaded"
        );

    }
);