import React, { useState, useEffect } from "react"

import { LoadingSpinner } from "./loadingSpinner"
import { GamePhoto } from "./store"

type PhotoDisplayProps = {
	photo?: GamePhoto
}

export const PhotoDisplay = ({ photo }: PhotoDisplayProps) => {
	const [imageLoaded, setImageLoaded] = useState(false)

	useEffect(() => {
		setImageLoaded(false) // Reset the imageLoaded state when photo changes
	}, [photo])

	const handleImageLoad = () => {
		setImageLoaded(true)
	}

	return (
		<div className="photo-container">
			{photo?.photoId && !imageLoaded ? <LoadingSpinner /> : null}
			{photo?.photoId ? (
				<>
					<img
						className="photo"
						src={`photos/${photo.photoId}`}
						alt=""
						onLoad={handleImageLoad}
						style={{ display: imageLoaded ? "block" : "none" }}
					/>
					{imageLoaded && (
						<div className="photo-credit">
							<i>&quot;{photo.title}&quot;</i>, by {photo?.submitter}
						</div>
					)}
				</>
			) : (
				<LoadingSpinner />
			)}
		</div>
	)
}
