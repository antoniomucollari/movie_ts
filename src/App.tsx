
import './App.css'
import Menu from "./features/home/component/Menu.tsx";
import {BrowserRouter} from "react-router";
import AppRoutes from "./AppRoutes.tsx";

function App() {

  return (
    <>
        <BrowserRouter>
            <Menu/>
            <div className="container">
                <AppRoutes/>
            </div>
        </BrowserRouter>
    </>
  )
}

export default App
