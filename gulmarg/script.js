/* ==================================================
   DESH KHOJ A2Z
   GULMARG TRAVEL GUIDE
   SCRIPT.JS
================================================== */


/* ==================================================
   GOOGLE SEARCH FUNCTION
================================================== */

function openGoogle(query){

    if(!query){
        return;
    }

    const url =
        "https://www.google.com/search?q=" +
        encodeURIComponent(query);

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ==================================================
   GOOGLE IMAGE SEARCH FUNCTION
================================================== */

function openGoogleImages(query){

    if(!query){
        return;
    }

    const url =
        "https://www.google.com/search?tbm=isch&q=" +
        encodeURIComponent(query);

    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );
}


/* ==================================================
   DOM READY
================================================== */

document.addEventListener(
"DOMContentLoaded",
function(){


/* ==================================================
   PAGE SEARCH
================================================== */

const searchInput =
document.getElementById("searchInput");


/*
   Gulmarg Main Page:
   .route-card

   Other Gulmarg Pages:
   .place-card

   Details Pages:
   .details-card
*/

const cards =
document.querySelectorAll(
".place-card, .route-card, .details-card"
);


const noResult =
document.getElementById("noResult");


if(searchInput){

searchInput.addEventListener(
"input",
function(){

const value =
this.value
.toLowerCase()
.trim();

let found=0;


cards.forEach(
function(card){

const text =
(
card.innerText+
" "+
(
card.getAttribute(
"data-search"
) || ""
)
)
.toLowerCase();


if(
value==="" ||
text.includes(value)
){

card.style.display="";

if(value!==""){
found++;
}

}else{

card.style.display="none";

}

});


if(noResult){

noResult.style.display =
(
value!=="" &&
found===0
)
?
"block"
:
"none";

}

});

}


/* ==================================================
   BACK TO TOP
================================================== */

const topBtn =
document.getElementById("topBtn");


if(topBtn){

window.addEventListener(
"scroll",
function(){

if(window.scrollY>300){

topBtn.style.display="block";

}else{

topBtn.style.display="none";

}

});


topBtn.addEventListener(
"click",
function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

});

}


/* ==================================================
   SMOOTH INTERNAL SCROLL
================================================== */

document.querySelectorAll(
'a[href^="#"]'
).forEach(
function(link){

link.addEventListener(
"click",
function(event){

const targetId =
this.getAttribute("href");


if(
!targetId ||
targetId==="#"
){

return;

}


const target =
document.querySelector(
targetId
);


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
   CURRENT YEAR
================================================== */

const yearElement =
document.getElementById(
"currentYear"
);


if(yearElement){

yearElement.textContent =
new Date().getFullYear();

}


/* ==================================================
   EXTERNAL LINKS
================================================== */

document.querySelectorAll(
'a[target="_blank"]'
).forEach(
function(link){

link.setAttribute(
"rel",
"noopener noreferrer"
);

});


/* ==================================================
   ROUTE TAB ACTIVE EFFECT
================================================== */

const routeTabs =
document.querySelectorAll(
".route-tab"
);


routeTabs.forEach(
function(tab){

tab.addEventListener(
"click",
function(){

routeTabs.forEach(
function(item){

item.classList.remove(
"active"
);

});


this.classList.add(
"active"
);

});

});


/* ==================================================
   QUICK GOOGLE BUTTONS SAFETY
================================================== */

document.querySelectorAll(
'[href^="javascript:openGoogle"]'
).forEach(
function(button){

button.addEventListener(
"click",
function(event){

event.stopPropagation();

});

});


/* ==================================================
   GOOGLE IMAGE BUTTONS SAFETY
================================================== */

document.querySelectorAll(
'[href^="javascript:openGoogleImages"]'
).forEach(
function(button){

button.addEventListener(
"click",
function(event){

event.stopPropagation();

});

});


/* ==================================================
   GULMARG SEARCH KEYWORDS
================================================== */

/*
   Search examples:

   gulmarg
   gondola
   apharwat
   kungdoor
   khilanmarg
   alpather
   baba reshi
   st mary
   skiing
   snow
   golf
   drung
   tangmarg
   hotel
   restaurant
   transport

   These keywords are mainly controlled
   through each HTML card's data-search.
*/


/* ==================================================
   IMAGE ERROR SAFETY
================================================== */

document.querySelectorAll(
"img"
).forEach(
function(image){

image.addEventListener(
"error",
function(){

this.style.display="none";

});

});


/* ==================================================
   PREVENT EMPTY LINK JUMP
================================================== */

document.querySelectorAll(
'a[href="#"]'
).forEach(
function(link){

link.addEventListener(
"click",
function(event){

event.preventDefault();

});

});


/* ==================================================
   FINAL
================================================== */

});