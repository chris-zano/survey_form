/*
    When you log in to the platform, it should store your login details and generate a unique id for you. This unique id is what will be used to access your survey website or platform, and you will be able to share a link to that site or profile and have others take the survey
*/

await function login() {
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    
    const LogCred = {
        email: email,
        password: password
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(LogCred)
    }

    const res = await fetch('/api', options);
    const rjdata = await res.json()
}