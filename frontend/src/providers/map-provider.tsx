'use client';

import {Libraries, useJsApiLoader} from '@react-google-maps/api';
import {ReactNode} from 'react';

const libraries = ['places', 'drawing', 'geometry'];

export function MapProvider({children} : {
	children : ReactNode
}) {
	const {isLoaded: scriptLoaded, loadError} = useJsApiLoader({googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API as string, libraries: libraries as Libraries});
	if (loadError) 
		return <div className='bg-light'
			style={
				{
					height: "447px"
				}
		}>
			<p>Encountered error while loading maps</p>
		</div>

	if (!scriptLoaded) 
		return <div className='bg-light'
			style={
				{
					height: "447px"
				}
		}></div>

	return children;
}
