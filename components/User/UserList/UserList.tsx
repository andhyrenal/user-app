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
            <div className="grid grid-cols-1 gap-5">
                {!loading && userList.map(el => (
                    <div key={el.id} className=" bg-gray-900 rounded-xl p-10">
                        <div className="rounded-xl mb-5">
                            <p>{`Name : ${el.name}`}</p>
                            <div className="flex gap-2">
                                <p>Email Encrypt: </p>
                                <pre className="overflow-auto">{el.email}</pre>
                            </div>
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