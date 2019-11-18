'use strict'
function routerFunc(){
    
    const app = document.querySelector('#app');
    const currentPath = window.location.pathname;
    
    
    const subPages = ['root','contact','others','furniture','homes','stairs','404']

    if(currentPath === '/'){
        runPage('root')
    }else{
        const route = subPages.find(item => item === currentPath.toLowerCase().substr(1));
        if(route){
            if(route === 'contact'){ 
                app.innerHTML = Contact.content()
                Contact.functionsContainer()
             }
            else if (route === '404'){
                alert('Podana strona nie istnieje. Przechodzisz na stronę główną.')
                window.location.pathname = '/'
            }else{ runPage(route) }
        } else {
            window.location.pathname = '/404'
        }
    }

    const navlink = document.querySelectorAll('.navlink');

    navlink.forEach(item => item.addEventListener('click', ()=>{
        if(item.getAttribute('route')==='/contact'){
            if(currentPath !== '/contact'){
                    scrollToSmoothly("#app", document.querySelector("#app").scrollHeight)
            }
        }else if(item.getAttribute('route')===currentPath){
                    scrollToSmoothly("#app", 0)
        }else{
            document.querySelector('#app').classList.toggle('appOut')
            setTimeout(()=>{window.location.pathname = item.getAttribute('route')},200)
        }
    }))
}