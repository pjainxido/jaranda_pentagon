import { getAllRoles } from "api/role";
import storage from "utils/storage";

const getRole = async () => {
  const res = await getAllRoles();

  if (storage.get("userInfo")) {
    const userRole = storage.get("userInfo").role;
    if (res && userRole) {
      const object = res.filter((data) => data.id === userRole);
      return object;
    }
  }
};

export default getRole;
