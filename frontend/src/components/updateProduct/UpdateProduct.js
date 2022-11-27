import React, { useEffect } from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import './updateProduct.css'
import Footer from "../footer/Footer"

const UpdateProduct = () => {
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        getProductDetails();
        
    },[])
    
    const getProductDetails = async ()=>{
        console.warn(params)
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setName(result.name)
        setPrice(result.price)
        setCategory(result.category);
        setCompany(result.company)        
    }

    const updateProduct = async () => {
        console.warn(name,price,category,company)
        let result = await fetch (`http://localhost:5000/product/${params.id}`,{
            method: 'Put',
            body: JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json()
        console.warn(result);
        navigate('/')
    }

    return (
        <>
        <div className='u-product'>
            <h1 className='u-h1'>Update Product</h1>
            <input type="text" className='u-inputBox' placeholder='Enter product name' value={name} onChange={(e) => { setName(e.target.value) }} />


            <input type="text" className='u-inputBox' placeholder='Enter product price' value={price} onChange={(e) => { setPrice(e.target.value) }} />


            <input type="text" className='u-inputBox' placeholder='Enter product category' value={category} onChange={(e) => { setCategory(e.target.value) }} />


            <input type="text" className='u-inputBox' placeholder='Enter product company' value={company} onChange={(e) => { setCompany(e.target.value) }} />


            <button onClick={updateProduct} className='u-appButton'>Update Product</button>
        </div>
        <div className='u-footer'>
            <Footer />
        </div>
        </>
    
    )
}

export default UpdateProduct;
