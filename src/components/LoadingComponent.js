import React from 'react'
import gif from '../assets/loading.gif';
export default function LoadingComponent() {
    return (
        <div className="loading-component">
            <img className="img-fluid" src={gif} alt="Loading....." />
        </div>
    )
}
