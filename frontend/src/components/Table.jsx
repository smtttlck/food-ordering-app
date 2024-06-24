import React, { useEffect, useRef, useState } from 'react'
import { MdDelete, MdBuild, MdRemoveRedEye } from "react-icons/md"
import * as Icons from "react-icons/gi"
import * as api from '../api/Api'
import Pagination from './Pagination'

const Table = ({ tableName, headers, datas, setModalData, setModalInfo, pagination, setPagination }) => {

    const [filteredDatas, setFilteredDatas] = useState(datas)
    const [categories, setCategories] = useState([])

    const filterParam = useRef("")

    const handleFilter = () => {
        if (filterParam.current.value)
            setFilteredDatas(datas.filter(data => data.name.toLowerCase().includes(filterParam.current.value)))
        else
            setFilteredDatas(datas)
    }

    const tableCell = (header, data) => {
        if (header == "foods")
            return data?.length + " items"
        else if (header == "iconName") {
            const IconComponent = Icons[data]
            if (IconComponent) { // only for first time
                return <IconComponent />;
            } else {
                return null;
            }
        }
        else if (header == "category")
            return categories?.find(category => category.id == data)?.name
        else if (header == "totalAmount")
            return "$"+data
        else
            return data
    }

    useEffect(() => {
        setFilteredDatas(datas)
        api.fetchData("getCategory")
            .then(data => {
                setCategories(data)
            })
    }, [datas])

    return (
        <div className="table-container p-5">

            <h3>{tableName} ({`${datas?.length} items`})</h3>

            {(tableName != "Order") && (
                <div className="header d-flex justify-content-between align-items-end">
                    <input
                        id="search" type="text" placeholder="Search"
                        ref={filterParam}
                        onChange={handleFilter}
                    />
                    {tableName == "Admin" &&
                        <p className="admin-info py-1 px-3 mb-2 rounded">
                            Since your admin level is "root", you can perform transactions with other admins.
                        </p>
                    }
                    <button
                        className="btn btn-primary mini-btn" type="button"
                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                        onClick={() => {
                            setModalInfo("Create")
                            setModalData(datas[0])
                        }}
                    >
                        Add new value
                    </button>
                </div>
            )}

            <table className="table table-bordered table-sm">
                <thead>
                    <tr className="table-header">
                        <th className="table-counter">
                            #
                        </th>
                        {headers.map((header, index) => (
                            <th key={`table-header-${index}`}>
                                {header}
                            </th>
                        ))}
                        <th className="options">
                            Options
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDatas.map((data, index) => (
                        ((index+1 > (pagination-1)*15) && (index < (pagination)*15) ) && (
                            <tr key={`table-row-${index}`}>
                            <td>
                                {index+1}
                            </td>
                            {headers.map((header) => (
                                <td key={`${header}-${index}`}>
                                    {tableCell(header, data[header])}
                                </td>
                            ))}
                            <td className="options">
                                {(tableName != "Order") ? (
                                    <>
                                        <button
                                            className="btn btn-success mini-btn me-1" type="button"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setModalInfo("Update")
                                                setModalData(data)
                                            }}
                                        >
                                            <MdBuild /> <span className="mini-btn-text">Edit</span>
                                        </button>
                                        <button
                                            className="btn btn-danger mini-btn" type="button"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setModalInfo("Delete")
                                                setModalData(data)
                                            }}
                                        >
                                            <MdDelete /> <span className="mini-btn-text">Delete</span>
                                        </button>
                                    </>
                                ) : (
                                    (data.status == "Waiting") ? (
                                        <button
                                            className="btn btn-primary mini-btn me-1" type="button"
                                            data-bs-toggle="modal" data-bs-target="#exampleModal"
                                            onClick={() => {
                                                setModalInfo("Order")
                                                setModalData(data)
                                            }}
                                        >
                                            <MdRemoveRedEye /> <span className="mini-btn-text">Show</span>
                                        </button>
                                    ) : (
                                        <p className="admin-info mt-2">Delivered</p>
                                    )
                                )}
                            </td>
                        </tr>
                        )
                    ))}
                </tbody>
            </table>
            <Pagination 
                dataCount={datas?.length}
                pagination={pagination} setPagination={setPagination}
            />
        </div>
    )
}

export default Table