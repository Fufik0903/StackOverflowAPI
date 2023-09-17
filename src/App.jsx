import styles from "./assets/styles/App.module.scss";
import { Routes, Route } from "react-router-dom";

import Home from "./components/Home/Home";
import {PostPageContainer} from "./components/PostPage/PostPageContainer";

function App() {
	return (
		<div className={styles.container}>
			<Routes>
				<Route path="/" element={<Home/>}/>
				<Route path="post/:id" element={<PostPageContainer/>}/>
			</Routes>
			
		</div>
	);
}

export default App;
