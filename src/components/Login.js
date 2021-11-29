import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const { showAlert } = props
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const history = useHistory()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        //API CALLS 
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });

        const json = await response.json()
        console.log(json)

        if (json.success) {
            // redirect to notes
            localStorage.setItem('auth-token', json.authToken)
            showAlert('Login Successful', 'success')
            setTimeout(() => {
                history.push('/')
            }, 1500);
        }
        else {
            showAlert('Login Unsuccessful', 'danger')
        }

        setCredentials({ email: "", password: "" })
    }


    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    return (
        <form onSubmit={handleOnSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input onChange={handleOnChange} type="email" className="form-control" value={credentials.email} id="email" name='email' aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input onChange={handleOnChange} type="password" value={credentials.password} className="form-control" id="password" name='password' />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}

export default Login
