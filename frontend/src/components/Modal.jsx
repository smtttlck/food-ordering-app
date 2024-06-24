import React from 'react'
import * as api from '../api/Api'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ModalForm from './ModalForm';
import OrderList from './OrderList';

const Modal = ({ tableName, modalInfo, modalData, refreshDatas, setRefreshDatas }) => {

    const handleModal = (id) => {
        try {
            api.fetchData(`${modalInfo.toLowerCase()}${tableName}`, id)
                .then(data => setRefreshDatas(!refreshDatas))
            toast.success(`${modalInfo} Successful`, {
                position: 'bottom-right',
                autoClose: 2500,
            });    
        } catch (err) {
            alert(err)
        }
    }

    return (
        <>
            <ToastContainer />
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 " id="exampleModalLabel">
                                {modalInfo}
                            </h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {(modalInfo == "Order") ? (
                            <OrderList 
                                modalData={modalData} 
                                refreshDatas={refreshDatas} setRefreshDatas={setRefreshDatas}
                            />
                        ) : (
                            <div className="modal-body overflow-auto">
                                {modalInfo === "Delete" ? (
                                    JSON.stringify(modalData)
                                ) : (
                                    <ModalForm
                                        tableName={tableName}
                                        modalInfo={modalInfo}
                                        modalData={modalData}
                                        refreshDatas={refreshDatas} setRefreshDatas={setRefreshDatas}
                                        toast={toast}
                                    />
                                )}
                            </div>
                        )}

                        {modalInfo === "Delete" && (
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-danger" data-bs-dismiss="modal"
                                    onClick={() => handleModal(modalData.id)}
                                >
                                    {modalInfo}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal