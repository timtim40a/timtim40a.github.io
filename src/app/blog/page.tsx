"use client";
// src/pages/BlogIndex.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./blogIndex.module.css";

type PostMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

function BlogIndex() {
    const [posts, setPosts] = useState<PostMeta[]>([]);

    useEffect(() => {
        fetch("/utils/posts.json")
            .then((res) => res.json())
            .then((data: PostMeta[]) => {
                const sorted = [...data].sort(
                    (a, b) => +new Date(b.date) - +new Date(a.date)
                );
                setPosts(sorted);
            });
    }, []);

    return (
        <main>
            <h2>Blog</h2>
            <ul className={styles.posts}>
                {posts.map((post) => (
                    <li className={styles.post} key={post.slug}>
                        <h3>
                            <Link href={`/blog/${post.slug}`}>
                                {post.title}
                            </Link>
                        </h3>
                        <small>{post.date}</small>
                        <p>{post.summary}</p>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export default BlogIndex;
