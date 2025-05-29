import UserList from "@/components/User/UserList/UserList";

export default function ProfilePage() {
  return (
     <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start p-10">
        <UserList />
      </main>
  );
}
