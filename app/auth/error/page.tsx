import CardWrapper from "@/components/auth/card-wrapper"
import { AlertTriangle } from "lucide-react"


const ErrorPage = () => {
  return (
    <CardWrapper headerLabel="Une erreur s'est produite" backButtonHref="/auth/login" backButtonLabel="Se connecter">
        <div className="flex justify-center items-center">
            <AlertTriangle className="text-destructive" size={64} />
        </div>
    </CardWrapper>
  )
}

export default ErrorPage