import { useReducer, useState } from "react"
import { MapDisplay } from "./mapDisplay"
import { PhotoDisplay } from "./photoDisplay"
import { INITIAL_STATE, gameStateReducer } from "./gameState"
import { PointTuple } from "leaflet"
import {
	checkGuessWithApi,
	checkUserTotalScore,
	debugClearUserData,
	getNextPhotoIdFromApi,
} from "./fakeApi"
import { InfoModal } from "./infoModal"
import { ScoreDisplay } from "./scoreDisplay"

export const Game = () => {
	const [state, dispatch] = useReducer(gameStateReducer, INITIAL_STATE)
	const [showResultsModal, setShowResultsModal] = useState(false)
	const [showErrorModal, setShowErrorModal] = useState(false)
	const [showFinishedModal, setShowFinishedModal] = useState(false)

	const updateGuess = (position: PointTuple) => {
		dispatch({ type: "updateGuess", position })
	}

	const submitGuess = async (photoId: string, guess: PointTuple) => {
		dispatch({ type: "submitGuess" })
		const response = await checkGuessWithApi(photoId, guess)
		dispatch({ type: "receiveResult", result: response })
		if (response.guessResult) setShowResultsModal(true)
		if (response.error) setShowErrorModal(true)
	}

	const handleNextPhoto = () => {
		fetchTotalScore()
		fetchNextPhoto()
	}
	const fetchNextPhoto = async () => {
		dispatch({ type: "requestNewPhoto" })
		const response = await getNextPhotoIdFromApi()
		if (response.seenAll) setShowFinishedModal(true) //qqtas horrible when testing
		dispatch({ type: "changePhoto", newPhoto: response.nextPhoto })
	}

	const fetchTotalScore = async () => {
		const score = await checkUserTotalScore()
		dispatch({ type: "updateTotalScore", newScore: score })
	}
	return (
		<>
			<InfoModal
				isOpen={showResultsModal}
				closeModal={() => setShowResultsModal(false)}
			>
				<div className="dialogContainer results-modal">
						<h2>Results</h2>
						<p>You guessed: {prettyCoords(state.guessPosition)} </p>
						<p>
							Actual location: {prettyCoords(state.apiScore?.answerLocation)}
						</p>
						<p>Distance: {state.apiScore?.distance}m</p>
						<div className="score-box">
							<p>Score: {state.apiScore?.score} points!</p>
						</div>
				</div>
			</InfoModal>
			<InfoModal
				isOpen={showErrorModal}
				closeModal={() => setShowErrorModal(false)}
			>
				<div className="dialogContainer">ERRORS 4 u, sad</div>
			</InfoModal>
			<InfoModal
				isOpen={showFinishedModal}
				closeModal={() => setShowFinishedModal(false)}
			>
				<div className="dialogContainer">
					<p>WOW what a gamer you've seen every photo! Why not </p>
					<a href="https://forms.gle/x16HvPemVuzYvDNL8" target="_blank">
						submit a photo of your own to expand the collection?
					</a>{" "}
					<p>
						You can also clear your list of viewed photos if you want to replay
						them all:
						<button onClick={debugClearUserData}> Clear your data</button>
						Otherwise you'll see some repeats.
					</p>
				</div>
			</InfoModal>
			{state.phase === "intro" ? (
				<>
					<h1>Snowguessr</h1>
					<h2>Can you recognise these points on the map?</h2>
					<button onClick={handleNextPhoto}>i guess so</button>
				</>
			) : (
				<>
					<div className="game-container">
						<PhotoDisplay photo={state.currentPhoto} />
						<ScoreDisplay state={state} />
						<MapDisplay state={state} updateGuess={updateGuess} />
						<div className="buttons-bar">
							{(state.phase === "awaitingResult" ||
								state.phase === "awaitingPhoto") && <div>LOADING...</div>}
							{state.phase === "guessing" && state.guessPosition && (
								<button
									className={"eager-button"}
									onClick={() =>
										submitGuess(
											state.currentPhoto!.photoId,
											state.guessPosition!
										)
									}
								>
									Submit Guess
								</button>
							)}
							{state.phase === "guessing" && !state.guessPosition && (
								<button disabled>Choose a spot!</button>
							)}
							{state.phase === "viewingResult" && (
								<button className={"eager-button"} onClick={handleNextPhoto}>
									Next Photo
								</button>
							)}
						</div>
					</div>
				</>
			)}
		</>
	)
}

//Flip to human readable x,y and round to 2dp
const prettyCoords = (point?: PointTuple): string => {
	if (!point) return "Unknown"
	return `(${Math.round(point[1] * 100) / 100}, ${
		Math.round(point[0] * 100) / 100
	})`
}
