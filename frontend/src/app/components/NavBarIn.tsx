import {getSession, Session, setJwtToken} from "@/utils/models/fetchSession";

type NavBarProps = {
    session: Session | undefined
}
export async function NavBarIn() {
    console.log("calling to session")
    const session = await getSession();
    function logout() {
        setJwtToken('')
        fetch('/apis/sign-out/')
    }
    if(session === undefined) {
        return ( <>   <div className="navbar rounded-b-lg text-primary bg-secondary">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-neutral">

                        <li>
                            <a>Info</a>
                            <ul className="p-2">
                                <li><a href={"/resources"}>Resources</a></li>
                                <li><a href={"harvesting-basics"}>Harvesting 101</a></li>
                                <li><a href={"/about"}>About Us</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case" href={'/'}><img  className="w-14" src="/trees-logo.png" alt="Urban Orchard Logo of hands acting as tree trunk holding the leaves"/></a>
                <a className="btn  btn-ghost normal-case text-2xl" href={'/'}>Urban Orchard</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu text-xl menu-horizontal px-1">

                    <li><a href={"/about"}>About Us</a></li>
                    <li><a href={"/resources"}>Resources</a></li>
                    <li><a href={"/harvesting-basics"}>Harvesting 101</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn bg-info border-info text-primary" href={"/sign-in"}>Sign In</a>
            </div>
        </div>
        </>
    )
    }
    return(
        <div className="navbar rounded-b-lg text-primary bg-secondary">
            <div className="">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h8m-8 6h16"/>
                        </svg>
                    </label>
                    <ul tabIndex={0}
                        className="menu menu-sm  dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-neutral">

                        <li>
                            <a>Info</a>
                            <ul className="p-2">
                                <li><a href={"/resources"}>Resources</a></li>
                                <li><a href={"harvesting"}>Harvesting 101</a></li>
                                <li><a href={"/about"}>About Us</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>


            </div>
            <div className="flex mx-auto">
            <div className="navbar-center hidden md:flex">
                <ul className="menu text-xl menu-horizontal px-1">

                    <li><a href={"/about"}>About Us</a></li>
                    <li><a href={"/resources"}>Resources</a></li>
                    <li><a href={"/harvesting-basics"}>Harvesting 101</a></li>
                </ul>
            </div>
            </div>

            <div>
            <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                        <img src={`${session.profile.profileImageUrl}`} alt="user profile image"/>
                    </div>
                </label>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 text-neutral shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">

                    <li><a href={"/settings"}>User Settings</a></li>
                </ul>
            </div>
            </div>
        </div>
    )
}


// <div className="dropdown dropdown-end">
//     <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//             <img src="https://placekitten.com/200/300" alt="placeholder profile picture"/>
//         </div>
//     </label>
//     <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
//
//         <li><a>User Settings</a></li>
//         <li><a>Logout</a></li>
//     </ul>
// </div>