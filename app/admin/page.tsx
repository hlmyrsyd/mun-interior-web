'use client'
import { db, auth } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const router = useRouter();

    const addPost = async (e: FormEvent) => {
        e.preventDefault();
        try {
        await addDoc(collection(db, "posts"), {
            title,
            content,
            createdAt: new Date(),
        });
        alert("Post added!");
        setTitle("");
        setContent("");
        } catch (error) {
        alert("Error adding post: " + (error as Error).message);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    return (
        <div>
            Admin Page
            <form onSubmit={addPost}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Add Post</button>
            </form>
        <button onClick={handleLogout}>Logout</button>
        </div>
    );
};
