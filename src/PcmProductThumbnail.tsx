import React from 'react';
import { createPcmProductUrl } from './routes';
import { Link } from 'react-router-dom';
import { PcmProductMainImage } from './PcmProductMainImage';
import { isProductAvailable } from './helper';
import { Availability } from './Availability';


import './ProductThumbnail.scss';


interface PcmProductThumbnailProps {
  product: any
}

export const PcmProductThumbnail: React.FC<PcmProductThumbnailProps> = (props) => {
  const productUrl = createPcmProductUrl('' + props.product.attributes.slug);

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
        {props.product.meta.display_price.without_tax.formatted}
      </div>
      <Availability available={isProductAvailable(props.product)}/>
      {/* TODO (meh) */}
      {/* <div className={`productthumbnail__comparecheck`}>
        <CompareCheck product={props.product} />
      </div> */}
    </div>
  );
};
