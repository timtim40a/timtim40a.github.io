import checkBlogs from "@/lib/checkBlogs";
import fs from "fs/promises";
import path from "path";
import BlogPost from "./BlogPost"; // client component

export async function generateStaticParams() {
    const posts = await checkBlogs();
    return posts.map((p) => ({ slug: p.slug }));
}

export default async function Page({ params }: { params: { slug: string } }) {
    const posts = await checkBlogs();
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) return <p>Post not found.</p>;

    const markdown = await fs.readFile(
        path.join(process.cwd(), "public", "blogs", `${post.slug}.md`),
        "utf-8"
    );
    return <BlogPost post={post} markdown={markdown} />;
}
