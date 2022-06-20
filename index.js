document.addEventListener('DOMContentLoaded', () => {
    let randomBtn = document.querySelector('#random');
    randomBtn.addEventListener('click', () => {
        findRandomActivity();
    });

    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let filter = e.target.selector.value;
        let filterActivity = filterActivity(filter);
        let activity = document.querySelector('filtered-activity')
        activity.innerHTML= `${activity.activity}`

    })

    let findActivityBtn = document.querySelector('.type-submit')
    
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
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.type === type) {
            console.log('yay')
            return data.activity;
        } else filterActivity(type)
    })
}