<script>

/* ==========================================================
   DESH KHOJ A2Z
   HARIDWAR TRAVEL GUIDE
   INLINE JAVASCRIPT
========================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", function(){

/* ==========================================================
   01. BASIC ELEMENTS
========================================================== */

const topBtn =
    document.getElementById("topBtn");

const menuCards =
    document.querySelectorAll(".menu-card");

const currentButtons =
    document.querySelectorAll("[data-current-route]");

const routeCards =
    document.querySelectorAll(".route-card");

const internalLinks =
    document.querySelectorAll('a[href^="#"]');


/* ==========================================================
   02. BACK TO TOP BUTTON
========================================================== */

function updateTopButton(){

    if(!topBtn){
        return;
    }

    if(window.scrollY > 350){

        topBtn.style.display = "flex";

    }else{

        topBtn.style.display = "none";

    }

}


window.addEventListener(
    "scroll",
    updateTopButton,
    {passive:true}
);


updateTopButton();


if(topBtn){

    topBtn.addEventListener(
        "click",
        function(){

            window.scrollTo({

                top:0,

                behavior:"smooth"

            });

        }
    );

}


/* ==========================================================
   03. NORMALIZE TARGET
========================================================== */

function normalizeTarget(targetId){

    if(targetId === "#stay"){

        return "#hotels";

    }

    return targetId;

}


/* ==========================================================
   04. ACTIVE MENU
========================================================== */

function setActiveMenu(targetId){

    targetId =
        normalizeTarget(targetId);


    menuCards.forEach(
        function(card){

            let href =
                card.getAttribute("href");

            href =
                normalizeTarget(href);

            if(href === targetId){

                card.classList.add("active");

            }else{

                card.classList.remove("active");

            }

        }
    );

}


/* ==========================================================
   05. INTERNAL SMOOTH SCROLL
========================================================== */

internalLinks.forEach(
    function(link){

        link.addEventListener(
            "click",
            function(event){

                let targetId =
                    this.getAttribute("href");


                /* ------------------------------------------
                   EMPTY #
                ------------------------------------------ */

                if(
                    !targetId ||
                    targetId === "#"
                ){

                    return;

                }


                targetId =
                    normalizeTarget(targetId);


                const target =
                    document.querySelector(
                        targetId
                    );


                if(!target){

                    return;

                }


                event.preventDefault();


                target.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });


                setActiveMenu(targetId);


                /*
                   URL hash update
                   without page jump
                */

                try{

                    history.replaceState(
                        null,
                        "",
                        targetId
                    );

                }catch(error){

                    /* Ignore */

                }

            }
        );

    }
);


/* ==========================================================
   06. HORIZONTAL MENU ACTIVE CLICK
========================================================== */

menuCards.forEach(
    function(card){

        card.addEventListener(
            "click",
            function(){

                let href =
                    this.getAttribute("href");

                href =
                    normalizeTarget(href);

                setActiveMenu(href);


                /*
                   Bring clicked tab into
                   visible horizontal area
                */

                this.scrollIntoView({

                    behavior:"smooth",

                    block:"nearest",

                    inline:"center"

                });

            }
        );

    }
);


/* ==========================================================
   07. CURRENT LOCATION FUNCTION
========================================================== */

