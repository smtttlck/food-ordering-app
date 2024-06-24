import React, { useEffect, useState } from 'react'
import * as api from '../api/Api'

const OrderList = ({ modalData, refreshDatas, setRefreshDatas }) => {

    const [foods, setFoods] = useState([])

    useEffect(() => {
        api.fetchData("getFood")
            .then(data => setFoods(data))
    }, [])

    return (
        <div className="modal-body overflow-auto text-center">
            <p>Table: {modalData.tableName}</p>
            <div className="foods d-flex flex-wrap justify-content-center border-top border-bottom py-2">
                {modalData?.foods?.map((food, index) => (
                    <div className="food border rounded" key={`order-food-${index}`}>
                        <div className="mini-image">
                            <img src={foods?.find(data => data.id == food.foodId)?.imageUrl} />
                        </div>
                        <p>Count: {food.quantity}</p>
                        <p>Price: ${food.price}</p>
                    </div>
                ))}
            </div>
            <p>Total Amount: ${modalData.totalAmount}</p>
            <p>Order Date: {modalData.orderDate}</p>
            <button
                type="button"
                className="btn btn-primary my-3" data-bs-dismiss="modal"
                onClick={() => api.fetchData("deliverOrder", modalData.id)
                    .then(data => setRefreshDatas(!refreshDatas))}
            >
                Deliver the order
            </button>
        </div>
    )
}

export default OrderList