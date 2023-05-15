import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { addToDb, deleteShoppingCart, getShoppingCart } from "../../../utilities/fakedb"
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight} from '@fortawesome/free-solid-svg-icons'

const Shop = () => {

    const [products, setProducts] = useState([])

    const [cart, setCart] = useState([]);



    const  handleClearCart= () =>{
        setCart([]);
        deleteShoppingCart();
    }
    useEffect(() => {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];



        // step-1: get the id of the added product;
        for (const id in storedCart) {
            // step-2: get product by using id;
            const addedProduct = products.find(product => product._id === id);
            if (addedProduct) {
                // step-3: get added quantity;
                const quantity = storedCart[id];

                // step-4: add quantity to the product quantity;
                addedProduct.quantity = quantity;

                // step-5: add the product to the saved cart array;
                savedCart.push(addedProduct);
            }
        }

        // step-6: set the cart;
        setCart(savedCart);


    }, [products])

    const handleAddToCart = (product) => {
        // const newCart = [...cart, product];

        // if product don't exist in the cart then set quantity = 1 and if exist update quantity by 1;
        let newCart = [];
        const exist = cart.find(pd => pd._id === product._id);

        if(!exist){
            product.quantity = 1;
            newCart = [...cart, product] 
        }
        else{
            exist.quantity = exist.quantity + 1;

            const remaining = cart.filter(pd => pd._id !==product._id);
            newCart = [...remaining, exist];
        }


        setCart(newCart);
        addToDb(product._id)
    }


    return (
        <div className='shop-container'>
            <div className='Products-container'>
                {
                    products.map(product => <Product product={product}
                        key={product._id}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="card-container">
                <Cart
                 cart={cart}
                 handleClearCart={handleClearCart}
                 >
                    <Link className='proceed-link' to='/orders'>
                        <button className='proceed-btn' >Review Orders  <FontAwesomeIcon icon={faArrowRight} /></button>
                       
                    </Link>
                 </Cart>
            </div>
        </div>
    );
};

export default Shop;