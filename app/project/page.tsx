'use client'

import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

interface Post {
    id: string;
    title: string;
    content: string;
}

export default function ProjectPage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(db, "posts"));
            const postsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as Post[];
            setPosts(postsData);
        };
    
        fetchPosts();
    }, []);

    return (
        <div className="flex w-full h-screen justify-center items-center">
            Project Page
            <h1>Post Blog</h1>
            <div>
                {posts.map(post => (
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
};
