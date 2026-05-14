// app/blog/page.tsx — Server Component (no directive)
import Link from "next/link";
import styles from "./blogIndex.module.css";
import checkBlogs from "@/lib/checkBlogs";

export default async function BlogIndex() {
    const posts = (await checkBlogs()).sort(
        (a, b) => +new Date(b.date) - +new Date(a.date)
    );
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
