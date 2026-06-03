document.addEventListener("DOMContentLoaded",()=>{

const btn=document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="light"){
document.body.classList.add("light");

if(btn){
btn.innerHTML="🌙";
}
}else{
if(btn){
btn.innerHTML="☀️";
}
}

if(btn){

btn.addEventListener("click",()=>{

document.body.classList.toggle("light");

if(document.body.classList.contains("light")){
localStorage.setItem("theme","light");
btn.innerHTML="🌙";
}else{
localStorage.setItem("theme","dark");
btn.innerHTML="☀️";
}

});

}

});
