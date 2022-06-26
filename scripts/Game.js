export class Game{
    constructor(maxlifes,_passwordWrap,_categoryWrap,_keybordWrap,_lifesWrap){
        this.lifes = maxlifes;
        this.passwordWrap = _passwordWrap;
        this.categoryWrap = _categoryWrap;
        this.keybordWrap = _keybordWrap;
        this.lifesWrap = _lifesWrap;
        
        this.passwords = {};
        this.password = {};
    }

    init(){
        const hasAllWraps = this.validateWraps();
        if(!hasAllWraps) return;

        this.generateKeybord()
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
    }

    showCategory(){
        this.categoryWrap.querySelector('strong').innerHTML = this.password.category;
    }

    validateWraps(){
        let hasAllWraps = true;
        if(this.passwordWrap == null ||
           this.categoryWrap == null ||
           this.keybordWrap == null ||
           this.lifesWrap == null
        ){
            hasAllWraps = false;
        }
        return hasAllWraps;
    }

    generateKeybord(){
        for(let i=0;i<26;i++){
            const label = (i+10).toString(36);
            const button = document.createElement("button");
            button.innerHTML = label;
            this.keybordWrap.append(button);
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const passwordWrap = document.querySelector('#password');
    const categoryWrap = document.querySelector("#category");
    const keybordWrap = document.querySelector("#keybord");
    const lifesWrap = document.querySelector('#lifes');
    const newGame = new Game(6,passwordWrap,categoryWrap,keybordWrap,lifesWrap);
    newGame.init();
})
