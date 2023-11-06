import React, { useState, Fragment } from "react";
import Body from "./components/Body";
import Loading from "./components/loading";
import "./assets/style.scss";
import "./assets/loading.css";

const App = () => {
     const [isLoading, setIsLoading] = useState(false);

     const handleLoading = (boolean) => {
          setIsLoading(boolean);
     };

     return (
          <>
               {isLoading && <Loading></Loading>}
               <Body handleLoading={handleLoading}></Body>
          </>
     );
};

export default App;
