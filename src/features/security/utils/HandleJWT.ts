import type AuthenticationResponse from "../models/AuthenticationResponse.ts";
import type Claim from "../models/Claim.model.ts";

export function storeToken(authenticationResponse: AuthenticationResponse){
    localStorage.setItem("tokenKey", authenticationResponse.token);
    localStorage.setItem("expirationKey", authenticationResponse.expiration.toString());

}

export function getClaims(): Claim[]{
    const token = getToken();
    const expiration = localStorage.getItem("expirationKey");
    if (!token || !expiration) {
        return [];
    }
    const expirationDate = new Date(expiration);
    if (isNaN(expirationDate.getTime()) || expirationDate <=new Date()){
        logout();
        return [];
    }

    try{
        const payloadBase64 = token.split('.')[1]
        const payloadJson = atob(payloadBase64);
        const dataToken = JSON.parse(payloadJson);
        const claims: Claim[] = Object.entries(dataToken).map(([name, value])=>({name, value:String(value)}));
        return claims;
    }
    catch(error){
        console.log(error);
        logout();
        return [];
    }
}

export function logout(){
    localStorage.removeItem("tokenKey");
    localStorage.removeItem("expirationKey");
}

export function getToken(){
    return localStorage.getItem("tokenKey");
}