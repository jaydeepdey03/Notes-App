import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const SignUp = (props) => {
    const { showAlert } = props
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "" })
    const history = useHistory()

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const { name, email, password } = credentials
        //API CALLS 
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password })
        });

        const json = await response.json()
        console.log(json)

        if (json.success) {
            // redirect to notes
            localStorage.setItem('auth-token', json.authToken)
            showAlert("Account created successfully", "success")
            setTimeout(() => {
                history.push('/login')
            }, 1500);
        }
        else {
            showAlert("User exist", "danger")
            setCredentials({ name: "", email: "", password: "" })
        }
    }


    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container'>
            <form onSubmit={handleOnSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input onChange={handleOnChange} type="text" className="form-control" name='name' id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input onChange={handleOnChange} type="email" className="form-control" name='email' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input onChange={handleOnChange} type="password" name='password' className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default SignUp
