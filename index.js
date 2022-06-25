document.addEventListener('DOMContentLoaded', () => {
    initialLoad();

    let randomBtn = document.querySelector('#random');
    randomBtn.addEventListener('click', () => {
        findRandomActivity();
    });

    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let type = e.target.selector.value;
        filterActivity(type);
    })  

    let getList = document.querySelector('.generate-list')
    getList.addEventListener('click', () => {
        document.querySelector('.list-activity').innerHTML = '';
        listItems();       
    }) 
})
function initialLoad() {
    fetch('http://localhost:3000/activities')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        data.forEach(element => {
            let myList = document.querySelector('.my-list') //ADDS ITEM TO MY LIST
            let li = document.createElement('li');
            li.innerHTML = `
            ${element.activity}
            <button onclick="deleteItem(${element.id})" class='delete'>Done</button>
            `;   
            myList.appendChild(li)
        })
    })
}

function deleteItem(id) {
    fetch(`http://localhost:3000/activities/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json());

    window.location.reload();
}

function listItems() {
    for(let i = 0; i < 10; i++){
        fetch('http://www.boredapi.com/api/activity/')
        .then(res => res.json())
        .then(data => {
            let li = document.createElement('li')
            li.innerHTML = `${data.activity}`
            document.querySelector('.list-activity').appendChild(li)
        })
    }   
}

//Need to combine listItems and findRandomActivity (crate fetch function?)

function findRandomActivity() {
    fetch('http://www.boredapi.com/api/activity/')
    .then(res => res.json())
    .then(data => {
        let randomAct = document.querySelector('.random-activity')
        randomAct.innerHTML = `${data.activity}`
    })
}

function filterActivity(type) {
    fetch(`http://www.boredapi.com/api/activity?type=${type}`)
    .then(res => res.json())
    .then(data => {
        let activity = document.querySelector('.filtered-activity')

        activity.innerHTML = `
        ${data.activity}
        <button class='add-to-list'>Add to your list</button?
        `

        let activityObj= {
            activity: `${data.activity}`,
            type: `${data.type}`,
        }

        let addBtn = document.querySelector('.add-to-list')
        addBtn.addEventListener('click', e => {
            getList(activityObj)                  
        })

       
    })
}

function getList(activityObj) {
    fetch('http://localhost:3000/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(activityObj)
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                let myList = document.querySelector('.my-list') //ADDS ITEM TO MY LIST
                let li = document.createElement('li');
                li.innerHTML = `${data.activity}`;   
                myList.appendChild(li)
                })     
}


