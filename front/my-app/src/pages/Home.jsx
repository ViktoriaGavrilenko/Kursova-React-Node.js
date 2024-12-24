import Card from "../components/Card/Card";
import React from "react";
import { useOutletContext} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/slices/filterSlice";
import { addCardAsync} from "../redux/slices/cardSlice";

function Home(){
    const {items} = useOutletContext();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.filter.searchQuery);
    const selectedCategory = useSelector((state) => state.filter.category);

    const filteredItems = items
        .filter((item) => {
            const matchesCategory =
                selectedCategory === 'Усі' || item.category === selectedCategory;
            const matchesSearch =
                item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

    const onChangeSearchInput = (event) => {
        dispatch(setSearchQuery(event.target.value));
    };

    return (
        <div className=" content p-40">
            <div className=" d-flex align-center mb-40 justify-between">
                <h1>{searchQuery  ? `Пошук по запиту:" ${searchQuery}"` : 'Усі товари'}</h1>
                <div className=" search-block d-flex">
                    <img src="/img/search.svg" alt=" Search"/>
                    <input onChange={onChangeSearchInput} value={searchQuery} placeholder=" Пошук..."/>
                </div>
            </div>
            <div className=" d-flex flex-wrap">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                            <Card
                                key={item._id}
                                _id={item._id}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                category={item.category}
                                imageURL={item.imageURL}
                                viewsCount={item.viewsCount}
                                user={item.user}
                                onClickFavorite={() => console.log('Додали в закладки')}
                                onPlus={(obj) => addCardAsync(obj)}
                            />
                        ))
                ) : (
                    <p>Немає товаров, відповідних фільтру.</p>
                )}

            </div>
        </div>
    )
}
export default Home;