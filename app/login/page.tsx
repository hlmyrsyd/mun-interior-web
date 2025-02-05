"use client";
import { auth } from "../../lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const router = useRouter();

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/admin");
        } catch (error) {
        alert("Login failed: " + (error as Error).message);
        }
    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
            <div className="flex pt-4 pl-4 pb-4 w-1/3 h-screen">
                <div className="flex bg-neutral-700 w-full rounded-3xl">
                </div>
            </div>
            {/* LOGIN FORM */}
            <div className="flex p-4 flex-col justify-between items-center h-full w-2/3">
                <div className="flex w-full justify-end gap-1">
                    Login Page for <b>Mun Interior</b>
                </div>
                <div className="flex flex-col gap-10 w-1/3">
                    <div className="flex flex-col">
                        <h1 className="font-bold text-4xl">
                            Hallo Angel
                        </h1>
                        <p>
                            Welcome Back
                        </p>
                    </div>
                    <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
                        <div className="flex-col w-full">
                            <h2>Email</h2>
                            <input
                                type="email"
                                placeholder="Enter given email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="p-2 border-[1px] border-black/20 rounded-xl w-full"
                            />
                        </div>
                        <div>
                            <h2>Password</h2>
                            <input
                                type="password"
                                placeholder="Enter given password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="p-2 border-[1px] border-black/20 rounded-xl w-full"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="px-10 py-2 border-[1px] bg-neutral-900 text-white border-black rounded-xl hover:bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.9,_0,_0.1,_1)]"
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="flex w-full justify-end">
                    © 2025 Mun Interior
                </div>
            </div>
        </div>
    );
}
