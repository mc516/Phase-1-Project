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
    
    // let darkModeBtn = document.querySelector('.dark-mode')
    // //THIRD EVENT LISTENER
    // darkModeBtn.addEventListener('click', () => {
    //     console.log('click')
    //     darkMode();
    // })

    let getList = document.querySelector('.generate-list')
    //FOURTH EVENT LISTENER
    getList.addEventListener('click', () => {
        document.querySelector('.list-activity').innerHTML = '';
        listItems();       
    }) 
})

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

//Need to combine listItems and findRandomActivity

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
                let myList = document.querySelector('.my-list')
                let li = document.createElement('li');
                li.innerHTML = `${data.activity}`;   
                myList.appendChild(li)
                })     
}



// function darkMode() {
//     let darkModeBtn = document.querySelector('.dark-mode')
//     console.log(darkModeBtn)
// }



