"use client";

import { Button } from "../../ui/button";
import { House } from "lucide-react";

export function HomeButton() {
    return (
        <Button
            variant="ghost"
            className="rounded-full hover:bg-primary/10 hover:scale-110 transition-all duration-200"
            onClick={() => {
                window.location.href = "/";
            }}
        >
            <House size={16} className="hover:text-primary transition-colors" />
            {/* <span className="ml-2">Home</span> */}
        </Button>
    );
}