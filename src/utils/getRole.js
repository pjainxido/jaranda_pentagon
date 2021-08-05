import { getAllRoles } from "api/role";

const getRole = async (saveRole, userRole) => {
  const res = await getAllRoles();
  if (res) {
    saveRole(...res.filter((data) => data.id === userRole));
  }
};

export default getRole;
