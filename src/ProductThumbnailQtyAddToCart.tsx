import React, { useState } from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { Link } from 'react-router-dom';
import { CompareCheck } from './CompareCheck';
import { ProductMainImage } from './ProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';
import { ReactComponent as CartIcon } from './images/icons/cart-icon.svg';
import {
  useTranslation,
  useCurrency,
  useCartData,
  useMultiCartData
} from "./app-state";
import { addToCartWithQty, loadProductBySlug, getProductById } from './service';

import './ProductThumbnailQtyAddToCart.scss';


interface ProductThumbnailQtyAddToCartProps {
  product: moltin.Product;
}

export const ProductThumbnailQtyAddToCart: React.FC<ProductThumbnailQtyAddToCartProps> = (props) => {
  const productUrl = createProductUrl(props.product.slug);
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { updateCartItems, setCartQuantity, handleShowCartPopup } = useCartData();
  const { multiCartData, updateCartData, updateSelectedCart, setIsCartSelected } = useMultiCartData();

  const [qty, setQty] = useState("");

  const handleChange = (qtyValue: string) => {
    setQty(qtyValue);
  }

  const handleAddToCart = () => {
    const currentCart = localStorage.getItem("mcart") || "";
    const mcart = currentCart;
    return addToCartWithQty(mcart, props.product.id, +qty, selectedLanguage, selectedCurrency)
      .then(() => {
        setQty("");
        updateCartItems();
        updateCartData();
      });
  }

  return (
    <div className="productthumbnail_qty_addtocart">
      {/* <div className="productthumbnail_qty_addtocart__imgcontainer">
        <Link className="productthumbnail__imglink" to={productUrl} aria-label={props.product.name}>
          <ProductMainImage product={props.product} />
        </Link>
      </div> */}
      <div className="productthumbnail_qty_addtocart__quantity">
        <input className="productthumbnail_qty_addtocart__epform__input" id={props.product.id} type="text" value={qty}
          onChange={(e) => {handleChange(e.target.value)}}/>
      </div>
      <div className="productthumbnail_qty_addtocart__sku">
        {props.product.sku}
      </div>
      <div className="productthumbnail_qty_addtocart__name" title={props.product.description}>
        <Link className="productthumbnail_qty_addtocart__namelink" to={productUrl}>
          {props.product.name}
        </Link>
      </div>
      <div className="productthumbnail_qty_addtocart__availability">
        <Availability available={isProductAvailable(props.product)}/>
      </div>
      <div className="productthumbnail_qty_addtocart__price">
        {props.product.meta.display_price.without_tax.formatted}
      </div>
      <div className="productthumbnail_qty_addtocart__atc_button">
        <button className="epform__button" type="submit" onClick={handleAddToCart}><CartIcon/></button>
      </div>
    </div>
  );
};
