import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { galleryFilters, galleryReset, initialState, SECTION_DEFAULT } from '../../../slices/gallery/gallery';
import { proxyReset } from '../../../slices/proxy/proxy';

import Container from '@material-ui/core/Container';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import './Filters.scss';

/**
 * @returns {*}
 * @constructor
 */
const Filters = () => {
	const isFirstRun = useRef(true);

	const dispatch = useDispatch();
	const [state, setState] = useState({
		section: initialState.galleryParams.keyValues.section,
		sort: initialState.galleryParams.keyValues.sort,
		window: initialState.galleryParams.keyValues.window,
		amount: initialState.galleryParams.keyValues.amount,
		dinamicHeight: initialState.galleryParams.keyValues.dinamicHeight
	});

	useEffect(() => {
		if (isFirstRun.current) {
			isFirstRun.current = false;
			return;
		}

		dispatch(proxyReset());
		dispatch(galleryReset());

		dispatch(galleryFilters(state));
	}, [dispatch, state]);

	/**
	 * @param event
	 */
	const handleChange = (event) => {
		const { name, value, checked } = event.target;

		const result = (checked !== undefined) ? checked : value;

		const part = (name === 'section' || name === 'sort') ? {
			[name]: result,
			sort: {
				value: name === 'sort' ? result : state.sort.value,
				disabled: name === 'section' ? result !== SECTION_DEFAULT : state.sort.disabled
			}
		} : {
			[name]: result
		};

		setState({
			...state,
			...part
		});
	};

	return (
		<Container maxWidth="md" className="ig-filters">
			<form>
				<div className="ig-content">
					<div className="ig-left">
						<div className="ig-item">
							<FormHelperText className="ig-helper">Section</FormHelperText>
							<Select
								variant="standard"
								name="section"
								value={state.section}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="hot">Hot</MenuItem>
								<MenuItem value="top">Top</MenuItem>
								<MenuItem value="user">User</MenuItem>
							</Select>
						</div>
					</div>

					{/* Right */}
					<div className="ig-right">
						<div className="ig-item">
							<FormHelperText className="ig-helper">Sort</FormHelperText>
							<Select
								variant="filled"
								name="sort"
								value={state.sort.value}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="viral">Viral</MenuItem>
								<MenuItem value="top">Top</MenuItem>
								<MenuItem value="time">Time</MenuItem>
							</Select>
						</div>

						<div className="ig-item">
							<FormHelperText className="ig-helper">Window</FormHelperText>
							<Select
								variant="filled"
								name="window"
								value={state.window}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="day">Day</MenuItem>
								<MenuItem value="week">Week</MenuItem>
								<MenuItem value="month">Month</MenuItem>
								<MenuItem value="year">Year</MenuItem>
							</Select>
						</div>

						<div className="ig-item">
							<FormHelperText className="ig-helper">Amount</FormHelperText>
							<Select
								variant="filled"
								name="amount"
								value={state.amount}
								onChange={handleChange}
								className="ig-select-wrapper"
								classes={{
									select: 'ig-select'
								}}>
								<MenuItem value="veryMany">Very many</MenuItem>
								<MenuItem value="many">Many</MenuItem>
								<MenuItem value="few">Few</MenuItem>
								<MenuItem value="veryFew">Very few</MenuItem>
							</Select>
						</div>
						<div className="ig-item" style={{ textAlign: "end" }}>
						<FormHelperText className="ig-helper">Original Size</FormHelperText>
						<FormControlLabel
							className="ig-switch"
							classes={{
								label: 'ig-label'
							}}
							control={(
								<Switch
									size="small"
									name="dinamicHeight"
									color="primary"
									onChange={handleChange}
									checked={state.dinamicHeight} />
							)}
							/>
						</div>
					</div>
				</div>
			</form>
		</Container>
	);
};
export default Filters;
