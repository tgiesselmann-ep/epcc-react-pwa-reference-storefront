import React, { useState } from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { Link } from 'react-router-dom';
import { ProductMainImage } from './ProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';
import { ReactComponent as CartIcon } from './images/icons/cart-icon.svg';
import { ReactComponent as CaretIcon } from './images/icons/ic_caret.svg';
import {
  useTranslation,
  useCurrency,
  useCartData,
  useMultiCartData,
  useCustomerData
} from "./app-state";
import { addToCartWithQty } from './service';

import './ProductThumbnailQtyAddToCartList.scss';

interface ProductThumbnailQtyAddToCartListProps {
  products: moltin.Product[];
}

export const ProductThumbnailQtyAddToCartList: React.FC<ProductThumbnailQtyAddToCartListProps> = (props) => {
  const { t, selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { updateCartItems } = useCartData();
  const { multiCartDataList, multiCartData, updateCartData } = useMultiCartData();
  const { isLoggedIn } = useCustomerData();
  const [productQuantities, setProductQuantities] = useState(new Map<string, string>());
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleQtyChange = (productId: string, qtyValue: string) => {
    setProductQuantities(new Map<string, string>(productQuantities.set(productId, qtyValue)));
  }

  const handleSingleAddToCart = async (cartId: string, productId: string) => {
    // const currentCart = localStorage.getItem("mcart") || "";
    // const mcart = currentCart;
    return addToCartWithQty(cartId, productId, +productQuantities.get(productId), selectedLanguage, selectedCurrency)
      .then(() => {
        handleQtyChange(productId, "");
        updateCartItems();
        updateCartData();
      });
  }

  const handleSingleAddToDefaultCart = async (productId: string) => {
    const defaultCart: any = localStorage.getItem("mcart") || "";
    handleSingleAddToCart(defaultCart?.id, productId);
  }

  const handleAddAllToCart = async (cartId: string) => {
    for(let product of props.products) {
      if(productQuantities.get(product.id)) {
        //console.log("Adding " + productQuantities.get(product.id) + " of " + product.sku);
        await handleSingleAddToCart(cartId, product.id);
      }
    };
  }

  const handleAddAllToDefaultCart = async () => {
    const defaultCart: any = localStorage.getItem("mcart") || "";
    handleAddAllToCart(defaultCart?.id);
  }

  const ProductThumbnailQtyAddToCartListItem = (product: moltin.Product) => {
    const productUrl = createProductUrl(product.slug);
      return (
        <tr key={product.id}>
          <td>
            <Link className="productthumbnail__imglink" to={productUrl} aria-label={product.name}>
              <ProductMainImage product={product} />
            </Link>
          </td>
          <td>
            <input className="productthumbnail_qty_addtocart__epform__input" type="text"
              id={product.id}
              value={productQuantities.get(product.id)}
              onChange={(e) => {handleQtyChange(product.id, e.target.value)}}/>
          </td>
          <td>
            {product.sku}
          </td>
          <td>
            <Link className="productthumbnail_qty_addtocart__namelink" to={productUrl}>
              {product.name}
            </Link>
          </td>
          <td>
            <Availability available={isProductAvailable(product)}/>
          </td>
          <td>
            {product.meta.display_price.without_tax.formatted}
          </td>
          <td>
            <button className="epform__button" type="submit" onClick={() => {handleSingleAddToDefaultCart(product.id)}}><CartIcon/></button>
          </td>
        </tr>
      );
    };

    const AddToOrderGuideButton = () => {
      if (isLoggedIn) {
        return (
          <div className="product__addtocartdropdowncontainer">
            <div className="product__addtocartdropdownwrap">
              <button onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`epbtn --primary product__addtocartdropdowntoggle${dropdownOpen ? " --open" : ""}`}>
                Add to Order Guide ...
                <CaretIcon className={`product__addtocartdropdowniscaret ${dropdownOpen ? "--rotated" : ""}`}
                />
              </button>
            </div>
            {dropdownOpen ? (
              <div className="product__addtocartdropdowncontent">
                {multiCartDataList.filter((c: moltin.Cart) => c?.name?.startsWith("Order Guide")).map((cart: moltin.Cart) => (
                  <button
                    className="productthumbnail_qty_addtocart__addtocartdropdownbtn"
                    key={cart.id}
                    onClick={() => { handleAddAllToCart(cart.id); setDropdownOpen(!dropdownOpen); }}
                  >
                    {cart.name}
                  </button>
                ))}
                {/* <button
                  className="productthumbnail_qty_addtocart__addtocartdropdownbtn"
                  key="create-cart-btn"
                  onClick={() => setModalOpen(true)}
                >
                  {t('create-new-cart')}
                </button> */}
              </div>
            ) : null}
          </div>
        );
      }
  
      return (
        <button className="epbtn --secondary" onClick={() => { /*handleAddToCart()*/ }}>
          {t("add-to-cart")}
        </button>
      );
    };

  return (
    <div className="productthumbnail_qty_addtocart">
      <table>
        <tbody>
          {props.products && props.products.map(p => ProductThumbnailQtyAddToCartListItem(p))}
          <tr>
            <td/>
            <td/>
            <td/>
            <td/>
            <td colSpan={2}>
              <AddToOrderGuideButton/>
            </td>
            <td>
                <button className="epform__button" type="submit" onClick={handleAddAllToDefaultCart}>
                  <CartIcon/>
                </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
