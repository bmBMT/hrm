import AppTable from '../PeopleComponents/AppTable';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import ActionMenu from '../PeopleComponents/ActionMenu';
const BASE_URL = require('../../assets/FetchServices/BaseUrl.json').value;

const requests_url = `${BASE_URL}/api/employee-requests`;
const roles_url = `${BASE_URL}/api/roles`;

const headCells = [
	{ id: 'roleName', width: 50, label: 'Должность', visible: true },
	{ id: 'comment', width: 50, label: 'Комментарий', visible: true },
	{ id: 'statusName', width: 50, label: 'Статус', visible: true },
	{
		id: 'deadlineDate',
		width: 50,
		label: 'Дедлайн',
		visible: true,
		format: value => {
			const formatter = new Intl.DateTimeFormat('ru-RU', {
				weekday: 'short',
				day: 'numeric',
				month: 'long',
			});

			return formatter.formatToParts(new Date(value)).map(v => v.value).join('');
		},
	},
];

const RequestsTable = ({ edit }) => {
	const queryClient = useQueryClient();

	const { data: requests, isPending: isRequestsPending } = useQuery({
		queryKey: ['requests'],
		queryFn: () => axios.get(requests_url),
		select: res => res.data || [],
	});

	const { data: roles, isPending: isRolesPending } = useQuery({
		queryKey: ['roles'],
		queryFn: () => axios.get(roles_url),
		select: res => res.data || [],
	});

	const { mutate: complete, isCompliting } = useMutation({
		mutationFn: id => axios.patch(requests_url + `/complete/${id}`),
	});

	const { mutate: remove, isRemoving } = useMutation({
		mutationFn: id => axios.delete(requests_url + `/${id}`),
	});

	const actions = row => {
		return [
			{
				label: 'Редактировать',
				action: () => edit(row.id),
			},
			{
				label: 'Завершить',
				action: () =>
					complete(row.id, {
						onSuccess: () => {
							queryClient.invalidateQueries({ queryKey: ['requests'] });
						},
					}),
			},
			{
				label: 'Удалить',
				action: () =>
					remove(row.id, {
						onSuccess: () => {
							queryClient.invalidateQueries({ queryKey: ['requests'] });
						},
					}),
			},
		];
	};

	const data = requests?.map(req => ({
		...req,
		roleName: roles?.find(role => role.roleId === req.roleId).roleTitle,
		statusName: req.status === 'Pending' ? 'Ожидание' : req.status === 'Completed' ? 'Завершено' : 'Просрочено',
	}));

	return (
		<AppTable
			caption='Запросы'
			headCells={headCells}
			data={data || []}
			rowsPerPage={data?.length}
			loading={isRequestsPending || isRolesPending || isCompliting || !!isRemoving}
			showActionHeader
			customActions={row => <ActionMenu actions={actions(row)} />}
		/>
	);
};

export default RequestsTable;
