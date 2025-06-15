import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	Fade,
	FormControl,
	FormHelperText,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@mui/material';
import { forwardRef, useContext, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DatePicker from 'react-datepicker';
import PickersComponent from '../pickers/PickersCustomInput';
import DatePickerWrapper from '../react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import StateContext from '../../context/StateContext';
const BASE_URL = require('../../assets/FetchServices/BaseUrl.json').value;

const requests_url = `${BASE_URL}/api/employee-requests`;
const roles_url = `${BASE_URL}/api/roles`;

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			width: 250,
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
		},
	},
};

const schema = yup.object().shape({
	roleId: yup
		.number()
		.transform(value => (isNaN(value) ? undefined : value))
		.required('Поле обязательно к заполнению'),
	deadlineDate: yup.string().required('Поле обязательно к заполнению'),
	comment: yup.string().nullable(),
});

const Transition = forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />;
});

const RequestCreateDialog = ({ show, setShow, requestId = null }) => {
	const stateContext = useContext(StateContext);
	const queryClient = useQueryClient();

	const { data: requests } = useQuery({
		queryKey: ['requests'],
		queryFn: () => axios.get(requests_url),
		select: res => res.data || [],
	});

	const { data: roles } = useQuery({
		queryKey: ['roles'],
		queryFn: () => axios.get(roles_url),
		select: res => res.data || [],
	});

	const request = requests?.find(req => req.id === requestId);
	const {
		register,
		formState: { errors },
		control,
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	useEffect(() => {
		reset({
			roleId: request?.roleId,
			deadlineDate: request?.deadlineDate,
			comment: request?.comment,
		});
	}, [request]);

	const onClose = () => {
		setShow(false);
		reset();
	};

	const { mutate, isPending } = useMutation({
		mutationFn: dto => {
			!!requestId
				? axios.patch(requests_url + `/${requestId}`, dto).then(() => {
						onClose();
						queryClient.invalidateQueries({ queryKey: ['requests'] });
				  })
				: axios.post(requests_url, dto);
		},
		onSuccess: () => {
			onClose();
			queryClient.invalidateQueries({ queryKey: ['requests'] });
		},
	});

	const onSubmit = data => {
		mutate({
			...data,
			empId: stateContext.state.user.empId,
		});
	};

	return (
		<Dialog
			fullWidth
			open={show}
			maxWidth='md'
			scroll='body'
			onClose={onClose}
			TransitionComponent={Transition}
			component='form'
			autoComplete='dnew-password'
			onSubmit={handleSubmit(onSubmit)}
		>
			<DialogContent sx={{ position: 'relative', p: 4, minHeight: '70vh' }}>
				<IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
					<CloseIcon />
				</IconButton>
				<Box sx={{ mb: 8, textAlign: 'center' }}>
					<Typography variant='h5' sx={{ mb: 3 }}>
						{requestId !== null ? 'Редактирование' : 'Создание'} запроса
					</Typography>
					<Typography variant='body2'>Введите данные для поиска нового сотрудника</Typography>
				</Box>
				<Grid container spacing={3}>
					<Grid item sm={6} xs={12}>
						<FormControl fullWidth error={!!errors.roleId}>
							<InputLabel id='status-select'>Должность</InputLabel>
							<Controller
								name='roleId'
								control={control}
								render={({ field }) => (
									<Select
										fullWidth
										labelId='status-select'
										label='Должность'
										MenuProps={MenuProps}
										{...register('roleId')}
										value={field.value}
									>
										{roles?.map(role => (
											<MenuItem value={role.roleId}>{role.roleTitle}</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.roleId && <FormHelperText>{errors.roleId.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item sm={6} xs={12}>
						<DatePickerWrapper>
							<FormControl fullWidth error={!!errors.deadlineDate}>
								<Controller
									name='deadlineDate'
									control={control}
									render={({ field }) => (
										<DatePicker
											selected={!!field.value ? new Date(field.value) : undefined}
											popperPlacement='bottom'
											onChange={date => (!!date ? field.onChange(date.toISOString()) : undefined)}
											autoComplete='false'
											customInput={<PickersComponent error={!!errors.deadlineDate} label='Срок выполнения' />}
											fullWidth
										/>
									)}
								/>
								{errors.deadlineDate && <FormHelperText>{errors.deadlineDate.message}</FormHelperText>}
							</FormControl>
						</DatePickerWrapper>
					</Grid>
					<Grid item xs={12}>
						<TextField multiline minRows={10} maxRows={20} fullWidth label='Комменатрий' {...register('comment')} />
					</Grid>
				</Grid>
			</DialogContent>
			<DialogActions
				sx={{
					justifyContent: 'center',
					px: 4,
					pb: 4,
				}}
			>
				<Button disabled={isPending} fullWidth variant='outlined' color='secondary' onClick={onClose}>
					Отмена
				</Button>
				<Button
					disabled={isPending}
					fullWidth
					variant='contained'
					type='submit'
					sx={{ mr: 1, border: '1px solid #ea5e20', backgroundColor: '#ea5e20' }}
				>
					Создать
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default RequestCreateDialog;
