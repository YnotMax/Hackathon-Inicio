import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import Bunker from "./pages/Bunker";
import Onboarding from "./pages/Onboarding";
import Guilda from "./pages/Guilda";
import Oraculo from "./pages/Oraculo";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Bunker />} />
              <Route path="onboarding" element={<Onboarding />} />
              <Route path="guilda" element={<Guilda />} />
              {/* <Route path="oraculo" element={<Oraculo />} /> */}
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ErrorBoundary>
  );
}

