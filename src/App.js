import React from "react";
import { Route, Switch } from "react-router";
import "./App.less";
import NotFound from "./components/NotFound/NotFound";
import HeroList from "./components/HeroList/HeroList";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/hero/:id?"]}>
          <Layout className="container">
            <Layout.Content>
              <HeroList />
            </Layout.Content>
          </Layout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

export default App;
