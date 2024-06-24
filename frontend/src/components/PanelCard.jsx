import React, { useEffect } from 'react'
import { MdDelete } from "react-icons/md";
import { CgMathPlus, CgMathMinus } from "react-icons/cg";

const PanelCard = ({ order, updateCount, deleteOrder }) => {


    return (
        <div className="order d-flex justify-content-around align-items-center">
            <div className="order-image">
                <img src={order.imageUrl} />
            </div>
            <div className="order-name">
                {order.name}
            </div>
            <div className="order-info">
                <div className="order-salary">${order.salary}</div>
                <div className="order-counter d-flex justify-content-between">
                    <div className="delete" onClick={() => deleteOrder(order.id)}>
                        {<MdDelete />}
                    </div>
                    <span className="decrease mini-btn d-flex justify-content-center align-items-center rounded-pill"
                        onClick={() => updateCount(order.id, false)}
                    >
                        {<CgMathMinus />}
                    </span>
                    <div>{order.count}</div>
                    <span className="increase mini-btn d-flex justify-content-center align-items-center rounded-pill"
                        onClick={() => updateCount(order.id, true)}
                    >
                        {<CgMathPlus />}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default PanelCard