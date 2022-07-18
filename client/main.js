const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")

const encouragementsContainer = document.querySelector('#encouragements-container')
const form = document.querySelector('form')


const getCompliment = () => {
    axios.get("http://localhost:4000/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};


const getFortune = () => {
    axios.get("http://localhost:4000/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const baseURL = `http://localhost:4000/api/encouragements`

const encouragementCallback = ({ data: encouragements }) => displayEncouragements(encouragements)
const errCallback = err => console.log(err)

const getAllEncouragements = () => axios.get(baseURL).then(encouragementCallback).catch(errCallback)
const createEncouragement = body => axios.post(baseURL, body).then(encouragementCallback).catch(errCallback)
const deleteEncouragement = id => axios.delete(`${baseURL}/${id}`).then(encouragementCallback).catch(errCallback)
const updateEncouragement = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(encouragementCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let statement = document.querySelector('#statement')
    let level = document.querySelector('#level')
    let gifURL = document.querySelector('#gif')

    let bodyObj = {
        statement: statement.value,
        level: level.value, 
        gifURL: gifURL.value
    }

    createEncouragement(bodyObj)

    statement.value = ''
    level.value = ''
    gifURL.value = ''
}

function createEncouragementPost(encouragement) {
    const encouragementPost = document.createElement('div')
    encouragementPost.classList.add('encouragement-card')

    encouragementPost.innerHTML = `<img alt='encouraging gif' src=${encouragement.gifURL} class="encouragement-cover-image"/>
    <p class="address">${encouragement.statement}</p>
    <div class="btns-container">
        <button onclick="updateEncouragement(${encouragement.id}, 'minus')">-</button>
        <p class="encouragement-level">This gets ${encouragement.level} encouragement points</p>
        <button onclick="updateEncouragement(${encouragement.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteEncouragement(${encouragement.id})">delete</button>
    `


    encouragementsContainer.appendChild(encouragementPost)
}

function displayEncouragements(arr) {
    encouragementsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createEncouragementPost(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getAllEncouragements()


//EVENT LISTENERS
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)