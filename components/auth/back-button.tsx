import { Button } from "@/components/ui/button";
import Link from "next/link";


interface BackButtonProps {
    backButtonHref: string;
    backButtonLabel: string;
}

const BackButton = ({ backButtonHref, backButtonLabel}: BackButtonProps) => {
    return (
        <Button className="font-normal w-full text-sm" variant='link' asChild>
            <Link href={backButtonHref}>{backButtonLabel}</Link>
        </Button>
    )
}

export default BackButton