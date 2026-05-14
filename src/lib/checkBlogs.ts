import { readdir } from "fs/promises";
import fs from "fs";
import path from "path";
import type PostMeta from "@/app/_types/PostMeta";

const BLOGS_DIR = path.join(process.cwd(), "public", "blogs");
const JSON_PATH = path.join(process.cwd(), "public", "utils", "posts.json");

function toDisplayName(stem: string): string {
    return stem.replace(/[_-]/g, " ").replace(/^\w/, (c) => c.toUpperCase());
}

function toDateFromStem(stem: string): string {
    const datePart = stem.split("-").slice(0, 3).join("-");
    return new Date(datePart).toISOString().split("T")[0];
}

async function getSummaryFromMarkdown(filePath: string): Promise<string> {
    const content = await fs.promises.readFile(filePath, "utf-8");
    const lines = content.split("\n").filter((line) => line.trim() !== "");
    return lines.slice(0, 3).join(" ");
}

async function getTagsFromMarkdown(filePath: string): Promise<string[]> {
    const content = await fs.promises.readFile(filePath, "utf-8");
    const tagLine = content.split("\n").pop()?.trim()?.slice(1, -1); // Remove the leading and trailing brackets

    return tagLine ? tagLine.split(", ").map((s) => s.trim()) : [];
}

export default async function checkBlogs() {
    const blogEntries = await readdir(BLOGS_DIR, { withFileTypes: true });

    const files = blogEntries
        .filter((f) => f.isFile() && f.name.endsWith(".md"))
        .sort((a, b) => a.name.localeCompare(b.name));

    return Promise.all(
        files.map(async (f) => {
            const filePath = path.join(BLOGS_DIR, f.name);
            const stem = path.basename(f.name, ".md");
            return {
                slug: stem,
                title: toDisplayName(stem),
                date: toDateFromStem(stem),
                summary: await getSummaryFromMarkdown(filePath),
                tags: await getTagsFromMarkdown(filePath),
            } satisfies PostMeta;
        })
    );
}
