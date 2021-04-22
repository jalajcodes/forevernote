import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Notebook from "./components/Notebook";
import { useAuth } from "./hooks/useAuth";
import { makeStyles } from "@material-ui/core";
import Progress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
    },
}));

const App = () => {
    const classes = useStyles();
    const { loading } = useAuth();

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className="login-wrapper">
                        <Login />
                    </div>
                </Route>
                <Route exact path="/notebook">
                    {loading ? (
                        <div className={classes.root}>
                            <Progress />;
                        </div>
                    ) : (
                        <Notebook />
                    )}
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
