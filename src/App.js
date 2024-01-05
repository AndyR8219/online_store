import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components';
import { Main, Login, Registration, Product, Users, ProductList } from './pages';

const AppColumn = styled.div`
	max-width: 1600px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

export const App = () => {
	return (
		<AppColumn className="App">
			<Header />
			<Routes>
				<Route path="/" element={<Main />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Registration />} />
				<Route path="/users" element={<Users />} />
				<Route path="/product/" element={<div>Новый продукт</div>} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/products_list" element={<ProductList />} />
				<Route
					path="/product/:id/edit"
					element={<div>Страница редактирования продукта</div>}
				/>
				<Route path="/*" element={<div>Страница с ошибкой</div>} />
			</Routes>
		</AppColumn>
	);
};
