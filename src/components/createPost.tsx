export function CreatePost(props) {
	if (props.show === 1)
		return (
			<div className="createPost" id="createPostId">
				<div>
					<div>CreatePost</div>
				</div>
			</div>
		);
	else return null;
}
