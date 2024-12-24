import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux/slices/filterSlice';

function Categories({ categories }) {
    const dispatch = useDispatch();
    const selectedCategory = useSelector((state) => state.filter.category);

    const handleCategoryChange = (event) => {
        dispatch(setCategory(event.target.value));
    };

    return (
        <div className="categories">
            <label htmlFor="category-select">Выберите категорию:</label>
            <select
                id="category-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                <option value="Усі">Усі</option>
                {categories.map((category, index) => (
                    <option key={index} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default Categories;
