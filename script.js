let miniScreen=document.getElementById("miniScreen");
let screen=document.getElementById("screen");
let buttons = document.querySelectorAll('button');
let first=0,operator,sec,lastSec;
let solved=false;
for(let item of buttons){
    item.addEventListener('click',(e)=>{
        // make the screen stick to right side
        screen.scrollLeft = screen.scrollWidth;
        miniScreen.scrollLeft = miniScreen.scrollWidth;

        let buttonText=e.target.innerText;
        if(solved==true){
            screen.value="";
            solved=false;
        }
        if (buttonText === ".") {
            // Prevent multiple decimals in the same number
            if (!screen.value.includes(".")) {
                screen.value += ".";
                miniScreen.value += ".";
            }
        }
        else if(!isNaN(buttonText)&&operator==null){
            screen.value+=buttonText;
            miniScreen.value+=buttonText;
        }
        else if(!isNaN(buttonText)){
            screen.value+=buttonText;
        }
        else{
            if(operator==null){
                first=screen.value ? Number(screen.value) : null;
            }
            else {
                sec=screen.value ? Number(screen.value) : null;
            }
            
            if(buttonText=='C'){
                first=null;
                sec=null;
                operator=null;
                miniScreen.value="";
                screen.value="";
            }
            else if(buttonText=="CE"){
                screen.value="";
                sec=null;
            }
            else if(buttonText=='='){
                if (sec === null) {
                    // repeat last sec if user presses '=' again
                    sec = lastSec;
                } else {
                    lastSec = sec; // save current sec for reuse
                }
                screen.value=solve(first,operator,sec);
                solved=true;
                miniScreen.value=first+operator+sec+"=";
                first=Number(screen.value);
            }
            else if(buttonText=="Del"){
                screen.value = screen.value.slice(0, -1); 
            }
            // else if(buttonText=='%'){
            //     if(operator==null){
            //         screen.value=first;
            //         miniScreen.value=first;
                    
            //     }
            //     else if(operator=='*'){
            //         screen.value=screen.value=solve(first,operator,sec/100.0);
            //         miniScreen.value=first+buttonText;
            //         solved=true;
            //     }
            //     else{
            //         screen.value=screen.value=solve(first,operator,first*(sec/100.0));
            //         miniScreen.value=first+buttonText;
            //         solved=true;
            //     }
            //     first=Number(screen.value);
            // }
            else{
                screen.value=solve(first,operator,sec);
                solved=true;
                operator=buttonText;
                first=Number(screen.value);
                miniScreen.value=first+operator;
            }
        }
    });
}


//performs the operation
function solve(a,operator,b){
    if(b == null) return a;
    switch (operator){
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        case '%': return a % b;
    }
}