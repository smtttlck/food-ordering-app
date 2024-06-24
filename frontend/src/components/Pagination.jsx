import React, { useEffect, useState } from 'react'

const Pagination = ({ dataCount, pagination, setPagination }) => {

    const [buttons, setButtons] = useState([])

    useEffect(() => {
        const btnCount = Math.ceil(dataCount / 15)
        let newButtons = []
        for (var i = 2; i > 0; i--) {
            if ((pagination - i) > 0)
                newButtons.push(pagination - i)
        }
        newButtons.push(pagination)
        for (var i = 1; i <= (btnCount - newButtons.length + 1); i++) {
            if (pagination + i <= btnCount)
                newButtons.push(pagination + i)
        }
        setButtons([...newButtons])
    }, [dataCount, pagination])


    return (
        <nav>
            <ul className="pagination float-end">
                {buttons?.map((btnNumber, index) => (
                    <li 
                        key={`pagination-btn-${index}`} aria-current="page"
                        className={`page-item ${(btnNumber == pagination) && "active"}`} 
                        onClick={() => setPagination(btnNumber)}
                    >
                        <a className="page-link">{btnNumber}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination