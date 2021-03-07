import '../styles/globals.css';
import '../styles/postCard.css';

function MyApp({ Component, pageProps }) {
	return (
		<Component
			{...pageProps}
			style={{
				height: '100%'
			}}
		/>
	);
}

export default MyApp;
