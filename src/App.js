import React from "react";
import { Route, Switch } from "react-router";
import "./App.less";
import NotFound from "./components/NotFound/NotFound";
import HeroList from "./components/HeroList/HeroList";
import { Layout } from "antd";

const App = () => (
  <Layout className="container">
    <Layout.Content>
      <Switch>
        <Route exact path="/" component={HeroList} />
        <Route exact path="/hero/:id?" component={HeroList} />
        <Route component={NotFound} />
      </Switch>
    </Layout.Content>
  </Layout>
);

export default App;
