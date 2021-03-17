import { useEffect } from 'react';

export function Canvas(props) {
	if (props.show === 1) {
		let startDraw = 0;
		const draw = (X, Y) => {
			const can = document.getElementById('canvas') as HTMLCanvasElement;
			const ctx = can.getContext('2d');
			console.log(X, Y);
			ctx.beginPath();
			ctx.arc(X + 0.5, Y, 10.5, 0, 2 * Math.PI);
			ctx.stroke();
		};
		const changeState = () => {
			startDraw = startDraw === 0 ? 1 : 0;
		};
		useEffect(() => {
			document.getElementsByTagName('body').item(0).style.overscrollBehaviorY = 'contain';
			document.getElementById('canvas').addEventListener('mousedown', (e) => {
				console.log('mousedown', startDraw);
				changeState();
			});
			document.getElementById('canvas').addEventListener('mouseup', (e) => {
				console.log(startDraw, 'mouseup');
				changeState();
			});
			document.getElementById('canvas').addEventListener('mousemove', (e) => {
				// console.log(e);
				if (startDraw === 1) {
					console.log('drawing');
					var rect = (e.target as HTMLElement).getBoundingClientRect();
					const can = document.getElementById('canvas') as HTMLCanvasElement;
					const scaleX = can.width / rect.width; // relationship bitmap vs. element for X
					const scaleY = can.height / rect.height; // relationship bitmap vs. element for Y
					let x = (e.clientX - rect.left) * scaleX;
					let y = (e.clientY - rect.top) * scaleY;
					draw(x, y);
				}
			});
			document.getElementById('canvas').addEventListener('touchstart', (e) => {
				console.log('mousedown', startDraw);
				changeState();
			});
			document.getElementById('canvas').addEventListener('touchend', (e) => {
				console.log(startDraw, 'mouseup');
				changeState();
			});
			document.getElementById('canvas').addEventListener('touchmove', (e) => {
				console.log(e);
				if (startDraw === 1) {
					console.log('drawing');
					var rect = (e.target as HTMLElement).getBoundingClientRect();
					const can = document.getElementById('canvas') as HTMLCanvasElement;
					const scaleX = can.width / rect.width; // relationship bitmap vs. element for X
					const scaleY = can.height / rect.height; // relationship bitmap vs. element for Y
					let x = (e.touches[0].clientX - rect.left) * scaleX;
					let y = (e.touches[0].clientY - rect.top) * scaleY;
					draw(x, y);
				}
			});
			return () => {
				document.getElementsByTagName('body').item(0).style.overscrollBehaviorY = 'auto';
				document.getElementById('canvas').removeEventListener('mouseup', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('mousedown', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('mousemove', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchstart', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchmove', () => {
					console.log('Event Over');
				});
				document.getElementById('canvas').removeEventListener('touchend', () => {
					console.log('Event Over');
				});
				const can = document.getElementById('canvas') as HTMLCanvasElement;
				const ctx = can.getContext('2d');
				ctx.clearRect(0, 0, can.width, can.height);
			};
		});
		return (
			<div className="createPost">
				<div>
					<div>
						<canvas id="canvas" />
					</div>
				</div>
			</div>
		);
	}
	return null;
}
