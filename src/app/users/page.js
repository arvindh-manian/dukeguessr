import { getUsers } from "@/utils/user";

export default async function Users({ params }) {
    const users = (await getUsers());
    return <>
        {users.map((user) => <>
            <p>User ID: {user.id}</p>
            <p>Username: {user.name}</p>
        </>)}
    </>
}