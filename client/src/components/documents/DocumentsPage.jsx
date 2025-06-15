import { Button, Stack } from '@mui/material';
import { Box } from '@mui/system';
import DocumentsCreateDialog from './DocumentsCreateDialog';
import { useState } from 'react';
import DocumentsTable from './DocumentsTable';

const DocumentsPage = () => {
	const [show, setShow] = useState(false);

	return (
		<Box>
			<Stack direction='row' alignItems='center' justifyContent='space-between'>
				<h2
					style={{
						fontSize: '24px',
						fontFamily: 'Inter',
						fontWeight: '600',
						color: '#101828',
						marginTop: '0px',
						marginBottom: '16px',
					}}
				>
					Электронные документы
				</h2>
				<Button
					variant='contained'
					disableElevation
					onClick={() => setShow(true)}
					sx={{
						height: '34px',
						border: '1px solid #ea5e20',
						backgroundColor: '#ea5e20',
						fontSize: 13,
						fontWeight: 400,
						textTransform: 'none',
						'&:hover': {
							backgroundColor: '#d46331',
							border: '1px solid #d46331',
						},
					}}
				>
					Создать
				</Button>
			</Stack>
			<DocumentsTable />
			<DocumentsCreateDialog show={show} setShow={setShow} />
		</Box>
	);
};

export default DocumentsPage;
