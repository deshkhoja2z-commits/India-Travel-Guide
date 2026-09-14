/* ==================================================
   DESH KHOJ A2Z
   MANALI TRAVEL GUIDE
   SCRIPT.JS — PART 1/3
   SIMPLE + SHORT + MOBILE FRIENDLY
================================================== */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       ELEMENTS
    ================================================== */

    const menuCards =
        document.querySelectorAll(".menu-card");

    const horizontalMenu =
        document.querySelector(".horizontal-menu");

    const backTop =
        document.querySelectorAll(
            ".back-top, #topBtn, #backToTop"
        );


    /* ==================================================
       BACK TO TOP
    ================================================== */

    function goTop(e){
        if(e) e.preventDefault();

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
    }

    backTop.forEach(btn => {
        btn.addEventListener("click", goTop);
    });


    function updateTopButton(){

        const floating =
            document.getElementById("backToTop");

        if(!floating) return;

        floating.classList.toggle(
            "show",
            window.scrollY > 350
        );
    }

    window.addEventListener(
        "scroll",
        updateTopButton,
        {passive:true}
    );

    updateTopButton();


    /* ==================================================
       TARGET
    ================================================== */

    function getTarget(href){

        if(!href || href === "#"){
            return null;
        }

        try{
            return document.querySelector(href);
        }catch{
            return null;
        }
    }


    /* ==================================================
       ACTIVE MENU
    ================================================== */

    function activeMenu(href, move=false){

        menuCards.forEach(card => {

            const cardHref =
                card.getAttribute("href");

            card.classList.toggle(
                "active",
                cardHref === href
            );

            if(
                move &&
                cardHref === href &&
                horizontalMenu
            ){

                card.scrollIntoView({
                    behavior:"smooth",
                    block:"nearest",
                    inline:"center"
                });

            }

        });
    }


    /* ==================================================
       MENU CLICK
    ================================================== */

    menuCards.forEach(card => {

        card.addEventListener("click", e => {

            const href =
                card.getAttribute("href");

            const target =
                getTarget(href);

            if(!target) return;

            e.preventDefault();

            activeMenu(href, true);

            target.scrollIntoView({
                behavior:"smooth",
                block:"start"
            });

            try{
                history.replaceState(
                    null,
                    "",
                    href
                );
            }catch{}

        });

    });


    /* ==================================================
       ALL INTERNAL LINKS
    ================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener("click", e => {

                const href =
                    link.getAttribute("href");

                if(
                    !href ||
                    href === "#" ||
                    link.classList.contains("menu-card")
                ){
                    return;
                }

                if(href === "#top"){
                    goTop(e);
                    return;
                }

                const target =
                    getTarget(href);

                if(!target) return;

                e.preventDefault();

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

            });

        });


    /* ==================================================
       ACTIVE MENU ON SCROLL
    ================================================== */

    function updateMenu(){

        let current = null;

        menuCards.forEach(card => {

            const href =
                card.getAttribute("href");

            const section =
                getTarget(href);

            if(!section) return;

            if(
                section.getBoundingClientRect().top
                <= 190
            ){
                current = href;
            }

        });

        if(current){
            activeMenu(current, false);
        }

    }

    window.addEventListener(
        "scroll",
        updateMenu,
        {passive:true}
    );

    updateMenu();


    /* ==================================================
       LOAD HASH
    ================================================== */

    if(location.hash){

        const target =
            getTarget(location.hash);

        if(target){

            setTimeout(() => {

                target.scrollIntoView({
                    behavior:"smooth",
                    block:"start"
                });

                activeMenu(
                    location.hash,
                    true
                );

            },300);

        }

    }


    /* ==================================================
       END PART 1
    ================================================== */

});

/* ==================================================
   MANALI TRAVEL GUIDE
   SCRIPT.JS — PART 2/3
================================================== */


/* ==================================================
   CURRENT LOCATION → GOOGLE MAPS
================================================== */

