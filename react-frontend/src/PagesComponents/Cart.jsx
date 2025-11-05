
import React, { useEffect,useState } from 'react'
import { Header } from '../Component/Header';
import { Link } from 'react-router-dom';
import { Contact } from './Contact';



export const Cart = ({ cartItems, updateCart }) => {

  const handleChange = (e) => {
    const { value, name } = e.target;
    const updatedItems = cartItems.map(item => {
     
      if (item.id == name || item._id == name) {
        return { ...item, quantity: Number(value) };
      }
      return item;
    });
    updateCart(updatedItems);
  };

 const incrementQuantity = (itemId) => {
  const updatedItems = cartItems.map(item => {
    if (item.id == itemId || item._id == itemId) {
      return { ...item, quantity: (Number(item.quantity) || 0) + 1 };
    }
    return item;
  });
  updateCart(updatedItems);
 };

 const decrementQuantity = (itemId) => {    
  const updatedItems = cartItems.map(item => {
    if (item.id == itemId || item._id == itemId) {
      return { ...item, quantity: Math.max((Number(item.quantity) || 1) - 1, 1) };
    }
    return item;
  });
  updateCart(updatedItems);
 };

const deleteItem = (itemId) => {
  const DeletedItems = cartItems.filter(item => (item.id != itemId) && (item._id != itemId));
  updateCart(DeletedItems);
};

const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

const shipping = subtotal > 0 ? 10 : 0;
const tax = subtotal > 0 ? subtotal * 0.1 : 0;
const total = subtotal + shipping + tax;

  return (
    <>
      <Header cartItems={cartItems} updateCart={updateCart} />
    
      <div className="container py-5">
        <h1 className="mb-5">Your Shopping Cart</h1>
        <div className="row">
        <div className="col-lg-8">

            {cartItems.length === 0 ? (
              <p>Cart is Empty..</p>
            ): 
              cartItems.map((item)=>(
                <div key={item.id || item._id || item.prname}className="card mb-4">
                <div className="card-body">
                    <div className="row cart-item mb-3">
                        <div className="col-md-3">
                            <img src={`http://localhost:5000/public/uploads/${item.primage}`} alt={item.name} className="img-fluid rounded"/>
                        </div>
                        <div className="col-md-5">
                            <h5 className="card-title">{item.name}</h5>
                          
                        </div>
                        <div className="col-md-2">
                            <div className="input-group">
                <button onClick={()=>decrementQuantity(item.id || item._id)} className="btn btn-outline-secondary btn-sm" type="button">-</button>
                <input
                  style={{ maxWidth: 100 }}
                  type="number"
                  min="1"
                  name={item.id || item._id}
                  onChange={handleChange}
                  className="form-control form-control-sm text-center quantity-input"
                  value={item.quantity}
                />
                <button onClick={()=>incrementQuantity(item.id || item._id)} className="btn btn-outline-secondary btn-sm" type="button">+</button>
                            </div>
                        </div>
                        <div className="col-md-2 text-end">
                            <p className="fw-bold">${item.price}</p>
                            <button className="btn btn-sm btn-outline-danger" onClick={() => deleteItem(item.id || item._id)}>
                                    <i className="bi bi-trash"></i>
                                </button>
                        </div>
                    </div>
                </div>
            </div>
              ))
}


            <div className="text-start mb-4">
              <Link to="/">
                <button className="btn btn-outline-primary">
                    <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                </button>
              </Link>
            </div>
        </div>
        <div className="col-lg-4">
          
            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
          <div className="d-flex justify-content-between mb-3">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="d-flex justify-content-between mb-3">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
                    <hr/>
          <div className="d-flex justify-content-between mb-4">
            <strong>Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
                    <button className="btn btn-primary w-100">Proceed to Checkout</button>
                </div>
            </div>
      
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Apply Promo Code</h5>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter promo code"/>
                        <button className="btn btn-outline-secondary" type="button">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

    </>
  )
}
