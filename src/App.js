import Navbar from "./Navbar";
import Home from "./Home";
import Openai from "./Openai";
import "./queries.css";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "./NotFound";

import ImgGen from "./ImgGen";
import CuratedGallery from "./CuratedGallery";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/openai">
              <Openai />
            </Route>
            <Route path = "/image-gen">
            <ImgGen/>
          </Route>
          <Route path = "/curated-gallery">
            <CuratedGallery/>
          </Route>
          <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;