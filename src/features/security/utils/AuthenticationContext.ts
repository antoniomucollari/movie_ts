import type Claim from "../models/Claim.model.ts";
import {createContext} from "react";
const AuthenticationContext = createContext<AuthenticationContextProps>({
    claims: [], update: ()=>{}
})

export default AuthenticationContext
interface AuthenticationContextProps {
    claims: Claim[];
    update(claims: Claim[]): void;
}