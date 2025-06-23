
"use client";
import Link from "next/link";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
} from "@/ui/tooltip"; 

import * as React from "react";

export function About() {
    return (
        <>
            <section>
                <h2 className="text-muted-foreground/60  ">About Me</h2>
                <div className="space-y-2 text-muted-foreground">
                    <p>
                        Ehh,What's up, Doc? I'm Ma7be0 coding somestuff or write doc (maybe) 
                    </p>
                </div>
            </section>       
            
        </>
    );
}

