import { RouterProvider } from "react-router";
import { router } from "./routes";
import { ThemeProvider } from "./contexts/ThemeContext";
import { ExpoPopup } from "./components/ExpoPopup";

export default function App() {
  return (
    <ThemeProvider>
      <ExpoPopup />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}