import React, { useEffect, useState } from 'react'
import * as api from '../api/Api'
import * as Yup from 'yup';
import * as Icons from "react-icons/gi"
import { Formik, Form, Field } from 'formik'

const ModalForm = ({ tableName, modalInfo, modalData, refreshDatas, setRefreshDatas, toast }) => {

    const [categories, setCategories] = useState([])
    const [selected, setSelected] = useState("")
    const [file, setFile] = useState(null)

    useEffect(() => {
        api.fetchData("getCategory")
            .then(data => {
                setCategories(data)
            })
    }, [])

    const validationSchema = Yup.object().shape(
        Object.keys(modalData).reduce((acc, key) => {
            if (key === 'id' || key === 'createdAt' || key === 'updatedAt' || key === 'imageUrl' || key === 'image') {
                acc[key] = Yup.mixed().nullable();
            } else if (key === 'salary') {
                acc[key] = Yup.number().required(`${key} must be a number`);
            } else {
                acc[key] = Yup.string().required(`${key} is required`);
            }
            return acc;
        }, {})
    );

    const getInitialValues = (modalInfo, modalData) => {
        if (modalInfo === "Create") {
            const initialValues = {}
            Object.keys(modalData).forEach(key => {
                if (key == "level")
                    initialValues[key] = 'admin'
                else if (key == "category")
                    initialValues[key] = categories?.[0]?.id
                else if (key == "imageUrl") {
                    initialValues[key] = ''
                    initialValues['image'] = null
                }
                else
                    initialValues[key] = ''

            });
            return initialValues
        }
        else {
            if (modalInfo === "Update" && tableName === "Food")
                modalData.image = modalData.imageUrl
            return modalData
        }
    };

    const formField = (key, setFieldValue) => {
        if (key == 'level')
            return (
                <Field
                    as="select"
                    name={key}
                    id={key}
                    defaultValue={"root"}
                    className={"form-select"}
                >
                    <option value="admin">admin</option>
                    <option value="root">root</option>
                </Field>
            )
        else if (key == 'category')
            return (
                <Field
                    as="select"
                    name={key}
                    id={key}
                    defaultValue={"root"}
                    className={"form-select"}
                >
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </Field>
            )
        else if (key == 'password' && modalInfo == "Update")
            return (
                <Field
                    name={key}
                    as={'input'}
                    type={'password'}
                    className={"form-control"}
                    readOnly={true}
                />
            )
        else if (key == 'imageUrl')
            return (
                <Field name="image">
                    {({ field, form }) => (
                        <div>
                            {file && <img className="modal-image my-2" src={URL.createObjectURL(file)} />}
                            {(modalInfo == "Update" && !file) && <img className="modal-image my-2" src={modalData.imageUrl} />}
                            <input
                                id="image"
                                name="image"
                                type="file"
                                onChange={(event) => {
                                    setFile(event.currentTarget.files[0])
                                    form.setFieldValue('image', event.currentTarget.files[0]);
                                }}
                                onBlur={field.onBlur}
                                className="form-control"
                            />
                        </div>
                    )}
                </Field>
            )
        else if (key == 'iconName') {
            const foodKeywords = ['food', 'eat', 'drink', 'kitchen', 'meal', 'chef', 'cook',
                'fruit', 'cake', 'chocolate', 'coffee', 'cutlery', 'hamburger', 'honey', 'icecream',
                'meat', 'pizza', 'soda', 'strawberry', 'water', 'wine', 'fish', 'chicken']

            const foodIcons = Object.keys(Icons).filter(iconName =>
                foodKeywords.some(keyword => iconName.toLowerCase().includes(keyword))
            )
            
            return (
                <>
                    <div className="icon-list overflow-auto border rounded p-2">
                        {foodIcons.map((iconName, index) => (
                            <span
                                key={iconName + index}
                                className={
                                    `icon-card border m-1 rounded ${(selected == iconName) ? "active" : ""} ${(modalInfo == "Update" && modalData.iconName == iconName) ? "old" : ""}`
                                }
                                onClick={() => {
                                    setSelected(iconName)
                                    setFieldValue('iconName', iconName)
                                }}
                            >
                                {React.createElement(Icons[iconName])}
                            </span>
                        ))}
                    </div>
                    <Field
                        name={key}
                        as={'input'}
                        type={'text'}
                        id={key}
                        className={"form-control"}
                    />
                </>
            )
        }
        else
            return (
                <Field
                    name={key}
                    as={key === 'detail' ? 'textarea' : 'input'}
                    rows={key === 'detail' ? "5" : undefined}
                    type={key !== 'detail' ? 'text' : undefined}
                    className={"form-control"}
                />
            )
    }

    return (
        <Formik
            enableReinitialize
            initialValues={getInitialValues(modalInfo, modalData)}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                setSelected("")
                try {
                    if (modalInfo === "Update") {
                        api.fetchData(`update${tableName}`, modalData.id, values)
                            .then(data => {
                                setRefreshDatas(!refreshDatas)
                                toast.success(`${modalInfo} Successful`, {
                                    position: 'bottom-right',
                                    autoClose: 2500,
                                })
                            })
                    } else {
                        api.fetchData(`create${tableName}`, null, values)
                            .then(data => {
                                setRefreshDatas(!refreshDatas)
                                toast.success(`${modalInfo} Successful`, {
                                    position: 'bottom-right',
                                    autoClose: 2500,
                                })
                            })
                    }

                    setFile("")
                    resetForm()
                } catch (err) {
                    toast.error(`${modalInfo} Unsuccessful`, {
                        position: 'bottom-right',
                        autoClose: 2500,
                    })
                    console.log(err)
                }
            }}
        >
            {({ errors, touched, setFieldValue, isSubmitting }) => (
                <Form className="px-4 text-center">
                    {Object.keys(modalData).map((key, index) => (
                        (key != "id" && key != "createdAt" && key != "updatedAt" && key != "image") &&
                        <div key={`form-data-${index}`} className="my-2">
                            <label htmlFor={key} className="form-label me-1">{key}: </label>
                            {formField(key, setFieldValue)}
                            {errors[key] && touched[key] ? (
                                <div className="error form-text py-1 px-3 mb-2">
                                    {errors[key]}
                                </div>
                            ) : null}
                        </div>
                    ))}
                    <button
                        type="submit" disabled={isSubmitting}
                        className="btn btn-danger mt-3"
                        data-bs-dismiss="modal"
                    >
                        Submit
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default ModalForm