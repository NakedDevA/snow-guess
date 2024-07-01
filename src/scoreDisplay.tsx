import { GameState } from "./gameState"

type ScoreDisplayProps = {
	state: GameState
}
export const ScoreDisplay = ({ state }: ScoreDisplayProps) => {
	return (
		<div className="score-container">
			<div>Total score: {state.localTotalScore ?? 0}</div>
		</div>
	)
}
