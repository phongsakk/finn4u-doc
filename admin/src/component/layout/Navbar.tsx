import React from 'react'

import TitlePage from "@/component/layout/TitlePage";
import UserActions from "@/component/layout/UserActions";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
        <TitlePage
          title="Overview"
          description="This is a detailed overview of Finn4U" />
        <UserActions />
      </nav>
  )
}

export default Navbar