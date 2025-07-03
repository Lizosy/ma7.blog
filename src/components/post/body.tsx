"use client"
import { MDXRemote } from "next-mdx-remote";
import { mdxComponents } from "./markdown-component";
import { serialize } from "next-mdx-remote/serialize";
import { useEffect, useState } from "react";

export function PostBody({ children }: { children: string }) {
    const [serializedContent, setSerializedContent] = useState<any>(null);
    
    useEffect(() => {
        async function serializeContent() {
            if (children) {
                const serialized = await serialize(children);
                setSerializedContent(serialized);
            }
        }
        
        serializeContent();
    }, [children]);
    
    if (!serializedContent) {
        return <div>Loading content...</div>;
    }
    
    return (
        <MDXRemote
            {...serializedContent}
            components={{...mdxComponents}}
        />
    );
}