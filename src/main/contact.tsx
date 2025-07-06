"use client";

import { Dock, DockIcon } from "../ui/Dock";
import {
    AnimatePresence,
    motion,
    MotionConfig,
    Variants,
    type Transition,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Github, Mail, Twitter, Linkedin, ExternalLink } from "lucide-react";

const transition: Transition = { type: "spring", bounce: 0.3, duration: 0.4 };

type ContextType = {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextType>({
    status: "",
    setStatus: () => null,
});

const socialLinks = [
    {
        name: "GitHub",
        icon: Github,
        url: "https://github.com/Lizosy",
        color: "hover:text-purple-400",
        bgGlow: "hover:shadow-purple-400/20",
    },
    {
        name: "Email",
        icon: Mail,
        url: "mailto:ma7be0@gmail.com",
        color: "hover:text-blue-400",
        bgGlow: "hover:shadow-blue-400/20",
    },

    {
        name: "LinkedIn",
        icon: Linkedin,
        url: "https://linkedin.com/in/",
        color: "hover:text-green-400",
        bgGlow: "hover:shadow-green-400/20",
    },
];

function SocialsContent() {
    const ctx = React.useContext<ContextType>(Context);
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            scale: 0.8,
            filter: "blur(4px)",
        },
        show: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.6,
            },
        },
    };

    return (
        <motion.div
            className="relative flex h-full w-full"
            variants={containerVariants}
            initial="hidden"
            animate="show"
        >
            <div className="flex items-start justify-start w-full mt-10">
                <motion.div
                    className="flex flex-wrap gap-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                >
                    {socialLinks.map((social, index) => {
                        const Icon = social.icon;
                        return (
                            <motion.div
                                key={social.name}
                                variants={itemVariants}
                                whileHover={{
                                    scale: 1.1,
                                    y: -5,
                                    transition: { type: "spring", bounce: 0.6, duration: 0.3 },
                                }}
                                whileTap={{ scale: 0.95 }}
                                onHoverStart={() => setHoveredIndex(index)}
                                onHoverEnd={() => setHoveredIndex(null)}
                            >
                                <Link
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`
                                        group relative flex items-center gap-3 px-6 py-3 
                                        bg-background/40 hover:bg-background/60
                                        border border-border/30 hover:border-border/60
                                        rounded-xl transition-all duration-300
                                        ${social.color} ${social.bgGlow}
                                        hover:shadow-lg hover:shadow-black/10
                                        dark:hover:shadow-white/5
                                    `}
                                >
                                    <div className="relative">
                                        <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                                        <motion.div
                                            className="absolute inset-0 bg-current opacity-20 rounded-full blur-sm"
                                            initial={{ scale: 0 }}
                                            animate={{
                                                scale: hoveredIndex === index ? 1.5 : 0,
                                                opacity: hoveredIndex === index ? 0.3 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>

                                    <span className="text-sm font-medium transition-colors duration-300">
                                        {social.name}
                                    </span>

                                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-70 transition-all duration-300 transform translate-x-0 group-hover:translate-x-1" />

                                    {/* Glow effect */}
                                    <motion.div
                                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        style={{
                                            background: `linear-gradient(45deg, transparent, currentColor, transparent)`,
                                            backgroundSize: "200% 200%",
                                        }}
                                        animate={{
                                            backgroundPosition:
                                                hoveredIndex === index
                                                    ? ["0% 0%", "100% 100%"]
                                                    : "0% 0%",
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            repeatType: "reverse",
                                        }}
                                    />
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-current opacity-20 rounded-full"
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + i * 10}%`,
                        }}
                    />
                ))}
            </div>
        </motion.div>
    );
}

export function ContactContainer() {
    const [status, setStatus] = React.useState("idle");

    React.useEffect(() => {
        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") {
                setStatus("idle");
            }
        }
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [setStatus]);

    return (
        <Context.Provider value={{ status, setStatus }}>
            <MotionConfig transition={transition}>
                <SocialsContent />
            </MotionConfig>
        </Context.Provider>
    );
}