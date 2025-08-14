
import './App.css'
import Menu from "./features/home/component/Menu.tsx";
import {BrowserRouter} from "react-router";
import AppRoutes from "./AppRoutes.tsx";
import AuthenticationContext from "./features/security/utils/AuthenticationContext.ts";
import {useState} from "react";
import type Claim from "./features/security/models/Claim.model.ts";

function App() {
    const [claims, setClaims] = useState<Claim[]>([{name: 'gay', value: 'aa'}]);
    function updateClaims(claimsProp: Claim[]) {
        setClaims(claimsProp);
    }
  return (
    <>
        <BrowserRouter>
            <AuthenticationContext.Provider value={{claims, update: updateClaims}}>
                <Menu/>
                <div className="container">
                    <AppRoutes/>
                </div>
            </AuthenticationContext.Provider>
        </BrowserRouter>
    </>
  )
}

export default App
