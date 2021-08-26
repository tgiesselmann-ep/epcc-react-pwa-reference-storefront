import React from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { Link } from 'react-router-dom';
import { CompareCheck } from './CompareCheck';
import { ProductMainImage } from './ProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';


import './ProductThumbnail.scss';


interface PcmProductThumbnailProps {
  product: moltin.PcmProductBase
}

export const PcmProductThumbnail: React.FC<PcmProductThumbnailProps> = (props) => {
  const productUrl = createProductUrl('' + props.product.attributes.slug);

  return (
    <div className="productthumbnail">
      <div className="productthumbnail__imgcontainer">
        <Link className="productthumbnail__imglink" to={productUrl} aria-label={props.product.attributes.name}>
          {/* <ProductMainImage product={props.product} /> */}
        </Link>
      </div>
      <div className="productthumbnail__name">
        <Link className="productthumbnail__namelink" to={productUrl}>
          {props.product.attributes.name}
        </Link>
      </div>
      <div className="productthumbnail__sku">
        {props.product.attributes.sku}
      </div>
      <div className="productthumbnail__price">
        {/* // TODO */}
      </div>
      {/* <Availability available={isProductAvailable(props.product)}/> */}
      {/* <div className={`productthumbnail__comparecheck`}>
        <CompareCheck product={props.product} />
      </div> */}
    </div>
  );
};
