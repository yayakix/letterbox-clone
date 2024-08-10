import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";


const Navbar = () => {
	const navigate = useNavigate();
	const { isSignedIn } = useAuth();
    
    return (
        <div>
            <nav className="bg-black border-gray-200 text-white lg:px-48">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2 bg-black">
                    <div className="flex items-center gap-2">
                        <img src="/box6.png" alt="Letterboxd Clone" className="w-16 h-16" />
                        <h1 className="text-2xl font-bold"><a href="/">Letterboxd Clone</a></h1>
                    </div>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-6 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-black">
                            <li className="flex items-center gap-2 ">
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </li>
                            <li>
                                <a href="/" className="block my-2 px-3 text-slate-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Home</a>
                            </li>
                            <li>
                                <a onClick={() => {
									if (!isSignedIn) {
										alert("Please sign in to view your watchlist");
									} else {
										navigate(`/profile`);
									}
								}} className="block my-2 px-3 text-slate-400 rounded md:bg-transparent md:p-0" aria-current="page">Watchlist</a>
                            </li>
                            <li>
                                <a onClick={() => {
									if (!isSignedIn) {
										alert("Please sign in to view your profile");
									} else {
										navigate(`/profile`);
									}
								}} className="block my-2 px-3 text-slate-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Profile</a>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;