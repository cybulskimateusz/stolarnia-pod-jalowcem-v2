function scrollToSmoothly(selector, pos) {

    const requestAnimationFrame = window.requestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.msRequestAnimationFrame
    || function(f){return setTimeout(f, 1000/60)}

    const scrolledElement = document.querySelector(selector)
    let scrollPosition = scrolledElement.scrollTop
    const initScrollPosition = scrollPosition

    function scrollIt(){
      const direction = pos > initScrollPosition ? 'down' : 'up'

      if(direction === 'down'){
        scrollPosition+=100
        scrolledElement.scrollTop = scrollPosition
        if(pos >= scrollPosition)
        requestAnimationFrame(scrollIt)
      }else{
        scrollPosition-=100
        scrolledElement.scrollTop = scrollPosition
        if(pos <= scrollPosition)
        requestAnimationFrame(scrollIt)
      }

      
    }

    scrollIt()

  }