import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Root element not found in HTML");
  throw new Error("Root element with id 'root' not found in HTML");
}

try {
  createRoot(rootElement).render(<App />);
} catch (error) {
  console.error("Failed to mount app:", error);
  rootElement.innerHTML = `
    <div style="padding: 20px; text-align: center; font-family: sans-serif;">
      <h1 style="color: #d32f2f;">Application Failed to Start</h1>
      <p>Check browser console for errors</p>
      <pre style="background: #f5f5f5; padding: 15px; border-radius: 4px; text-align: left;">
        ${error instanceof Error ? error.message : String(error)}
      </pre>
    </div>
  `;
}
