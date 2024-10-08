import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { SearchProvider } from "./contexts/SearchContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthContextProvider>
    <SearchProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </SearchProvider>
  </AuthContextProvider>
);