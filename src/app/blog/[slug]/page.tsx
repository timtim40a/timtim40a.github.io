"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import postsDataRaw from "../../../../public/utils/posts.json";
import styles from "./blogPost.module.css";

type PostMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

const allPosts = postsDataRaw as PostMeta[];

function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [markdown, setMarkdown] = useState("");

    const post = allPosts.find((p) => p.slug === slug) ?? null;

    useEffect(() => {
        if (!post) return;
        fetch(`/blogs/${post.date}-${post.slug}.md`)
            .then((res) => res.text())
            .then((text) => setMarkdown(text));
    }, [post]);

    if (!post) return <p>Post not found.</p>;

    return (
        <article className={styles.article}>
            <h2>{post.title}</h2>
            <small>{post.date}</small>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
    );
}

export default BlogPost;
