import Link from "next/link"
import Image from "next/image"
import Menu from "./Menu"

function Navbar() {
	return (
		<div className="navbar navbar-expand-lg navbar-main">
			<div className="container-fluid">
				<Link className="navbar-brand" href="/">
					<Image src="/logo1.png" alt="Logo 1"
						width={100}
						height={100}
						quality={100}
						sizes="100vw"
						style={
							{width: '100%'}
						}
						priority/>
				</Link>
				<Menu />
			</div>
		</div>
	)
}
export default Navbar
