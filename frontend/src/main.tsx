import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App.tsx";

// const router = createBrowserRouter(
//   createRoutesFromElements(<Route path="/blog" element={<Blog />}></Route>)
// );
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <RouterProvider router={router}></RouterProvider> */}
    <App></App>
  </React.StrictMode>
);
