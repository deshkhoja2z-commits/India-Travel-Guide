/* ==================================================
   DESH KHOJ A2Z
   KEDARNATH TRAVEL GUIDE
   SCRIPT.JS
================================================== */


/* ==================================================
   PAGE READY
================================================== */

document.addEventListener("DOMContentLoaded", function(){


    /* ----------------------------------------------
       CURRENT LOCATION BUTTONS
       DIRECT GOOGLE MAPS
    ---------------------------------------------- */

    const currentButtons =
        document.querySelectorAll(
            "[data-current-route]"
        );


    currentButtons.forEach(function(button){

        button.addEventListener(
            "click",
            function(event){

                event.preventDefault();

                const destination =
                    button.getAttribute(
                        "data-current-route"
                    );


                if(!destination){

                    alert(
                        "Destination उपलब्ध नहीं है।"
                    );

                    return;

                }


                openCurrentLocationRoute(
                    destination
                );

            }
        );

    });


    /* ----------------------------------------------
       STICKY MENU ACTIVE STATE
    ---------------------------------------------- */

    const menuLinks =
        document.querySelectorAll(
            ".menu-card[href^='#']"
        );


    menuLinks.forEach(function(link){

        link.addEventListener(
            "click",
            function(){

                menuLinks.forEach(function(item){

                    item.classList.remove(
                        "active"
                    );

                });


                link.classList.add(
                    "active"
                );

            }
        );

    });


    /* ----------------------------------------------
       BACK TO TOP
    ---------------------------------------------- */

    const backTop =
        document.querySelector(
            ".back-top a"
        );


    if(backTop){

        backTop.addEventListener(
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


    /* ----------------------------------------------
       EXTERNAL LINKS
    ---------------------------------------------- */

    const externalLinks =
        document.querySelectorAll(
            'a[target="_blank"]'
        );


    externalLinks.forEach(function(link){

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* ----------------------------------------------
       HIGHLIGHT ROUTE FROM URL HASH
    ---------------------------------------------- */

    activateRouteFromHash();


    /* ----------------------------------------------
       SCROLL SPY
    ---------------------------------------------- */

    setupScrollSpy();

});


/* ==================================================
   CURRENT LOCATION → GOOGLE MAPS
   DIRECT ROUTE
================================================== */

function openCurrentLocationRoute(
    destination
){

    if(!destination){

        return;

    }


    const destinationEncoded =
        encodeURIComponent(
            destination
        );


    /*
       IMPORTANT:

       origin intentionally नहीं दिया गया है।

       Google Maps अपने आप device की
       current location को starting point
       के रूप में इस्तेमाल करेगा।
    */

    const mapsURL =
        "https://www.google.com/maps/dir/?api=1" +
        "&destination=" +
        destinationEncoded +
        "&travelmode=driving";


    /*
       window.location.href का उपयोग किया गया है
       ताकि mobile browser popup blocker
       Google Maps को block न करे।
    */

    window.location.href =
        mapsURL;

}


/* ==================================================
   OPEN GOOGLE MAPS DESTINATION
================================================== */

function openGoogleMapsDestination(
    destination
){

    if(!destination){

        return;

    }


    const destinationEncoded =
        encodeURIComponent(
            destination
        );


    const mapsURL =
        "https://www.google.com/maps/search/?api=1" +
        "&query=" +
        destinationEncoded;


    window.location.href =
        mapsURL;

}


/* ==================================================
   ROUTE FROM URL HASH
================================================== */

function activateRouteFromHash(){

    const hash =
        window.location.hash;


    if(!hash){

        return;

    }


    const target =
        document.querySelector(
            `.menu-card[href="${hash}"]`
        );


    if(target){

        document
            .querySelectorAll(
                ".menu-card"
            )
            .forEach(function(item){

                item.classList.remove(
                    "active"
                );

            });


        target.classList.add(
            "active"
        );

    }

}


/* ==================================================
   SCROLL SPY
================================================== */

function setupScrollSpy(){

    const sections =
        document.querySelectorAll(
            ".route-card[id], .section-title[id]"
        );


    const menuLinks =
        document.querySelectorAll(
            ".menu-card[href^='#']"
        );


    if(
        !sections.length ||
        !menuLinks.length
    ){

        return;

    }


    const observer =
        new IntersectionObserver(

            function(entries){

                entries.forEach(
                    function(entry){

                        if(
                            !entry.isIntersecting
                        ){

                            return;

                        }


                        const id =
                            entry.target.id;


                        menuLinks.forEach(
                            function(link){

                                link.classList.remove(
                                    "active"
                                );


                                if(
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + id
                                ){

                                    link.classList.add(
                                        "active"
                                    );

                                }

                            }
                        );

                    }
                );

            },

            {

                root:null,

                rootMargin:
                    "-120px 0px -55% 0px",

                threshold:0

            }

        );


    sections.forEach(
        function(section){

            observer.observe(
                section
            );

        }
    );

}


/* ==================================================
   HANDLE HASH CHANGE
================================================== */

window.addEventListener(
    "hashchange",
    function(){

        activateRouteFromHash();

    }
);
