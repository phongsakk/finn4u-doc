import CustomImage from "@components/CustomImage";

export default function RootLayout({children} : Readonly < {
	children : React.ReactNode;
} >) {
	return (

		<div className="add-investment">

			<div className="justify-content-center">
				<CustomImage src="/chechhand-bg.png" alt="chechhand-bg"/>
			</div>
			{children} 
            </div>
	)
}
