import L, {
	CRS,
	DragEndEvent,
	LatLngBounds,
	LatLngBoundsExpression,
	LatLngExpression,
	LeafletEventHandlerFnMap,
	LeafletMouseEvent,
	PointTuple,
} from "leaflet"
import { useEffect } from "react"
import {
	Marker,
	ImageOverlay,
	useMapEvents,
	useMap,
	Polyline,
	MapContainer,
} from "react-leaflet"

import { GameState } from "./gameState"
import { MAP_LIST, MapInfo } from "./store"

type MapDisplayProps = {
	state: GameState
	updateGuess: (position: PointTuple) => void
}

const DEFAULT_BOUNDS: LatLngBoundsExpression = [
	[-2008, -2008],
	[2008, 2008],
]
const makeBounds = (
	mapInfo?: MapInfo,
): {
	mapImageBounds: LatLngBoundsExpression
	leafletBounds: LatLngBoundsExpression
} => {
	const calcBounds: LatLngBoundsExpression | undefined = mapInfo && [
		[-mapInfo?.size[0] / 2, -mapInfo?.size[1] / 2],
		[mapInfo?.size[0] / 2, mapInfo?.size[1] / 2],
	]
	return {
		mapImageBounds: calcBounds ?? DEFAULT_BOUNDS,
		leafletBounds: DEFAULT_BOUNDS,
	}
}

export const MapDisplay = ({ state, updateGuess }: MapDisplayProps) => {
	const mapInfo = MAP_LIST.find((map) => map.id === state.userSelectedMapId)
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
				crs={CRS.Simple}
				bounds={leafletBounds}
				boundsOptions={{ padding: [10, 10] }}
				minZoom={-4}
				maxZoom={4}
				zoomSnap={0.1}
				// consider on mobile: zoomAnimation={false}
				attributionControl={false}
			>
				{state.userSelectedMapId && (
					<ImageOverlay
						url={`maps/${state.userSelectedMapId}_guessr.webp`}
						bounds={mapImageBounds}
					/>
				)}
				<GuessMarker state={state} setGuessPosition={updateGuess} />
				{state.phase === "viewingResult" && (
					<>
						<AnswerMarker position={state.apiScore?.answerLocation} />

						{state.guessPosition && state.apiScore && (
							<Polyline
								positions={[state.guessPosition, state.apiScore.answerLocation]}
								pathOptions={dashedLineOptions}
							/>
						)}
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

			// log out location for easy content adding
			console.log(`DEBUG QQ: `)
			console.log(
				`[${Math.round(e.latlng.lat * 100) / 100},${Math.round(e.latlng.lng * 100) / 100}],`,
			)
		},
	})

	//reset zoom after changing photo
	useEffect(() => {
		const mapInfo = MAP_LIST.find((map) => map.id === state.userSelectedMapId)
		if (mapInfo) {
			const yLimit = mapInfo.size[0] / 2
			const xLimit = mapInfo.size[1] / 2
			const dest: LatLngBoundsExpression = [
				[-yLimit, -xLimit],
				[yLimit, xLimit],
			]
			map.fitBounds(dest)
		}
	}, [map, state.currentPhoto?.mapId, state.userSelectedMapId])

	const markerEventHandlers: LeafletEventHandlerFnMap = {
		dragend: (event: DragEndEvent) => {
			if (!isGuessing) return
			// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
			setGuessPosition([
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				event.target["_latlng"].lat,
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

const AutoPan = ({
	guess,
	answer,
}: {
	guess: PointTuple
	answer: PointTuple
}) => {
	const map = useMap()

	useEffect(() => {
		if (guess && answer) {
			const bounds = new LatLngBounds(guess, answer)
			map.flyToBounds(bounds, { padding: [50, 50], maxZoom: 4 })
		}
	}, [map, guess, answer])

	return null
}
