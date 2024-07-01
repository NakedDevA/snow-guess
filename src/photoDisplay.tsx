import { GamePhoto } from "./store"

type PhotoDisplayProps = {
	photo?: GamePhoto
}

export const PhotoDisplay = ({ photo }: PhotoDisplayProps) => {
	return (
		<div className="photoContainer">
			{photo?.photoId ? (
				<div className="photo-credit-wrapper">
					<img className="photo" src={`/photos/${photo.photoId}`} alt="" />
					<div className="photo-credit">
						<i>&quot;{photo.title}&quot;</i>, by {photo?.submitter}
					</div>
				</div>
			) : (
				<div>loading photo</div>
			)}
			<div className="photoInfo"></div>
		</div>
	)
}
