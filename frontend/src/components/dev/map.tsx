'use client';
import {MapProvider} from "@providers/map-provider";
import {GoogleMap, MarkerF} from "@react-google-maps/api";

type defaultMapContainerStyle = {
	width: string, // '100%'
	height: string, // '447px'
};

type defaultMapCenter = {
	lat: number,
	lng: number
};

const defaultMapZoom = 18;

const defaultMapOptions = {
	zoomControl: false,
	tilt: 0,
	gestureHandling: "none",
	mapTypeId: "hybrid",
	fullscreenControl: false,
	disableDefaultUI: false,
	clickableIcons: false,
	streetViewControl: false,
	keyboardShortcuts: false,
	mapTypeControl: false,
	scaleControl: false,
	rotateControl: false
};

const Map = ({position, style} : {
	position: string,
	style?: defaultMapContainerStyle
}) => {

	const mapStyle: defaultMapContainerStyle = {
		width: "100%",
		height: "447px",
		...style
	};

	const pos = position.split(/,|\s+/);
	let Marker: defaultMapCenter = {
		lat: 13.617034546998255,
		lng: 100.55214360992782
	};

	const filteredResult = pos.filter(item => item.trim() !== "");

	if (!isNaN(Number(filteredResult[0])) && !isNaN(Number(filteredResult[1]))) {
		Marker.lat = Number(filteredResult[0]);
		Marker.lng = Number(filteredResult[1]);
	}
	return (
		<div className="w-full">
			<MapProvider>
				<GoogleMap mapContainerStyle={mapStyle}
					center={Marker}
					zoom={defaultMapZoom}
					options={defaultMapOptions}>
					<MarkerF position={Marker}/>
				</GoogleMap>
			</MapProvider>
		</div>
	);
};

export {
	Map
};
