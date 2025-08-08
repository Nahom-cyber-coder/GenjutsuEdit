import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './contexts/GlobalContext';
import { GlobalMusicPlayer } from './components/GlobalMusicPlayer';
import HomePage from './pages/HomePage';
import AppPage from './pages/AppPage';
import CartoonConverterPage from './pages/CartoonConverterPage';
import PhotoEditorPage from './pages/PhotoEditorPage';
import VisualEffectsPage from './pages/VisualEffectsPage';
import ElasticPhotoPage from './pages/ElasticPhotoPage';
function App() {
return (<GlobalProvider>
<Router><Routes>
<Route path="/" element={<HomePage />} />
<Route path="/app" element={<AppPage />} />
<Route path="/cartoon-converter" element={<CartoonConverterPage />} />
<Route path="/photo-editor" element={<PhotoEditorPage />} />
<Route path="/visual-effects" element={<VisualEffectsPage />} />
<Route path="/elastic-photo" element={<ElasticPhotoPage />} />
</Routes>
<GlobalMusicPlayer />
</Router>
</GlobalProvider>);}
export default App;
