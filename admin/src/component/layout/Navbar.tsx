import React from 'react'

import TitlePage from "@/component/layout/TitlePage";
import UserActions from "@/component/layout/UserActions";

const Navbar = ({
	title,
	description = ""
} : {
	title: string,
	description?: string
}) => {
	return (
		<nav className="navbar navbar-expand navbar-light navbar-bg">
			<TitlePage title={title}
				description={description}/>
			<UserActions/>
		</nav>
	)
}

export default Navbar
