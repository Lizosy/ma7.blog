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

const transition: Transition = { type: "spring", bounce: 0.3, duration: 0.3 };

type ContextType = {
    status: string;
    setStatus: React.Dispatch<React.SetStateAction<string>>;
};

const Context = React.createContext<ContextType>({
    status: "",
    setStatus: () => null,
});

function SocialsContent() {
    const ctx = React.useContext<ContextType>(Context);

    const icon: Variants = {
        hidden: {
            opacity: 0,
            y: 15,
            x: "-1%",
            filter: "blur(3px)",
            rotate: "0deg",
        },
        show: (custom: { rotateRight: boolean }) => ({
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            rotate: custom?.rotateRight ? "6deg" : "-3deg",
        }),
        exit: {
            opacity: 0,
            y: 15,
            filter: "blur(3px)",
            rotate: "0deg",
            transition: { ...transition, duration: 0.5 },
        },
    };

    return (
        <div className="relative flex h-full">
            <div className="absolute left-0 top-0 h-full flex items-center">
            <Dock 
                iconMagnification={60} 
                iconDistance={100} 
                
                className="border-none outline-none mb-5"
            >
                <DockIcon>
                <span className="text-sm font-medium">GitHub</span>
                </DockIcon>
                <DockIcon>
                <span className="text-sm font-medium">mail</span>
                </DockIcon>
            </Dock>
            </div>
        </div>
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