import { useState, useEffect } from 'react';
import { signupHandler, signinHandler } from '../utils/signin';
import {useContext} from 'react';
import {TodoContext} from '../App';

function Signup() {
    const {setTodos} = useContext(TodoContext);
    const [signUp, setSignUp] = useState(true)
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [signInEmail, setSignInEmail] = useState('')
    const [signInPassword, setSignInPassword] = useState('')
    const [password, setPassword] = useState('')
    const [localStorageIsSet, setLocalStorageIsSet] = useState(false)

    const signinLinkHandler = () => {
        setSignUp(false);
    }

    const signupLinkHandler = () => {
        setSignUp(true);
    }

    useEffect(() => {
        if (localStorageIsSet) {
            let token = localStorage.getItem('token');
            setSignUp(false);
            fetch(`http://localhost:8000/todos?token=${token}`, {
                method: 'GET'}).then(res => res.json())
                .then(data => {setTodos ([...data])})
                .catch(err => console.error(err));
        }}, [localStorageIsSet]);
    return (

        <div>
            {signUp ?
                <div>
                    <form onSubmit={
                        (e)=>signupHandler(e, username, email, password, setSignUp)}
                         className="auth-form" action="">
                            <label htmlFor="username">Username</label>
                        <input type="text" 
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username" />
                        <label htmlFor="email">Email</label>
                        <input
                        onChange={(e) => setEmail(e.target.value)}
                         type="email" placeholder="email" />
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" placeholder="password" />
                        <input type="submit" value="Signup" />
                    </form>
                    <p>Already have an account?
                        <span onClick={signinLinkHandler} id="signin-link"> Sign in</span></p>
                </div>
                :
                <div><form onSubmit={(e)=> signinHandler(e, signInEmail, signInPassword, setSignUp, setLocalStorageIsSet)} className="auth-form" action="">
                    <label htmlFor="email">Email</label>
                    <input
                    onChange={(e) => setSignInEmail(e.target.value)}
                    type="text" placeholder="email" />
                    <label htmlFor="password">Password</label>
                    <input
                    onChange={(e) => setSignInPassword(e.target.value)}
                    type="password" placeholder="password" />
                    <input type="submit" value="Signin" />
                </form>
                    <p>Don't have an account?
                        <span onClick={signupLinkHandler} id="signup-link"> Sign up</span></p></div>}
        </div>
    )
}

export default Signup