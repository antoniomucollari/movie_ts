import "./App.css";
import Menu from "./features/home/component/Menu.tsx";
import { BrowserRouter } from "react-router";
import AppRoutes from "./AppRoutes.tsx";
import AuthenticationContext from "./features/security/utils/AuthenticationContext.ts";
import { useEffect, useState } from "react";
import type Claim from "./features/security/models/Claim.model.ts";
import { getClaims } from "./features/security/utils/HandleJWT.ts";
import WelcomeModal from "./components/WelcomeModal.tsx";

function App() {
  const [claims, setClaims] = useState<Claim[]>([]);

  useEffect(() => {
    setClaims(getClaims());
  }, []);
  function updateClaims(claimsProp: Claim[]) {
    setClaims(claimsProp);
  }
  return (
    <>
      <BrowserRouter>
        <AuthenticationContext.Provider
          value={{ claims, update: updateClaims }}
        >
          <WelcomeModal />
          <Menu />
          <div className="container">
            <AppRoutes />
          </div>
        </AuthenticationContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
