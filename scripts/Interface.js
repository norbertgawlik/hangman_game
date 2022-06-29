export class Interface {
    constructor(lifes,lifesWrap){
        this.lifes = lifes;
        this.lifesWrap = lifesWrap;
        this.foundLetters = [];
    }
    showPassword(password,wrap){
        let _password = '';
        let containUndefinedLetters = false;
        [...password].forEach((e)=>{
            let letter = '';
            if(e == ' ' || this.foundLetters.indexOf(e.toUpperCase()) != -1){
                letter = e;
            }else{
                letter = "_";
                containUndefinedLetters = true;
            }
            _password += letter;
        })
        wrap.innerHTML = _password;
        if(!containUndefinedLetters) this.endGame(true);
    }

    checkLetter(password, passwordWrap, button){
        button.addEventListener('click', () => {
            const inactive = button.classList.contains('inactive');

            if(!inactive){
                button.classList.add('inactive');
                const letter = button.getAttribute('data-letter');
                const upperLetters = [...password].map( (e,i) => {
                    return e.toUpperCase();
                })
                
                const containLetter = upperLetters.indexOf(letter) != -1;
                if(containLetter){
                    this.foundLetters.push(letter);
                    this.showPassword(password,passwordWrap);
                }else{
                    this.lifes--;
                    if(this.lifes == 0){
                        this.endGame(false);
                    }else{
                        this.lifesWrap.querySelector('strong').innerHTML = this.lifes;
                    }
                }
            }
        })
    }
    endGame(status){
        const wrap = document.querySelector('#wrap');
        const info = status ? "Wygrałeś!" : "Przegrałeś!";
        const color = status ? "green" : "red";

        wrap.innerHTML = `<div class="status ${color}">${info}</div>`;
        const refresh = document.createElement('button');
        refresh.innerHTML = "Zagraj ponownie >"
        refresh.classList.add('refresh');
        wrap.appendChild(refresh);
        refresh.addEventListener('click',()=>window.location.reload());
    }
}