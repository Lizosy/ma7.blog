import matter from "gray-matter";
import fs from "fs/promises";
import path from "path";
import type { Post } from "../types";
import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
// @ts-ignore - no types available
import remarkA11yEmoji from "@fec/remark-a11y-emoji";
import remarkToc from "remark-toc";

export const getPosts = async () => {
    const posts = await fs.readdir("./src/posts/");

    const sortedPosts = (
        await Promise.all(
            posts
                .filter((file) => path.extname(file) === ".mdx")
                .map(async (file) => {
                    const filePath = `./src/posts/${file}`;

                    const postContent = await fs.readFile(filePath, "utf8");

                    const { data, content } = matter(postContent);

                    if (data.published === false) {
                        return null;
                    }

                    // Also check if required fields exist
                    if (!data.date) {
                        return null;
                    }

                    return {
                        title: data.title,
                        slug: data.slug,
                        date: data.date,
                        description: data.description,
                        views: data.views || null,
                        body: content,
                    } as Post;
                }),
        )
    )
        .filter((post): post is Post => post !== null)
        .sort((a, b) => {
            // No need for null checks anymore since we filter out posts without dates
            const dateA = new Date(a.date.split("-").reverse().join("-"));
            const dateB = new Date(b.date.split("-").reverse().join("-"));
            return dateB.getTime() - dateA.getTime();
        });

    return sortedPosts;
};

export async function getPost(slug: string) {
    const posts = await getPosts();
    const post = posts.find((post) => post?.slug === slug);
    
    if (!post) return null;

    // Serialize the MDX content
    const serialized = await serialize(post.body!, {
        mdxOptions: {
            remarkPlugins: [remarkGfm, remarkA11yEmoji, remarkToc],
            rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
        },
    });

    return {
        ...post,
        serializedBody: serialized,
    };
}

export default getPosts;