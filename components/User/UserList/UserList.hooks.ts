import { useEffect, useState } from "react";
import { User } from "../FormUser/FormUser.types";
import { UserList } from "./UserList.types";

const useUserList = () => {
    const [userList, setUserList] = useState<UserList[]>([]);
    const [loading, setLoading] =  useState<boolean>(false);
    const [open, setOpen] =  useState<boolean>(false);

    const fetchUser = async () => {
        setLoading(true)
        const res = await fetch('/api/user');
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to fetch user');
        setUserList(data.data);
        setLoading(false)
    };

    const onClose = () => {
        setOpen(false);
        fetchUser();
    }

    useEffect(() => {
        fetchUser();
    }, [])

    return {
        userList,
        loading,
        open,
        setOpen,
        fetchUser,
        onClose
    }
}

export default useUserList;