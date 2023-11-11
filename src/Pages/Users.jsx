import { useState } from "react";
import ShowData from "../components/UI/ShowData";
import UserDashboard from "../components/UI/UserDashboard";

export default function Users() {
  const [isUpdate, setIsUpdate] = useState(false);
  return (
    <div>
      <UserDashboard setIsUpdate={setIsUpdate} />
      <ShowData isUpdate={isUpdate} />
    </div>
  );
}
