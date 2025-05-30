
"use client";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/ui/tooltip"; 
import dayjs from "dayjs";
import * as React from "react";

export function About() {
    return (
        <>
            <section>
                <h2 className="text-muted-foreground/60 mb-5">About Me</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>
                        I am a software engineer with a passion for building
                        scalable and efficient applications. I have experience
                        in various programming languages and frameworks.
                    </p>
                </div>
            </section>       
            
        </>
    );
}

const birthTimestamp = 1156114801000;
const initialAge = 18;

export function Age() {
    const [age, setAge] = React.useState<number>(initialAge);
    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setAge(dayjs().diff(birthTimestamp, "year", true));
        }, 50);
        return () => clearInterval(intervalId);
    }, []);
    return (
        <TooltipProvider delayDuration={100}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="text-foreground hover:text-muted-foreground/50 transition-all duration-150 cursor-pointer">
                        {age.toFixed(4)}
                    </span>
                </TooltipTrigger>
                <TooltipContent className="text-center max-w-[250px]">
                    <p>{age.toFixed(12)}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}