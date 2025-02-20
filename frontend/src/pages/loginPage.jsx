import { useState } from "react"
import { Link } from "react-router-dom"
import { useAuthStore } from "../store/userAuth"


const SignupPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { login } = useAuthStore()

    const handleLogin = (e) => {
        e.preventDefault()
        login({ email, password })
    }

    return (
        <>
            <div className="hero-bg w-full h-screen">
                <header className=" py-4 px-6 md:px-12 flex justify-between items-center w-full ">
                    <Link to={"/"}>
                        <img src="/netflix-logo.png" alt="logo" className="w-44" />
                    </Link>
                </header>
                <div className="flex justify-center items-center mt-20">
                    <div className="bg-black/60 flex flex-col justify-center w-[90%] max-w-md p-6 rounded-lg">
                        <h1 className="text-white font-bold text-2xl text-center mb-6">Log In</h1>

                        <form className="space-y-4" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="text-white text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    placeholder="abc@gmail.com"
                                    className="rounded-lg bg-transparent p-2 mt-1 border-2 border-gray-600 focus:outline-none focus:ring text-white w-full"
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
                                    value={password}
                                    placeholder="*********"
                                    className="rounded-lg bg-transparent p-2 mt-1 border-2 border-gray-600 focus:outline-none focus:ring text-white w-full"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button
                                type="submit"
                                className="text-white bg-red-600 py-3 px-6 hover:bg-red-800 rounded-xl font-bold w-full"
                            >
                                Log In
                            </button>
                        </form>

                        <div className="text-white mt-5 text-center">
                            Don&apos;t have an account?{" "}
                            <span className="text-red-700 hover:underline font-bold">
                                <Link to={"/signup"}>Sign Up</Link>
                            </span>
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}

export default SignupPage
