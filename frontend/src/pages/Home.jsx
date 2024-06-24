import React, { useEffect, useState } from 'react'
import FilterMenu from '../components/FilterMenu'
import Menu from '../components/Menu'
import SidePanel from '../components/SidePanel'
import * as api from '../api/Api'

const Home = () => {

    const [foods, setFoods] = useState([])
    const [categories, setCategories] = useState([])
    const [filter, setFilter] = useState("")
    const [orders, setOrders] = useState([])
    const [amount, setAmount] = useState(0)

    useEffect(() => {

        api.fetchData("getFood")
            .then(data => setFoods(data))

        api.fetchData("getCategory")
            .then(data => setCategories(data))
    }, [])

    return (
        <div className="home">
            <div className="container">
                <h2>React Food Ordering App</h2>
                <FilterMenu
                    categories={categories}
                    filter={filter} setFilter={setFilter}
                />
                <Menu
                    foods={foods}
                    orders={orders} setOrders={setOrders}
                    amount={amount} setAmount={setAmount}
                    filter={filter}
                />
                <SidePanel
                    orders={orders} setOrders={setOrders}
                    amount={amount} setAmount={setAmount}
                /> 
            </div>
        </div>
    )
}

export default Home