import { MDXImage } from "../../components/post/mdx-img";
import { MDXComponents } from "mdx/types";
import NextImage from "next/image";
import { CopyCodeToClipboard } from "./code-utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import React from "react";

interface CodeBlockProps extends Omit<React.ComponentProps<typeof SyntaxHighlighter>, 'language'> {
    children: React.ReactNode
    className?: string
}

function CodeBlock(props: CodeBlockProps): React.ReactElement {
    const { children, className, ...rest } = props
    const language = className ? className.replace(/language-/, '') : ''

    // Ensure children is treated as a string
    const codeString = typeof children === 'string' 
        ? children 
        : Array.isArray(children)
            ? children.join('')
            : String(children);

    return (
        <div className="relative">
            <div className="absolute top-0 right-0 translate-y-5 translate-x-[-4px]">
                <CopyCodeToClipboard code={codeString} />
            </div>
            <SyntaxHighlighter
                language={language}
                style={oneDark}
                className="rounded-sm max-w-[calc(100vw-2rem)] overflow-x-auto"
                showLineNumbers
                {...rest}
            >
                {codeString}
            </SyntaxHighlighter>
        </div>
    )
}

function Strong(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <b {...rest} className="text-foreground font-semibold">
            {children}
        </b>
    );
}

function Italic(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <i {...rest} className="italic">
            {children}
        </i>
    );
}

function CustomLink(
    props: React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
    >,
) {
    const { children, href } = props;
    return (
        <a
            className="text-foreground hover:text-muted-foreground/50 transition duration-150"
            href={href ?? ""}
        >
            {children}
        </a>
    );
}

function Video(
    props: React.DetailedHTMLProps<
        React.VideoHTMLAttributes<HTMLVideoElement>,
        HTMLVideoElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <video {...rest} className="rounded-sm" controls preload="metadata">
            {children}
        </video>
    );
}

function h1(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h1 {...rest} className="text-foreground text-2xl font-semibold pt-8">
            {children}
        </h1>
    );
}

function h2(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h2 {...rest} className="text-foreground text-xl font-semibold pt-8">
            {children}
        </h2>
    );
}

function h3(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLHeadingElement>,
        HTMLHeadingElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <h3 {...rest} className="text-foreground text-lg font-semibold pt-8">
            {children}
        </h3>
    );
}

function inlineCode(
    props: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <code
            {...rest}
            className="bg-background text-foreground code rounded-sm px-1"
        >
            {children}
        </code>
    );
}

function ListItem(
    props: React.DetailedHTMLProps<
        React.LiHTMLAttributes<HTMLLIElement>,
        HTMLLIElement
    >,
) {
    const { children, ...rest } = props;
    return (
        <li {...rest} className="ml-4 list-disc">
            {children}
        </li>
    );
}

export const mdxComponents: MDXComponents = {
    pre: CodeBlock,
    strong: Strong,
    i: Italic,
    img: MDXImage as any,
    Image: NextImage as any,
    a: CustomLink,
    Video: Video,
    h1: h1,
    h2: h2,
    h3: h3,
    code: inlineCode,
    li: ListItem,
};