if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}
else {
    ready()
}

function ready() {
    loadFromStorage()
}


function loadFromStorage() {
    const loadedData = JSON.parse(localStorage.getItem('query'))
    if(loadedData == null) {
        console.log('empty');
    }
    else {
        for(var i = 0; i < loadedData.length; i++) {
            console.log(loadedData.length);
            const item = loadedData[i]
            console.log(item);
            const question = item.question
            const type = item.response.type
            const responseList = [...item.response.responseList]
            const newQueryTab = document.createElement('div');  
            newQueryTab.innerHTML = `
                <div id="queryTab">
                    <p id="question${i+1}">${i+1}. ${question}</p>
                </div>
            `;
            document.querySelector('#loaded-data').append(newQueryTab)

            if(type == 'textarea') {
                const checkList = document.createElement('div')
                checkList.innerHTML= `
                <input type="${type}" placeholder="enter a response here">
                `;
                document.querySelector('#loaded-data').append(checkList);
            }
            else {
                for(var j=0; j<responseList.length; j++) {
                    const checkList = document.createElement('div')
                    checkList.innerHTML= `
                    <input type="${type}">${responseList[j]}
                    `;
                    document.querySelector('#loaded-data').append(checkList);
                }
            }

            
            console.log(question);
            console.log(type);
            console.log(responseList);
    
            // if(loadedData[i].response.type == 'checkbox') {
            //     const newQueryTab = document.createElement('div');  
            //     newQueryTab.innerHTML = `
            //         <div id="queryTab">
            //             <p id="question${i+1}">${i+1}. ${loadedData[i].question}</p>
            //         </div>
            //     `;
            //     console.log(loadedData[i].response.responseList);
            //     for(var i=0; i < loadedData[i].response.responseList.length; i++) {
            //         const checkList = document.createElement('div')
            //         checkList.innerHTML= `
            //         <input type="checkbox">${loadedData[i].response.responseList[i]}
            //         `
            //         newQueryTab.append(checkList)
            //     }
            //     document.querySelector('#loaded-data').append(newQueryTab)
            // }
            // else {
            //     const newQueryTab = document.createElement('div');  
            //     newQueryTab.innerHTML = `
            //         <div id="queryTab">
            //             <p id="question${i+1}">${i+1}. ${loadedData[i].question}</p>
            //         </div>
            //     `;
            //     document.querySelector('#loaded-data').append(newQueryTab)
    
            // }
            
        }
    }

}


const checkBox = document.querySelector('#add-a-checkList')
const radio = document.querySelector('#add-a-radioList')
const textarea = document.querySelector('#add-a-textArea')

checkBox.addEventListener('click',addFtr)
radio.addEventListener('click',addFtr)
textarea.addEventListener('click',addFtr)

function disableBtn(btn) {
    btn.classList.add('hide-btn')
}

function addFtr(e) {
    if(e.target.textContent == 'Add a radioList'){
        const setType = 'radio'
        createTile(setType);
        const addchbox = document.querySelector(`#add-${setType}-btn`);
        addchbox.addEventListener('click',() => {
            addCheckbox(setType)
        });
        disableBtn(radio)
        disableBtn(checkBox)
        disableBtn(textarea)
    }
    else if(e.target.textContent == 'Add a checkList'){
        const setType = 'checkbox'
        createTile(setType);
        const addchbox = document.querySelector(`#add-${setType}-btn`);
        addchbox.addEventListener('click',() => {
            addCheckbox(setType)
        });
        disableBtn(checkBox)
        disableBtn(radio)
        disableBtn(textarea)

    }
    else if(e.target.textContent == 'Add a textArea'){
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
        disableBtn(checkBox)
        disableBtn(textarea)
        disableBtn(radio)
        
    }

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
            <button id="add-textarea-btn">add new checkbox</button>
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
            <button id="add-${type}-btn">add new checkbox</button>
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
    
    //show hide buttons
    // tile.classList.add('hide-btn')
    // checkBox.classList.remove('hide-btn')
    // radio.classList.remove('hide-btn')
    // textarea.classList.remove('hide-btn')
    
    //save data
    const question = tile.querySelector('#question-here')
    const answers = tile.querySelectorAll('.answers')
    console.log(question);
    
    const objData = {
        question: question.value,
        response: {
            type: '',
            responseList: []
        }
    }
    let fromLocale;

    if(loadedData == null) {
        console.log('empty');
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
            console.log('textarea', item);
        }
    } 
    formDataArray.push(objData)

    localStorage.setItem('query',JSON.stringify(formDataArray))
    console.log(formDataArray);    
}