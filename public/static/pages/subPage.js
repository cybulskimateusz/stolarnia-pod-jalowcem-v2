'use strict'

const URI = "https://stolarniapodjalowcem.firebaseio.com/"

class SubPage{
    constructor(divId, header, description){
        this.product = `
        <div class="app__inner__container">
        <div id="${divId}" class="app__inner up">
            <article class="app__article products__article">
                <section class="app__section products__section">
                    <h1 class="app__header products__header">${header}</h1>
                    <p class="app__description products__description">${description}</p>
                </section>
            </article>
        </div>
        </div>`
        this.root = `
        <div class="app__inner__container">
        <div id="${divId}" class="app__inner up">
            <article class="app__article root__article">
                <section class="app__section root__section">
                    <h1 class="app__header root__header">${header}</h1>
                    <p class="app__description root__description">${description}</p>
                </section>
            </article>
        </div>
        </div>`
        this.content = divId === 'root' ? this.root : this.product;
    }
}

const imageBox = (thediv, images) => {
    const imagebox = document.createElement('div')
    const blockcontainer = document.createElement('div')
    const imagebox__gap = document.createElement('div')
    imagebox.classList.add('imagebox')
    blockcontainer.classList.add('imagebox__container')
    imagebox__gap.classList.add('imagebox__gap')
    imagebox__gap.classList.add('app__inner__container')

    let key = 0
    images.forEach(i => {
        const photocontainer = document.createElement('div')
        const image = document.createElement('img')
        const imagebox__div = document.createElement('div')
        imagebox__div.classList.add('imagebox__div')
        imagebox__div.setAttribute('key',key)
        image.src = i
        photocontainer.classList.add("photocontainer")
        image.classList.add("image")
        image.classList.add("content__image")
        photocontainer.style.backgroundColor = 'transparent'
        const h = window.innerHeight - ((window.innerHeight/10)*4)
        const m = Math.floor(Math.random()*h+1)
        image.style.marginTop = `${m}px`
        imagebox__div.appendChild(image)
        photocontainer.appendChild(imagebox__div)
        imagebox.appendChild(photocontainer)
        key++
    })
        
    blockcontainer.appendChild(imagebox)
    thediv.appendChild(blockcontainer)
    imagebox__gap.style.height = `${imagebox.getBoundingClientRect().width+window.innerWidth}px`
    thediv.appendChild(imagebox__gap)

}

const runPage = async(id) => {
    try{
        document.querySelector('#loader').classList.toggle("loader--active")    
        const response = await fetch(URI+id+'.json')
        const {header, content, img} = await response.json()
        const thediv = new SubPage(id, header, content)
        document.querySelector('#app').innerHTML = thediv.content
        imageBox(document.querySelector('#app'), img)
        const contact = document.createElement('div')
        contact.classList.add('app__inner__container')
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
