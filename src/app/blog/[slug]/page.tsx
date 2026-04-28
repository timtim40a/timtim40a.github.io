'use client'
// src/pages/BlogPost.tsx
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import "./BlogPost.css";

type PostMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<PostMeta | null>(null);
    const [markdown, setMarkdown] = useState("");

    useEffect(() => {
        if (!slug) return;

        // 1. load metadata
        fetch("/utils/posts.json")
            .then((res) => res.json())
            .then((all: PostMeta[]) => {
                const found = all.find((p) => p.slug === slug);
                if (!found) return;
                setPost(found);

                // 2. load markdown for this post
                console.log(
                    "Fetching blog post:",
                    "/blogs/" + found.date + "-" + found.slug + ".md"
                );
                return fetch("/blogs/" + found.date + "-" + found.slug + ".md");
            })
            .then((res) => (res ? res.text() : ""))
            .then((text) => {
                if (text) setMarkdown(text);
            });
    }, [slug]);

    if (!post) return <p>Loading...</p>;

    return (
        <article>
            <h2>{post.title}</h2>
            <small>{post.date}</small>
            <ReactMarkdown>{markdown}</ReactMarkdown>
        </article>
    );
}

export default BlogPost;
