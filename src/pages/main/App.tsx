import React, { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import appRoutes from "../../configs/route";


function App() {
  const routes = useRoutes(appRoutes);

  return <Suspense>{routes}</Suspense>;
}

export default App;
