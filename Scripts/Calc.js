let ans=JSON.parse(localStorage.getItem('val')) || '';
document.body.addEventListener('keydown', keyChange);
function keyChange(event){
    if(event.key==='Enter'){
        calc();
    }
}
function updateAns(num){
    ans+=num;
    localStorage.setItem('val',JSON.stringify(ans));
    updateCalc();
}
function calc(){
    try{
        if(isValid(ans)){
            let result=eval(ans);
            localStorage.setItem('val',JSON.stringify(result));
            ans=result;            
            updateCalc();
        }else{
            document.querySelector('.js-display').value=`Inavlid Expression`;
            reset();
        }
    }catch(error){
        alert('Error in calculation');
        reset();
    }
}
function reset(){
    ans='';
    localStorage.removeItem('val');
    resetCalc();
}
function updateCalc(){
    document.querySelector('.js-display').value=`${ans} `;
}
function resetCalc(){
    document.querySelector('.js-display').value=`${0}`;
}
function isValid(exp){
    const validReg=/^(\d+|\d+\.\d+)([+\-*/](\d+|\d+\.\d+))*$/;
    return validReg.test(exp);
}
updateCalc();