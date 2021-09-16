import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as moltin from '@moltin/sdk';
import { loadNodeProducts, loadNodeBySlug } from './service';
import { useTranslation, useCurrency, useNodes } from './app-state';
// import { Pagination } from './Pagination';
import { useResolve } from './hooks';

import './Category.scss';
import { PcmProductThumbnail } from './PcmProductThumbnail';
import { APIErrorContext } from './APIErrorProvider';

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
  const nodeSlug = params.nodeSlug;
  const parsedPageNum = parseInt(params.pageNum!);
  const pageNum = isNaN(parsedPageNum) ? 1 : parsedPageNum;
  const { selectedLanguage } = useTranslation();
  const { selectedCurrency } = useCurrency();
  const { addError } = useContext(APIErrorContext);

  const [node] = useResolve(
    async () => {
      try {
        return loadNodeBySlug(nodeSlug, selectedLanguage, selectedCurrency);
      } catch (error) {
        const e: any = error;
        addError(e.errors);
      }
    },
    [nodeSlug, selectedLanguage, selectedCurrency, addError]
  );
  
  const { products/*, totalPages */} = useNodeProducts(node?.id, pageNum);
  


  return (
    <div className="category">
      {node && products ? (
        <>
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

          <h1 className="category__categoryname">{node.attributes.name ?? ' '}</h1>

          <ul className="category__productlist">
            {products && products.data.map(product => (
              <li key={product.id} className="category__product">
                <PcmProductThumbnail product={product} />
              </li>
            ))}
          </ul>

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