function openGoogleDestination(
    destination
){

    const url =
        "https://www.google.com/maps/dir/?api=1"
        +
        "&destination="
        +
        encodeURIComponent(
            destination
        );


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* ==========================================================
   08. CURRENT LOCATION → GOOGLE MAPS
========================================================== */

function openCurrentRoute(
    button
){

    const destination =
        button.getAttribute(
            "data-current-route"
        );


    if(!destination){

        return;

    }


    /*
       Save original button text
    */

    const originalHTML =
        button.innerHTML;


    /*
       Loading state
    */

    button.classList.add(
        "location-loading"
    );

    button.innerHTML =
        "📍 Location…";


    /*
       Browser GPS available?
    */

    if(
        !navigator.geolocation
    ){

        button.classList.remove(
            "location-loading"
        );

        button.innerHTML =
            originalHTML;

        openGoogleDestination(
            destination
        );

        return;

    }


    navigator.geolocation.getCurrentPosition(

        function(position){

            const latitude =
                position.coords.latitude;

            const longitude =
                position.coords.longitude;


            /*
               Google Maps directions
            */

            const mapsURL =
                "https://www.google.com/maps/dir/?api=1"
                +
                "&origin="
                +
                encodeURIComponent(
                    latitude +
                    "," +
                    longitude
                )
                +
                "&destination="
                +
                encodeURIComponent(
                    destination
                );


            button.classList.remove(
                "location-loading"
            );

            button.innerHTML =
                originalHTML;


            window.open(
                mapsURL,
                "_blank",
                "noopener,noreferrer"
            );

        },


        function(error){

            /*
               If GPS fails,
               open destination directly.
            */

            button.classList.remove(
                "location-loading"
            );

            button.innerHTML =
                originalHTML;


            openGoogleDestination(
                destination
            );

        },


        {

            enableHighAccuracy:true,

            timeout:10000,

            maximumAge:60000

        }

    );

}


/* ==========================================================
   09. ALL CURRENT BUTTONS
========================================================== */

currentButtons.forEach(
    function(button){

        button.addEventListener(
            "click",
            function(event){

                event.preventDefault();

                openCurrentRoute(
                    this
                );

            }
        );


        /*
           Mobile touch effect
        */

        button.addEventListener(
            "touchstart",
            function(){

                this.classList.add(
                    "pressed"
                );

            },
            {passive:true}
        );


        button.addEventListener(
            "touchend",
            function(){

                this.classList.remove(
                    "pressed"
                );

            },
            {passive:true}
        );


        /*
           Accessibility title
        */

        button.setAttribute(
            "title",
            "Current location से route खोलें"
        );

    }
);


/* ==========================================================
   10. EXTERNAL LINKS
========================================================== */

document.querySelectorAll(
    'a[target="_blank"]'
).forEach(
    function(link){

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    }
);


/* ==========================================================
   11. GOOGLE MAP LINKS
========================================================== */

document.querySelectorAll(
    'a[href*="google.com/maps"]'
).forEach(
    function(link){

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


/* ==========================================================
   12. PHOTO LINKS
========================================================== */

document.querySelectorAll(
    'a[href*="tbm=isch"]'
).forEach(
    function(link){

        link.setAttribute(
            "target",
            "_blank"
        );

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

        link.setAttribute(
            "aria-label",
            "Photos देखें"
        );

    }
);


/* ==========================================================
   13. ACTIVE ROUTE ON SCROLL
========================================================== */

if(
    "IntersectionObserver"
    in window
){

    const routeObserver =
        new IntersectionObserver(

            function(entries){

                let bestEntry =
                    null;


                entries.forEach(
                    function(entry){

                        if(
                            entry.isIntersecting
                        ){

                            if(
                                !bestEntry ||
                                entry.intersectionRatio
                                >
                                bestEntry.intersectionRatio
                            ){

                                bestEntry =
                                    entry;

                            }

                        }

                    }
                );


                if(bestEntry){

                    const id =
                        "#" +
                        bestEntry.target.id;


                    setActiveMenu(
                        id
                    );

                }

            },

            {

                root:null,

                rootMargin:
                    "-105px 0px -55% 0px",

                threshold:[
                    0.05,
                    0.15,
                    0.30,
                    0.50
                ]

            }

        );


    routeCards.forEach(
        function(card){

            routeObserver.observe(
                card
            );

        }
    );

}


/* ==========================================================
   14. HORIZONTAL MENU
========================================================== */

const horizontalMenu =
    document.querySelector(
        ".horizontal-menu"
    );


if(horizontalMenu){

    let dragging = false;

    let startX = 0;

    let startScroll = 0;


    horizontalMenu.addEventListener(
        "pointerdown",
        function(event){

            dragging = true;

            startX =
                event.clientX;

            startScroll =
                horizontalMenu.scrollLeft;

        }
    );


    horizontalMenu.addEventListener(
        "pointermove",
        function(event){

            if(!dragging){

                return;

            }


            const distance =
                event.clientX -
                startX;


            horizontalMenu.scrollLeft =
                startScroll -
                distance;

        }
    );


    horizontalMenu.addEventListener(
        "pointerup",
        function(){

            dragging = false;

        }
    );


    horizontalMenu.addEventListener(
        "pointercancel",
        function(){

            dragging = false;

        }
    );


    horizontalMenu.addEventListener(
        "pointerleave",
        function(){

            dragging = false;

        }
    );

}


/* ==========================================================
   15. CARD TOUCH EFFECT
========================================================== */

document.querySelectorAll(
    ".route-card, .service, .quick, .summary-card"
).forEach(
    function(card){

        card.addEventListener(
            "touchstart",
            function(){

                this.classList.add(
                    "touch-active"
                );

            },
            {passive:true}
        );


        card.addEventListener(
            "touchend",
            function(){

                this.classList.remove(
                    "touch-active"
                );

            },
            {passive:true}
        );


        card.addEventListener(
            "touchcancel",
            function(){

                this.classList.remove(
                    "touch-active"
                );

            },
            {passive:true}
        );

    }
);


/* ==========================================================
   16. ACTION BUTTON FEEDBACK
========================================================== */

document.querySelectorAll(
    ".action-btn, .mini-btn"
).forEach(
    function(button){

        button.addEventListener(
            "click",
            function(){

                this.classList.add(
                    "button-clicked"
                );


                setTimeout(
                    function(){

                        button.classList.remove(
                            "button-clicked"
                        );

                    },
                    350
                );

            }
        );

    }
);


/* ==========================================================
   17. PAGE LOAD HASH
========================================================== */

if(
    window.location.hash
){

    let hash =
        normalizeTarget(
            window.location.hash
        );


    const initialTarget =
        document.querySelector(
            hash
        );


    if(initialTarget){

        setTimeout(
            function(){

                initialTarget.scrollIntoView({

                    behavior:"smooth",

                    block:"start"

                });


                setActiveMenu(
                    hash
                );

            },
            300
        );

    }

}


/* ==========================================================
   18. DEFAULT ACTIVE TAB
========================================================== */

if(
    !window.location.hash
){

    setActiveMenu(
        "#route1"
    );

}


/* ==========================================================
   19. ESCAPE KEY
========================================================== */

document.addEventListener(
    "keydown",
    function(event){

        /*
           Escape removes temporary
           pressed states.
        */

        if(
            event.key === "Escape"
        ){

            document
                .querySelectorAll(
                    ".pressed"
                )
                .forEach(
                    function(element){

                        element.classList.remove(
                            "pressed"
                        );

                    }
                );

        }

    }
);


/* ==========================================================
   20. GPS AVAILABILITY
========================================================== */

if(
    !navigator.geolocation
){

    currentButtons.forEach(
        function(button){

            button.setAttribute(
                "title",
                "GPS उपलब्ध नहीं है"
            );

        }
    );

}


/* ==========================================================
   21. PREVENT MULTIPLE GPS REQUESTS
========================================================== */

let gpsBusy = false;


currentButtons.forEach(
    function(button){

        button.addEventListener(
            "click",
            function(){

                if(gpsBusy){

                    return;

                }


                gpsBusy = true;


                setTimeout(
                    function(){

                        gpsBusy = false;

                    },
                    11000
                );

            }
        );

    }
);


/* ==========================================================
   22. SCROLL POSITION
========================================================== */

window.addEventListener(
    "scroll",
    function(){

        /*
           Keep top button updated
        */

        updateTopButton();

    },
    {passive:true}
);


/* ==========================================================
   23. PAGE READY
========================================================== */

document.body.classList.add(
    "js-ready"
);


/* ==========================================================
   24. OPTIONAL VISUAL SUPPORT CSS
========================================================== */

const style =
    document.createElement(
        "style"
    );


style.textContent = `

    .location-loading{
        opacity:.72 !important;
        pointer-events:none;
    }

    .pressed{
        transform:scale(.95) !important;
    }

    .button-clicked{
        transform:scale(.97);
    }

    .touch-active{
        transform:translateY(-1px);
    }

    @media(
        prefers-reduced-motion:reduce
    ){

        .button-clicked,
        .touch-active,
        .pressed{
            transform:none !important;
        }

    }

`;


document.head.appendChild(
    style
);


/* ==========================================================
   END
========================================================== */

});

</script>