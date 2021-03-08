import React from 'react';

export default function PostCard(props) {
	return (
		<div className="postCard">
			<div className="postCardtop">
				<div className="UserCard truncate">
					<span>{props.post.user.FirstName}</span>
					<span>{props.post.user.LastName}</span>
				</div>
				<div className="TripleDot">options</div>
			</div>

			<div className="PostDetails">
				<div className="PostText wrap">{props.post.postDetails.text}</div>
				<div className="PostMedia">
					<div className="column">
						{props.post.postDetails.media.map((media, index) => {
							if ((index + 1) % 2 == 0) {
								return (
									<div
										key={media.id}
										style={{
											height: (100 / props.post.postDetails.media.length * 2).toString(10) + '%',
											maxHeight:
												(100 / props.post.postDetails.media.length * 2).toString(10) + '%',
											width: '100%',
											padding: '2%'
										}}
									>
										<img key={media.id} src={media.url} />
									</div>
								);
							}
						})}
					</div>
					<div className="column">
						{props.post.postDetails.media.map((media, index) => {
							if ((index + 1) % 2 != 0)
								return (
									<div
										key={media.id}
										style={{
											height: (100 / props.post.postDetails.media.length * 2).toString(10) + '%',
											maxHeight:
												(100 / props.post.postDetails.media.length * 2).toString(10) + '%',
											width: '100%',
											padding: '2%'
										}}
									>
										<img key={media.id} src={media.url} />
									</div>
								);
						})}
					</div>
				</div>
			</div>
			<div className="postCardBottom">
				<div className="Action">action buttons</div>
				<div className="CommentArea">comments</div>
			</div>
		</div>
	);
}
