export const signupHandler = (e, username, email, password, setSignUp) => {
        e.preventDefault();


        fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, email, password
            })
        })
            .then(response => response.json())
            .then(setSignUp(false))
            .catch(error => console.error('Error:', error));
    }

export const signinHandler = (e, email, password, setSignUp, setLocalStorageIsSet) => {
        e.preventDefault();


        fetch('http://localhost:8000/signin', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email, password
            })
        })
            .then(response => response.json())
            .then(data=>{
                setSignUp(false)
                localStorage.setItem('token', data.token)
                localStorage.setItem('email', data.email)
                localStorage.setItem('username', data.username)
                setLocalStorageIsSet(true);
    }
        )
            .catch(error => console.error('Error:', error));
    }
