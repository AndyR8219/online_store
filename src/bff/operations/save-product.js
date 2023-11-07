import { updateProduct, addProduct } from '../api';
import { sessions } from '../sessions';
import { ROLE } from '../constants';

export const saveProduct = async (hash, newProductData) => {
	const accessRoles = [ROLE.ADMIN];

	const access = await sessions.access(hash, accessRoles);

	if (!access) {
		return {
			error: 'Доступ запрещен',
			res: null,
		};
	}

	const savedProduct =
		newProductData.id === ''
			? await addProduct(newProductData)
			: await updateProduct(newProductData);

	return {
		error: null,
		res: savedProduct,
	};
};
