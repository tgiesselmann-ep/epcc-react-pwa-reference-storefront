import React from 'react';
import { Link } from 'react-router-dom';
import { createCategoryUrl, createNodeUrl } from './routes';
import * as moltin from '@moltin/sdk';
import { useCategories, useNodes } from './app-state';

import './NavMenu.scss';

interface NavMenuProps {
  categoryHistory: string[];
  handleCloseNavigation: () => void;
  handleCategoryClick: (id: string, name: string) => void;
}

export const NavMenu: React.FC<NavMenuProps> = (props) => {
  const { handleCloseNavigation, categoryHistory, handleCategoryClick } = props;
  const { categoriesTree } = useCategories();
  const { nodes } = useNodes();

  const handleCloseMenu = () => {
    handleCloseNavigation();
  };

  const handleShow = (category: moltin.Category) => {
    handleCategoryClick(category.id, category.name);
  };

  function renderCategories(categories: moltin.Category[], level: number = 0, isVisible: boolean = false): React.ReactElement {
    return (
      <ul className={`navmenu__sub --level-${level} ${isVisible ? '--show' : ''}`}>
        {categories?.map(category => (
          <li key={category.id} className="navmenu__li">
              <Link
                onClick={handleCloseMenu}
                className={`navmenu__link ${category.children ? '--haschildren' : ''}`}
                to={createCategoryUrl(category.slug)}
              >
                {category.name}
              </Link>
              <button type="button" className={`navmenu__nextbutton ${category.children ? '--haschildren' : ''}`} onClick={() => handleShow(category)} />
            {category.children && renderCategories(category.children, level + 1, categoryHistory.includes(category.id))}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="navmenu">
      {categoriesTree && renderCategories(categoriesTree)}
      {nodes && nodes.map((node: moltin.Node) => (
        // <div>{node.attributes.name}</div>
        <Link
        onClick={handleCloseMenu}
        // className={`navmenu__link ${node.children ? '--haschildren' : ''}`}
        className={`navmenu__link`}
        to={createNodeUrl('' + node.attributes.slug)}
      >
        {node.attributes.name}
      </Link>
      ))}
    </div>
  );
};
