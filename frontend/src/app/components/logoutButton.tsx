import logout, {performLogout} from "@/app/sign-out/page";


type logoutProps = {

}

export function LogoutComponent(){



    return(
        <>
            {/*// @ts-ignore*/}
            <form action={performLogout()}>
            <button type="submit">Log Out</button>
        </form>
        </>
    )
}
