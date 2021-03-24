import '../styles/createPost.css';
import '../styles/globals.css';
import '../styles/Login.css';
import '../styles/NavBar.css';
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
