import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from './components';

const AppColumn = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	position: relative;
	width: 1000px;
	min-height: 100%;
	background-color: #fff;
	margin: 0 auto;
`;

const Page = styled.div`
	padding: 120px 0 20px;
`;

export const App = () => {
	return (
		<AppColumn className="App">
			<Header />
			<Page>
				<Routes>
					<Route path="/" element={<div>Главная страница</div>} />
					<Route path="/login" element={<div>Авторизация</div>} />
					<Route path="/register" element={<div>Регистрация</div>} />
					<Route path="/users" element={<div>Пользователи</div>} />
					<Route path="/product/" element={<div>Продукт </div>} />
					<Route
						path="/product/:id"
						element={<div>Страница с продуктом</div>}
					/>
					<Route
						path="/post/:id/edit"
						element={<div>Страница редактирования продукта</div>}
					/>
					<Route path="/*" element={<div>Страница с ошибкой</div>} />
				</Routes>
			</Page>
		</AppColumn>
	);
};
