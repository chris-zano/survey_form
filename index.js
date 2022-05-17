if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else {
    ready()
}

function ready() {
    loadFromStorage()
    
    const deletBtnArr = document.getElementsByClassName('delete-btn')
    const qdata = JSON.parse(localStorage.getItem('query'))
    for(var i =0; i <deletBtnArr.length; i++) {
        const deleteBtn = deletBtnArr[i];
        deleteBtn.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove()

        })
    }
    localStorage.setItem('query', JSON.stringify(qdata))

    const showHide = document.getElementById('button-selector')
    showHide.classList.add('true')
    showHide.addEventListener('click', () => {

        if(showHide.classList.contains('false')) {

            document.getElementById('button-holder').classList.remove('doFadeIn')
            document.getElementById('button-holder').classList.add('doFadeOut')
            document.getElementById('button-holder').classList.add('hide-btn')
            showHide.classList.remove('false')
            showHide.classList.add('true')

            showHide.textContent = '+'
        }
        else if(showHide.classList.contains('true')) {

            document.getElementById('button-holder').classList.remove('doFadeOut')
            document.getElementById('button-holder').classList.add('doFadeIn')
            document.getElementById('button-holder').classList.remove('hide-btn')
            showHide.classList.remove('true')
            showHide.classList.add('false')

            showHide.textContent = 'X'

        }


    })
}


function loadFromStorage() {
    const loadedData = JSON.parse(localStorage.getItem('query'))
    if(loadedData == null) {
    }
    else {
        for(var i = 0; i < loadedData.length; i++) {
            const item = loadedData[i]
            const question = item.question
            const type = item.response.type
            const responseList = [...item.response.responseList]
            const newQueryTab = document.createElement('div');  
            newQueryTab.innerHTML = `
                <div id="tab-${i+1}" class="tab-q">
                    <div id="queryTab-${i+1}" class="query-tab">
                        <p id="question${i+1}">${i+1}. ${question}</p>
                    </div>
                </div>
            `;
            document.querySelector('#loaded-data').append(newQueryTab)

            if(type == 'textarea') {
                const checkList = document.createElement('div')
                checkList.classList.add('input-fields')
                checkList.innerHTML= `
                <input type="${type}" placeholder="enter a response here" class="textarea-answer">
                `;
                const id = `#tab-${i+1}`
                document.querySelector(id).append(checkList);
            }
            else {
                for(var j=0; j<responseList.length; j++) {
                    const checkList = document.createElement('div')
                    const ipId = `${type}-${responseList[j]}`
                    checkList.innerHTML= `
                    <input type="${type}" name="${question}" id="${ipId}" class="input-answer">
                    <label for="${ipId}" class="label-answer">${responseList[j]}<label>
                    `;
                    const id = `#tab-${i+1}`
                    document.querySelector(id).append(checkList);
                }
            }
            const deleteBtn = document.createElement('div')
            deleteBtn.classList.add('delete-btn-div')
            deleteBtn.innerHTML = `
            <button type="button" class="delete-btn" >X</button>
            `;
            const id = `#tab-${i+1}`
            document.querySelector(id).append(deleteBtn);
        }
    }
    
}


const checkBox = document.querySelector('#checklist')
const radio = document.querySelector('#radio')
const textarea = document.querySelector('#textarea')

checkBox.addEventListener('click',() => {
    disableBtn(checkBox)
    disableBtn(radio)
    disableBtn(textarea)
    const setType = 'checkbox'
    createTile(setType);
    const addchbox = document.querySelector(`#add-${setType}-btn`);
    addchbox.addEventListener('click',() => {
        addCheckbox(setType)
    });
})
radio.addEventListener('click',() => {
    disableBtn(checkBox)
    disableBtn(radio)
    disableBtn(textarea)
    const setType = 'radio'
    createTile(setType);
    const addchbox = document.querySelector(`#add-${setType}-btn`);
    addchbox.addEventListener('click',() => {
        addCheckbox(setType)
    });
})

