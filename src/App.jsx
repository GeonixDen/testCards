import { useEffect, useState } from 'react';
import './App.css';

function App() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        const importVideos = async () => {
            try {
                // Используем import.meta.glob с правильным синтаксисом для public
                const videoFiles = import.meta.glob('../public/MP4/*.mp4', { as: 'url', eager: true });

                // Если eager: true, файлы уже импортированы, преобразуем их
                const videoUrls = Object.entries(videoFiles).map(([path, url]) => ({
                    name: path.split('/').pop(),
                    url: url
                }));

                // Если видео найдены, обновляем состояние
                if (videoUrls.length > 0) {
                    setVideos(videoUrls);
                }
            } catch (error) {
                console.error('Ошибка при загрузке видео:', error);
            }
        };

        importVideos();
    }, []);

    return (
        <div className="App">
            <h1>WEBM Видео</h1>
            {/* Тестовое видео с прямым путём */}
            {videos.length === 0 ? (
                <p>Видео не найдены в папке WEBM</p>
            ) : (
                <div className="video-grid">
                    {videos.map((video) => (
                        <div key={video.name} className="video-container">
                            <video autoPlay loop muted playsInline width="320">
                                <source src={video.url} type="video/mp4" />
                                Ваш браузер не поддерживает воспроизведение видео.
                            </video>
                            <p>{video.name}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
