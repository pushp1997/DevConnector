import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// Anytime we want a component to interact with redux, either to call an action or getting the state
// we have to use connect

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map(alert => (
        <div key={alert.id} className={`alert alert-${alert.alertType}`}>
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    alerts: state.alert
    // now alerts is accessible as props in our component
});

export default connect(mapStateToProps)(Alert);
