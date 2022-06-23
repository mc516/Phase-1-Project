let arr =[];

document.addEventListener('DOMContentLoaded', () => {
    let randomBtn = document.querySelector('#random');
    //FIRST EVENT LISTENER
    randomBtn.addEventListener('click', () => {
        findRandomActivity();
    });

    let form = document.querySelector('form');
    //SECOND EVENT LISTENER
    form.addEventListener('submit', e => {
        e.preventDefault();
        let type = e.target.selector.value;
        filterActivity(type);
    })  
    
    let darkModeBtn = document.querySelector('.dark-mode')
    //THIRD EVENT LISTENER
    darkModeBtn.addEventListener('click', () => {
        console.log('click')
        darkMode();
    })

    let clearListBtn = document.querySelector('.clear-list')
    //FOURTH EVENT LISTENER WITH ARR METHOD
    clearListBtn.addEventListener('click', () => {
       let list = document.querySelector('.list-activity')
       list.innerHTML='';
    })

})



function findRandomActivity() {
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        let randomAct = document.querySelector('.random-activity')
        randomAct.innerHTML = `
        ${data.activity}
        <button class='add-to-list'>Add to List </button>
        `
        let addToListBtn = document.querySelector('.add-to-list')
        addToListBtn.addEventListener('click', () => {
            AddList(data);
        })
    })
}

function filterActivity(type) {
    let result;
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        if(data.type == type) {
            console.log(data)
            result = data.activity;
        } else {
            filterActivity(type)
        }
        console.log(result)
        let activity = document.querySelector('.filtered-activity')
        activity.innerHTML = `${result}`
    })
}

function darkMode() {
    let darkModeBtn = document.querySelector('.dark-mode')
    console.log(darkModeBtn)
}

function randomActList() {
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        AddList(data)
    })
}

function AddList(data) {
   
    arr.push(data.activity)
    let li = document.createElement('ul')
    li.innerHTML = `<h6>${data.activity}</h6>`
    document.querySelector('.list-activity').appendChild(li)

    console.log(arr)
    
}