import {setJwtToken} from "@/utils/models/fetchSession";

type logoutProps = {

}

export function logoutComponent(){

    return(
        <>
            <button onClick={logout}>Log Out</button>
        </>
    )
}