textarea.addEventListener('click',()=>{
    disableBtn(checkBox)
    disableBtn(radio)
    disableBtn(textarea)
    const setType = 'textarea'
    createTile(setType);
    const addchbox = document.querySelector('#add-textarea-btn');
    addchbox.addEventListener('click',() => {
        const newCheckbox = document.createElement('div')
        newCheckbox.classList.add('textarea-div')
        newCheckbox.classList.add('answers')
        newCheckbox.innerHTML = `
            <textarea class="textarea" type="text" placeholder="enter response here"></textarea>
        `;
        document.querySelector('#textarea-div').append(newCheckbox);
    });
})

function disableBtn(btn) {
    btn.classList.add('hide-btn')
}

function addFtr(type) {   
    const setType = type
    createTile(setType);
    const addchbox = document.querySelector(`#add-${setType}-btn`);
    addchbox.addEventListener('click',() => {
        addCheckbox(setType)
    });
}

function createTile(type) {
    if(type == 'textarea') {
        const newTile = document.createElement('div')
        newTile.classList.add('tile-div')
        newTile.innerHTML = `
            <textarea type="text" placeholder="enter question here" id="question-here" required></textarea>
            <div id="${type}-div" class="${type}-div ">
                <div class="textarea-div answers">
                    <textarea class="textarea" type="text" placeholder="enter response here"></textarea>
                </div>
            </div>
            <button id="add-textarea-btn">add new ${type}</button>
            <input type="submit" id="submitForm" value="Save">
        `;
    
        document.querySelector('#form').append(newTile);
        newTile.querySelector('#submitForm').addEventListener('click',submitTile)

    }
    else {
        const newTile = document.createElement('div')
        newTile.classList.add('tile-div')
        newTile.innerHTML = `
            <textarea type="text" placeholder="enter question here" id="question-here" required></textarea>
            <div id="${type}-div" class="checkbox-div ">
                <div class="${type}-div answers">
                    <input type="${type}" name="${type}" id="${type}" class="${type}">
                    <label for="${type}"><input id="${type}-label-input" type="text" placeholder="add text here" required></label>
                </div>
            </div>
            <button id="add-${type}-btn">add new ${type} input</button>
            <input type="submit" id="submitForm" value="Save">
        `;
    
        document.querySelector('#form').append(newTile);
        newTile.querySelector('#submitForm').addEventListener('click',submitTile)

    }
}

function addCheckbox(type) {
    const newCheckbox = document.createElement('div')
    newCheckbox.classList.add(`${type}-div`)
    newCheckbox.classList.add('answers')
    newCheckbox.innerHTML = `
        <input type="${type}" name="${type}" id="${type}" class="${type}">
        <label for="${type}"><input id="${type}-label-input" type="text" placeholder="add text here" required></label>
    `;
    document.querySelector(`#${type}-div`).append(newCheckbox);
}

// submit the tile to a form

function submitTile(e) {
    e.preventDefault()
    const tile = document.querySelector('.tile-div')

    const loadedData = JSON.parse(localStorage.getItem('query'))
    
   //save data
    const question = tile.querySelector('#question-here')
    const answers = tile.querySelectorAll('.answers')
    
    const objData = {
        question: question.value,
        response: {
            type: '',
            responseList: []
        }
    }
    let fromLocale;

    if(loadedData == null) {
        fromLocale = []
        formDataArray = [...fromLocale ]


    }
    else {
       fromLocale = localStorage.getItem('query')
       formDataArray = JSON.parse(fromLocale)
    }

    for(var i=0; i< answers.length; i++) {
        item = answers[i]
        if(item.classList.contains('checkbox-div')){
            objData.response.type = 'checkbox'
            const label = item.querySelector('#checkbox-label-input').value
            objData.response.responseList.push(label)
        }
        else if(item.classList.contains('radio-div')) {
            objData.response.type = 'radio'
            const label = item.querySelector('#radio-label-input').value
            objData.response.responseList.push(label)
        }
        else if(item.classList.contains('textarea-div')) {
            objData.response.type = 'textarea'
        }
    } 
    formDataArray.push(objData)

    localStorage.setItem('query',JSON.stringify(formDataArray))
    location.href = ''
}