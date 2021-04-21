import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Notebook from "./components/Notebook";

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <div className="login-wrapper">
                        <Login />
                    </div>
                </Route>
                <Route exact path="/notebook">
                    <Notebook />
                </Route>
            </Switch>
        </Router>
    );
}

export default App;
