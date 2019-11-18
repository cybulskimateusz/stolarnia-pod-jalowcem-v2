'use strict'

class Contact {

    static isMail(){return false}

    static contactSwitcher(){
        document.querySelectorAll(".contact__selection").forEach(i=>{
            i.addEventListener('change',e=>{
                const choice = e.target.value;
                const input = document.querySelector("#modal__input")
                switch(choice){
                    case 'phone_radio':
                        input.setAttribute('type', 'number')
                        input.setAttribute('placeholder', 'Numer telefonu')
                    break;
                    case 'email_radio':
                        input.setAttribute('type', 'email')
                        input.setAttribute('placeholder', 'Adres e-mail')
                    break;
                    case 'sms_radio':
                        input.setAttribute('type', 'number')
                        input.setAttribute('placeholder', 'Numer telefonu')
                    break;
                }
            })
        })
    }

    static formAccept(){
        document.querySelector('.contact__form').addEventListener('submit',e=>{

                e.preventDefault()

                if(this.isMail) {
                    var answer = window.confirm("Wysyłając wiadomość zgadzasz się na przetwarzanie danych podanych w formularzu. Jeśli tego nie akcetujesz, anuluj.")
                    if (answer) {
                        const from = document.querySelector('#modal__input').value
                        const who = document.querySelector('#name').value
                        const content = document.querySelector('#content').value
                        const xhr = new XMLHttpRequest()
                        const url = "https://app.99inbound.com/api/e/4ieHVnW2"
                        xhr.open("POST", url, true);
                        xhr.setRequestHeader("Content-Type", "application/json");
                        const data = JSON.stringify({"email": `${who} <${from}>`, "message": content});
                        xhr.send(data);
                        xhr.onreadystatechange = function(){
                            if (this.readyState === XMLHttpRequest.DONE){
                            this.status === 200 ? 
                            alert("Wiadomość została wysłana!") 
                            : alert("Pojawił się nieoczekiwany problem. Spróbuj ponownie później.")
                            }
                        }
                    }
                    else {
                        alert("Formularz nie został wysłany.")
                    }
                    
                }else{
                    alert("Podajesz błędny adres e-mail")
                }
                
        })
    }

    static vaildateInput(){
        document.querySelector('#modal__input').addEventListener('keyup', ()=>{
            if(event.target.type==="email"){
                const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                this.isMail = re.test(event.target.value) ? true:false
            }else if(event.target.type==="number"){
                const re = /[0-9]{9}/
                this.isMail = re.test(event.target.value) ? true:false
            }
            this.isMail ? event.target.classList.remove("input__false") : event.target.classList.add("input__false")
        })
    }

    static functionsContainer(){
        this.formAccept()
        this.contactSwitcher()
        this.vaildateInput()
    }
    static content(){
        return `
    <div id="contact" class="app__inner">
        <article class="app__article contact__article">
            <section class="app__section contact__section section__way">
            <h1 class="contact__header">Wybierz sposób <br>kontaktu</h1>
            <form class="contact__way">
                <input class="contact__selection" type="radio" id="sms_radio" name="contact__way" value="sms_radio"><label for="sms_radio">sms</label>
                <input class="contact__selection" type="radio" id="email_radio" name="contact__way" value="email_radio" checked><label for="email_radio">e-mail</label>
                <input class="contact__selection"type="radio" id="phone_radio" name="contact__way" value="phone_radio"><label for="phone_radio">rozmowa telefoniczna</label>
            </form>
            </section>
            <section class="app__section contact__section section__form">
            <button id="choose__way"></button>
            <form class="contact__form">
                <input type="email" id="modal__input" placeholder="Adres e-mail" required>
                <input type="text" id="name" placeholder="Imie" required>
                <textarea type="text" id="content" class="form__content" placeholder="Tresc wiadomosci" required></textarea>
                <input type="submit" value="Wyslij" id="submit" class="form__submit">
            </form>
            </section>
        </article>
        <footer><a href="https://cybulskimateusz.com">Designed and created by Mateusz<br>Cybulski. All rights reserved.</a></footer>
    </div>
    `}

    
}