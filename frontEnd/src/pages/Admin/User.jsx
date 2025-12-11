import React, { useState } from "react";
import { FiDelete } from "react-icons/fi";
import { useDeleteUserMutation, useGetAllUsersQuery, useUpdateUserMutation } from "../../redux/features/auth/authApi";

const User = () => {
  const { data: users, isLoading, isError, error, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [roleUpdates, setRoleUpdates] = useState({}); // Track role updates for each user

  // Handle Role Change and Immediate Update
  const handleRoleChange = async (userId, newRole) => {
    setRoleUpdates((prev) => ({ ...prev, [userId]: newRole }));
    try {
      const res = await updateUser({ userId, role: newRole }).unwrap();
      if (res) {
        alert(`${res?.message || "Role updated successfully"}`);
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update role.");
    }
  };

  // Handle User Deletion
  const handleDelete = async (userId) => {
    try {
      const res = await deleteUser(userId).unwrap();
      if (res) {
        alert(`${res?.message || "User deleted successfully"}`);
        refetch();
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete user.");
    }
  };

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error occurred: {error?.message || "Something went wrong."}</div>}
      {!isLoading && users?.length === 0 && <div>No user found.</div>}

      <div>
        <div className="text-lg font-bold w-full align-middle text-center">All Users</div>
        <div>
          <table className="w-full bg-indigo-100 table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="capitalize bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">No</th>
                <th className="border border-gray-300 px-4 py-2">User Name</th>
                <th className="border border-gray-300 px-4 py-2">User Email</th>
                <th className="border border-gray-300 px-4 py-2">Current Role</th>
                <th className="border border-gray-300 px-4 py-2">Update Role</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.users?.map((user, index) => (
                <tr key={user._id} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                  <td className="border border-gray-300 px-4 py-2">{user.role}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <select
                      value={roleUpdates[user._id] || user.role}
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div
                      className="flex gap-1 items-center justify-center cursor-pointer hover:shadow-md text-red-500"
                      onClick={() => handleDelete(user._id)}
                    >
                      <FiDelete /> Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default User;
