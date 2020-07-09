import React from "react";

export const ProfileContext = React.createContext({
  user: null,
  changeProfile: () => {},
});