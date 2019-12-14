import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
// TO connect this component with Redux
import { Link } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// instead of const Register = props => { and then using props.setAlert, we can destructure it
const Register = ({ setAlert, register }) => {
    // formData is State (object with all the field values) and setFormData is the function
    // we want to use to update our state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    // instead of writing name : e.target.value, because it would have always changed name state

    const onSubmit = async e => {
        e.preventDefault();
        // preventDefault is called on the event when submitting the form to prevent a browser reload/refresh
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
            // Could also be written as props.setAlert, it pass the string as a message to our action
        } else {
            register({ name, email, password });
        }
    };

    return (
        <Fragment>
            <h1 className='large text-primary'>Sign Up</h1>
            <p className='lead'>
                <i className='fas fa-user'></i> Create Your Account
            </p>
            <form className='form' onSubmit={e => onSubmit(e)}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image,
                        use a Gravatar email
                    </small>
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-primary'
                    value='Register'
                />
            </form>
            <p className='my-1'>
                Already have an account? <Link to='/login'>Sign In</Link>
            </p>
        </Fragment>
    );
};

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired
};

export default connect(null, { setAlert, register })(Register);
// Whenever we bring an action (setAlert), we have to pass it in connect
// Connect taked two args, first, any state that we wanna map, second, an object with any action
// that we want to use (setAlert). This allows to use props.setAlert above.
