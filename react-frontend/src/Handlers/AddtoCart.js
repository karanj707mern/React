import React from 'react'

export const handleAddToCart = (e, product) => {
  e.preventDefault();
  try {
    console.log('Add to cart clicked:', product);
    const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
    const pid = product?._id || product?.id || product?.prname;
    const idx = existing.findIndex(item => item.id === pid);
			if (idx > -1) {
				// increment quantity
				existing[idx].quantity = (existing[idx].quantity || 1) + 1;
				localStorage.setItem('cartItems', JSON.stringify(existing));
					// Notify the app that cart changed so components can update without a full page refresh
					try {
						window.dispatchEvent(new CustomEvent('cartUpdated', { detail: existing }));
					} catch (e) {
						// older browsers or strict CSP may block CustomEvent; ignore failure
					}
			} else {
				const newItem = {
					id: pid,
					primage: product?.primage || `http://localhost:5000/public/uploads/${product?.primage}`,
					name: product?.prname || 'unknown',
					price: product?.prprice || null,
					quantity: 1
				};
				existing.push(newItem);
				localStorage.setItem('cartItems', JSON.stringify(existing));
					// Notify listeners that cart has been updated
					try {
						window.dispatchEvent(new CustomEvent('cartUpdated', { detail: existing }));
					} catch (e) {
						// ignore
					}
			}
		} catch (err) {
			console.warn('Could not update cart', err);
		}


    }