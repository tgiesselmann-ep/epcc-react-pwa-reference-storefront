import React, { useState } from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { Link } from 'react-router-dom';
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
import { addToCartWithQty } from './service';

import './ProductThumbnailQtyAddToCartList.scss';

interface ProductThumbnailQtyAddToCartListProps {
  products: moltin.Product[];
}

export const ProductThumbnailQtyAddToCartList: React.FC<ProductThumbnailQtyAddToCartListProps> = (props) => {
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { updateCartItems } = useCartData();
  const { updateCartData } = useMultiCartData();
  const [productQuantities, setProductQuantities] = useState(new Map<string, string>());

  const handleQtyChange = (productId: string, qtyValue: string) => {
    setProductQuantities(new Map<string, string>(productQuantities.set(productId, qtyValue)));
  }

  const handleSingleAddToCart = async (productId: string) => {
    const currentCart = localStorage.getItem("mcart") || "";
    const mcart = currentCart;
    return addToCartWithQty(mcart, productId, +productQuantities.get(productId), selectedLanguage, selectedCurrency)
      .then(() => {
        handleQtyChange(productId, "");
        updateCartItems();
        updateCartData();
      });
  }

  const handleAddToCartAll = async () => {
    for(let product of props.products) {
      if(productQuantities.get(product.id)) {
        //console.log("Adding " + productQuantities.get(product.id) + " of " + product.sku);
        await handleSingleAddToCart(product.id);
      }
    };
  }

  const ProductThumbnailQtyAddToCartListItem = (product: moltin.Product) => {
    const productUrl = createProductUrl(product.slug);
      return (
        <div className="productthumbnail_qty_addtocart__item" key={product.id}>
          <div className="productthumbnail_qty_addtocart__imgcontainer">
            <Link className="productthumbnail__imglink" to={productUrl} aria-label={product.name}>
              <ProductMainImage product={product} />
            </Link>
          </div>
          <div className="productthumbnail_qty_addtocart__quantity">
            <input className="productthumbnail_qty_addtocart__epform__input" type="text"
              id={product.id}
              value={productQuantities.get(product.id)}
              onChange={(e) => {handleQtyChange(product.id, e.target.value)}}/>
          </div>
          <div className="productthumbnail_qty_addtocart__sku">
            {product.sku}
          </div>
          <div className="productthumbnail_qty_addtocart__name" title={product.description}>
            <Link className="productthumbnail_qty_addtocart__namelink" to={productUrl}>
              {product.name}
            </Link>
          </div>
          <div className="productthumbnail_qty_addtocart__availability">
            <Availability available={isProductAvailable(product)}/>
          </div>
          <div className="productthumbnail_qty_addtocart__price">
            {product.meta.display_price.without_tax.formatted}
          </div>
          <div className="productthumbnail_qty_addtocart__atc_button">
            <button className="epform__button" type="submit" onClick={() => {handleSingleAddToCart(product.id)}}><CartIcon/></button>
          </div>
        </div>
      );
    };

  return (
    <div className="productthumbnail_qty_addtocart">

      {props.products && props.products.map(p => ProductThumbnailQtyAddToCartListItem(p))}

      <div className="productthumbnail_qty_addtocart__bottom_row">
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__empty_cell"/>
        <div className="productthumbnail_qty_addtocart__atc_button">
            <button className="epform__button" type="submit" onClick={handleAddToCartAll}>
              <CartIcon/>
            </button>
        </div>
      </div>
      
    </div>
  );
};
