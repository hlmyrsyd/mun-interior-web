'use client'

import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useLenis from "../components/useLenis";

interface Project {
    id: string;
    title: string;
    description: string;
    location: string;
    createdAt: any;
}

export default function ProjectPage() {
    useLenis();
    const [projects, setProjects] = useState<Project[]>([]);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const q = query(collection(db, "projects"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                
                const projectsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Project[];
                setProjects(projectsData);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="flex flex-col w-full items-center p-6">
            <div className="flex w-full px-24 ">
                <div className="fflex w-full border-b pb-2 mb-4">
                    <h1 className="text-5xl">Projects</h1>
                </div>
            </div>

            <div 
                className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6"
            >
                {projects.map(post => (
                    <div 
                        key={post.id} 
                        className="border overflow-hidden rounded-lg flex flex-col h-96 relative cursor-pointer"
                        onMouseEnter={() => setHoveredId(post.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div
                            id="Projects Image"
                            className="w-full h-full flex relative bg-neutral-500 justify-center items-center"
                        >
                            Test
                        </div>
                        <motion.div 
                            className="p-4 bg-white absolute bottom-0 left-0 right-0"
                            initial={{ 
                                y: "100%",
                            }}
                            animate={{
                                y: hoveredId === post.id ? 0 : "100%"
                            }}
                            transition={{ duration: 0.5, ease: [0.2, 0.97, 0.57, 1] }}
                        >
                            <h2 className="text-xl font-semibold">{post.title}</h2>
                            <p className="text-gray-600">{post.description}</p>
                            <p className="text-sm text-gray-500 mt-2">📍 {post.location}</p>
                        </motion.div>
                    </div>
                ))}
            </div>
        </div>
    );
};
