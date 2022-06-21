document.addEventListener('DOMContentLoaded', () => {
    let randomBtn = document.querySelector('#random');
    randomBtn.addEventListener('click', () => {
        findRandomActivity();
    });

    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let filter = e.target.selector.value;
        let filtered = filterActivity(filter);
        console.log(filter)
        console.log(filtered)
        //console.log(filtered.activity)
        let activity = document.querySelector('.filtered-activity')
        activity.addEventListener('click', () => console.log('click'))
        //activity.innerHTML = filtered.activity

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
        return result;
        
    })
}