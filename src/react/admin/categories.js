import React from 'react';

export default React.createClass({
  getDefaultProps: function () {
    return {
      categories: []
    };
  },
  render: function () {
    return (
      <div>
        {Object.keys(this.props.categories).map(element => {
          let categories = this.props.categories[element];
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
          );
        })}
      </div>
    );
  }
});
