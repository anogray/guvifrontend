import React from 'react';
import './Toaster.css';

export function snackbar(id, text) {
    let x = document.getElementById(id);
    x.className = "show";
    x.innerHTML = text;
    setTimeout(() => { x.className = x.className.replace("show", ""); }, 3000);
}

export default function Toast(props) {
    return (
        <div>
            <div id="error"></div>
            <div id="success"></div>
            <div id="notification"></div>
            <div id="warning"></div>
        </div>
    )
}