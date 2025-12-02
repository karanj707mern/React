import React, { useEffect, useState } from 'react';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

const Newarrivals = ({ updateCart }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch categories and products
  useEffect(() => {
    axios.get(`${API_URL}/category/`).then(res => setCategories(res.data.data));
    axios.get(`${API_URL}/product/`).then(res => setProducts(res.data.data));
  }, []);

  // Initialize Isotope after products render
  useEffect(() => {
    const $ = window.$;
    const initIsotope = () => {
      const $grid = $('.product_grid');
      if ($grid.length) {
        $grid.isotope({
          itemSelector: '.product-item',
          layoutMode: 'fitRows'
        });

        $('.grid_sorting_button').on('click', function () {
          $('.grid_sorting_button.active').removeClass('active');
          $(this).addClass('active');

          const selector = $(this).attr('data-filter');
          $grid.isotope({ filter: selector });
          return false;
        });
      }
    };

    setTimeout(initIsotope, 500); // give time for products to render

    return () => {
      const $grid = $('.product_grid');
      if ($grid.length && $grid.data('isotope')) {
        $grid.isotope('destroy');
      }
    };
  }, [categories, products]);

  // Add to cart handler
  const addToCart = (e, product) => {
    e.preventDefault();
    try {
      const existing = JSON.parse(localStorage.getItem('cartItems') || '[]');
      const pid = product?._id || product?.id || product?.prname;
      const idx = existing.findIndex(item => item.id === pid);
      if (idx > -1) {
        existing[idx].quantity = (Number(existing[idx].quantity) || 1) + 1;
      } else {
        existing.push({
          id: pid,
          primage: `${API_URL}/public/uploads/${product?.primage}`,
          name: product?.prname || 'unknown',
          price: product?.prprice || 0,
          quantity: 1
        });
      }
      localStorage.setItem('cartItems', JSON.stringify(existing));
      if (typeof updateCart === 'function') updateCart(existing);
    } catch (err) {
      console.warn('Could not add to cart', err);
    }
  };

  return (
    <div className="products">
      <div className="container">
        {/* Section Title */}
        <div className="row">
          <div className="col text-center">
            <div className="section_title new_arrivals_title">
              <h2>New Arrivals</h2>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="row align-items-center">
          <div className="col text-center">
            <ul className="arrivals_grid_sorting clearfix button-group filters-button-group">
              <li className="grid_sorting_button button active" data-filter="*">All</li>
              {categories.map(cat => {
                const filterClass = (cat.catname || '')
                  .toString()
                  .trim()
                  .replace(/\s+/g, '-')
                  .toLowerCase();
                return (
                  <li
                    key={cat._id || cat.catname}
                    className="grid_sorting_button button"
                    data-filter={`.${filterClass}`}
                  >
                    {cat.catname}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="row">
          <div className="col">
            <div className="product_grid">
              {products.map(prod => {
                const catClass = (prod.catid?.catname || '')
                  .toString()
                  .trim()
                  .replace(/\s+/g, '-')
                  .toLowerCase();

                return (
                  <div key={prod._id || prod.prname} className={`product-item ${catClass}`}>
                    <div className="product_image">
                      <img src={`${API_URL}/public/uploads/${prod.primage}`} alt={prod.prname} />
                    </div>

                    {prod.discount && (
                      <div className="product-bubble">
                        -${prod.discount}
                      </div>
                    )}

                    <h6 className="product_name">{prod.prname}</h6>
                    <div className="product_price">${prod.prprice}</div>

                    <div className="red_button add_to_cart_button">
                      <a href="#" onClick={(e) => addToCart(e, prod)}>Add to Cart</a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newarrivals;
