import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "tailwindcss/tailwind.css";
import "@fontsource-variable/geist";
// import "@fontsource/poppins/400.css";
// import "@fontsource/poppins/600.css";
// import "@fontsource/poppins/700.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StrictMode>,
);
