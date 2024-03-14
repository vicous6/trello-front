import React from 'react';

function Card({name}) {
    return (
        <div className="card">
           <p>{name}</p>
        </div>
    );
}

export default Card;