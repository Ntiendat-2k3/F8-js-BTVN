import { useState } from "react";
import Cookies from "js-cookie";

function useCookie(key, initialValue) {
     const [cookie, setCookieState] = useState(() => Cookies.get(key) || initialValue);

     const setCookie = (value, options) => {
          Cookies.set(key, value, options);
          setCookieState(value);
     };

     const removeCookie = (options) => {
          Cookies.remove(key, options);
          setCookieState(null);
     };

     return [cookie, setCookie, removeCookie];
}

export default useCookie;
