import React from 'react'
import './addProduct.css'
import Footer from '../footer/Footer'

const AddProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState(false)

    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true)
            return false;
        }


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/add-product", {
            method: 'post',
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result)
    }

    return (
        <><div>
            <div className='a-product'>
                <h1 className='a-h1'>Add Product</h1>
                <input type="text" className='a-inputBox' placeholder='Enter product name' value={name} onChange={(e) => { setName(e.target.value) }} />

                {error && !name && <span className='invalid-input'>Enter valid name</span>}

                <input type="text" className='a-inputBox' placeholder='Enter product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />

                {error && !price && <span className='invalid-input'>Enter valid price</span>}

                <input type="text" className='a-inputBox' placeholder='Enter product category' value={category} onChange={(e) => { setCategory(e.target.value) }} />

                {error && !category && <span className='invalid-input'>Enter valid category</span>}

                <input type="text" className='a-inputBox' placeholder='Enter product company' value={company} onChange={(e) => { setCompany(e.target.value) }} />

                {error && !company && <span className='invalid-input'>Enter valid company</span>}

                <button onClick={addProduct} className='a-appButton'>Add Product</button>
            </div>
            <div className='a-footer'>
                <Footer />
            </div>
        </div>
        </>
    )
}

export default AddProduct;