function openMapRoute(button){

    const destination =
        button.getAttribute(
            "data-current-route"
        );

    if(!destination) return;


    const fallback =
        "https://www.google.com/maps/dir/?api=1" +
        "&destination=" +
        encodeURIComponent(destination);


    /* GPS उपलब्ध नहीं */

    if(!navigator.geolocation){

        window.open(
            fallback,
            "_blank",
            "noopener,noreferrer"
        );

        return;
    }


    const oldText =
        button.innerHTML;

    button.innerHTML =
        "📍 Location…";

    button.classList.add("loading");


    navigator.geolocation.getCurrentPosition(

        position => {

            const origin =
                position.coords.latitude +
                "," +
                position.coords.longitude;


            const url =
                "https://www.google.com/maps/dir/?api=1" +
                "&origin=" +
                encodeURIComponent(origin) +
                "&destination=" +
                encodeURIComponent(destination);


            button.classList.remove("loading");

            button.innerHTML =
                oldText;


            window.open(
                url,
                "_blank",
                "noopener,noreferrer"
            );

        },

        () => {

            button.classList.remove("loading");

            button.innerHTML =
                oldText;


            window.open(
                fallback,
                "_blank",
                "noopener,noreferrer"
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
   CURRENT LOCATION BUTTONS
================================================== */

document
    .querySelectorAll(
        "[data-current-route]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            e => {

                e.preventDefault();

                openMapRoute(button);

            }
        );

    });


/* ==================================================
   EXTERNAL LINKS
================================================== */

document
    .querySelectorAll(
        'a[target="_blank"]'
    )
    .forEach(link => {

        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


/* ==================================================
   MAP LINKS
================================================== */

document
    .querySelectorAll(
        'a[href*="google.com/maps"]'
    )
    .forEach(link => {

        link.target = "_blank";

        link.rel =
            "noopener noreferrer";

    });


/* ==================================================
   HIDE OLD MAP BUTTON
================================================== */

document
    .querySelectorAll(".mini-btn.map")
    .forEach(button => {

        button.style.display = "none";

    });


/* ==================================================
   HIDE OLD ROUTE ARROWS
================================================== */

document
    .querySelectorAll(".route-arrow")
    .forEach(arrow => {

        arrow.style.display = "none";

    });


/* ==================================================
   FULL CARD CLICK
================================================== */

function makeCardClickable(card){

    if(!card) return;


    const link =
        card.querySelector(
            'a[href]:not([href="#"])'
        );

    if(!link) return;


    card.style.cursor = "pointer";


    card.addEventListener(
        "click",
        e => {

            /*
               Existing button/link पर
               double action नहीं होगा।
            */

            if(
                e.target.closest(
                    "a,button"
                )
            ){
                return;
            }


            if(
                link.target === "_blank"
            ){

                window.open(
                    link.href,
                    "_blank",
                    "noopener,noreferrer"
                );

            }else{

                link.click();

            }

        }
    );


    /* Keyboard */

    card.setAttribute(
        "tabindex",
        "0"
    );


    card.addEventListener(
        "keydown",
        e => {

            if(e.key === "Enter"){

                e.preventDefault();

                link.click();

            }

        }
    );


    /* Mobile feedback */

    card.addEventListener(
        "touchstart",
        () => {

            card.classList.add(
                "card-pressed"
            );

        },
        {passive:true}
    );


    card.addEventListener(
        "touchend",
        () => {

            card.classList.remove(
                "card-pressed"
            );

        },
        {passive:true}
    );

}


/* ==================================================
   TRAVEL CARDS
================================================== */

document
    .querySelectorAll(
        ".service"
    )
    .forEach(makeCardClickable);


/* ==================================================
   HOTEL / FOOD CARDS
================================================== */

document
    .querySelectorAll(
        ".stay-card," +
        ".food-card," +
        ".hotel-card," +
        ".homestay-card," +
        ".heritage-card"
    )
    .forEach(makeCardClickable);


/* ==================================================
   PARTNER CARDS
================================================== */

document
    .querySelectorAll(
        ".partner-service-card"
    )
    .forEach(makeCardClickable);


/* ==================================================
   SIMPLE .CARD
================================================== */

document
    .querySelectorAll(".card")
    .forEach(card => {

        if(
            card.hasAttribute(
                "data-full-card"
            )
        ){
            return;
        }

        const links =
            card.querySelectorAll(
                "a[href]"
            );

        if(links.length === 1){

            card.setAttribute(
                "data-full-card",
                "yes"
            );

            makeCardClickable(card);

        }

    });


/* ==================================================
   END PART 2
================================================== */

/* ==================================================
   MANALI TRAVEL GUIDE
   SCRIPT.JS — PART 3/3
================================================== */


/* ==================================================
   SCROLL REVEAL
================================================== */

if(
    "IntersectionObserver" in window
){

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if(
                        entry.isIntersecting
                    ){

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold:.08
            }
        );


    document
        .querySelectorAll(
            ".route-card," +
            ".place-info," +
            ".service," +
            ".partner-service-card," +
            ".coming-soon"
        )
        .forEach(element => {

            observer.observe(element);

        });

}


/* ==================================================
   TOUCH FEEDBACK
================================================== */

document
    .querySelectorAll(
        "button," +
        ".service," +
        ".action-btn," +
        ".mini-btn"
    )
    .forEach(element => {

        element.addEventListener(
            "touchstart",
            () => {

                element.classList.add(
                    "pressed"
                );

            },
            {passive:true}
        );


        element.addEventListener(
            "touchend",
            () => {

                element.classList.remove(
                    "pressed"
                );

            },
            {passive:true}
        );


        element.addEventListener(
            "touchcancel",
            () => {

                element.classList.remove(
                    "pressed"
                );

            },
            {passive:true}
        );

    });


/* ==================================================
   PARTNER REGISTRATION
   MANALI
================================================== */

const registrationButton =
    document.getElementById(
        "registrationSubmit"
    );


if(registrationButton){

    const whatsappNumber =
        "918200195546";

    const email =
        "deshkhoja2z@gmail.com";


    const serviceType =
        document.getElementById(
            "serviceType"
        );


    /* ----------------------------------------------
       SERVICE SELECT
    ---------------------------------------------- */

    document
        .querySelectorAll(
            ".service-type-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    document
                        .querySelectorAll(
                            ".service-type-btn"
                        )
                        .forEach(item => {

                            item.classList.remove(
                                "active"
                            );

                        });


                    button.classList.add(
                        "active"
                    );


                    if(serviceType){

                        serviceType.value =
                            button.getAttribute(
                                "data-service"
                            );

                    }

                }
            );

        });


    /* ----------------------------------------------
       PHONE NUMBER
    ---------------------------------------------- */

    const phone =
        document.getElementById(
            "contactNumber"
        );


    if(phone){

        phone.addEventListener(
            "input",
            () => {

                phone.value =
                    phone.value
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


    /* ----------------------------------------------
       REGISTRATION
    ---------------------------------------------- */

    registrationButton.addEventListener(
        "click",
        () => {

            const service =
                serviceType
                    ? serviceType.value.trim()
                    : "";


            const business =
                document.getElementById(
                    "businessName"
                )?.value.trim() || "";


            const name =
                document.getElementById(
                    "contactName"
                )?.value.trim() || "";


            const number =
                document.getElementById(
                    "contactNumber"
                )?.value.trim() || "";


            const address =
                document.getElementById(
                    "address"
                )?.value.trim() || "";


            const details =
                document.getElementById(
                    "serviceDetails"
                )?.value.trim() || "";


            /* VALIDATION */

            if(!service){

                alert(
                    "कृपया Service चुनें।"
                );

                return;
            }


            if(!business){

                alert(
                    "कृपया Business / Service Name भरें।"
                );

                return;
            }


            if(!name){

                alert(
                    "कृपया Contact Person का नाम भरें।"
                );

                return;
            }


            if(!/^[0-9]{10}$/.test(number)){

                alert(
                    "कृपया सही 10 digit Mobile Number डालें।"
                );

                return;
            }


            if(!address){

                alert(
                    "कृपया Address भरें।"
                );

                return;
            }


            /* MESSAGE */

            const message =
`DESH KHOJ A2Z
MANALI BUSINESS PARTNER REGISTRATION

Destination:
Manali, Himachal Pradesh

Service:
${service}

Business / Service Name:
${business}

Contact Person:
${name}

Mobile Number:
${number}

Address:
${address}

Service Details:
${details || "Not Provided"}

--------------------------------
DESH KHOJ A2Z`;


            /* WHATSAPP */

            const whatsappURL =
                "https://wa.me/" +
                whatsappNumber +
                "?text=" +
                encodeURIComponent(
                    message
                );


            /* EMAIL */

            const emailURL =
                "mailto:" +
                email +
                "?subject=" +
                encodeURIComponent(
                    "DESH KHOJ A2Z - Manali Partner Registration"
                ) +
                "&body=" +
                encodeURIComponent(
                    message
                );


            /* SUCCESS BOX */

            const success =
                document.getElementById(
                    "registrationSuccess"
                );


            if(success){

                success.innerHTML = `

                    <div class="registration-success">

                        <strong>
                            ✅ Registration तैयार है
                        </strong>

                        <p>
                            नीचे से registration भेजें:
                        </p>

                        <a
                            href="${whatsappURL}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            🟢 WhatsApp पर भेजें
                        </a>

                        <a
                            href="${emailURL}"
                        >
                            📧 Email पर भेजें
                        </a>

                    </div>

                `;


                success.style.display =
                    "block";


                success.scrollIntoView({
                    behavior:"smooth",
                    block:"center"
                });

            }

        }
    );

}


/* ==================================================
   SIMPLE PARTNER SERVICE BUTTON
================================================== */

document
    .querySelectorAll(
        ".service-button[data-service]"
    )
    .forEach(button => {

        button.addEventListener(
            "click",
            e => {

                e.preventDefault();


                const service =
                    button.getAttribute(
                        "data-service"
                    );


                if(!service) return;


                document
                    .querySelectorAll(
                        ".service-button"
                    )
                    .forEach(item => {

                        item.classList.remove(
                            "active"
                        );

                    });


                button.classList.add(
                    "active"
                );


                const selected =
                    document.getElementById(
                        "selectedService"
                    );


                const selectedName =
                    document.getElementById(
                        "selectedServiceName"
                    );


                const contact =
                    document.getElementById(
                        "contactChoice"
                    );


                if(selected){

                    selected.style.display =
                        "block";

                }


                if(selectedName){

                    selectedName.textContent =
                        service;

                }


                if(contact){

                    contact.style.display =
                        "block";

                }


                const message =
`DESH KHOJ A2Z
Manali Business Partner Registration

Selected Service:
${service}

I want to join / offer my tourism
service through DESH KHOJ A2Z.

Please share the partner registration
process and required details.`;


                const whatsapp =
                    "https://wa.me/" +
                    "918200195546" +
                    "?text=" +
                    encodeURIComponent(
                        message
                    );


                const emailLink =
                    "mailto:deshkhoja2z@gmail.com" +
                    "?subject=" +
                    encodeURIComponent(
                        "Manali Partner Registration - " +
                        service
                    ) +
                    "&body=" +
                    encodeURIComponent(
                        message
                    );


                const whatsappButton =
                    document.getElementById(
                        "partnerWhatsApp"
                    );


                const emailButton =
                    document.getElementById(
                        "partnerEmail"
                    );


                if(whatsappButton){

                    whatsappButton.href =
                        whatsapp;

                    whatsappButton.target =
                        "_blank";

                    whatsappButton.rel =
                        "noopener noreferrer";

                }


                if(emailButton){

                    emailButton.href =
                        emailLink;

                }


                if(contact){

                    setTimeout(() => {

                        contact.scrollIntoView({
                            behavior:"smooth",
                            block:"center"
                        });

                    },100);

                }

            }
        );

    });


/* ==================================================
   FINAL READY
================================================== */

document.body.classList.add(
    "js-ready"
);


/* ==================================================
   END OF MANALI SCRIPT.JS
================================================== */