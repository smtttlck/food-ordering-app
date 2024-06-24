import React, { useRef } from "react"
import { MdArrowBackIos } from "react-icons/md";
import PanelCard from "./PanelCard";
import * as api from "../api/Api"

const SidePanel = ({ orders, setOrders, amount, setAmount }) => {

    const tableRef = useRef()
    const orderMenuRef = useRef()
    const newOrderRef = useRef()

    const updateCount = (orderId, isIncrease) => {
        const updatedOrders = orders.map(order => {
            if (order.id !== orderId) {
                return order;
            }
            if (!isIncrease && order.count === 0) { // if count=0 return
                return order;
            }
            setAmount(isIncrease ? amount + order.salary : amount - order.salary)
            return {
                ...order,
                count: isIncrease ? order.count + 1 : order.count - 1,
            };
        });

        setOrders(updatedOrders);

    };

    const deleteOrder = foodId => {
        var array = orders.filter(order => order.id != foodId)
        setOrders(array)
        totalAmount(array)
    }

    const totalAmount = (array) => {
        let total = 0
        array.map(order => total += order.salary * order.count)
        setAmount(total)
    }

    const completeOrder = () => {
        let foods = []
        for (var i = 0; i < orders.length; i++) {
            let food = {}
            let { id, count, salary } = orders[i]
            food.foodId = id
            food.quantity = count
            food.price = count * salary
            foods.push(food)
        }
        const order = {
            tableName: tableRef.current.value,
            foods: foods,
            totalAmount: amount
        }
        api.fetchData("createOrder", null, order)
        
        orderMenuRef.current.style.opacity = '0';
        orderMenuRef.current.style.pointerEvents = 'none';
        newOrderRef.current.style.display = 'block';
        setOrders([])
        setAmount(0)
    }

    const newOrder = () => {
        newOrderRef.current.style.display = 'none';
        orderMenuRef.current.style.opacity = '1';
        orderMenuRef.current.style.pointerEvents = 'auto';
    }

    return (
        <div className="side-panel">
            <a className="collapse-link d-flex justify-content-around align-items-center me-4" data-bs-toggle="collapse"
                href="#collapseMenu" role="button" aria-expanded="false" aria-controls="collapseMenu"
            >
                <span className="collapse-icon mt-2"><MdArrowBackIos /></span>
                <p>Show your orders{orders.length > 0 && `(${orders.length})`}</p>
            </a>
            <div className="panel-container collapse me-4 select-none" id="collapseMenu">
                <div 
                    ref={newOrderRef}
                    className="new-order w-100 mt-5"
                >
                    <p className="new-order-text">Your order is preparing</p>
                    <button
                        className="complete-button mt-3 px-3 py-2"
                        type="button"
                        onClick={() => newOrder()}
                    >
                        New Order
                    </button>
                </div>
                <div 
                    ref={orderMenuRef}
                    className="order-menu"
                >
                <div className="tableSelector my-2 d-flex justify-content-center align-items-center">
                    <p className="me-2">Table:</p>
                    <select
                        ref={tableRef}
                        className="form-select w-50" aria-label="Default select example"
                    >
                        <option value="Table 1">Table 1</option>
                        <option value="Table 2">Table 2</option>
                        <option value="Table 3">Table 3</option>
                        <option value="Table 4">Table 4</option>
                        <option value="Table 5">Table 5</option>
                    </select>
                </div>
                <div className="orders border my-2">
                    {orders.map((order, index) => (
                        <PanelCard
                            key={`panel-card-${index}`}
                            order={order}
                            updateCount={updateCount}
                            deleteOrder={deleteOrder}
                        />
                    ))}
                </div>
                <div className="order-total d-flex justify-content-center">
                    <div className="text me-1">Total:</div>
                    <div className="amount">${amount}</div>
                </div>
                <button
                    className="complete-button mt-3 px-3 py-2"
                    type="button"
                    onClick={() => completeOrder()}
                >
                    Complete Order
                </button>
                </div>
            </div>
        </div >
    )
}

export default SidePanel