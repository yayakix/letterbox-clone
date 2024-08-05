import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import MovieProfile from "./components/pages/MovieProfile";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
        <MovieProfile />
      </SignedIn>
    </header>
  )
}
