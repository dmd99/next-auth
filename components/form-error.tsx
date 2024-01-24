import { AlertTriangle } from "lucide-react"


interface FormErrorProps {
    message?: string
}

const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;
    
    return (
        <div className="bg-destructive/15 p-3 rounded-md flex items-center justify-start gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5" />
            {message}
        </div>
    )
}

export default FormError