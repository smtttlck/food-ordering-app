import React from 'react'

const Card = ({ food, addOrder }) => {   

    return (
        <div className="food-card d-inline-block m-2 rounded-3">
            <div className="image-container border-bottom">
                <img 
                    src={food.imageUrl} 
                    alt={food.name} 
                />
            </div>
            <div className="text-container d-flex justify-content-around mt-1">
                <div className="food-name">{food.name}</div>
                <div className="food-salary">${food.salary}</div>
            </div>
            <div className="food-detail px-1 d-flex align-items-center">{food.detail}</div>
            <div
                className="selector d-flex justify-content-center align-items-center select-none"
                onClick={() => addOrder(food.id)}
            >
                +
            </div>
        </div>
    )
}

export default Card