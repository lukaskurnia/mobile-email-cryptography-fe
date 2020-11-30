import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TopBar from "components/TopBar";
import SideBar from "components/SideBar";
import Inbox from "views/Inbox";
import Compose from "views/Compose";
import Sent from "views/Sent";
import GenerateKey from "views/GenerateKey";

import classes from "./App.module.scss";

function App() {
  const [isDrawerOpen, setDrawer] = useState(false);

  const onClose = () => {
    setDrawer(false);
    window.scrollTo(0, 0);
  };

  const onDrawerClick = () => {
    setDrawer(!isDrawerOpen);
  };

  return (
    <div>
      <Router>
        <TopBar onDrawerClick={onDrawerClick} />
        <SideBar onClose={onClose} isDrawerOpen={isDrawerOpen} />
        <div className={classes.content}>
          <Switch>
            <Route path="/compose" name="compose">
              <Compose />
            </Route>
            <Route path="/sent">
              <Sent />
            </Route>
            <Route path="/generate_key">
              <GenerateKey />
            </Route>
            <Route exact path="/">
              <Inbox />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
// {
//   /* <p dangerouslySetInnerHTML={{__html: text}}></p> */
// }
