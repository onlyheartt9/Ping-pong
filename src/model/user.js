import { useState } from "react";
export const UserStore = (props) => {
  const [user, setUser] = useState(null);
  return { user, setUser };
};
