"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import postsDataRaw from "../../../../public/utils/posts.json";
import styles from "./blogPost.module.css";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

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
            <ReactMarkdown
                components={{
                    img({ src, alt }) {
                        const url = new URL(
                            typeof src === "string" ? src : "",
                            "http://x"
                        );
                        const width = url.searchParams.get("width") ?? "100%";
                        const height = url.searchParams.get("height") ?? "auto";
                        const cleanSrc =
                            (typeof src === "string" ? src : "").split(
                                "?"
                            )[0] ?? "";

                        return (
                            <img
                                src={cleanSrc}
                                alt={alt ?? ""}
                                style={{ width, height, objectFit: "cover" }}
                            />
                        );
                    },
                    code({ className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        return match ? (
                            <SyntaxHighlighter
                                style={tomorrow}
                                language={match[1]}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className}>{children}</code>
                        );
                    },
                }}
            >
                {markdown}
            </ReactMarkdown>
        </article>
    );
}

export default BlogPost;
