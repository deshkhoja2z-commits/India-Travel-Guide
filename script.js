/* =========================
   SEARCH
========================= */

const searchInput =
document.getElementById("searchInput");

const cards =
document.querySelectorAll(".place-card");

const noResult =
document.getElementById("noResult");


searchInput.addEventListener(
"input",
function(){

const text =
this.value
.toLowerCase()
.trim();

let found = 0;


cards.forEach(
function(card){

const data =
card
.getAttribute("data-search")
.toLowerCase();


if(
text === "" ||
data.includes(text)
){

card.style.display =
"flex";

found++;

}else{

card.style.display =
"none";

}

}
);


if(found === 0){

noResult.style.display =
"block";

}else{

noResult.style.display =
"none";

}

}
);