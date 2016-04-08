import React from 'react';

const AlertMessage = ({ color='', msg='' }) => (
    <div className={["alert", color].join(' ')}>
        {msg}
    </div>
);

export default AlertMessage;
