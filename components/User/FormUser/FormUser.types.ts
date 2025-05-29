import { z } from "zod";
import userSchema from "./FormUser.schemas";

export type User = z.infer<typeof userSchema>

export interface ModalProps {
    open: boolean;
    onClose: () => void;
}