import { cn } from "@/lib/utils";
import { Oswald } from "next/font/google";

const font = Oswald({subsets: ['latin-ext']})

interface HeaderProps {
    label: string;
}

export default function Header({ label }: HeaderProps) {
    return (
        <div className="h-full flex flex-col justify-center items-center gap-y-4">
            <h1 className={cn('text-3xl font-semibold', font.className)}>🔐 Auth</h1>
            <p className="text-muted-foreground text-sm ">{label}</p>
        </div>
    );
}
