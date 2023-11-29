import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
  let navigate = useNavigate();
  const [credantials, setCredantials] = useState({
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credantials);
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: credantials.email,
        password: credantials.password,
      })
    });

    const json = await response.json();
    console.log(json.success);

    if (!json.success) {
      console.log(json);
      alert("Enter Valid Credantials");
    }
    if(json.success){
      localStorage.setItem("userEmail", credantials.email);
      localStorage.setItem("authToken",json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredantials({ ...credantials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <div className='container'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" name='email' value={credantials.email} onChange={onChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" name='password' value={credantials.password} onChange={onChange} className="form-control" id="exampleInputPassword1" />
          </div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>Create User</Link>
        </form>
      </div>
    </div>
  )
}
