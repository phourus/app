import React from 'react';

const AdminCategories = ({ categories=[] }) => (
    <div>
        {Object.keys(categories).map((element) => {
            const cats = categories[element];

            return (
                <ul className={element}>
                    {cats.map((category) => (
                        <li>{category.category}
                            {category.subcategories ? (
                                <ul>
                                    {category.subcategories.map((subcategory) => <li>{subcategory}</li>)}
                                </ul>
                            ) : false}
                        </li>
                    ))}
                </ul>
            );
        })}
    </div>
);

export default AdminCategories;
