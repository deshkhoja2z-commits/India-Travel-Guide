/* ==================================================
   AYODHYA - DESH KHOJ A2Z
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================================
       BACK TO TOP BUTTON
    ============================================== */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }

        });

        topBtn.addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    /* ==============================================
       SMOOTH SCROLL
    ============================================== */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

        });

    });


    /* ==============================================
       GALLERY IMAGE CLICK
    ============================================== */

    document.querySelectorAll(".gallery img").forEach(function (image) {

        image.addEventListener("click", function () {

            const imageWindow = window.open("");

            if (imageWindow) {

                imageWindow.document.write(`
                    <html>
                    <head>
                        <title>Ayodhya - DESH KHOJ A2Z</title>

                        <style>

                            body {
                                margin:0;
                                background:#000;
                                display:flex;
                                justify-content:center;
                                align-items:center;
                                min-height:100vh;
                            }

                            img {
                                max-width:95%;
                                max-height:95vh;
                                object-fit:contain;
                            }

                        </style>

                    </head>

                    <body>

                        <img
                            src="${this.src}"
                            alt="${this.alt}"
                        >

                    </body>

                    </html>
                `);

            }

        });

    });


    /* ==============================================
       CURRENT YEAR
    ============================================== */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});