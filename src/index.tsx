import ReactDOM from "react-dom/client";

import { Context } from "./common/context/Context";
import { Router } from "./common/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Context>
    <Router />
  </Context>,
);
