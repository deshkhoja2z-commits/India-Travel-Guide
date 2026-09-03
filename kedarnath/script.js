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
    ---------------------------------------------- */

    const currentButtons =
        document.querySelectorAll(
            "[data-current-route]"
        );


    currentButtons.forEach(function(button){

        button.addEventListener("click", function(event){

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

        });

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
       Keep normal Google Maps / Google Search
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
================================================== */

function openCurrentLocationRoute(
    destination
){

    if(
        !navigator.geolocation
    ){

        openGoogleMapsDestination(
            destination
        );

        return;
    }


    showLocationLoading();


    navigator.geolocation.getCurrentPosition(

        function(position){

            const latitude =
                position.coords.latitude;


            const longitude =
                position.coords.longitude;


            const destinationEncoded =
                encodeURIComponent(
                    destination
                );


            const mapsURL =
                "https://www.google.com/maps/dir/?api=1" +
                "&origin=" +
                latitude +
                "," +
                longitude +
                "&destination=" +
                destinationEncoded +
                "&travelmode=driving";


            window.open(
                mapsURL,
                "_blank",
                "noopener,noreferrer"
            );


            hideLocationLoading();

        },


        function(error){

            hideLocationLoading();


            /* --------------------------------------
               If location permission denied,
               open destination normally
            -------------------------------------- */

            if(
                error.code ===
                error.PERMISSION_DENIED
            ){

                const confirmOpen =
                    confirm(
                        "Current location की अनुमति नहीं मिली।\n\n" +
                        "क्या आप Google Maps में " +
                        destination +
                        " खोलना चाहते हैं?"
                    );


                if(confirmOpen){

                    openGoogleMapsDestination(
                        destination
                    );

                }

                return;
            }


            openGoogleMapsDestination(
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


/* ==================================================
   OPEN GOOGLE MAPS DESTINATION
================================================== */

function openGoogleMapsDestination(
    destination
){

    const destinationEncoded =
        encodeURIComponent(
            destination
        );


    const mapsURL =
        "https://www.google.com/maps/search/?api=1" +
        "&query=" +
        destinationEncoded;


    window.open(
        mapsURL,
        "_blank",
        "noopener,noreferrer"
    );

}


/* ==================================================
   LOCATION LOADING MESSAGE
================================================== */

function showLocationLoading(){

    let loading =
        document.getElementById(
            "location-loading"
        );


    if(loading){

        loading.style.display =
            "flex";

        return;

    }


    loading =
        document.createElement(
            "div"
        );


    loading.id =
        "location-loading";


    loading.innerHTML = `
        <div class="location-loading-box">
            <div class="location-spinner">
                📍
            </div>

            <strong>
                Current location प्राप्त की जा रही है...
            </strong>

            <span>
                कृपया GPS / Location permission allow करें।
            </span>
        </div>
    `;


    loading.style.cssText = `
        position:fixed;
        inset:0;
        z-index:99999;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:20px;
        background:rgba(0,0,0,0.35);
        backdrop-filter:blur(3px);
    `;


    document.body.appendChild(
        loading
    );

}


/* ==================================================
   HIDE LOCATION LOADING
================================================== */

function hideLocationLoading(){

    const loading =
        document.getElementById(
            "location-loading"
        );


    if(loading){

        loading.remove();

    }

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


/* ==================================================
   PREVENT DOUBLE CLICK ON CURRENT LOCATION
================================================== */

let locationRequestRunning =
    false;


function safeCurrentLocationRoute(
    destination
){

    if(locationRequestRunning){

        return;

    }


    locationRequestRunning =
        true;


    openCurrentLocationRoute(
        destination
    );


    setTimeout(
        function(){

            locationRequestRunning =
                false;

        },
        3000
    );

}


/* ==================================================
   SUPPORT ALL CURRENT LOCATION BUTTONS
================================================== */

document.addEventListener(
    "click",
    function(event){

        const button =
            event.target.closest(
                "[data-current-route]"
            );


        if(!button){

            return;

        }


        event.preventDefault();


        const destination =
            button.getAttribute(
                "data-current-route"
            );


        if(destination){

            safeCurrentLocationRoute(
                destination
            );

        }

    }
);