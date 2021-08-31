import React, { useContext } from 'react';
import { loadImageHref } from './service';
import { useResolve } from './hooks';
import { ImageContainer } from './ImageContainer';
import { APIErrorContext } from './APIErrorProvider';

interface PcmProductMainImageProps {
  product: any;
  size?: number;
}

export const PcmProductMainImage: React.FC<PcmProductMainImageProps> = (props) => {
  const productMainImageId = props.product?.relationships?.files?.data[0].id;
  const { addError } = useContext(APIErrorContext);
  const [productImageUrl] = useResolve(
    async () => {
      try {
        if (productMainImageId) {
          return loadImageHref(productMainImageId)
        }
      } catch (error) {
        addError(error.errors);
      }
    },
    [productMainImageId, addError]
  );
  //const productBackground = props.product?.attributes.extensions?.background_color ?? '';

  return (
    <>
      {productImageUrl && (
        <ImageContainer
        imgClassName="productmainimage"
        imgUrl={productImageUrl}
        alt={props.product./*attributes.*/name}
        imageStyle={{ width: props.size, height: props.size, objectFit: 'fill'/*, backgroundColor: productBackground*/ }}
        />
      )}
    </>
  );
};

