import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';

const SignUp = () => {

    const [error, setError] = useState('');
    const [show, setShow] = useState(false);
    const {createUser} = useContext(AuthContext)

    const handleSignUp = event =>{
        event.preventDefault();
        
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        console.log(email, password, confirm);

        setError('')
        if(password !== confirm){
            setError('Password and Confirm Password did not match')
            return;
        }

        else if(password.length < 6 ){
            setError('Password Should be longer than 6 character')
            return;
        }
        createUser(email, password)
        .then(result =>{
            console.log(result.user)
        })
        .catch(error=>{
            setError(error.message)
        })


        form.reset();
    }



    return (
        <div className='form-container'>
        <h3 className='form-title'>Sign Up</h3>

    <form onSubmit={handleSignUp}>
        <div className='form-control'>
            <label htmlFor="">Email</label>
            <input type="email" name="email" id="" required/>
        </div>
        <div className='form-control'>
            <label htmlFor="password">Password</label>
            <input type={show? "text": "password"} name="password" id="" required/>
        </div>

        <div className='form-control'>
            <label htmlFor="confirm">Confirm Password</label>
            <input type={show? "text": "password"} name="confirm" id="" required/>

            <h4 onClick={() => setShow(!show)}>{show? <span>Hide Password</span>: <span>Show password</span>}</h4>
        </div>

        <input className='btn-submit' type="submit" value="Sign up" />
    </form>

    <p className='form-link'><span>Already have an account?<Link to='/login'>Login</Link></span></p>
    <h3 className='error-text'>{error}</h3>




    </div>
    );
};

export default SignUp;