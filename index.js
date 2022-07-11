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
        data.forEach(element => {
            createListWithDelete(element)
        })
    })
}

async function fetchRandomActivity() {
    const response = await fetch('http://www.boredapi.com/api/activity/');
    const data = await response.json();
    return data;
}

async function findRandomActivity() {
    let data = await fetchRandomActivity();
    let randomAct = document.querySelector('.random-activity')
    randomAct.innerHTML = `${data.activity}`
}

function filterActivity(type) {
    fetch(`http://www.boredapi.com/api/activity?type=${type}`)
    .then(res => res.json())
    .then(data => {
        let activity = document.querySelector('.filtered-activity')

        activity.innerHTML = `
        ${data.activity}
        <button class='add-filter-to-list'>Add to your list</button>
        `

        let activityObj= {
            activity: `${data.activity}`,
            type: `${data.type}`,
        }

        let addBtn = document.querySelector('.add-filter-to-list')
        addBtn.addEventListener('click', () => {
            addToList(activityObj)                  
        })

       
    })
}

async function listItems() {
    for(let i = 0; i < 10; i++){
        let data = await fetchRandomActivity();
        let li = document.createElement('li');
        li.innerHTML = `${data.activity}`; 
        document.querySelector('.list-activity').appendChild(li);             
    }   
}

function addToList(activityObj) {
    fetch('http://localhost:3000/activities', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(activityObj)
            })
            .then(res => res.json())
            .then(data => {
                createListWithDelete(data)
                })     
}

function createListWithDelete(obj) {
    let myList = document.querySelector('.my-list') 
    let li = document.createElement('li');
    li.innerHTML = `
    ${obj.activity}
    <button class="delete">Done</button>
    `;   
    myList.appendChild(li)
    document.querySelector('.delete').addEventListener('click', () => {
        console.log("click")
        deleteItem(obj.id);
        li.remove()
    })
}

function deleteItem(id) {
    fetch(`http://localhost:3000/activities/${id}`, {
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
}