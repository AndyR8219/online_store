import styled from 'styled-components';

const InputContaner = ({ className, width, ...props }) => {
	return <input name="text" className={className} {...props} />;
};

export const Input = styled(InputContaner)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	font-size: 18px;
	border: 1px solid #000;
`;
