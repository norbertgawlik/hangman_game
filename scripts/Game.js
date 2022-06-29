import { Interface } from "./Interface.js";

export class Game{
    constructor(maxlifes,_passwordWrap,_categoryWrap,_keyboardWrap,_lifesWrap){
        this.lifes = maxlifes;
        this.passwordWrap = _passwordWrap;
        this.categoryWrap = _categoryWrap;
        this.keyboardWrap = _keyboardWrap;
        this.lifesWrap = _lifesWrap;
        
        this.passwords = {};
        this.password = {};
        this.hasUnknownLetter = true;
        this.interface = new Interface(this.lifes,this.lifesWrap);
    }

    init(){
        const hasAllWraps = this.validateWraps();
        if(!hasAllWraps) return;

        this.lifesWrap.querySelector('strong').innerHTML = this.lifes;
        this.fetchPasswords();
    }

    fetchPasswords(){
        fetch("/scripts/passwords.json")
        .then(parse => parse.json())
        .then(json => {
            this.passwords = json;
            this.drawPassword();
        })
        .catch(e => console.log(e));
    }

    drawPassword(){
        const randomIndex = Math.floor(Math.random() * this.passwords.passwords.length);
        this.password = this.passwords.passwords[randomIndex];
        this.showCategory();
        this.generateKeyboard();
        this.interface.showPassword(this.password.name,this.passwordWrap);
    }

    showCategory(){
        this.categoryWrap.querySelector('strong').innerHTML = this.password.category;
    }

    validateWraps(){
        let hasAllWraps = true;
        if(this.passwordWrap == null ||
           this.categoryWrap == null ||
           this.keyboardWrap == null ||
           this.lifesWrap == null
        ){
            hasAllWraps = false;
        }
        return hasAllWraps;
    }

    generateKeyboard(){
        for(let i=0;i<26;i++){
            const label = (i+10).toString(36);
            const button = document.createElement("button");
            button.innerHTML = label;
            button.setAttribute('data-letter',label.toUpperCase());
            this.keyboardWrap.append(button);
            this.interface.checkLetter(this.password.name,this.passwordWrap,button);
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const passwordWrap = document.querySelector('#password');
    const categoryWrap = document.querySelector("#category");
    const keyboardWrap = document.querySelector("#keyboard");
    const lifesWrap = document.querySelector('#lifes');
    const newGame = new Game(6,passwordWrap,categoryWrap,keyboardWrap,lifesWrap);
    newGame.init();
})
