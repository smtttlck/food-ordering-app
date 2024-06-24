const urls = {
    "getFood": () => ({ urlString: "food", method: "GET" }),
    "deleteFood": (id) => ({ urlString: `food/${id}`, method: "DELETE" }),
    "updateFood": (id) => ({ urlString: `food/${id}`, method: "PUT" }),
    "createFood": () => ({ urlString: `food/`, method: "POST" }),
    "getCategory": () => ({ urlString: "category", method: "GET" }),
    "deleteCategory": (id) => ({ urlString: `category/${id}`, method: "DELETE" }),
    "updateCategory": (id) => ({ urlString: `category/${id}`, method: "PUT" }),
    "createCategory": () => ({ urlString: `category/`, method: "POST" }),
    "getAdmin": () => ({ urlString: "admin", method: "GET" }),
    "deleteAdmin": (id) => ({ urlString: `admin/${id}`, method: "DELETE" }),
    "updateAdmin": (id) => ({ urlString: `admin/${id}`, method: "PUT" }),
    "createAdmin": () => ({ urlString: `admin/`, method: "POST" }),
    "getOrder": () => ({ urlString: "order", method: "GET" }),
    "createOrder": () => ({ urlString: `order/`, method: "POST" }),
    "deliverOrder": (id) => ({ urlString: `order/${id}`, method: "POST" })
}

export const fetchData = async(command, id, body) => {
    const { urlString, method } = urls[command](id)
    const url = `http://localhost:3001/api/${urlString}`
    let options

    options = {
        method: method   
    }

    if (command == "createFood" || command == "updateFood") {
        const formData = new FormData();
        for (const key in body) {
            formData.append(key, body[key]);
        }
        options.body = formData;
    }
    else if(body) {
        options.body = JSON.stringify(body)
        options.headers = {'Content-Type': "application/json"}
    }

    const authorizationToken = localStorage.getItem("adminToken")
    if(authorizationToken)
        options.headers = {...options.headers, "Authorization": `Bearer ${authorizationToken}`}

    
    return await fetch(url, options)
        .then(response => response.json())
        .catch(err => console.error(err))
}

export const login = async(data) => {
    const url = `http://localhost:3001/api/admin/login`
    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    return await fetch(url, options)
        .then(response => response.json())
        .catch(err => console.error(err))
}