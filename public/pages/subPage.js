'use strict'

const URI = "https://stolarniapodjalowcem.firebaseio.com/"

class SubPage{
    constructor(divId, header, description, photos){
        this.product = `
        <div id="${divId}" class="app__inner up">
            <article class="app__article products__article">
                <section class="app__section products__section">
                    <h1 class="app__header">${header}</h1>
                    <p class="app__description products__description">${description}</p>
                </section>
            </article>
        </div>`
        this.root = `
        <div id="${divId}" class="app__inner up">
            <article class="app__article root__article">
                <section class="app__section root__section">
                    <h1 class="app__header">${header}</h1>
                    <p class="app__description">${description}</p>
                </section>
            </article>
        </div>`
        this.content = divId === 'root' ? this.root : this.product;
    }
}

const imageBox = (thediv) => {
    const imagebox = document.createElement('div')
    imagebox.classList.add('imagebox')
    for(let i=0;i<=10;i++){
        const photocontainer = document.createElement('div')
        const image = document.createElement('img')
        image.src = 'https://www.nriol.com/images/diwali-new.jpg'
        photocontainer.classList.add("photocontainer")
        image.classList.add("image")
        image.classList.add("content__image")
        photocontainer.style.backgroundColor = 'transparent'
        const h = window.innerHeight - ((window.innerHeight/10)*4)
        const m = Math.floor(Math.random()*h+1)
        image.style.marginTop = `${m}px`
        photocontainer.appendChild(image)
        imagebox.appendChild(photocontainer)
    }
    thediv.appendChild(imagebox)

}

const runPage = async(id) => {
    try{
        document.querySelector('#loader').classList.toggle("loader--active")    
        const response = await fetch(URI+id+'.json')
        const {header, content} = await response.json()
        const thediv = new SubPage(id, header, content,'7')
        document.querySelector('#app').innerHTML = thediv.content
        imageBox(document.querySelector('#app'))
        const contact = document.createElement('div')
        contact.style.overflow = 'visible'
        contact.innerHTML = Contact.content()
        document.querySelector('#app').appendChild(contact)
        Contact.functionsContainer()
        document.querySelector('#loader').classList.toggle("loader--active")    

    }catch(err){
        console.log(err)
        alert('Pojawił się nieoczekiwany błąd. Zostaniesz przekierowny na stronę główną. Spróbuj otworzyć stronę ponownie, sprawdzić połączenie z internetem, a jeśli to nie pomoże, skontaktuj się ze mną przez formulaż w zakładce kontakt. ')
        window.location.pathname = '/'
    }
}
