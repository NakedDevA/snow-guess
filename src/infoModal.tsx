import React from "react"
import { PropsWithChildren, useEffect, useRef } from "react"

type InfoModalProps = {
	isOpen: boolean
	closeModal: () => void
}
export const InfoModal = ({
	isOpen,
	closeModal,
	children,
}: PropsWithChildren<InfoModalProps>) => {
	const ref = useRef<HTMLDialogElement>(null!)

	useEffect(() => {
		if (isOpen) {
			ref.current?.showModal()
		} else {
			ref.current?.close()
		}
	}, [isOpen])

	return (
		<dialog
			className="infoModalDialog"
			ref={ref}
			onCancel={closeModal}
			onClick={closeModal}
		>
			<div
				className="clickAbsorber"
				onClick={(event: React.MouseEvent<HTMLElement>) =>
					event.stopPropagation()
				}
			>
				{children}
				<button onClick={closeModal}>Close</button>
			</div>
		</dialog>
	)
}
