import Navbar from "./Navbar";
import Home from "./Home";
import Openai from "./Openai";
import BlogMainPage from "./BlogMainPage";
import BlogPost1 from "./BlogPost1";
import BlogPost2 from "./BlogPost2";
import BlogPost3 from "./BlogPost3";
import "./queries.css";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "./NotFound";

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
            <Route exact path="/blog">
              <BlogMainPage />
            </Route>
            <Route path="/blog/post1">
              <BlogPost1 />
            </Route>
            <Route path="/blog/post2">
              <BlogPost2 />
            </Route>
            <Route path="/blog/post3">
              <BlogPost3 />
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