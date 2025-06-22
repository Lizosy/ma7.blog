"use client";

import { ThemeToggle } from "./theme-toggle";
import { CommandMenu } from "./command";
import { HomeButton } from "./home-button";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function NavigationBar() {
    return (
        <div className="fixed inset-x-0 bottom-0 flex justify-center z-50 translate-y-[-20px]">
            <div className="max-w-md flex items-center border rounded-full bg-background shadow-md hover:scale-105 hover:shadow-lg transition-transform duration-300">
                <div className="flex flex-row items-center space-x-1">
                    <div className="nav-button-wrapper group relative">
                        <div className="absolute inset-0 bg-gray-200/0 group-hover:bg-gray-200/70 rounded-full transition-all duration-300" />
                        <div className="relative z-10"><HomeButton /></div>
                    </div>
                    
                    <div className="nav-button-wrapper group relative">
                        <div className="absolute inset-0 bg-gray-200/0 group-hover:bg-gray-200/70 rounded-full transition-all duration-300" />
                        <div className="relative z-10"><CommandMenu /></div>
                    </div>
                    
                    <div className="nav-button-wrapper group relative">
                        <div className="absolute inset-0 bg-gray-200/0 group-hover:bg-gray-200/70 rounded-full transition-all duration-300" />
                        <div className="relative z-10"><ThemeToggle /></div>
                    </div>
                </div>
            </div>
        </div>
    );
}