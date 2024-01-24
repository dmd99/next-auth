import { CheckCircle2 } from "lucide-react"


interface FormSuccessProps {
    message?: string
}

const FormSuccess = ({ message }: FormSuccessProps) => {
    if (!message) return null;
    
    return (
        <div className="bg-green-200 p-3 rounded-md flex items-center justify-start gap-2 text-green-800">
            <CheckCircle2 className="h-5 w-5" />
            {message}
        </div>
    )
}

export default FormSuccess