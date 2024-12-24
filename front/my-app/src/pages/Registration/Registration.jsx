import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import styles from "./Registration.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchRegisterUser} from "../../redux/slices/authSlice";

const Registration = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {status, error} = useSelector((state) => state.auth);


    const handleSubmit = async () => {
        try {
            const userData = {fullName, email, password};
            const result = await dispatch(fetchRegisterUser(userData));
            console.log("Регістрація успішна:", result);
            navigate("/home");
            // Сохранение токена в LocalStorage
            if (result.payload && result.payload.token) {
                localStorage.setItem("token", result.payload.token);
                navigate("/home");
            } else {
                console.error("Токен не отриманий:", result.payload);
            }
        } catch (err) {
            console.error("Помилка при регістрації:", err);
        }
    };

    return (
        <Paper sx={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Створення аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <TextField className={styles.field}
                       label="Повне ім'я"
                       fullWidth value={fullName}
                       onChange={(e) => setFullName(e.target.value)}/>
            <TextField className={styles.field}
                       label="E-Mail"
                       fullWidth value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
            <TextField className={styles.field}
                       label="Пароль"
                       type="password"
                       fullWidth value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            {status === "failed" && <Typography color="error">{error}</Typography>}
            <Button size="large" variant="contained" fullWidth onClick={handleSubmit} disabled={status === "loading"}>
                {status === "loading" ? "Регистрація..." : "Зареєструватися"}
            </Button>
        </Paper>
    );
};
export default Registration;