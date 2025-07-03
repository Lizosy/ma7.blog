import getPosts, { getPost } from "../../../lib/posts/fetch-posts";
import { PostBody } from "../../../components/post/body";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getPosts();

    return posts.map((post) => ({
        id: post!.slug,
    }));
}

type PageProps = {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata(
    props: PageProps
): Promise<Metadata> {
    // Await params before accessing its properties
    const params = await props.params;
    const post = await getPost(params.id);

    if (!post) {
        return {
            title: "Post Not Found • dromzeh.dev",
            description: "The requested post could not be found.",
        };
    }

    return {
        title: `${post.title} • dromzeh.dev`,
        description: post.description,
    };
}

export default async function PostPage(props: PageProps) {
    // Await params before accessing its properties
    const params = await props.params;
    const post = await getPost(params.id);

    if (!post) return notFound();

    // More robust date parsing
    const dateParts = post.date.split("-");
    if (dateParts.length !== 3) {
        throw new Error(`Invalid date format: ${post.date}`);
    }

    const [day, month, year] = dateParts;

    // Ensure valid date construction
    const dateObj = new Date(`${year}-${month}-${day}`);
    if (isNaN(dateObj.getTime())) {
        throw new Error(`Invalid date: ${post.date}`);
    }

    const formattedDate = dateObj.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <div className="flex flex-col space-y-8">
                    <div className="flex flex-row space-x-2 items-center justify-between group">
                        <span className="text-neutral-500">
                            <Link
                                href="/"
                                className="text-foreground group-hover:text-muted-foreground/50 transition-colors duration-150 hover:cursor-pointer"
                            >
                                Go Back
                            </Link>
                        </span>
                        <div className="flex-grow border-t border-dotted border-gray-400"></div>
                        <span className="text-muted-foreground">{formattedDate}</span>
                    </div>
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-foreground text-2xl font-semibold">
                            {post.title}
                        </h1>
                    </div>
                </div>
                <section className="flex flex-col space-y-2 mt-8 max-w-xl">
                    <PostBody>{String(post.body)}</PostBody>
                </section>
            </div>
        </div>
    );
}
