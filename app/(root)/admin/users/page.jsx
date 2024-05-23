'use client'


import withAdminAuth from "@/app/hoc/withAdminAuth";
import { UsersList } from "../_components/UsersList";
import { useAuth } from "../_components/auth-provider";
import { AdminList } from "../_components/AdminList";


const UsersPage = () => {
  
  const { user, isAdmin } = useAuth();
  
  console.log(user)
  return (
    <div className="flex flex-col justify-center text-center mt-20 gap-10">
      <h1>Users</h1>
      <UsersList users={user} />
      <AdminList admins={isAdmin} />
    </div>
  );
  
}
export default withAdminAuth(UsersPage)