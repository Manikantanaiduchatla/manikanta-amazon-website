const defaultAns={
    Wins:0,Loses:0,Ties:0
};
let ans=JSON.parse(localStorage.getItem('answer')) || defaultAns;
updateScore();
function compChoice(){
    let compMove='';
    const num=Math.random();
    if(num>=0 && num<1/3){
        compMove='Rock';
    }else if(num>=1/3 && num<2/3){
        compMove='Paper';
    }else if(num>=2/3 && num<1){
        compMove='Scissors';
    }
    return compMove;
}
let result='';
function playerChoice(playerMove){
    let compMove=compChoice();
    if(playerMove==='Rock'){
        if(compMove==='Rock'){
            result='Tie';
        }else if(compMove==='Paper'){
            result='You Lose';
        }else if(compMove==='Scissors'){
            result='You Win';
        }
    }else if(playerMove==='Paper'){
        if(compMove==='Rock'){
            result='You Win';
        }else if(compMove==='Paper'){
            result='Tie';
        }else if(compMove==='Scissors'){
            result='You Lose';
        }
    }
    else if(playerMove==='Scissors'){
        if(compMove==='Rock'){
            result='You Lose';
        }else if(compMove==='Paper'){
            result='You Win';
        }else if(compMove==='Scissors'){
            result='Tie';
        }
    }
    if(result==='You Win'){
        ans.Wins+=1;
    }else if(result==='Tie'){
        ans.Ties+=1;
    }else if(result==='You Lose'){
        ans.Loses+=1;
    }
    localStorage.setItem('answer',JSON.stringify(ans));
    updateAnswer();
    updateAnalysis(playerMove,compMove);
    updateScore();
}
document.querySelector('.js-rock')
.addEventListener('click',()=>{
    playerChoice('Rock');
});
document.querySelector('.js-paper')
.addEventListener('click',()=>{
    playerChoice('Paper');
});
document.querySelector('.js-scissors')
.addEventListener('click',()=>{
    playerChoice('Scissors');
});

document.body.addEventListener('keydown',(event)=>{
    if(event.key==='r'){
        playerChoice('Rock');
    }else if(event.key==='p'){
        playerChoice('Paper');
    }else if(event.key==='s'){
        playerChoice('Scissors');
    }else if(event.key==='a'){
        autoPlay();
    }else if(event.key==='Backspace'){
        resetScore();
    }
});
function updateScore(){
    document.querySelector('.js-score').innerHTML=
    `Wins : ${ans.Wins} , Loses : ${ans.Loses} , Ties : ${ans.Ties}`;
}
function updateAnswer(){
    document.querySelector('.js-ans').innerHTML=
    `${result}`;
} 
function updateAnalysis(playerMove,compMove){
    document.querySelector('.js-analysis').innerHTML=
    `You choose <img src="img/${playerMove}.jpg" alt="image" class="move"> 
    Computer choose
<img src="img/${compMove}.jpg" alt="Paper image" class="move">`;
}
let intervalId;
let isPlaying=false;
document.querySelector('.js-auto-play').addEventListener('click',()=>{
    autoPlay();
});
function autoPlay(){
    if(!isPlaying){
        intervalId=setInterval(()=>{
            const playerMove=compChoice();
            playerChoice(playerMove);
        },1000);
        isPlaying=true;
        document.querySelector('.js-auto-play').innerHTML='Stop Playing';
    }else{
        clearInterval(intervalId);
        isPlaying=false;
        document.querySelector('.js-auto-play').innerHTML='Auto Play';
    }
}

//Another method to stop autoPlay..
/*document.querySelector('.js-stop-play').addEventListener('click',()=>{
    clearInterval(intervalId);
});*/
function resetScore(){
    ans.Wins=0;
    ans.Loses=0;
    ans.Ties=0;
    localStorage.setItem('answer',JSON.stringify(ans));
    updateScore();
}
document.querySelector('.js-reset').addEventListener('click',()=>{
    resetConfirmation();
});
function resetConfirmation(){
    document.querySelector('.js-confirmation').innerHTML=
    `Are you sure you want to reset the score ? 
    <button class="js-yes-button yes-button">Yes</button>
    <button class="js-no-button no-button">No</button>`;

    document.querySelector('.js-yes-button').addEventListener('click',()=>{
        resetScore();
        displayConfirmMsg();
    });
    document.querySelector('.js-no-button').addEventListener('click',()=>{
        displayConfirmMsg();
    });
}
function displayConfirmMsg(){
    document.querySelector('.js-confirmation').innerHTML='';
}


