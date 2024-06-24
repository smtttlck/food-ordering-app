import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Table from '../components/Table'
import * as api from '../api/Api'
import Modal from '../components/Modal'
import Sidebar from '../components/Sidebar'
import { jwtDecode } from "jwt-decode";

const Panel = () => {

    const [admin, setAdmin] = useState("")
    const [table, setTable] = useState("")
    const [datas, setDatas] = useState([])
    const [headers, setHeaders] = useState([])
    const [modalInfo, setModalInfo] = useState("")
    const [modalData, setModalData] = useState([])
    const [refreshDatas, setRefreshDatas] = useState(false)
    const [pagination, setPagination] = useState(1)

    const navigate = useNavigate()

    useEffect(() => {
        const adminToken = localStorage.getItem("adminToken")
        if (!adminToken)
            navigate("/panel/login")
        else
            setAdmin(jwtDecode(adminToken).admin)
    }, [])

    useEffect(() => {
        if (table) {
            api.fetchData(table)
                .then(data => {
                    setDatas(data)
                    setHeaders(Object.keys(data[0]))
                })
        }
    }, [table, refreshDatas])


    return (
        <div className="panel d-flex">

            <Modal
                tableName={table.slice(3)}
                modalInfo={modalInfo}
                modalData={modalData}
                refreshDatas={refreshDatas} setRefreshDatas={setRefreshDatas}
            />

            {admin &&
                <Sidebar
                    admin={admin}
                    setTable={setTable}
                    navigate={navigate}
                    setPagination={setPagination}
                />
            }

            {table &&
                <Table
                    tableName={table.slice(3)}
                    headers={headers}
                    datas={datas}
                    setModalData={setModalData}
                    setModalInfo={setModalInfo}
                    pagination={pagination} setPagination={setPagination}
                />
            }
        </div>
    )
}

export default Panel