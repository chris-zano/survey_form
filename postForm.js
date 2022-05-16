if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded',ready)
}
else {
    ready()
}

function ready() {
    document.getElementById('post-form').addEventListener('click',postForm)
}

function postForm() {
    if(localStorage.getItem('query') == null) {
        alert('cannot submit an empty form')
    }
    else {
        const preview = document.getElementById('loaded-data').innerHTML
        sessionStorage.setItem('preview', preview)
        location.href = './survey.html'
    }
}