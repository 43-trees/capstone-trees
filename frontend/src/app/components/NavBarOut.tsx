// export function NavBarOut() {
//     return (
//         <div className="navbar rounded-b-lg text-primary bg-secondary">
//             <div className="navbar-start">
//                 <div className="dropdown">
//                     <label tabIndex={0} className="btn btn-ghost lg:hidden">
//                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
//                              stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
//                                   d="M4 6h16M4 12h8m-8 6h16"/>
//                         </svg>
//                     </label>
//                     <ul tabIndex={0}
//                         className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-neutral">
//
//                         <li>
//                             <a>Info</a>
//                             <ul className="p-2">
//                                 <li><a href={"/harvesting"}>Harvesting Resources</a></li>
//                                 <li><a href={"beginner"}>Beginner Tips</a></li>
//                                 <li><a href={"/about"}>About Us</a></li>
//                             </ul>
//                         </li>
//                     </ul>
//                 </div>
//                 <a className="btn btn-ghost normal-case text-2xl" href={'/'}>Urban Orchard</a>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu text-xl menu-horizontal px-1">
//
//                     <li><a href={"/about"}>About Us</a></li>
//                     <li><a href={"/harvesting"}>Harvesting Resources</a></li>
//                     <li><a href={"/beginner"}>Beginner Tips</a></li>
//                 </ul>
//             </div>
//             <div className="navbar-end">
//                 <a className="btn bg-info border-info text-primary" href={"/sign-in"}>Sign In</a>
//             </div>
//         </div>
//     )
// }