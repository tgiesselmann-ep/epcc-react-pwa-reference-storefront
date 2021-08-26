import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moltin from '@moltin/sdk';
import { loadCategoryProducts, loadNodeProducts } from './service';
import { useCategories, useTranslation, useCurrency, useNodes } from './app-state';
import { ProductThumbnail } from './ProductThumbnail';
import { createCategoryUrl } from './routes';
import { Pagination } from './Pagination';
import { useResolve } from './hooks';

import './Category.scss';
import { PcmProductThumbnail } from './PcmProductThumbnail';

function useNodeProducts(nodeId: string | undefined, pageNum: number) {
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  //const [totalPages, setTotalPages] = useState<number>();

  // useEffect(() => {
  //   // reset number of pages only when changing nodes
  //   setTotalPages(undefined);
  // }, [nodeId]);

  const [products] = useResolve(async () => {
    if (nodeId) {
      const result = await loadNodeProducts(nodeId, pageNum, selectedLanguage, selectedCurrency);
      //setTotalPages(result.meta.page.total);
      return result;
    }
  }, [nodeId, pageNum, selectedLanguage, selectedCurrency]);

  return { products/*, totalPages */};
}

interface NodeParams {
  nodeSlug: string;
  pageNum?: string;
}

export const Node: React.FC = () => {
  const params = useParams<NodeParams>();
  // TODO - map the node slug to a full path
  const { nodes } = useNodes();
  const parsedPageNum = parseInt(params.pageNum!);
  const pageNum = isNaN(parsedPageNum) ? 1 : parsedPageNum;

  // TODO - make this safer
  const filteredNodes = nodes ? nodes?.filter((n: moltin.Node) => { return n.attributes?.slug === params.nodeSlug }) : [];
  const node = filteredNodes[0];

  //const { products/*, totalPages */} = useNodeProducts(node?.id, pageNum);

  return (
    <div className="category">
      {node && node.attributes.name }
      {//node && products ? (
        true ? (
        <>Moo
          {/* <div className="category__breadcrumbs">
            {categoryPath?.map((category: moltin.Category, index: number) => (
              <React.Fragment key={category.id}>
                {index > 0 && (
                  <span className="category__breadcrumbseparator">{'>'}</span>
                )}
                <a className="category__breadcrumblink" href={createCategoryUrl(category.slug)}>{category.name}</a>
              </React.Fragment>
            ))}
          </div> */}

          {/* <h1 className="category__categoryname">{node.attributes.name ?? ' '}</h1>

          <ul className="category__productlist">
            {products && products.data.map(product => (
              <li key={product.id} className="category__product">
                <PcmProductThumbnail product={product} />
              </li>
            ))}
          </ul> */}

          {/* <div className="category__pagination">
            {totalPages && (
              <Pagination
                totalPages={totalPages}
                currentPage={products?.meta.page.current ?? pageNum}
                formatUrl={(page) => createCategoryUrl(categorySlug, page)}
              />
            )}
          </div> */}
        </>
      ) : (
        <div className="loader" />
      )}
    </div>
  );
};
