
const addEvIfContactExist =()=> setInterval(() => {
  if (document.querySelectorAll('.contact__selection')&&document.querySelector("#choose__way")&& (window.innerWidth > window.innerHeight || window.innerWidth < 768)) {
    let y
    document.querySelectorAll('.contact__selection').forEach(i=>i.addEventListener('click',e=>{
      document.querySelector('.section__form').style.transform = 'translateY(-100vh)'
      y = document.querySelector(".section__way").getBoundingClientRect().y
      let value = e.target.value
      document.querySelector("#contact").scrollTop = document.querySelector("#contact").scrollHeight
      document.querySelector("#choose__way").innerHTML = document.querySelector(`label[for="${value}"]`).textContent
    }))
    document.querySelector("#choose__way").addEventListener('click',()=>{
      document.querySelector('.section__form').style.transform = 'translateY(0)'
    })
    document.querySelector("#contact").addEventListener('scroll', e=>{
      if(document.querySelector('#contact').getBoundingClientRect().y <= 0){
        if(document.querySelector('.section__form').getBoundingClientRect().y > 0){
        document.querySelector(".section__form").getBoundingClientRect().y > y ? 
        document.querySelector('.section__form').style.transform = 'translateY(0)'
        : null
      }
    }

    })
     clearInterval(addEvIfContactExist);
  }
}, 100); // check every 100ms


function interactions(){

  const path = window.location.pathname
 
  document.querySelector("#app").addEventListener("scroll",e=>{

    const imagebox = document.querySelector(".imagebox")
    const imagebox__gap = document.querySelector(".imagebox__gap")  
    const img = document.querySelectorAll(".imagebox__div")  

    if(!document.querySelector("#app").classList.contains('disabled')){

        if(path !== '/contact'){
          let x = imagebox__gap.getBoundingClientRect().y-window.innerHeight
          img.forEach(i => {
            if(i.getAttribute('key')%3===0) i.style.transform = `translateX(${x}px)`
          })
          imagebox.style.transform = `translateX(${x}px)`
        }
          
          if(document.querySelector('#contact').getBoundingClientRect().y <= 0){
            window.history.pushState(null,null,"/contact")
            document.querySelector('#contact').style.overflowY = 'auto'
          }else{
            window.history.pushState(null,null,path)
            document.querySelector("#choose__way").addEventListener('click',()=>{
            document.querySelector('#contact').style.overflowY = 'hidden'
            })
          }   
      
     
    }
  })
  addEvIfContactExist()
}