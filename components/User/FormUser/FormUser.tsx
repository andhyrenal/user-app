'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "../../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import useFormUser from "./FormUser.hooks";
import { ModalProps } from "./FormUser.types";

const FormUser = (props: ModalProps) => {
    const {
        control,
        form,
        handleSubmit,
        onSubmit,
    } = useFormUser(props);

    const {
        onClose,
        open
    } = props;
    return (
        <Dialog 
            open={open}
        >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create User</DialogTitle>
                </DialogHeader>
                <DialogDescription />
                <Form {...form}>
                    <div className="flex flex-col gap-5">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </Form>
                <div className="flex justify-end mt-5 gap-3">
                    <Button
                        className="bg-gray-700"
                        type="button"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-blue-500 hover:bg-blue-500"
                        type="button"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )

}

export default FormUser;