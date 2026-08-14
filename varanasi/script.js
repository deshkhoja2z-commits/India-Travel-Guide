document.addEventListener("DOMContentLoaded", function(){

/* ==============================
   VARANASI PLACE SEARCH
============================== */

const searchInput = document.getElementById("searchInput");
const placeGrid = document.getElementById("placeGrid");
const noResult = document.getElementById("noResult");

if(searchInput && placeGrid){

const places = placeGrid.querySelectorAll(".place-card");

searchInput.addEventListener("input", function(){

const text = this.value
.toLowerCase()
.trim();

let found = 0;

places.forEach(function(place){

const data = (
place.dataset.search || ""
).toLowerCase();

if(data.includes(text)){

place.style.display = "block";
found++;

}else{

place.style.display = "none";

}

});

if(noResult){

noResult.style.display =
found === 0 ? "block" : "none";

}

});

}


/* ==============================
   EMPTY SEARCH
============================== */

if(searchInput){

searchInput.addEventListener("keyup",function(){

if(this.value.trim()===""){

if(noResult){
noResult.style.display="none";
}

}

});

}

});