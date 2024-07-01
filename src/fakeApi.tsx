import { Point, PointTuple } from "leaflet"
import { ALL_PHOTOS, DatabasePhoto, GamePhoto } from "./store"

export const API_ERROR_DESC = "An unknown error occurred, try again"

const SEEN_MAPS_KEY = "SNOWGUESSR_DATA"
const USER_SCORE_KEY = "SNOWGUESSR_SCORE"
export type ApiResult = {
	status: "error" | "ok"
	error?: string
	guessResult?: {
		answerLocation: PointTuple
		distance: number
		score: number
	}
}

export const checkUserTotalScore = async (): Promise<number> => {
	await new Promise((resolve) => setTimeout(resolve, 50))
	const score = getUserTotalScore()
	return score
}

export const checkGuessWithApi = async (
	photoId: string,
	guess: PointTuple
): Promise<ApiResult> => {
	await new Promise((resolve) => setTimeout(resolve, 500))
	const matchedPhoto = ALL_PHOTOS.find((photo) => photo.photoId === photoId)
	if (!matchedPhoto) {
		return {
			status: "error",
			error: "Couldn't find the photo in the DB, try a different image.",
		}
	}
    
    //qqtas: should check if this photo is new and only give points if so; or track scores per-photo in the DB. Not necessary yet
    const alreadySeenIds = getAlreadySeenPhotoIds()
    markPhotoAsSeen(alreadySeenIds, matchedPhoto)

	const CORRECT_ANSWER_RADIUS = 10
	const FAIL_RADIUS = 500
	const MAX_SCORE = 5000
	// calc distance to 2dp
	const distance = new Point(guess[0], guess[1]).distanceTo(matchedPhoto.coords)

	const score =
		distance < CORRECT_ANSWER_RADIUS
			? MAX_SCORE
			: Math.max(Math.round(MAX_SCORE * (1 - distance / FAIL_RADIUS)), 0)
            
	// Get user total score, update
	const currentUserScore = getUserTotalScore()
	const newTotalScore = currentUserScore + score
	setUserTotalScore(newTotalScore)

	return {
		status: "ok",
		guessResult: {
			answerLocation: matchedPhoto.coords,
			score: score,
			distance: Math.round(distance * 100) / 100,
		},
	}
}

export const getNextPhotoIdFromApi = async (): Promise<{
	seenAll: boolean
	nextPhoto: GamePhoto
}> => {
	await new Promise((resolve) => setTimeout(resolve, 500))

	const alreadySeenIds = getAlreadySeenPhotoIds()
	const unseenPhotos = ALL_PHOTOS.filter(
        (loc) => !alreadySeenIds.includes(loc.photoId)
	)
    
	const photoCandidates = unseenPhotos.length ? unseenPhotos : ALL_PHOTOS
	const selectedPhoto =
    photoCandidates[Math.floor(Math.random() * photoCandidates.length)]
    
	return {
		seenAll: !unseenPhotos.length,
		nextPhoto: {
			photoId: selectedPhoto.photoId,
			mapId: selectedPhoto.mapId,
			submitter: selectedPhoto.submitter,
			title: selectedPhoto.title ?? "Untitled",
		},
	}
}

const markPhotoAsSeen = (seenPhotoIds: string[], newPhoto: DatabasePhoto) => {
	// Add to the list of seen items it's not there already
	if (!seenPhotoIds.includes(newPhoto.photoId)) {
		seenPhotoIds.push(newPhoto.photoId)
	}
	try {
		localStorage.setItem(SEEN_MAPS_KEY, JSON.stringify(seenPhotoIds))
	} catch (error) {
		console.error(
			`Local storage is disabled - ${SEEN_MAPS_KEY} cannot be saved`
		)
	}
}

const getAlreadySeenPhotoIds = (): string[] => {
	try {
		const storedValue = localStorage.getItem(SEEN_MAPS_KEY)
		return storedValue ? (JSON.parse(storedValue) as string[]) : []
	} catch (error) {
		console.warn(
			`Local storage is empty or disabled - ${SEEN_MAPS_KEY} cannot be retrieved`
		)
		return []
	}
}

const getUserTotalScore = (): number => {
	try {
		const storedValue = localStorage.getItem(USER_SCORE_KEY)
		return storedValue ? (JSON.parse(storedValue) as number) : 0
	} catch (error) {
		console.warn(
			`Local storage is empty or disabled - ${USER_SCORE_KEY} cannot be retrieved`
		)
		return 0
	}
}

const setUserTotalScore = (newScore: number) => {
	try {
		localStorage.setItem(USER_SCORE_KEY, newScore.toString())
	} catch (error) {
		console.warn(
			`Local storage is empty or disabled - ${USER_SCORE_KEY} cannot be set`
		)
	}
}

export const debugClearUserData = () => {
	try {
		console.log("removing localStorage...")
		localStorage.removeItem(SEEN_MAPS_KEY)
		localStorage.removeItem(USER_SCORE_KEY)
	} catch (error) {
		console.warn(
			`Local storage is empty or disabled - user data cannot be cleared`
		)
		return []
	}
}
