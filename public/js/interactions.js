function interactions(){

  const path = window.location.pathname
  let x = 1
  let y = 1

  const doOnScroll = (event) =>{
    
    let delta
    
    if (event.wheelDelta){
      delta = event.wheelDelta;
    }else if(event.code === "ArrowDown"){
      delta = -1
    }else if(event.code === "ArrowUp"){
      delta = 1
    }else{
        delta = -1 * event.deltaY;
    }

    if(!document.querySelector("#app").classList.contains('disabled')){
      if(window.location.pathname !== '/contact'){
        const appsection = document.querySelector(".app__section")
        const imagebox = document.querySelector(".imagebox")
        const contact = document.querySelector("#contact")
        const img = document.querySelectorAll(".content__image")

        let currentPosition = appsection.scrollTop
        let maxScroll       = appsection.scrollHeight - appsection.offsetHeight

        appsection.style.overflow = currentPosition >= maxScroll ? 'hidden' : 'auto'
        if(imagebox.getBoundingClientRect().y >= imagebox.offsetTop) appsection.style.overflowY = 'auto'
        document.querySelector("#app").style.overflowY = 'hidden'

        if(currentPosition >= maxScroll){
        
          // swipe down
          if (delta < 0){
            if(imagebox.getBoundingClientRect().width>x){
              x+=20
              imagebox.style.transform = `translate3d(-${x}px,-100vh,0)`

              for(let i = 0; i <= img.length; i++){
                i%3==0? img[i].style.transform = `translate3d(-${x}px,0,0)`:null
              }

            }else if(contact.getBoundingClientRect().y>0){
              contact.style.transform = `translateY(-100vh)`
              window.history.pushState(null,null,"/contact")
            }
          }
          // swipe up
          else if (delta > 0){
            if(contact.getBoundingClientRect().y>0){
              if(contact.getBoundingClientRect().y>=contact.getBoundingClientRect().height){
                if(x>1){
                  x-=20
                  imagebox.style.transform = `translate3d(-${x}px,-100vh,0)`
                }
                for(let i = 0; i <= img.length; i++){
                  i%3==0? img[i].style.transform = `translate3d(-${x}px,0,0)`:null
                }
              }
            }else{
              contact.style.transform = `translateY(100vh)`
              window.history.pushState(null,null,path)
            }
          }
          }
      if(x<=1){
        appsection.style.overflow = 'auto'
      }}else{
        try{
        if(window.innerWidth<window.innerHeight){
          document.querySelectorAll('.contact__selection').forEach(i=>i.addEventListener('click',e=>{
            document.querySelector(".section__form").scrollIntoView({ 
              behavior: 'smooth' 
            })
            let value = e.target.value
            document.querySelector("#choose__way").innerHTML = document.querySelector(`label[for="${value}"]`).textContent
          }))
          document.querySelector("#choose__way").addEventListener('click',()=>{
            document.querySelector(".section__way").scrollIntoView({ 
              behavior: 'smooth' 
            })
          })
          if(document.querySelector(".section__form").getBoundingClientRect().y = 0){
            if(delta < 0){
            document.querySelector("footer").scrollIntoView({ 
              behavior: 'smooth' 
            })
          }else if(delta > 0){
            document.querySelector(".section__way").scrollIntoView({ 
              behavior: 'smooth' 
            })
            }
          }else if(document.querySelector(".section__form").getBoundingClientRect().y < 0){
            if(delta > 0){
              document.querySelector(".section__form").scrollIntoView({ 
                behavior: 'smooth' 
              })
              }
          }
      }
      }catch(err){console.log(err)}}
  }}


/////////////////////////////////// ADDING LISTENERS /////////////////////////////////////////////  
  
  document.addEventListener("touchmove",doOnScroll)
  document.addEventListener("wheel",doOnScroll)
  document.addEventListener('keydown', doOnScroll)

  let lastY
  document.addEventListener('touchmove', function (e){
    try{
      let currentY = e.touches[0].clientY;
      if(currentY > lastY){
        document.dispatchEvent(new WheelEvent('touchmove',{deltaY:currentY}))
      }else if(currentY < lastY){
        document.dispatchEvent(new WheelEvent('touchmove',{deltaY:-currentY}))
      }
      lastY = currentY;
    }catch(err){}
  })

}