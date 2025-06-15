import AppTable from '../PeopleComponents/AppTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import ActionMenu from '../PeopleComponents/ActionMenu';
import FileSaver from 'file-saver';
const BASE_URL = require('../../assets/FetchServices/BaseUrl.json').value;

const documents_url = `${BASE_URL}/api/documents_pdf`;

const headCells = [
	{ id: 'employee_full_name', width: 50, label: 'Имя сотрудника', visible: true },
	{ id: 'position', width: 50, label: 'Должность', visible: true },
	{ id: 'department', width: 50, label: 'Отдел', visible: true },
];

const DocumentsTable = () => {
	const { data: documents, isPending: isDocumentsPending } = useQuery({
		queryKey: ['documents'],
		queryFn: () => axios.get(documents_url),
		select: res => res.data || [],
	});

	const actions = row => {
		const url = BASE_URL + '/' + row.url;

		return [
			{
				label: 'Просмотр',
				action: () => window.open(url),
			},
			{
				label: 'Скачать',
				action: () => FileSaver.saveAs(url, `Договор_${row.employee_full_name}.pdf`),
			},
		];
	};

	return (
		<AppTable
			caption='Документы'
			headCells={headCells}
			data={documents || []}
			rowsPerPage={documents?.length}
			loading={isDocumentsPending}
			showActionHeader
			customActions={row => <ActionMenu actions={actions(row)} />}
		/>
	);
};

export default DocumentsTable;
