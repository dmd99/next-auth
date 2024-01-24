import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import BackButton from "./back-button"
import Header from "./header"
import Socials from "./socials"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel: string
    backButtonLabel: string
    backButtonHref: string
    showsocials?: boolean
}

const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showsocials }: CardWrapperProps) => {
    return (
        <Card className="w-[400px] shadow-md">
            <CardHeader><Header label={headerLabel} /></CardHeader>
            <CardContent>
                {children}
            </CardContent>
            <CardFooter>
                { showsocials && <Socials />}
            </CardFooter>
            <CardFooter>
                <BackButton backButtonHref={backButtonHref} backButtonLabel={backButtonLabel} />
            </CardFooter>
        </Card>
    )
}

export default CardWrapper