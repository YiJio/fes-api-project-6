// packages
import React from 'react';
// components
//import { StationTransferMethod } from '../../../components/transfer/Transfer';
import Tooltip from '../../../components/tooltip/Tooltip';
import { IconCR, IconFMETRO, IconGF, IconGZMTR, IconPRDIR } from '../../../components/icons/SvgService';
import { IconMetro, IconTrain, IconTram } from '../../../components/icons/SvgTransit';

// constants
const SERVICES = ['cr', 'prdir', 'gzmtr', 'guangfometro', 'fmetro', 'gztram'];
const RAIL_SERVICES = ['cr', 'prdir'];

const StationTransferService = ({ transfers, service, sourceService, sourceLine, methodsDict }) => {
	// variables
	let tempTransfers = [];
	if (!RAIL_SERVICES.includes(service)) {
		tempTransfers = transfers.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.split('.')[1].localeCompare(b._station_id.split('.')[1], 'en', { numeric: true }));
	} else {
		tempTransfers = transfers.filter((transfer => transfer._service_id == service)).sort((a, b) => a._station_id.localeCompare(b._station_id));
	}

	return (<>
		{tempTransfers.map((transfer) => (
			<StationTransferMethod key={transfer._station_id} transfer={transfer} sourceLine={sourceLine} methodsDict={methodsDict} />
		))}
	</>);
}

const StationTransferIcon = ({ service }) => {
	// variables
	let size = '24px';
	let cursor = 'help';
	let typeText = 'Metro/subway';
	let logoText = 'Foshan Metro';
	let typeIcon = <IconMetro cursor={cursor} height={size} />;
	let logoIcon = <IconFMETRO cursor={cursor} />;
	switch (service) {
		case 'cr': {
			typeText = 'Conventional & high speed rail';
			logoText = 'China Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconCR cursor={cursor} />;
			break;
		}
		case 'prdir': {
			typeText = 'Conventional rail';
			logoText = 'Pearl River Delta Intercity Railway';
			typeIcon = <IconTrain cursor={cursor} height={size} />;
			logoIcon = <IconPRDIR cursor={cursor} />;
			break;
		}
		case 'gztram': {
			typeText = 'Tram/light rail';
			logoText = 'Guangzhou Tram';
			typeIcon = <IconTram cursor={cursor} height={size} />;
			logoIcon = <IconGZMTR cursor={cursor} />;
			break;
		}
		// need to do fmetro to check for trams later
		/*case 'fmetro': {
			logoText = 'Foshan Metro';
			typeIcon = <IconMetro cursor={cursor} height={size} />;
			logoIcon = <IconMetro cursor={cursor} />;
			break;
		}*/
		case 'guangfometro': {
			logoText = 'Guangfo Metro';
			logoIcon = <IconGF cursor={cursor} />;
			break;
		}
		case 'gzmtr': {
			logoText = 'Guangzhou Metro';
			logoIcon = <IconGZMTR cursor={cursor} />;
		}
	}

	return (
		<div className='station-transfers__icons'>
			<Tooltip text={typeText}>
				<div className='station-transfers__icon--service'>{typeIcon}</div>
			</Tooltip>
			<Tooltip text={logoText}>
				<div className='station-transfers__icon--service'>{logoIcon}</div>
			</Tooltip>
		</div>
	);
}

const StationTransferList = ({ transfers, sourceService, sourceLine, methodsDict }) => {
	return (
		<div className='station-transfers'>
			{SERVICES.map((service, index) => (<React.Fragment key={index}>
				{transfers.findIndex((transfer) => transfer._service_id == service) !== -1 && <div className='station-transfers__row'>
					<StationTransferIcon service={service} />
					<div className='station-transfers__lines transfer__list'>
						<StationTransferService transfers={transfers} service={service} sourceService={sourceService} sourceLine={sourceLine} methodsDict={methodsDict} />
					</div>
				</div>}
			</React.Fragment>))}
		</div>
	);
}

export default StationTransferList;