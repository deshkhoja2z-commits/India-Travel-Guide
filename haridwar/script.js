/* ==================================================
   DESH KHOJ A2Z
   HARIDWAR TRAVEL GUIDE
   SCRIPT.JS
================================================== */

document.addEventListener("DOMContentLoaded", function(){

    /* ==================================================
       BACK TO TOP
    ================================================== */

    const topBtn = document.getElementById("topBtn");

    if(topBtn){

        window.addEventListener("scroll", function(){

            if(window.scrollY > 350){

                topBtn.style.display = "flex";

            }else{

                topBtn.style.display = "none";

            }

        });

        topBtn.addEventListener("click", function(){

            window.scrollTo({
                top:0,
                behavior:"smooth"
            });

        });

    }


    /* ==================================================
       SMOOTH INTERNAL LINKS
    ================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function(link){

        link.addEventListener("click", function(event){

            const targetId = this.getAttribute("href");

            if(!targetId || targetId === "#"){
                return;
            }

            const target = document.querySelector(targetId);

            if(target){

                event.preventDefault();

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            }

        });

    });


    /* ==================================================
       CURRENT LOCATION → GOOGLE MAPS
    ================================================== */

    document.querySelectorAll("[data-current-route]").forEach(function(button){

        button.addEventListener("click", function(event){

            event.preventDefault();

            const destination =
                this.getAttribute("data-current-route");

            if(!destination){
                return;
            }


            /* ==========================================
               FALLBACK
            ========================================== */

            function openFallback(){

                const fallback =
                    "https://www.google.com/maps/dir/?api=1" +
                    "&destination=" +
                    encodeURIComponent(destination);

                window.open(
                    fallback,
                    "_blank",
                    "noopener,noreferrer"
                );

            }


            /* ==========================================
               GEOLOCATION CHECK
            ========================================== */

            if(!navigator.geolocation){

                openFallback();

                return;

            }


            navigator.geolocation.getCurrentPosition(

                function(position){

                    const lat =
                        position.coords.latitude;

                    const lng =
                        position.coords.longitude;


                    const mapsUrl =
                        "https://www.google.com/maps/dir/?api=1" +
                        "&origin=" +
                        lat +
                        "," +
                        lng +
                        "&destination=" +
                        encodeURIComponent(destination);


                    window.open(
                        mapsUrl,
                        "_blank",
                        "noopener,noreferrer"
                    );

                },


                function(){

                    openFallback();

                },


                {
                    enableHighAccuracy:true,
                    timeout:10000,
                    maximumAge:60000
                }

            );

        });

    });


    /* ==================================================
       EXTERNAL LINKS
    ================================================== */

    document.querySelectorAll('a[target="_blank"]').forEach(function(link){

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* ==================================================
       ACTIVE TOP MENU
    ================================================== */

    const menuCards =
        document.querySelectorAll(".menu-card");


    menuCards.forEach(function(card){

        card.addEventListener("click", function(){

            menuCards.forEach(function(item){

                item.classList.remove("active");

            });

            this.classList.add("active");

        });

    });


    /* ==================================================
       CURRENT BUTTON TOUCH EFFECT
    ================================================== */

    document.querySelectorAll(".current").forEach(function(button){

        button.addEventListener("touchstart", function(){

            this.style.transform = "scale(.95)";

        }, {passive:true});


        button.addEventListener("touchend", function(){

            this.style.transform = "";

        }, {passive:true});

    });


    /* ==================================================
       TOP BUTTON INITIAL STATE
    ================================================== */

    if(topBtn){

        topBtn.style.display =
            window.scrollY > 350 ? "flex" : "none";

    }


    /* ==================================================
       ACTIVE MENU ON SCROLL
    ================================================== */

    const sections = [
        "route1",
        "route2",
        "route3",
        "route4",
        "route5",
        "route6",
        "travel"
    ];


    window.addEventListener("scroll", function(){

        let currentSection = "";

        sections.forEach(function(id){

            const section =
                document.getElementById(id);

            if(!section){
                return;
            }

            const position =
                section.getBoundingClientRect();

            if(position.top <= 140){

                currentSection = id;

            }

        });


        if(currentSection){

            menuCards.forEach(function(card){

                const href =
                    card.getAttribute("href");

                card.classList.toggle(
                    "active",
                    href === "#" + currentSection
                );

            });

        }

    });


});
