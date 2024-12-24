import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import styles from "./Login.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {fetchUserData} from "../../redux/slices/authSlice";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {status, error} = useSelector((state) => state.auth);
    const handleLogin = async () => {
        try {
            const params = {email, password};
            const result = await dispatch(fetchUserData(params));
            console.log("Успішний вхід:", result);
            navigate("/home");
        } catch (err) {
            console.error("Помилка входа:", err);
        }
    };

    return (
        <Paper sx={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вхід в аккаунт
            </Typography>
            <TextField
                className={styles.field}
                label="E-Mail"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
                helperText={error && "Невірно указана пошта або пароль"}
            />
            <TextField
                className={styles.field}
                label="Пароль"
                type="password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                size="large"
                variant="contained"
                fullWidth
                onClick={handleLogin}
                disabled={status === "loading"}
            >
                {status === "loading" ? "Вхід..." : "Увійти"}
            </Button>
        </Paper>
    );
};
export default Login;