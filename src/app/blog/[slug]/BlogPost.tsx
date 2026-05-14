"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import type PostMeta from "../../_types/PostMeta";
import styles from "./blogPost.module.css";

interface BlogPostProps {
    post: PostMeta;
    markdown: string;
}

function BlogPost({ post, markdown }: BlogPostProps) {
    return (
        <article className={styles.article}>
            <h2>{post.title}</h2>
            <small>{post.date}</small>
            <ReactMarkdown
                components={{
                    hr() {
                        return <hr className={styles.divider} />;
                    },
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
