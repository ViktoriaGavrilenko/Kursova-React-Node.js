import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import styles from "../index.css";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../redux/slices/authSlice";

function Header(props) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const totalPrice = useSelector((state) => state.drawer.totalPrice);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutButton =async () => {
        console.log("Logging out...");
        await dispatch(logout());
        navigate("/");
    };

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex">
                    <img width={40} height={40} src="/img/logo.svg"/>
                    <div>
                        <h3 className="text-uppercase">Electronics shop </h3>
                        <p className="opacity-5">Магазин электроники</p>
                    </div>
                </div>
            </Link>

            <ul className="d-flex">
                <li>
                    <div>
                        <Link to="/home">
                            <Button className={styles.buttons} variant="outlined">На головну</Button>
                        </Link>
                    </div>
                </li>
                <li onClick={props.onClickCart} className="img-drawer cu-p">
                    <img width={18} height={18} src="/img/cart.svg"/>
                    <span>{totalPrice} гр</span>
                </li>
                <li>
                    <div>
                        <Link to="/orders">
                            <Button className={styles.buttons} variant="outlined">Замовлення</Button>
                        </Link>
                    </div>
                </li>
                <li className="img-fav cu-p">
                    <Link to="/favorites">
                        <img width={18} height={18} src="img/heart-liked.svg" alt="Закладки"/>
                    </Link>
                </li>
                <li>
                    <div>
                        {isAuthenticated ? (
                            <Button className={styles.buttons} variant="outlined" onClick={logoutButton}>Вихід</Button>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button className={styles.buttons} variant="outlined">Вхід</Button>
                                </Link>

                                <Link to="/register">
                                    <Button variant="contained">Створити аккаунт</Button>
                                </Link>
                            </>
                        )}
                    </div>

                </li>
            </ul>

        </header>
    )
}

export default Header;