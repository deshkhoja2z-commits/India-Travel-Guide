/* ==================================================
   GANGTOK - DESH KHOJ A2Z
   SCRIPT.JS
================================================== */

document.addEventListener("DOMContentLoaded",function(){


/* ==================================================
   PAGE SEARCH
================================================== */

const searchInput =
document.getElementById("searchInput");

const cards =
document.querySelectorAll(".place-card");

const noResult =
document.getElementById("noResult");


if(searchInput){

searchInput.addEventListener(
"input",
function(){

const value =
this.value.toLowerCase().trim();

let found=0;


cards.forEach(function(card){

const text =
(
card.innerText+
" "+
(card.getAttribute("data-search") || "")
).toLowerCase();


if(
value==="" ||
text.includes(value)
){

card.style.display="block";

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
   SMOOTH SCROLL
================================================== */

document.querySelectorAll(
'a[href^="#"]'
).forEach(function(link){

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
document.querySelector(targetId);

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
).forEach(function(link){

link.setAttribute(
"rel",
"noopener noreferrer"
);

});

});


/* ==================================================
   DESH KHOJ A2Z
   GANGTOK TRAVEL GUIDE
   END SCRIPT.JS
================================================== */