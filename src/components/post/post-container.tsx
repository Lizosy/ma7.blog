import getPosts from "../../lib/posts/fetch-posts";
import { PostItem } from "./post-item";
import { Post } from "../../lib/types";

export async function PostContainer() {
    const posts = await getPosts();

    return (
        <section className="py-6 relative">
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-bold text-muted-foreground/70">Writings</h2>
                <div className="h-px flex-grow bg-gradient-to-r from-muted-foreground/20 to-transparent ml-4"></div>
            </div>
            <div className="grid gap-3 transition-all">
                {posts?.map((post: Post) => (
                    <div key={post.slug} className="group hover:translate-x-1 transition-transform duration-200">
                        <PostItem {...post} />
                    </div>
                ))}
            </div>
        </section>
    );
}