import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

useEffect(() => {
    if (pathname !== "/") { 
        const timeout = setTimeout(() => {
            window.scrollTo({ top: 450, behavior: "smooth" }); 
        }, 1000);

        return () => clearTimeout(timeout);
    }
}, [pathname]);

  return null;
};

export default ScrollToTop;
