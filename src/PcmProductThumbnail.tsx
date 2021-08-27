import React from 'react';
import * as moltin from '@moltin/sdk';
import { createProductUrl } from './routes';
import { Link } from 'react-router-dom';
import { CompareCheck } from './CompareCheck';
import { PcmProductMainImage } from './PcmProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';


import './ProductThumbnail.scss';


interface PcmProductThumbnailProps {
  product: any
}

export const PcmProductThumbnail: React.FC<PcmProductThumbnailProps> = (props) => {
  const productUrl = createProductUrl('' + props.product.attributes.slug);

  return (
    <div className="productthumbnail">
      <div className="productthumbnail__imgcontainer">
        <Link className="productthumbnail__imglink" to={productUrl} aria-label={props.product.attributes.name}>
          <PcmProductMainImage product={props.product} />
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
        {/* TODO */}
        {/* {props.product.meta.display_price.without_tax.formatted} */}
      </div>
      {/* TODO */}
      {/* <Availability available={isProductAvailable(props.product)}/> */}
      {/* TODO (meh) */}
      {/* <div className={`productthumbnail__comparecheck`}>
        <CompareCheck product={props.product} />
      </div> */}
    </div>
  );
};
