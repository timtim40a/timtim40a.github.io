import Link from "next/link";
import styles from "./blogIndex.module.css";
import checkBlogs from "@/lib/checkBlogs";

export default async function BlogIndex({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { q } = await searchParams;
    const query = (q ? decodeURIComponent(q) : "").toLowerCase();

    const posts = (await checkBlogs())
        .sort((a, b) => +new Date(b.date) - +new Date(a.date))
        .filter(
            (post) =>
                post.title.toLowerCase().includes(query) ||
                post.summary.toLowerCase().includes(query) ||
                post.tags.some((tag) => tag.toLowerCase().includes(query))
        );

    return (
        <main>
            <h2>Blog</h2>
            <search className={styles.search}>
                <form action="/blog" method="GET">
                    <div className={styles.searchControls}>
                        <input
                            type="text"
                            name="q"
                            defaultValue={q ?? ""}
                            placeholder="Search posts..."
                            className={styles.searchInput}
                        />
                        <button type="submit" className={styles.searchButton}>
                            Search
                        </button>
                        {/* <button className={styles.filterButton}>Filter</button>
                        <button className={styles.sortButton}>Sort</button> */}
                    </div>
                </form>
                <div className={styles.tags}>
                    <Link href="/blog?q=%23webdev" className={styles.tagButton}>
                        #webdev
                    </Link>
                    <Link href="/blog?q=%23art" className={styles.tagButton}>
                        #art
                    </Link>
                    <Link href="/blog?q=%23misc" className={styles.tagButton}>
                        #misc
                    </Link>
                </div>
            </search>
            <ul className={styles.posts}>
                {posts.map((post) => (
                    <li className={styles.post} key={post.slug}>
                        <div className={styles.topPane}>
                            <h3>
                                <Link href={`/blog/${post.slug}`}>
                                    {post.title}
                                </Link>
                            </h3>
                            <div className={styles.tags}>
                                {post.tags.map((tag) => (
                                    <span className={styles.tag} key={tag}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <small>{post.date}</small>
                        <p>{post.summary}</p>
                    </li>
                ))}
                {posts.length === 0 && <p>Nothing found.</p>}
            </ul>
        </main>
    );
}
