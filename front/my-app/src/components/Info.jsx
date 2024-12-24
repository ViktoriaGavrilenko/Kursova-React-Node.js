import React from 'react';
import {useDispatch} from "react-redux";
import {clearDrawer, toggleDrawer} from "../redux/slices/drawerSlice";

function Info({title, image, description}) {

    const dispatch = useDispatch();

    const handleBackClick = () => {
        dispatch(clearDrawer());
        dispatch(toggleDrawer());
    };

    return (
        <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img className="mb-20" width="120px" src={image} alt="Empty"/>
            <h2>{title}</h2>
            <p className="opacity-6">{description}</p>
            <button onClick={handleBackClick} className="greenButton">
                <img src="img/arrow.svg" alt="Arrow"/>
                Повернутися назад
            </button>
        </div>
    );
}

export default Info;