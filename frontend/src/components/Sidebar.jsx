import React from 'react'
import { GiExitDoor } from "react-icons/gi";


const Sidebar = ({ admin, setTable, navigate, setPagination }) => {

    const logout = () => {
        localStorage.removeItem("adminToken")
        navigate("/panel/login")
    }

    const showTable = (tableCommand) => {
        setTable(tableCommand)
        setPagination(1)
    }

    return (
        <div className="sidebar">
            <div className="sidebar-header p-3">
                <h3>PANEL</h3>
                <div className="panel-header d-flex justify-content-between">
                    <p>{admin?.name}</p>
                    <span id="logout-btn" onClick={() => logout()}>
                        <GiExitDoor />
                    </span>
                </div>
            </div>
            <ul className="panel-list mt-3">
                <li onClick={() => showTable("getFood")}>
                    Food
                </li>
                <li onClick={() => showTable("getCategory")}>
                    Category
                </li>
                <li onClick={() => showTable("getOrder")}>
                    Order
                </li>
                {admin.level == "root" &&
                    <li onClick={() => showTable("getAdmin")}>
                        Admin
                    </li>
                }
            </ul>
        </div>
    )
}

export default Sidebar