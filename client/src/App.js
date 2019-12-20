import React, { Fragment, useEffect } from 'react';
// Fragment is just like a ghost element to wrap up, it wont show up in DOM
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// In order for router to work, we have to wrap the whole App fragment within <Router>
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
// For Redux
import { Provider } from 'react-redux';
// Provider connects React & Redux, we need to wrap react app in Provider
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);
    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar />
                    <Route exact path='/' component={Landing} />
                    <section className='container'>
                        <Alert />
                        {/* Switch can only have routes in it */}
                        <Switch>
                            <Route
                                exact
                                path='/register'
                                component={Register}
                            />
                            <Route exact path='/login' component={Login} />
                            <PrivateRoute
                                exact
                                path='/dashboard'
                                component={Dashboard}
                            />
                        </Switch>
                    </section>
                </Fragment>
            </Router>
        </Provider>
    );
};
export default App;
