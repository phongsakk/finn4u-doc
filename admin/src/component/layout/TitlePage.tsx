import React from 'react'

type TitlePageProps = {
    title: string;
    description: string;
}

const TitlePage: React.FC<TitlePageProps> = ({ title, description }) => {
    return (
        <div className="title-page">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    )
}

export default TitlePage