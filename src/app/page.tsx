import Image from "next/image";


// Update the import path below to the correct relative path if 'about.tsx' is in 'src/components/main/about.tsx'
import { About } from "@/main/about"
import { ContactContainer } from "../main/contact";
import { MorphingText } from "../components/magicui/morphing-text";



export default function Home() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center relative">
            <div className="py-24 px-1 text-sm">
                <section className="flex-1 flex-col space-y-10 w-full max-w-4xl mx-auto">
                    <MorphingText
                        texts={[
                            "Ma7be0",
                            "Geek", 
                        ]}
                        className="text-left md:text-l mb-8"
                    />
                    <ContactContainer/>
                    <About/>
                </section>
            </div>
            
            {/* Spinning text in bottom right */}
            <div className="fixed bottom-8 right-8 z-30">
                <div className="relative w-20 h-20">
                    <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
                        <defs>
                            <path
                                id="circle"
                                d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            />
                        </defs>
                        <text className="text-xs fill-current text-foreground/70">
                            <textPath href="#circle" className="uppercase tracking-widest">
                                Available for work • Available for work • 
                            </textPath>
                        </text>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>
        </div>
    );
}