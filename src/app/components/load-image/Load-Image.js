import React, { useState, useRef, useEffect } from 'react';
import { gallerySelector } from '../../slices/gallery/gallery';
import { useSelector } from 'react-redux';

import './Load-Image.scss';

const LoadImage = ({ src, alt }) => {
	const [showImage, setShowImage] = useState(false);
	const placeHolderRef = useRef(null);
	const { galleryParams } = useSelector(gallerySelector);

	useEffect(() => {
		const io = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {				
				if (!entry.isIntersecting) return;
				setShowImage(true);
				observer.disconnect();
			});
		});

		io.observe(placeHolderRef.current);
		return () => io && io.root !== undefined && io.disconnect();
	}, [setShowImage]);

	return (showImage) ? (
		<img className={`a1 ${(galleryParams.keyValues.dinamicHeight ? '' : 'img-size-static')}`} src={src} alt={alt} />
	) : (
		<div data-testid="ig-placeholder" className="ig-placeholder" ref={placeHolderRef} />
	);
};
export default LoadImage;
