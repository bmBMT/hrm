import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import PropTypes from 'prop-types';
import { fonts } from '../../Styles';

/**
 * Menu component for the satisfactory survey response page to notify the user that the
 * survey has been completed.
 *
 * Props:
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function ResponseComplete({ style }) {
	return (
		<Box
			sx={{
				...{
					border: '1px solid #EBEBEB',
					borderRadius: '10px',
					minWidth: '1003px',
					paddingY: '83px',
					fontFamily: fonts.fontFamily,
				},
				...style,
			}}
		>
			<Stack direction='column' justifyContent='center'>
				<h4 style={{ textAlign: 'center', marginTop: 0, marginBottom: '8px' }}>
					Всё готово. Благодарим вас за прохождение опроса!
				</h4>
				<p style={{ textAlign: 'center', marginTop: 0, marginBottom: '20px' }}>
					Обратите внимание, что ваши ответы будут анонимно направлены только администратору HR, а не вашему
					руководителю.
				</p>
			</Stack>
		</Box>
	);
}

//Control panel settings for storybook
ResponseComplete.propTypes = {
	//Function for submitting the survey responses
	submitResponse: PropTypes.func,
};

//Default values for this component
ResponseComplete.defaultProps = {
	style: {},
};
