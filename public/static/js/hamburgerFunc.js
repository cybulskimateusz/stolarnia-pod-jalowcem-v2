function hamburgerFunc(){

const hamburger = document.querySelector(".hamburger")
const main = document.querySelector(".main")
const navlink = document.querySelectorAll(".navlink")
let isMenuActive = false
const app = document.querySelector('#app')

const toggleMenu = () => {

    isMenuActive = !isMenuActive

    hamburger.classList.toggle('hamburger--active')
    main.classList.toggle('navigation--active')

    app.classList.toggle('disabled')
    isMenuActive ? document.querySelectorAll('#app *').forEach(i=>i.setAttribute('tabindex', '-1')) : document.querySelectorAll('#app *').forEach(i=>i.removeAttribute('tabindex'))
    menuActivator()
}

function menuActivator(){
    try{
    if(isMenuActive){
        navlink.forEach(e => e.removeAttribute("tabindex"))
        app.addEventListener('click', toggleMenu)
    }else{
        navlink.forEach(e => e.setAttribute("tabindex",-1))
        app.removeEventListener('click', toggleMenu)
    } }catch(err){console.log(err)}
}

try{
    hamburger.addEventListener('click', toggleMenu)
    navlink.forEach(i=>i.addEventListener('click',toggleMenu))
    menuActivator()
}catch(err){
    console.log(err)
}


}