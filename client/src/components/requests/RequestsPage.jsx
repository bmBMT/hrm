import { Box, Button, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import RequestsTable from './RequestsTable';
import RequestCreateDialog from './RequestCreateDialog';

const RuequestsPage = () => {
	const [showCreateDialog, setShowCreateDialog] = useState(false);
	const [editId, setEditId] = useState();

	const edit = id => {
		setEditId(id);
		setShowCreateDialog(true);
	};

	useEffect(() => {
		if (!showCreateDialog) setEditId(undefined);
	}, [showCreateDialog]);

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
					Запросы для найма сотрудников
				</h2>
				<Button
					variant='contained'
					disableElevation
					onClick={() => setShowCreateDialog(true)}
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
			<RequestCreateDialog show={showCreateDialog} setShow={setShowCreateDialog} requestId={editId} />
			<RequestsTable edit={edit} />
		</Box>
	);
};

export default RuequestsPage;
