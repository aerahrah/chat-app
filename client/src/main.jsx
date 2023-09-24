import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import useThemeStore from "./components/state/useThemeStore.js";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const Root = () => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className={`${theme} `}>
          <App />
        </div>
      </QueryClientProvider>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
