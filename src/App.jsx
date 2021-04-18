import React from "react";
import { Route, Switch } from "react-router";
import "./App.less";
import NotFound from "./components/NotFound/NotFound";
import HeroList from "./components/HeroList/HeroList";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.headers.post["Content-Type"] = "application/json";

export const WrappedComponent = ({ store, children }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/hero/:id?"]}>
          <Layout className="container">
            <Layout.Content>{children}</Layout.Content>
          </Layout>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

const App = ({ store }) => (
  <WrappedComponent store={store}>
    <HeroList />
  </WrappedComponent>
);

export default App;
