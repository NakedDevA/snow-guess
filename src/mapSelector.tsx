import { GameState } from "./gameState"
import { MAP_LIST } from "./store"

type MapSelectorProps = {
	state: GameState
    handleMapSelect: (mapId: string) => void
}
export const MapSelector = ({ state, handleMapSelect }: MapSelectorProps) => {
    
    const handler  = (event:React.ChangeEvent<HTMLSelectElement>) => {
        handleMapSelect(event.target.value)
    }
	return (
		<div className="map-select-container">
			<div>Select Map:</div>
			<select value={state.userSelectedMapId} onChange={handler}>
				{MAP_LIST.map((mapEntry)=> <option key={mapEntry.id} value={mapEntry.id}>{mapEntry.name}</option>)}
			</select>
		</div>
	)
}
