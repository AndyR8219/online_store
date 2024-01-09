import { formatDate } from '../../../../utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDeleteCommentMutation } from '../../../../redux';
import { ROLE } from '../../../../constants';

export const Comment = ({ comments = [], productId, user }) => {
	const [deleteComment] = useDeleteCommentMutation();

	const handleDeleteComment = async (commentId, productId) => {
		try {
			await deleteComment({ commentId, productId });
		} catch (error) {
			console.error(error);
		}
	};

	const isRoleAdminOrModerator = Object.values([ROLE.ADMIN, ROLE.MODERATOR]).includes(
		user?.roleId,
	);

	return (
		<Grid container spacing={1}>
			{comments.map((comment) => (
				<Grid item key={comment.id} xs={12}>
					<Card
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
							p: 2,
						}}
					>
						<Box>
							<Typography variant="h6" sx={{ pt: 2 }}>
								{comment.author}
							</Typography>
							<Typography variant="body1">{comment.content}</Typography>
							<Typography variant="caption">
								{formatDate(comment.publishedAt)}
							</Typography>
						</Box>
						<Box>
							{isRoleAdminOrModerator && (
								<IconButton
									aria-label="delete"
									onClick={() =>
										handleDeleteComment(comment.id, productId)
									}
								>
									<HighlightOffIcon />
								</IconButton>
							)}
						</Box>
					</Card>
				</Grid>
			))}
		</Grid>
	);
};
