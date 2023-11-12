import { Icon } from '../icon/icon';
import { Input } from '../input/input';
import styled from 'styled-components';

const SearchContainer = ({ className, searchPhrase, onChange, placeholder, margin }) => {
	return (
		<div className={className}>
			<Input value={searchPhrase} placeholder={placeholder} onChange={onChange} />
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	position: relative;
	width: ${({ width = '340px' }) => width};
	height: 40px;
	margin: ${({ margin = '40px auto 0' }) => margin};

	& > input {
		padding: 10px 32px 10px 10px;
	}

	& > div {
		position: absolute;
		right: 9px;
		top: 4px;
	}
`;
