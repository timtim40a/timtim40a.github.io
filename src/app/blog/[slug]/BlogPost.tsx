"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";
import type PostMeta from "../../_types/PostMeta";
import styles from "./blogPost.module.css";
import remarkUnwrapImages from "remark-unwrap-images";

interface BlogPostProps {
    post: PostMeta;
    markdown: string;
}

function addFigureNumbers(markdown: string) {
    let figureNumber = 1;

    return markdown.replace(
        /!\[(.*?)\]\((.*?)(\?[^)]*?)?\)/g,
        (_, alt, src, query = "") => {
            const fullUrl = `${src}${query}`;
            const url = new URL(fullUrl, "http://x");

            url.searchParams.set(
                "desc",
                `Figure ${String(figureNumber++).padStart(2, "0")}. ${alt}`
            );

            const pathname = url.pathname;
            const search = url.searchParams.toString();
            return `![${alt}](${pathname}?${search})`;
        }
    );
}

function BlogPost({ post, markdown }: BlogPostProps) {
    return (
        <article className={styles.article}>
            <h2>{post.title}</h2>
            <small>{post.date}</small>

            <ReactMarkdown
                remarkPlugins={[remarkUnwrapImages]}
                components={{
                    hr() {
                        return <hr className={styles.divider} />;
                    },

                    img({ src, alt }) {
                        const rawSrc = typeof src === "string" ? src : "";
                        const url = new URL(rawSrc, "http://x");

                        const width = url.searchParams.get("width") ?? "100%";
                        const height = url.searchParams.get("height") ?? "auto";
                        const desc = url.searchParams.get("desc") ?? "";
                        const cleanSrc = rawSrc.split("?")[0] ?? "";

                        return (
                            <figure className={styles.figure}>
                                <img
                                    src={cleanSrc}
                                    alt={alt ?? ""}
                                    style={{ width, height }}
                                />
                                {desc && (
                                    <figcaption className={styles.figcaption}>
                                        {desc}
                                    </figcaption>
                                )}
                            </figure>
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

                    ul({ children }) {
                        return <ul className={styles.ul}>{children}</ul>;
                    },
                }}
            >
                {addFigureNumbers(markdown)}
            </ReactMarkdown>
        </article>
    );
}

export default BlogPost;
