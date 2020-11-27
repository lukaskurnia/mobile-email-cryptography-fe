import React, {useState} from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import TopBar from "components/TopBar";
import SideBar from "components/SideBar";
import Inbox from "views/Inbox";
import Compose from "views/Compose";
import Sent from "views/Sent";
// import Send from "api/send";
import "./App.scss";

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
      <TopBar onDrawerClick={onDrawerClick} />
      <Router>
        <SideBar onClose={onClose} isDrawerOpen={isDrawerOpen} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Inbox />
            </Route>
            <Route path="/compose">
              <Compose />
            </Route>
            <Route path="/sent">
              <Sent />
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
