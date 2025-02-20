import { Link } from "react-router-dom"
import { useState } from "react"
import { useAuthStore } from "../store/userAuth";

const Signup = () => {
    const { searchParams } = new URL(document.location)
    const emailValue = searchParams.get("email")

    const [email, setEmail] = useState(emailValue)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const { signup } = useAuthStore()

    const handleSignUp = (e) => {
        e.preventDefault()
        signup({ username, email, password })
    }

    return (
        <>
            <div className="hero-bg w-full h-screen">
                <header className="py-4 px-6 md:px-12 flex justify-between items-center w-full">
                    <Link to={"/"}>
                        <img src="netflix-logo.png" alt="logo" className="w-44" />
                    </Link>
                </header>

                <div className="flex justify-center items-center mt-20">
                    <div className="bg-black/60 flex flex-col justify-center w-[90%] max-w-md p-6 rounded-lg">
                        <h1 className="text-white font-bold text-2xl text-center mb-6">Sign Up</h1>

                        <form className="space-y-4" onSubmit={handleSignUp}>
                            <div>
                                <label htmlFor="username" className="text-white text-sm font-medium">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    id="username"
                                    placeholder="Username"
                                    className="rounded-lg bg-transparent p-2 mt-1 border-2 border-gray-600 focus:outline-none focus:ring text-white w-full"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="text-white text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="abc@gmail.com"
                                    className="rounded-lg bg-transparent p-2 mt-1 border-2 border-gray-600 focus:outline-none focus:ring text-white w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="text-white text-sm font-medium">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="*********"
                                    className="rounded-lg bg-transparent p-2 mt-1 border-2 border-gray-600 focus:outline-none focus:ring text-white w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                className="text-white bg-red-600 py-3 px-6 hover:bg-red-800 rounded-xl font-bold w-full "
                                type="submit"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="text-white mt-5 text-center">
                            Already have an account?{" "}
                            <span className="text-red-700 hover:underline font-bold">
                                <Link to={"/login"}>Login</Link>
                            </span>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default Signup
