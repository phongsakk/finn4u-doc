import React, { PropsWithChildren } from 'react'

const layout: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <div>
            <h1>LAYoutttttttt</h1>
            <div>
                {children}
            </div>
        </div>
    )
}

export default layout