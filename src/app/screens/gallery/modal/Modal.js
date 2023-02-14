// react
import React from 'react';

// material
import Dialog from '@material-ui/core/Dialog';

// app
import './Modal.scss';
import Loader from '../../../../assets/svg/loader.svg';

/**
 * @param openModal
 * @param setOpenModal
 * @returns {*}
 * @constructor
 */
const GalleryModal = ({ openModal, setOpenModal }) => {
	const name = !openModal['cover'] ? openModal['id'] : openModal['cover'];

	return (
		<Dialog
			className="ig-gallery-modal"
			open={!!openModal}
			onClose={() => setOpenModal(false)}
			keepMounted>
			<div className="ig-content-wrapper">
				{!!name && (
					<img
						style={{
							backgroundImage: `url(${Loader})`
						}}
						src={`//i.imgur.com/${name}.jpg`}
						alt={openModal['cover']} />
				)}

				<div className="ig-content">
					<div className="ig-title-desc">
						{!!openModal.title && (
							<h3>{openModal.title}</h3>
						)}

						{!!openModal.description && (
							<p>{openModal.description}</p>
						)}
					</div>
				</div>
			</div>
		</Dialog>
	);
};
export default GalleryModal;
