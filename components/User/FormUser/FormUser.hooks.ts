import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import userSchema from "./FormUser.schemas";
import { ModalProps, User } from "./FormUser.types";
import { toast } from "sonner";

const useFormUser = (props: ModalProps) => {
    const { onClose } = props;
    const form = useForm<User>({
        resolver: zodResolver(userSchema),
        defaultValues: {
            name: "",
            email: ""
        },
    })

    const {
        control,
        handleSubmit
    } = form

    const onSubmit = async (data: User) => {
        const objForm = {
            id: crypto.randomUUID(),
            name: sanitizeInput(data.name),
            email: data.email
        }
        const response = await fetch("/api/user", {
            method: "POST",
            body: JSON.stringify(objForm),
        });

        if (!response.ok) throw new Error('Failed to create user');

        if (response) {
            toast("User has been created");
            onClose();
        }
    }

    function sanitizeInput(input: string): string {
        return input.replace(/[<>"'`]/g, '');
    }

    return {
        form,
        control,
        handleSubmit,
        onSubmit
    }
}

export default useFormUser;