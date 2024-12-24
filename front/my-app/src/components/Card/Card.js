import styles from './Card.module.css';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addToDrawerSync, removeFromDrawerSync} from "../../redux/slices/drawerSlice";
import {addToFavorites, removeFromFavorites} from "../../redux/slices/favoritesSlice";

function Card({_id,name,price,description,imageURL,category,viewsCount, hideAddButton }){
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites.items);
    const isFavorited = favorites.some((item) => item._id === _id);

    const itemsInDrawer = useSelector((state) => state.drawer.items);

    const isAdded = itemsInDrawer.some((item) => item._id === _id);

    const [isAddedState, setIsAddedState] = useState(isAdded);
    const [isFavoritedState, setIsFavoritedState] = useState(isFavorited);

        useEffect(() => {
            setIsFavoritedState(isFavorited);
        }, [isFavorited]);

    useEffect(() => {
        setIsAddedState(isAdded);
    }, [isAdded]);

    const handleFavoriteClick = () => {
        if (isFavoritedState) {
            dispatch(removeFromFavorites(_id));
            setIsFavoritedState(false);
        } else {
            dispatch(addToFavorites({ _id, name, price, description, imageURL, category, viewsCount }));
            setIsFavoritedState(true);
        }
    };

    const handleAddToDrawer = () => {
        if (isAddedState) {
            dispatch(removeFromDrawerSync(_id));
            setIsAddedState(false);
        } else {
            dispatch(addToDrawerSync({ _id, name, price, description, imageURL, category, viewsCount }));
            setIsAddedState(true);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite} onClick={handleFavoriteClick}>
                <img
                    src={isFavorited ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
                    alt={isFavorited ? "Liked" : "Unliked"}
                />
            </div>
            <img width={112} height={143} src={imageURL} alt="Phones"/>
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Ціна:</span>
                    <b>{price}</b>
                    <div>Опис: {description}</div>
                    <div    >Категорія: {category}</div>
                    <div>ViewsCount: {viewsCount}</div>
                </div>
                {!hideAddButton && (
                    <img
                        className={styles.plus}
                        onClick={handleAddToDrawer}
                        src={isAdded ? "/img/btn-favorite.svg" : "/img/btn-plus.svg"}
                        alt={isAdded ? "Added" : "Add"}
                    />
                )}
            </div>
        </div>
    )
}

export default Card;