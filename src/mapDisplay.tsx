import L, {
	CRS,
	DragEndEvent,
	LatLng,
	LatLngBounds,
	LatLngBoundsExpression,
	LatLngExpression,
	LatLngTuple,
	LeafletEventHandlerFnMap,
	LeafletMouseEvent,
	PointExpression,
	PointTuple,
} from "leaflet"
import { useEffect, useState } from "react"
import {
	Marker,
	ImageOverlay,
	useMapEvents,
	useMap,
	Polyline,
} from "react-leaflet"
import { MapContainer } from "react-leaflet"
import { GameState } from "./gameState"
import { ApiResult, checkGuessWithApi } from "./fakeApi"
import { MAP_LIST, MapInfo } from "./store"

type MapDisplayProps = {
	state: GameState
	updateGuess: (position: PointTuple) => void
}

const DEFAULT_BOUNDS: LatLngBoundsExpression = [
	[-2008, -2008],
	[2008, 2008],
]
const INITIAL_ZOOM_LEVEL = -3
const makeBounds = (
	mapInfo?: MapInfo,
): {
	mapImageBounds: LatLngBoundsExpression
	leafletBounds: LatLngBoundsExpression
} => {
	return {
		mapImageBounds: mapInfo
			? [
					[-mapInfo?.size[0] / 2, -mapInfo?.size[1] / 2],
					[mapInfo?.size[0] / 2, mapInfo?.size[1] / 2],
				]
			: DEFAULT_BOUNDS,
		leafletBounds: DEFAULT_BOUNDS,
	}
}

export const MapDisplay = ({ state, updateGuess }: MapDisplayProps) => {
	const mapInfo = MAP_LIST.find((map) => map.id === state.currentPhoto?.mapId)
	const { mapImageBounds, leafletBounds } = makeBounds(mapInfo)

	// Define the dashed line options
	const dashedLineOptions = {
		color: "red",
		weight: 4,
		dashArray: "10, 10",
		opacity: 0.7,
	}

	return (
		<>
			<MapContainer
				center={[0, 0]}
				zoom={INITIAL_ZOOM_LEVEL}
				crs={CRS.Simple}
				bounds={leafletBounds}
				boundsOptions={{ padding: [10, 10] }}
				minZoom={-4}
				maxZoom={4}
				attributionControl={false}
			>
				{state.currentPhoto && (
					<ImageOverlay
						url={`maps/${state.currentPhoto?.mapId}_map.jpg`}
						bounds={mapImageBounds}
					/>
				)}
				<GuessMarker state={state} setGuessPosition={updateGuess} />
				{state.phase === "viewingResult" && (
					<>
						<AnswerMarker position={state.apiScore?.answerLocation} />

						<Polyline
							positions={[state.guessPosition!, state.apiScore!.answerLocation]}
							pathOptions={dashedLineOptions}
						/>
						{state.guessPosition && state.apiScore && (
							<AutoPan
								guess={state.guessPosition}
								answer={state.apiScore.answerLocation}
							/>
						)}
					</>
				)}
			</MapContainer>
		</>
	)
}

//qq looks like usemapevents only works WITHIN map so this has to be a subcomponent, or no context
type GuessMarkerProps = {
	state: GameState
	setGuessPosition: (latlng: PointTuple) => void
}
const GuessMarker = ({ state, setGuessPosition }: GuessMarkerProps) => {
	const isGuessing = state.phase === "guessing"

	const map = useMapEvents({
		click(e: LeafletMouseEvent) {
			if (!isGuessing) return
			setGuessPosition([e.latlng.lat, e.latlng.lng])
		},
	})

	//reset zoom after changing photo
	useEffect(() => {
		const dest: LatLngBoundsExpression = [
			[-1900, -1900],
			[1900, 1900],
		]
		map.fitBounds(dest)
	}, [state.currentPhoto?.photoId])

	// Vile hack: leaflet draws its div into the DOM on some absolute basis.
	// Since we're not in 1994 I'm using a responsive layout, so the layout bounds aren't necessarily final when it does this
	// We delay slightly to make sure the layout is taking account of the image above, then force the map to check bounds again
	map.whenReady(() => {
		setTimeout(() => {
			window.dispatchEvent(new Event("resize"))
		}, 50)
	})
	const markerEventHandlers: LeafletEventHandlerFnMap = {
		dragend: (event: DragEndEvent) => {
			if (!isGuessing) return
			setGuessPosition([
				event.target["_latlng"].lat,
				event.target["_latlng"].lng,
			])
		},
	}
	return state.guessPosition ? (
		<Marker
			position={state.guessPosition}
			draggable={isGuessing}
			eventHandlers={markerEventHandlers}
		/>
	) : null
}

type AnswerMarkerProps = {
	position?: LatLngExpression
}
const AnswerMarker = ({ position }: AnswerMarkerProps) => {
	const defaultIconOptions: {
		iconUrl: string
		iconRetinaUrl: string
		shadowUrl: string
		iconSize: PointTuple
		iconAnchor: PointTuple
		popupAnchor: PointTuple
		tooltipAnchor: PointTuple
		shadowSize: PointTuple
	} = {
		iconUrl: "icons/marker-icon.png",
		iconRetinaUrl: "icons/marker-icon-2x.png",
		shadowUrl: "icons/marker-shadow.png",
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		tooltipAnchor: [16, -28],
		shadowSize: [41, 41],
	}

	const answerIcon = L.icon({ ...defaultIconOptions, className: "green-icon" })

	if (!position) return null
	return <Marker position={position} icon={answerIcon} />
}

const AutoPan: React.FC<{
	guess: PointTuple
	answer: PointTuple
}> = ({ guess, answer }) => {
	const map = useMap()

	useEffect(() => {
		if (guess && answer) {
			const bounds = new LatLngBounds(guess, answer)
			map.fitBounds(bounds, { padding: [50, 50], maxZoom: 4 })
		}
	}, [map, guess, answer])

	return null
}
