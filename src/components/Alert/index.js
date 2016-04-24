import React from 'react';

const Alert = (props) => {
    function _remove() {
        if (props.remove) {
            return props.remove();
        }
        console.warn('Alert remove function not provided');
    }

    return (
        <div className={props.color + " alert"}>
            <button className="remove fa fa-remove" onClick={_remove}></button>
            <div className="msg">{props.msg}</div>
            <div className="code">HTTP Status Code: {props.code}</div>
        </div>
    );
};

export deafult Alert;
