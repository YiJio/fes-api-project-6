// packages
import React from 'react';
import { RiMapPinFill, RiMapPin5Fill, RiMapPinTimeFill } from 'react-icons/ri';
// utils
import { getStatusCssName } from '../../../utils/helper';
// components
import StationCode from '../../../components/StationCode';
import { StationAddress, StationLocation } from '../../../components/StationLocation';
import Tooltip from '../../../components/Tooltip';
import { IconElevated, IconSurface, IconUnderground } from '../../../components/SvgStructure';

export const StationBox = ({ stationData, lineColor }) => {
	return (
		<div className='station-box'>
			<div className='station-box__basic'>
				<StationCode code={stationData?.station_code} color={lineColor} status={stationData?.status} />
				<Tooltip text={stationData?.structure_type === 'elevated' ? 'Elevated' : stationData?.structure_type === 'surface' ? 'Surface' : 'Underground'}>{stationData?.structure_type === 'elevated' ? <IconElevated /> : stationData?.structure_type === 'surface' ? <IconSurface /> : <IconUnderground />}</Tooltip>
			</div>
			<div className='station-box__field'>
				<strong>Name</strong>
				<big>{stationData?.name.en}</big>
			</div>
			<div className='station-box__field'>
				<strong><RiMapPin5Fill /> Geo-coordinates</strong>
				<div style={{ display: 'flex', gap: '8px' }}>
					<StationLocation coordinate={parseFloat(stationData?.location.longitude)} isLon={false} />
					<StationLocation coordinate={parseFloat(stationData?.location.latitude)} isLon={true} />
				</div>
			</div>
			<div className='station-box__field'>
				<strong><RiMapPinFill /> Address</strong>
				<StationAddress address={stationData?.address} />
			</div>
			<div className='station-box__field'>
				<strong><RiMapPinTimeFill /> Operational since</strong>
				<div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
					{stationData?.operational_since && stationData.operational_since.split('T')[0].replaceAll('-', '/')}
					<div className={`status ${getStatusCssName(stationData?.status)}`}>{stationData?.status}</div>
				</div>
			</div>
		</div>
	);
}

export default StationBox;