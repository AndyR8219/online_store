import { useState } from 'react';
import { useDeleteProductByIdMutation } from '../../../../redux';
import { useNavigate } from 'react-router-dom';
import { ErrorAlert, SuccessAlert } from '../../../../components';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const ProductRow = ({ products }) => {
	const navigate = useNavigate();
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [deleteProductItem] = useDeleteProductByIdMutation();

	const commonHeaderCellStyle = {
		width: '20%',
		fontSize: 20,
	};

	const deleteProduct = async (productId) => {
		try {
			await deleteProductItem(productId);
			setSnackbarOpen(true);
		} catch (error) {
			<ErrorAlert error={error} />;
		}
	};

	return (
		<Box sx={{ minWidth: 650, maxWidth: 1000, m: '0 auto' }}>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow sx={{ width: '25%', fontSize: 20 }}>
							<TableCell sx={{ width: '25%', fontSize: 20 }} align="center">
								Название товара
							</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="center">
								Категория
							</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="center">
								Цена
							</TableCell>
							<TableCell sx={commonHeaderCellStyle} align="center">
								Количество
							</TableCell>
							<TableCell sx={{ width: '15%', fontSize: 20 }} align="center">
								Изменить/Удалить
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((product) => (
							<TableRow key={product.id}>
								<TableCell
									component="th"
									scope="row"
									sx={{ width: '55%' }}
								>
									<Typography variant="body1">
										{product.title}
									</Typography>
								</TableCell>
								<TableCell sx={{ width: '15%' }} align="center">
									<Typography variant="body1">
										{product.category}
									</Typography>
								</TableCell>
								<TableCell sx={{ width: '5%' }} align="center">
									<Typography variant="body1">
										{product.price}
									</Typography>
								</TableCell>
								<TableCell sx={{ width: '10%' }} align="center">
									<Typography variant="body1">
										{product.quantity}
									</Typography>
								</TableCell>
								<TableCell sx={{ width: '15%' }} align="center">
									<Box sx={{ display: 'flex' }}>
										<IconButton
											onClick={() =>
												navigate(`/product/${product.id}/edit`)
											}
										>
											<EditIcon color="info" />
										</IconButton>
										<IconButton
											onClick={() => deleteProduct(product.id)}
										>
											<DeleteIcon color="error" />
										</IconButton>
									</Box>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<SuccessAlert
				setSnackbarOpen={setSnackbarOpen}
				snackbarOpen={snackbarOpen}
				message={'Item deleted successfully'}
			/>
		</Box>
	);
};
