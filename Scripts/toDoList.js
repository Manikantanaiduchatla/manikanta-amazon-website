const defaultList=[{
    name:'',
    date:''
}];
let toDoList=JSON.parse(localStorage.getItem('result')) || defaultList;
display();
document.querySelectorAll('.js-enter').forEach((field)=>{
    field.addEventListener('keydown',(event)=>{
        if(event.key==='Enter'){
            clickAdd();
        }
    })
});

document.querySelector('.js-addButton')
.addEventListener('click',()=>{
    clickAdd();
});
function clickAdd(){
    const name=document.querySelector('.js-input').value.trim();
    const date=document.querySelector('.js-date').value.trim();
    if(name==='' || date===''){
        alert('Enter correct List values');
        return;
    }
    toDoList.push({
        name,date
    });
    localStorage.setItem('result',JSON.stringify(toDoList));
    document.querySelector('.js-input').value='';
    document.querySelector('.js-date').value='';
    display();
}
function display(){
    let todolist='';

    /*for(let i=0;i<toDoList.length;i++){
        const {name,date}=toDoList[i];
        const html=`<div>${name}</div>
        <div>${date}</div>  
        <button onclick="
            toDoList.splice(${i},1);
            localStorage.setItem('result',JSON.stringify(toDoList));
            display();
        " class="to-do-delButton">Delete</button>`;
        todolist+=html;
        
    }*/
   toDoList.forEach((toDoObject) => {
        const {name,date}=toDoObject;
        const html=`<div>${name}</div>
        <div>${date}</div>  
        <button class="to-do-delButton js-delButton">Delete</button>`;
        todolist+=html;
   });
    document.querySelector('.js-display').innerHTML=todolist;
    //querySelectorAll() is used for multiple buttons...
    document.querySelectorAll('.js-delButton').forEach((delButton,index)=>{
        delButton.addEventListener('click',()=>{
            toDoList.splice(index,1);
            localStorage.setItem('result',JSON.stringify(toDoList));
            display();
        });
    });
}

function reset(){
    toDoList=[];
    localStorage.removeItem('result');
    display();
}