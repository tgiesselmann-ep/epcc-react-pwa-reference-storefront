import React, { useState, useEffect } from 'react';
import { useTranslation, useMultiCartData, useCartData } from './app-state';


import './MyCartsList.scss';

export  const MyCartsList: React.FC = () => {

  const { t } = useTranslation();
  const { multiCartData, updateSelectedCart, setIsCartSelected, updateCartData, multiCartDataList } = useMultiCartData();


  return (
      <div className='mycarts'>
        <div className="container">
            <div  className='mycarts__header'>
                <h1 className="mycarts__title">My Carts</h1>
                <button className="mycarts__addcartbtn">
                  {t('add-new-cart')}
                </button>
            </div>
            <div className='mycarts__clear'></div>
            <div className="mycarts__tblheader">
              <p className='mycarts__rowtitle'>{t('cart-name')}</p>
              <p className='mycarts__rowtitle'>{t('products-number')}</p>
              <p className='mycarts__rowtitle'>{t('cart-total')}</p>
              <p className='mycarts__rowtitle'>{t('cart-expiry')}</p>
              <p className='mycarts__rowtitle'>{t('last-edit')}</p>
              <p className='mycarts__rowtitle'>{t('action')}</p>
            </div>
            <div >
                {multiCartDataList.map((cart: any) => (
                  <div className='mycarts__cartelement' key={cart.id}>
                    <div className='mycarts__cartname'>
                      <input type="checkbox" name="cartCheck" id={`cart_${cart.id}`} className="mycarts__check epcheckbox" />
                      <label htmlFor={`cart_${cart.id}`} className='mycarts__name'>{cart.name}</label>
                    </div>
                    <div className='mycarts__productsquantity'>
                      {cart.relationships.items.data ? cart.relationships.items.data.length : 0}
                    </div>
                    <div className='mycarts__total'></div>
                    <div className='mycarts__expiry'></div>
                    <div className='mycarts__lastedit'></div>
                </div>
              ))}
            </div>
        </div>
      </div>
  )
};