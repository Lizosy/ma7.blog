import Image from "next/image";


// Update the import path below to the correct relative path if 'about.tsx' is in 'src/components/main/about.tsx'
import { About } from "@/main/about"




export default function Home() {
    return (
        <div className="min-h-screen max-w-xl mx-auto flex items-center justify-center">
            <div className="py-24 px-6 text-sm">
                <section className="flex flex-col space-y-8">
                   <About/>
                   
                </section>
            </div>
        </div>
    );
}