const inputs = document.querySelectorAll(".finput")
const alerts = document.querySelectorAll(".alert-danger")

function addfocus(){
    let parent = this.parentNode.parentNode
    parent.classList.add("focus")
}

function remfocus(){
    let parent = this.parentNode.parentNode
    if(this.value == ""){
        parent.classList.remove("focus")
    }
}

inputs.forEach(input=>{
    input.addEventListener("focus",addfocus)
    input.addEventListener("blur",remfocus)
})

alerts.forEach(alerta => {
    setTimeout(slideUp, 50, alerta);
    setTimeout(fadeOut, 1500, alerta);
})

function fadeOut(source) {
    source.style.opacity = "0";
    setTimeout(function(){source.style.display = "none"},500);
  }
  function slideUp(source) {
    source.style.transform = "translateY(0)";
  }