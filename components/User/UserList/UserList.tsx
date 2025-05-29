'use client';
import useUserList from "./UserList.hooks";
import { Button } from "@/components/ui/button";
import FormUser from "../FormUser/FormUser";
import CodeBlock from "@/components/CodeBlock/CodeBlock";

const UserList = () => {
    const {
        userList,
        loading,
        open,
        setOpen,
        onClose
    } = useUserList();
    return (
        <>
            <Button
                onClick={() => setOpen(true)}
                className="bg-blue-500"
            >
                Create User
            </Button>
            <div className="grid grid-cols-2 gap-5">
                {!loading && userList.map(el => (
                    <div key={el.id} className="w-60 bg-gray-900 rounded-xl">
                        <div className=" p-10 rounded-xl">
                            <p>{el.name}</p>
                            <p>{el.email}</p>
                        </div>
                        <CodeBlock value={el.publicKey} />
                    </div>
                ))}
            </div>

            {open && (
                <FormUser open={open} onClose={onClose} />
            )}
        </>
    )
}

export default UserList;