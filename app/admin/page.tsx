'use client'
import { db, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminPage() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const router = useRouter();

    const addProject = async (e: FormEvent) => {
        e.preventDefault();
        try {
        await addDoc(collection(db, "projects"), {
            title,
            description,
            location,
            createdAt: new Date(),
        });
        alert("Project added!");
        setTitle("");
        setLocation("");
        setDescription("");
        } catch (error) {
        alert("Error adding project: " + (error as Error).message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <div className="flex flex-col w-full h-screen justify-between items-center">
            <div className="flex w-full justify-between p-4">
                <div>
                    <h2>
                        Mun Interior
                    </h2>
                    <p>
                        CMS
                    </p>
                </div>
                <Link href="/">
                    Back Home
                </Link>
            </div>
            <div>
                <form onSubmit={addProject} className="flex flex-col gap-4 w-full">
                    <div className="flex-col w-full">
                        <h2>
                            Project Title
                        </h2>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="p-2 border-[1px] border-black/20 rounded-xl w-full"
                        />
                    </div>
                    <div className="flex-col w-full">
                        <h2>
                            Project Description
                        </h2>
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="p-2 border-[1px] border-black/20 rounded-xl w-full"
                        />
                    </div>
                    <div className="flex-col w-full">
                        <h2>
                            Project Location
                        </h2>
                        <input
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="p-2 border-[1px] border-black/20 rounded-xl w-full"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="px-10 py-2 border-[1px] bg-neutral-900 text-white border-black rounded-xl hover:bg-neutral-800 transition-all duration-300 ease-[cubic-bezier(0.9,_0,_0.1,_1)]"
                    >
                        Add Project
                    </button>
                </form>
            </div>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
