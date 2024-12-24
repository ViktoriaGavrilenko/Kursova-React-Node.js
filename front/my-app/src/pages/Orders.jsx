import React, {useEffect} from 'react';
import Card from '../components/Card/Card';
import {useDispatch, useSelector} from "react-redux";
import {fetchOrders, deleteOrder} from "../redux/slices/orderSlice";
import {Link} from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "../index.css";

function Orders() {
    const {order,isLoading, error }  = useSelector((state)=> state.order);
    const dispatch = useDispatch();

    const deleteOrderClick = (orderId)=>{
        dispatch(deleteOrder(orderId));
    }

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    if(!order || order.length === 0){
        return <p>У вас немає замовлень</p>
    }

    if (isLoading) {
        return <p>Загрузка...</p>;
    }

    if (error) {
        return <p>Виникла помилка: {error}</p>;
    }

    const firstOrder = order[0];

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мої замовлення</h1>
            </div>
            <div>
                <Link to="/home">
                    <Button  onClick={() => deleteOrderClick(firstOrder._id)}
                             className={styles.buttons} variant="outlined">Видалити</Button>
                </Link>
            </div>

            <div className="d-flex flex-wrap">
                {firstOrder?.items?.length > 0 ? (
                    <div className="items-list">
                        <div className="order">
                            {firstOrder.items.map((item) => {
                                const product = item.productId || {};
                                return (
                                    <Card
                                        key={product._id}
                                        loading={isLoading}
                                        imageURL={product.imageURL || '/placeholder.jpg'}
                                        name={product.name || 'Назва недоступна'}
                                        price={product.price || 'Ціна недоступна'}
                                        description={product.description || 'Немає опису'}
                                        category={product.category || 'Немає категоршї'}
                                        hideAddButton={true}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <p>Немає товаров в замовленні.</p>
                )}
            </div>
        </div>
    );
}

export default Orders;