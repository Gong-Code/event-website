'use client'


import withAdminAuth from "@/app/hoc/withAdminAuth";
import { UsersList } from "../_components/UsersList";
import { useAuth } from "../_components/auth-provider";


const UsersPage = () => {
  
  const { user } = useAuth();
  
  console.log(user)
  return (
    <div className="flex flex-col justify-center text-center mt-20 gap-10">
      <h1>Users</h1>
      <UsersList users={user} />
    </div>
  );
  
}
export default withAdminAuth(UsersPage)