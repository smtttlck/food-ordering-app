import React from 'react'
import Card from './Card'

const Menu = ({ foods, orders, setOrders,  amount, setAmount, filter }) => {

    const addOrder = foodId => {        
        const foodIndex = orders.findIndex(food => food.id == foodId)
        const food = foods.find(food => food.id == foodId)
        if(foodIndex == -1) { // food add
            food.count = 1
            setOrders([...orders, food])
        }
        else { // food count update
            food.count = food.count+1
            const updatedOrders = orders
            updatedOrders[foodIndex] = food
            setOrders(updatedOrders)
        }
        setAmount(amount+food.salary)
    }

    const filteredMenu = (filter=="") ? foods : foods.filter(food => food.category==filter)

    return (
        <div className="menu mt-3">
            {filteredMenu.map((food) => (
                <Card 
                    key={`${food.name}-${food.category}`}
                    food={food}
                    addOrder={addOrder}
                />
            ))}
        </div>
    )
}

export default Menu