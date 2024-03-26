import Navbar from "./Navbar";
import Home from "./Home";
import Openai from "./Openai";
import BlogMainPage from "./BlogMainPage";
import BlogPost1 from "./blogs/BlogPost1";
import BlogPost2 from "./blogs/BlogPost2";
import BlogPost3 from "./blogs/BlogPost3";
import "./queries.css";

import { BrowserRouter as Router, Route, Switch} from "react-router-dom/cjs/react-router-dom.min";
import NotFound from "./NotFound";

import ImgGen from "./ImgGen";

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
          <Route path = "/image-gen">
            <ImgGen/>
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