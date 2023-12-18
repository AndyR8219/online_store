import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components';
import { Main, Login } from './pages';

const AppColumn = styled.div`
	width: 1200px;
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
				<Route path="/register" element={<div>Registration</div>} />
				<Route path="/users" element={<div>Пользователи</div>} />
				<Route path="/product/" element={<div>Продукт </div>} />
				<Route path="/product/:id" element={<div>Продукт </div>} />
				<Route path="/products_list" element={<div>ProductsList </div>} />
				<Route
					path="/post/:id/edit"
					element={<div>Страница редактирования продукта</div>}
				/>
				<Route path="/*" element={<div>Страница с ошибкой</div>} />
			</Routes>
		</AppColumn>
	);
};
