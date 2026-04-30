"use client";
import Link from "next/link";
import postsDataRaw from "../../../public/utils/posts.json";
import styles from "./blogIndex.module.css";

type PostMeta = {
    slug: string;
    title: string;
    date: string;
    summary: string;
    tags: string[];
};

const posts = (postsDataRaw as PostMeta[]).sort(
    (a, b) => +new Date(b.date) - +new Date(a.date)
);

function BlogIndex() {
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
