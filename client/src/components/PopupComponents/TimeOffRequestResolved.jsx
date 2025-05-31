import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import CloseIcon from '@mui/icons-material/Close';
import HRMButton from '../Button/HRMButton';
import { colors, fonts } from '../../Styles';
import PropTypes from 'prop-types';

/**
 * Popup component for notifying the user of the result of their time off request.
 *
 * Props:
 * - time_off_information<Object>: Contains the details of the time off request being approved or rejected
 *      Syntax: {
 *          startDate: <String>
 *          endDate: <String>
 *          status: <String>
 *          notes: <String>
 *      }
 *
 * - close<Function>: Function for closing this popup component.
 *      Syntax: close()
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function TimeOffRequestResolved({ time_off_information, close, style }) {
	const result = time_off_information.status === 'Approved' ? 'approved' : 'rejected';

	return (
		<Box
			sx={{
				...{
					width: '490px',
					borderRadius: '12px',
					padding: '40px',
					boxShadow: '0 15px 6px #10182808',
					backgroundColor: '#FFFFFF',
					color: colors.darkGrey,
					fontFamily: fonts.fontFamily,
				},
				...style,
			}}
		>
			<Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ marginBottom: '20px' }}>
				<h3>Ваш запрос на отгул был {result}.</h3>
				<CloseIcon
					onClick={close}
					sx={{
						backgroundColor: '#FFFFFF',
						'&:hover': {
							cursor: 'pointer',
							backgroundColor: '#D0D5DD',
						},
					}}
				/>
			</Stack>
			<p>
				Ваш запрос на отгул с {time_off_information.startDate} по {time_off_information.endDate} был {result}
			</p>
			{time_off_information.notes && (
				<>
					<h4>Дополнительные заметки вашего менеджера:</h4>
					<p>{time_off_information.notes}</p>
				</>
			)}
			<Stack direction='row' alignItems='center' justifyContent='flex-end'>
				<HRMButton mode='primary' onClick={close}>
					OK
				</HRMButton>
			</Stack>
		</Box>
	);
}

//Control panel settings for storybook
TimeOffRequestResolved.propTypes = {
	//Information included in the time off request
	time_off_information: PropTypes.objectOf(PropTypes.string),

	//Function for closing this popup
	close: PropTypes.func,
};

//Default values for this component
TimeOffRequestResolved.defaultProps = {
	style: {},
};
