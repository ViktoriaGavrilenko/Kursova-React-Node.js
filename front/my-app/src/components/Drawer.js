import {useDispatch} from "react-redux";
import {clearDrawer, closeDrawer, removeFromDrawerSync} from "../redux/slices/drawerSlice";
import Info from "./Info";
import {useState} from "react";
import {useSelector} from 'react-redux';
import {clearOrderState, createOrder} from "../redux/slices/orderSlice";

function Drawer() {
    const items = useSelector((state) => state.drawer.items);
    const dispatch = useDispatch();
    const [isOrderComplete, setIsOrderComplete] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const {_id,status, error, order} = useSelector((state) => state.order);

    const totalPrice = useSelector((state) => state.drawer.totalPrice);

    const handleRemoveFromDrawer = (itemId) => {
        dispatch(removeFromDrawerSync(itemId));
    };

    const onClickOrder = async () => {
        if (items.length === 0) {
            alert("Корзина пуста. Добавьте товары.");
            return;
        }
        const orderData = {
            items: items.map((item) => ({
                productId: item.productId || item._id,
                quantity: item.quantity || 1,
            })),
            totalPrice,
        };
        try {
            setIsLoading(true);
            const action = await dispatch(createOrder(orderData));
            console.log(action.payload); // Добавьте это для дебага
            if (action.payload && action.payload._id) {
                console.log("Замовлення створено, ID:", action.payload._id);
                setIsOrderComplete(true);

            } else {
                console.error("Order ID не отриман у відповідь.");
            }
        } catch (err) {
            console.error("Помилка при створенні замовлення:", err);
            alert("Не вдалося оформити замовлення.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDrawerClose = () => {
        dispatch(clearOrderState());
        dispatch(closeDrawer());
        dispatch(clearDrawer());
    };

    const isOpen = useSelector((state) => state.drawer.isOpen);
    if (!isOpen) {
        return null;
    }
    if (order && order._id === null) {
        console.error("Order ID не отриман у відповіді.");
        return <p>Помилка: замовлення не знайдено.</p>;
    }

    if (isLoading) {
        return <p>Загрузка...</p>;
    }
    if (error) {
        return <p>Виникла помилка</p>;
    }
/*
    if (error) {
        return <p>Виникла помилка: {error}</p>;
    }
*/
    return (
        <div className="overlay">
            <div className="drawer">
                <h2 className="mb-30">
                    Корзина
                    <img
                        onClick={handleDrawerClose}
                        className="removeBtn"
                        src="/img/btn-remove.svg"
                        alt="Close"
                    />
                </h2>

                <div className="items">
                    {isOrderComplete ? (
                        <Info
                            title={`Замовлення оформлено!`}
                            description={`Ваше замовлення скоро буде передано курьерскій доставці`}
                            image="img/complete-order.jpg"
                        />
                    ) : items.length > 0 ? (
                        items.map((obj) => {
                            const product = obj.productId || obj;
                            return (
                                <div
                                    key={product._id}
                                    className="cartItem d-flex align-center mb-20"
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${product.imageURL})`
                                        }}
                                        className="cartItemImg"
                                    ></div>
                                    <div className="mr-20 flex-grow-1">
                                        <p className="mb-5">{product.name || "Без назви"}</p>
                                        <b>{product.price || 0} грн</b>
                                        <div>Опис: {product.description || "Опис відсутній"}</div>
                                        <div>
                                            Категорія: {product.category || "Не указана"}
                                        </div>
                                        <div>Просмотри: {product.viewsCount || 0}</div>
                                        <div>Кількість: {obj.quantity || 1}</div>
                                    </div>
                                    <img
                                        className="removeBtn"
                                        src="/img/btn-remove.svg"
                                        alt="Remove"
                                        onClick={() => handleRemoveFromDrawer(product._id)}
                                    />
                                </div>
                            );
                        })
                    ) : (
                        <Info
                            title="Корзина пуста"
                            description="Додайте хоча б один товар, щоб створити замовлення."
                            image="img/empty-cart.jpg"
                        />
                    )}
                </div>
                {items && items.length > 0 && !isOrderComplete && (
                    <div className="cartTotalBlock">
                        <ul>
                            <li>
                                <span>Ітого:</span>
                                <div></div>
                                <b>{totalPrice} грн</b>
                            </li>
                        </ul>
                        <button
                            disabled={isLoading}
                            className="greenButton"
                            onClick={onClickOrder}
                        >
                            {status === "loading"
                                ? "Оформляємо..."
                                : "Оформити замовлення"}
                            <img src="/img/arrow.svg" alt="Arrow"/>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
