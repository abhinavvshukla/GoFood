import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {

    const [credantials, setCredantials] = useState({
        name: '',
        email:'',
        password: '',
        geolocation: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credantials);
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: credantials.name,
                email: credantials.email,
                password: credantials.password,
                location: credantials.geolocation
            })
        });
        
        const json = await response.json();
        console.log(json.success);

        if (!json.success) {
            console.log(json);
            alert("Enter Valid Credantials");
        }
    }

    const onChange = (event) => {
        setCredantials({ ...credantials, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" name='name' value={credantials.name} onChange={onChange} className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" name='email' value={credantials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" name='password' value={credantials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" name='geolocation' value={credantials.geolocation} onChange={onChange} className="form-control" id="exampleInputPassword1" />
                    </div>

                    <button type="submit" className="m-3 btn btn-success">Submit</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
                </form>
            </div>
        </>
    )
}
