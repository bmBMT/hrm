import {
	Button,
	CircularProgress,
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
import { forwardRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import DatePickerWrapper from '../react-datepicker';
import DatePicker from 'react-datepicker';
import PickersComponent from '../pickers/PickersCustomInput';
import document_templates from '../../config/document_templates';
import FileSaver from 'file-saver';
const BASE_URL = require('../../assets/FetchServices/BaseUrl.json').value;

const roles_url = `${BASE_URL}/api/roles`;
const departaments_url = `${BASE_URL}/api/departments`;

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

const EMTY_MESSAGE = 'Поле обязательно к заполнению';

const schema = yup.object().shape({
	employee_full_name: yup.string().required(EMTY_MESSAGE),
	passport_series: yup
		.number()
		.transform(value => (isNaN(value) ? undefined : value))
		.required(EMTY_MESSAGE),
	passport_number: yup
		.number()
		.transform(value => (isNaN(value) ? undefined : value))
		.required(EMTY_MESSAGE),
	passport_issued_by: yup.string().required(EMTY_MESSAGE),
	employee_address: yup.string().required(EMTY_MESSAGE),
	position: yup.string().required(EMTY_MESSAGE),
	department: yup.string().required(EMTY_MESSAGE),
	job_duties: yup.string().required(EMTY_MESSAGE),
	salary: yup
		.number()
		.transform(value => (isNaN(value) ? undefined : value))
		.required(EMTY_MESSAGE),
	payment_procedure: yup.string().required(EMTY_MESSAGE),
	start_date: yup.string().required(EMTY_MESSAGE),
	employee_phone: yup.string().required(EMTY_MESSAGE),
});

const Transition = forwardRef(function Transition(props, ref) {
	return <Fade ref={ref} {...props} />;
});

const DocumentsCreateDialog = ({ show, setShow }) => {
	const queryClient = useQueryClient();
	const { data: roles } = useQuery({
		queryKey: ['roles'],
		queryFn: () => axios.get(roles_url),
		select: res => res.data || [],
	});
	const { data: departaments } = useQuery({
		queryKey: ['departaments'],
		queryFn: () => axios.get(departaments_url),
		select: res => res.data || [],
	});

	const { mutate: generatePdf, isPending: isGenerating } = useMutation({
		mutationFn: data => axios.post(`${BASE_URL}/api/documents_pdf`, data),
	});

	const {
		register,
		control,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onClose = () => {
		setShow(false);
		reset();
	};

	const onSubmit = async data => {
		generatePdf(
			{
				data,
				templateName: document_templates.contract,
			},
			{
				onSuccess: res => {
					FileSaver.saveAs(BASE_URL + '/' + res.data.url, `Договор_${data.employee_full_name}.pdf`);
					queryClient.invalidateQueries({
						queryKey: ['documents'],
					});
					onClose();
				},
			}
		);
	};

	return (
		<Dialog
			fullWidth
			open={show}
			onClose={onClose}
			TransitionComponent={Transition}
			component='form'
			autoComplete='dnew-password'
			fullScreen
			onSubmit={handleSubmit(onSubmit)}
		>
			<DialogContent sx={{ position: 'relative', p: 4, minHeight: '70vh' }}>
				<IconButton size='small' onClick={onClose} sx={{ position: 'absolute', right: '1rem', top: '1rem' }}>
					<CloseIcon />
				</IconButton>
				<Typography textAlign='center' variant='h5' sx={{ mb: 3 }}>
					Создание документа
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<TextField
							label='ФИО сотрудника'
							fullWidth
							{...register('employee_full_name')}
							error={!!errors.employee_full_name}
							helperText={errors.employee_full_name?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label='Серия паспорта'
							type='number'
							fullWidth
							{...register('passport_series')}
							error={!!errors.passport_series}
							helperText={errors.passport_series?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label='Номер паспорта'
							type='number'
							fullWidth
							{...register('passport_number')}
							error={!!errors.passport_number}
							helperText={errors.passport_number?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={12} md={4}>
						<TextField
							label='Кем выдан'
							fullWidth
							{...register('passport_issued_by')}
							error={!!errors.passport_issued_by}
							helperText={errors.passport_issued_by?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={12}>
						<TextField
							label='Адрес сотрудника'
							fullWidth
							{...register('employee_address')}
							error={!!errors.employee_address}
							helperText={errors.employee_address?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<FormControl fullWidth error={!!errors.position}>
							<InputLabel id='status-select'>Должность</InputLabel>
							<Controller
								name='position'
								control={control}
								render={({ field }) => (
									<Select
										fullWidth
										labelId='status-select'
										label='Должность'
										MenuProps={MenuProps}
										{...register('position')}
										value={field.value}
									>
										{roles?.map(role => (
											<MenuItem value={role.roleTitle}>{role.roleTitle}</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.position && <FormHelperText>{errors.position.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<FormControl fullWidth error={!!errors.department}>
							<InputLabel id='status-select1'>Отдел</InputLabel>
							<Controller
								name='department'
								control={control}
								render={({ field }) => (
									<Select
										fullWidth
										labelId='status-select1'
										label='Отдел'
										MenuProps={MenuProps}
										{...register('department')}
										value={field.value}
									>
										{departaments?.map(dep => (
											<MenuItem value={dep.departmentName}>{dep.departmentName}</MenuItem>
										))}
									</Select>
								)}
							/>
							{errors.department && <FormHelperText>{errors.department.message}</FormHelperText>}
						</FormControl>
					</Grid>
					<Grid item xs={12} sm={6} md={4}>
						<TextField
							label='Должностные обязанности'
							fullWidth
							{...register('job_duties')}
							error={!!errors.job_duties}
							helperText={errors.job_duties?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Зарплата'
							fullWidth
							type='number'
							{...register('salary')}
							error={!!errors.salary}
							helperText={errors.salary?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Порядок выплаты'
							fullWidth
							{...register('payment_procedure')}
							error={!!errors.payment_procedure}
							helperText={errors.payment_procedure?.message}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<DatePickerWrapper>
							<FormControl fullWidth error={!!errors.start_date}>
								<Controller
									name='start_date'
									control={control}
									render={({ field }) => (
										<DatePicker
											selected={!!field.value ? new Date(field.value) : undefined}
											popperPlacement='bottom'
											onChange={date => (!!date ? field.onChange(date.toISOString()) : undefined)}
											autoComplete='false'
											customInput={<PickersComponent error={!!errors.start_date} label='Дата начала работы' />}
											fullWidth
										/>
									)}
								/>
								{errors.start_date && <FormHelperText>{errors.start_date.message}</FormHelperText>}
							</FormControl>
						</DatePickerWrapper>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							label='Номер телефона'
							type='number'
							fullWidth
							{...register('employee_phone')}
							error={!!errors.passport_issued_by}
							helperText={errors.passport_issued_by?.message}
						/>
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
				<Button disabled={isGenerating} fullWidth variant='outlined' color='secondary' onClick={onClose}>
					Отмена
				</Button>
				<Button
					fullWidth
					disabled={isGenerating}
					variant='contained'
					type='submit'
					sx={{
						mr: 1,
						backgroundColor: '#ea5e20',
						'&:hover': {
							backgroundColor: '#d46331',
						},
					}}
				>
					{isGenerating ? <CircularProgress size={24} /> : 'Создать'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DocumentsCreateDialog;
