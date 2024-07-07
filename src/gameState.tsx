import { PointTuple } from "leaflet"

import { GamePhoto, MAP_LIST } from "./store"
import { ApiResult } from "./fakeApi"

export type GameState = {
	userSelectedMapId?: string
	phase:
		| "intro"
		| "awaitingPhoto"
		| "guessing"
		| "awaitingResult"
		| "viewingResult"
	localTotalScore: number
	currentPhoto?: GamePhoto
	guessPosition?: PointTuple
	apiError?: string
	apiScore?: ApiResult["guessResult"]
}

export const INITIAL_STATE: GameState = {
	phase: "intro",
	localTotalScore: 0,
}

export type GameAction =
	| { type: "changePhoto"; newPhoto: GamePhoto }
	| { type: "updateGuess"; position: PointTuple }
	| { type: "submitGuess" }
	| { type: "requestNewPhoto" }
	| { type: "receiveResult"; result: ApiResult }
	| { type: "updateTotalScore"; newScore: number }
	| { type: "selectMap"; mapId: string }

export function gameStateReducer(
	state: GameState,
	action: GameAction,
): GameState {
	switch (action.type) {
		case "changePhoto": {
			return {
				...state,
				phase: "guessing",
				currentPhoto: action.newPhoto,
				guessPosition: undefined,
				userSelectedMapId: undefined,
				apiScore: state.apiScore,
			}
		}
		case "updateGuess": {
			return {
				...state,
				guessPosition: action.position,
			}
		}
		case "requestNewPhoto": {
			return {
				...state,
				guessPosition: undefined,
				phase: "awaitingPhoto",
				apiError: undefined,
			}
		}
		case "submitGuess": {
			return {
				...state,
				phase: "awaitingResult",
			}
		}
		case "receiveResult": {
			if (action.result.status === "ok") {
				return {
					...state,
					localTotalScore: action.result.guessResult
						? state.localTotalScore + action.result.guessResult?.score
						: state.localTotalScore, // Soft update our local score
					apiScore: action.result.guessResult,
					phase: "viewingResult",
				}
			} else {
				return {
					...state,
					phase: "guessing",
					apiError: action.result.error,
				}
			}
		}
		case "updateTotalScore": {
			return {
				...state,
				localTotalScore: action.newScore,
			}
		}
		case "selectMap": {
			const matchedMapId = MAP_LIST.find((map) => map.id === action.mapId)?.id
			if (matchedMapId) {
				return {
					...state,
					guessPosition: undefined,
					userSelectedMapId: matchedMapId,
				}
			} else {
				return {
					...state,
					apiError: "Map ID not found",
				}
			}
		}
	}
}
