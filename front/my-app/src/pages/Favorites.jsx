import React from 'react';
import {useSelector} from "react-redux";
import Card from "../components/Card/Card";

function Favorites(){
    const favorites = useSelector((state)=> state.favorites.items);
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мої закладки</h1>
            </div>
            <div className="d-flex flex-wrap">
                {favorites.length > 0 ? (
                    favorites.map((item) => (
                        <Card
                            key={item._id}
                            _id={item._id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            imageURL={item.imageURL}
                            category={item.category}
                            viewsCount={item.viewsCount}
                            hideAddButton={true}
                        />
                    ))
                ) : (
                    <p>Тут будуть мої закладки</p>
                )}
            </div>
        </div>
    )
}
export default Favorites;