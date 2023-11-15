'use client'
import {setJwtToken} from "@/utils/models/fetchSession";

type logoutProps = {

}

export function LogoutComponent(){

    return(
        <>
            <button onClick={logout}>Log Out</button>
        </>
    )
}

function logout() {
    setJwtToken('')
    fetch('/apis/sign-out/')
}