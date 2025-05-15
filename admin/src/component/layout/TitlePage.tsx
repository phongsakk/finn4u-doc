import React from 'react'

type TitlePageProps = {
	title: string;
	description?: string;
}

const TitlePage: React.FC < TitlePageProps > = ({title, description}) => {
	return (
		<div className="title-page">
			<h2 className='fw-bold text-success'>{title}</h2>
			<p>{description}</p>
		</div>
	)
}

export default TitlePage
