export const validateFormProduct = (errors, setErrors, product) => {
	let isValid = true;
	const newErrors = { ...errors };

	Object.keys(product).forEach((field) => {
		if (!product[field]) {
			newErrors[field] = 'Это поле не может быть пустым';
			isValid = false;
		}
	});

	if (product.title.length < 3) {
		newErrors.title = 'Название товара должно содержать не менее 3 символов';
		isValid = false;
	}
	if (product.category.length < 3) {
		newErrors.category = 'Категория должна содержать не менее 3 символов';
		isValid = false;
	}
	if (product.description.length < 10) {
		newErrors.description = 'Описание должно содержать не менее 10 символов';
		isValid = false;
	}

	setErrors(newErrors);
	return isValid;
};
