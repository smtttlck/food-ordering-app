const objParser = (array) => {
    return array.map(data => {
        const dataObj = data.toObject();
        let newObj = { // new field as id for _id
            id: dataObj._id,
            ...dataObj
        };

        if (newObj.createdAt) { // date format
            newObj.createdAt = new Date(newObj.createdAt).toLocaleString()
        }
        if (newObj.updatedAt) { // date format
            newObj.updatedAt = new Date(newObj.updatedAt).toLocaleString()
        }
        if (newObj.orderDate) { // date format
            newObj.orderDate = new Date(newObj.orderDate).toLocaleString()
        }

        if (newObj.imageUrl) { // files format and port address
            newObj.imageUrl = `http://localhost:${process.env.PORT}/${newObj.imageUrl.split("public\\")[1].split("\\").join('/')}`
        }

        if (newObj.password) { // don't give password
            newObj.password = "****"
        }

        delete newObj._id; // delete _id
        delete newObj.__v; // delete __v
        return newObj;
    });
};

module.exports = { objParser };
