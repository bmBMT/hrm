import Box from '@mui/system/Box';
import Stack from '@mui/system/Stack';
import { styled } from '@mui/system';
import { useContext } from 'react';
import PropTypes from 'prop-types';
import HRMButton from '../Button/HRMButton';
import { fonts } from '../../Styles';
import StateContext from '../../context/StateContext';

/**
 * Menu component for the onboarding page containing the welcome message for the new employee.
 *
 * Props:
 * - next<Function>: Function provided by the parent component to transition to the next page.
 *      Syntax: next()
 *
 * - save<Function>: Function provided by the parent component to save the onboarding status and navigate
 *      to the application's homepage.
 *      Syntax: save()
 *
 * - style<Object>: Optional prop for adding further inline styling.
 *      Default: {}
 */
export default function IntroductoryMessage({ next, save, style }) {
	const stateContext = useContext(StateContext);
	//const currentUser = stateContext.state.employee ? stateContext.state.employee.empId : -1;

	//Obtain company name, employee name and job title
	const jobTitle = stateContext.state.employee.role.roleTitle;
	const employeeName = stateContext.state.employee.firstName;

	//Custom style elements
	const StyledP = styled('p')({
		marginBottom: '8px',
		lineHeight: '1.5',
	});

	return (
		<Box
			sx={{
				...{
					border: '1px solid #EBEBEB',
					borderRadius: '10px',
					minWidth: '1003px',
					paddingX: '155px',
					paddingY: '69px',
					fontFamily: fonts.fontFamily,
				},
				...style,
			}}
		>
			{/*Title*/}
			<h4 style={{ textAlign: 'center', marginTop: 0, marginBottom: '10px' }}>Процесс адаптации (онбординга)</h4>
			{/*Content*/}
			<StyledP>В рамках процесса адаптации мы хотим убедиться, что всё пройдёт для вас гладко.</StyledP>
			<StyledP>
				Поздравляем с принятием нашего предложения занять должность {jobTitle} в нашей команде. Мы были впечатлены
				вашими профессиональными качествами и опытом, продемонстрированными в ходе собеседований, и уверены в вашей
				способности внести ценный вклад в работу нашей команды.
			</StyledP>
			<StyledP>Пожалуйста, не стесняйтесь задавать любые вопросы.</StyledP>
			<StyledP>Добро пожаловать {employeeName}</StyledP>
			{/*Buttons*/}
			<Stack direction='row' alignItems='center' justifyContent='flex-end' spacing={2}>
				<HRMButton mode='secondaryB' onClick={save}>
					Закрыть и завершить позже
				</HRMButton>
				<HRMButton mode='primary' onClick={next}>
					Далее
				</HRMButton>
			</Stack>
		</Box>
	);
}

//Control panel settings for storybook
IntroductoryMessage.propTypes = {
	//Function for transitioning to the next page
	next: PropTypes.func,

	//Function for saving the onboarding status
	save: PropTypes.func,
};

//Default values for this component
IntroductoryMessage.defaultProps = {
	style: {},
};
