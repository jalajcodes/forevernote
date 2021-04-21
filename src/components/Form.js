import { useState, useRef } from "react";
import { useAuth } from "../hooks/useAuth";
import Alert from "@material-ui/lab/Alert";
import { Redirect as RedirectComp } from "react-router-dom";

const Form = ({ option }) => {
    const { signup, signin, sendPasswordResetEmail, user } = useAuth();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [error, setError] = useState("");
    const [loading, setLoading] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        if (option === 1) {
            try {
                setLoading(true);
                setError("");
                const result = await signin(emailRef.current.value, passwordRef.current.value);
                if (result) {
                    emailRef.current.value = "";
                    passwordRef.current.value = "";
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(error.message);
            }
        } else if (option === 2) {
            if (passwordRef.current.value !== passwordConfirmRef.current.value) {
                return setError("Passwords do not match.");
            } else if (passwordRef.current.value.length < 6) {
                return setError("Password should be greater or equal to 6 characters.");
            } else {
                setError(null);
            }
            try {
                setError("");
                setLoading(true);
                const result = signup(emailRef.current.value, passwordRef.current.value);
                if (result.i !== undefined) {
                    emailRef.current.value = "";
                    passwordConfirmRef.current.value = "";
                    passwordRef.current.value = "";
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                setError(error);
            }
        } else if (option === 3) {
            console.log("voila");
            sendPasswordResetEmail(emailRef.current.value);
            emailRef.current.value = "";
        }
    };

    const fillGuestCreds = (e) => {
        e.preventDefault();
        emailRef.current.value = "test@forevernote.com";
        passwordRef.current.value = "123456";
    };

    return (
        <form className="account-form" onSubmit={handleSubmit}>
            {user && <RedirectComp to="/notebook" />}
            <div
                className={
                    "account-form-fields " +
                    (option === 1 ? "sign-in" : option === 2 ? "sign-up" : "forgot")
                }>
                <input
                    ref={emailRef}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="E-mail"
                    required
                />
                <input
                    ref={passwordRef}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    required={option === 1 || option === 2 ? true : false}
                    disabled={option === 3 ? true : false}
                />
                <input
                    ref={passwordConfirmRef}
                    id="repeat-password"
                    name="repeat-password"
                    type="password"
                    placeholder="Repeat password"
                    required={option === 2 ? true : false}
                    disabled={option === 1 || option === 3 ? true : false}
                />
            </div>
            {error && <Alert severity="error">{error}</Alert>}
            <button disabled={loading} className="btn-submit-form" type="submit">
                {loading
                    ? "Loading..."
                    : option === 1
                    ? "Sign in"
                    : option === 2
                    ? "Sign up"
                    : "Reset password"}
            </button>
            <button
                disabled={loading || option !== 1}
                className="btn-submit-form"
                onClick={fillGuestCreds}>
                Guest Account
            </button>
        </form>
    );
};
export default Form;
