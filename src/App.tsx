import './App.css';
import 'antd/dist/antd.css';
import VideoPlayer from './features/videoPlayer/VideoPlayer';
import Page404 from './features/Components/Page404';

function App() {
  return (
    <div className="App">
      <VideoPlayer />
      {/* <Page404 /> */}
    </div>
  );
}

export default App;
