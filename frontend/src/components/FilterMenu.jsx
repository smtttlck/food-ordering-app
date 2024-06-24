import React from 'react'
import * as Icons from "react-icons/gi"

const FilterMenu = ({ categories, filter, setFilter }) => {

    return (
        <div className="filter-menu d-flex justify-content-center my-2 select-none">
            {categories?.map((category, index) => {
                const IconComponent = Icons[category.iconName]
                return (
                    <div
                        id={category.name} key={`category-${index}`}
                        onClick={() => setFilter((filter == category.id) ? "" : category.id)}
                        className={`filter-card  ${filter == category.id && "active"} 
                        m-2 d-flex flex-column justify-content-center align-items-center rounded-2`}
                    >
                        <div className="icon w-50 h-50 d-flex flex-column justify-content-center align-items-center rounded-pill mb-1">
                            {IconComponent && <IconComponent />}
                        </div>
                        <p>{category.name}</p>
                    </div>
                )
            }

            )}

        </div>
    )
}

export default FilterMenu