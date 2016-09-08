import React from 'react';

export default ({categories}) => {
  return (
    <div>
      {Object.keys(categories).map(element => {
        let categories = categories[element]
        return (
          <ul className={element}>
            {categories.map(category => {
              return (<li>{category.category}
                  {category.subcategories
                    ? <ul>
                        {category.subcategories.map(subcategory => {
                          return <li>{subcategory}</li>
                        })}
                      </ul>
                    : false
                  }
                </li>
              );
            })}
          </ul>
        )
      })}
    </div>
  )
}
