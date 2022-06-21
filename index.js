document.addEventListener('DOMContentLoaded', () => {
    let randomBtn = document.querySelector('#random');
    //FIRST EVENT LISTERNER
    randomBtn.addEventListener('click', () => {
        findRandomActivity();
    });

    let form = document.querySelector('form');
    //SECOND EVENT LISTERNER
    form.addEventListener('submit', e => {
        e.preventDefault();
        let type = e.target.selector.value;
        filterActivity(type);
    })  
    
    let darkModeBtn = document.querySelector('.dark-mode')
    //THIRD EVENT LISTERN
    darkModeBtn.addEventListener('click', () => {
        console.log('click')
        darkMode();
    })

})



function findRandomActivity() {
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        let randomAct = document.querySelector('.random-activity')
        randomAct.innerHTML = `${data.activity}`
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