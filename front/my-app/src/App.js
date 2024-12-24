import React, {useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import './App.css';
import api from './api';
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {useState} from "react";
import {toggleDrawer} from "./redux/slices/drawerSlice";

function App() {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const cartOpened = useSelector((state) => state.drawer.isOpen);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsResponse = await api.get('/products');
                const products = productsResponse.data;
                setItems(products);

                const uniqueCategories = [...new Set(products.map((item) => item.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error('Помилка при завантаженні даних:', error);
            }
        };
        fetchData();
    }, []);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    }

    return (
        <div className="wrapper clear">
            {cartOpened && <Drawer onClose={() => dispatch(toggleDrawer())} items={cartItems}/>}
            <Header onClickCart={() => dispatch(toggleDrawer())}/>
            <Outlet
                context={{
                    items,
                    searchValue,
                    setSearchValue,
                    onChangeSearchInput
                }}
            />
        </div>
    );
}

export default App;
