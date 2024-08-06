import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


const Navbar = () => {
    return (
        <div>
            <nav className="bg-black border-gray-200 text-white">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 bg-black">
                    <h1 className="text-2xl font-bold">Letterboxd Clone</h1>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 bg-black">
                            <li>
                                <SignedOut>
                                    <SignInButton />
                                </SignedOut>
                                <SignedIn>
                                    <UserButton />
                                </SignedIn>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3 text-slate-400 rounded md:bg-transparent md:p-0" aria-current="page">Films</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3  text-slate-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Lists</a>
                            </li>
                            <li>
                                <a href="#" className="block py-2 px-3  text-slate-400 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Watchlist</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;