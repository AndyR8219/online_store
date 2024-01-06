import { Routes, Route } from 'react-router-dom';
import { Header } from './components';
import {
	Main,
	Login,
	Registration,
	Product,
	Users,
	ProductList,
	EditProduct,
	NewProduct,
	ErrorPage,
	ProfilePage,
	CartPage,
} from './pages';
import styled from 'styled-components';

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
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/cart" element={<CartPage />} />
				<Route path="/product" element={<NewProduct />} />
				<Route path="/product/:id" element={<Product />} />
				<Route path="/products_list" element={<ProductList />} />
				<Route path="/product/:id/edit" element={<EditProduct />} />
				<Route path="/*" element={<ErrorPage />} />
			</Routes>
		</AppColumn>
	);
};
