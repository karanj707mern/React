import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Newarrivals = ({ updateCart }) => {
  let [allpr, setAllPr] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/category/")
      .then(res => setAllPr(res.data.data));
    axios.get("http://localhost:5000/product/")
      .then(res => setProducts(res.data.data));
  }, []);

  useEffect(() => {
    const $ = window.$;
    
   
    const initIsotope = () => {
      const $grid = $('.product-grid');
      if ($grid.length) {
        $grid.isotope({
          itemSelector: '.product-item',
          layoutMode: 'fitRows'
        });

      
        $('.grid_sorting_button').on('click', function() {
          $('.grid_sorting_button.active').removeClass('active');
          $(this).addClass('active');
          
          const selector = $(this).attr('data-filter');
          $grid.isotope({ filter: selector });
          return false;
        });
      }
    };

    setTimeout(initIsotope, 100);

   
    return () => {
      const $grid = $('.product-grid');
      if ($grid.length && $grid.data('isotope')) {
        $grid.isotope('destroy');
      }
    };
  }, [allpr, products]);

  // addToCart uses the same logic as the previous handler but calls updateCart
  const addToCart = (e, product) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const pid = product?._id || product?.id || product?.prname;
      const idx = existing.findIndex(item => item.id === pid);
      if (idx > -1) {
        existing[idx].quantity = (Number(existing[idx].quantity) || 1) + 1;
      } else {
        const newItem = {
          id: pid,
          primage: product?.primage || `http://localhost:5000/public/uploads/${product?.primage}`,
          name: product?.prname || 'unknown',
          price: product?.prprice || null,
          quantity: 1
        };
        existing.push(newItem);
      }
      localStorage.setItem('cartItems', JSON.stringify(existing));
     
      if (typeof updateCart === 'function') updateCart(existing);
    } catch (err) {
      console.warn('Could not add to cart', err);
    }
  };

  return (
    <>
      <div className="new_arrivals">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="section_title new_arrivals_title">
                <h2>New Arrivals</h2>
              </div>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col text-center">
              <div className="new_arrivals_sorting">
                <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
                  <li className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center active is-checked" data-filter="*">all</li>
                  {allpr.map((i) => {
                    const raw = i.catname || '';
                    const safe = (raw || '').toString().trim().replace(/\s+/g, '-').toLowerCase();
                    const filter = '.' + safe;
                    return (
                      <li 
                        key={i._id || raw} 
                        className="grid_sorting_button button d-flex flex-column justify-content-center align-items-center" 
                        data-filter={filter}
                      >
                        {raw}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="product-grid">
                {products.map((i) => {
                  const rawCat = i.catid?.catname || '';
                  const catClass = (rawCat || '').toString().trim().replace(/\s+/g, '-').toLowerCase();
                  return (
                    <div key={i._id || i.prname} className={`product-item ${catClass}`}>
                      <div className="product discount product_filter">
                        <div className="product_image">
                          <img src={`http://localhost:5000/public/uploads/${i.primage}`} alt={i.prname} />
                        </div>
                        <i className="favorite favorite_left fa fa-heart-o" aria-hidden="true"></i>
                        <div className="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center">
                          <span>-${i.discount}</span>
                        </div>
                        <div className="product_info">
                          <h6 className="product_name"><a href="single.html">{i.prname}</a></h6>
                          <div className="product_price">${i.prprice}</div>
                        </div>
                      </div>
                      <div className="red_button add_to_cart_button">
                        <a href="#" onClick={(e) => addToCart(e, i)}>add to cart</a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Newarrivals;