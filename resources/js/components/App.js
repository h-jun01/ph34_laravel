import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "./Header";
import ArticleIndex from "./ArticleIndex";
import ArticleCreate from "./ArticleCreate";
import ArticleShow from "./ArticleShow";
import ArticleEdit from "./ArticleEdit";

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Switch>
                    <Route exact path="/" component={ArticleIndex} />
                    <Route exact path="/create" component={ArticleCreate} />
                    <Route path="/article/edit/:id" component={ArticleEdit} />
                    <Route path="/article/:id" component={ArticleShow} />
                </Switch>
            </div>
        </BrowserRouter>
    );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
