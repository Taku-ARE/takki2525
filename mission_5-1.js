// APIエンドポイント
const url = 'https://weather.tsukumijima.net/api/forecast/city/350020';

// データを取得して表示する関数
function fetchData() {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to retrieve data: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayData(data);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('data-container').innerHTML = `<p>データの取得に失敗しました: ${error.message}</p>`;
        });
}

// データをHTMLに表示する関数
function displayData(data) {
    const container = document.getElementById('data-container');
    
    // 天気予報データの表示
    const forecasts = data.forecasts;
    forecasts.forEach(forecast => {
        const maxTemp = forecast.temperature.max.celsius;
        const minTemp = forecast.temperature.min.celsius;

        const forecastElement = document.createElement('div');
        forecastElement.innerHTML = `
            <h2>${forecast.dateLabel}</h2>
            <p>${forecast.telop}</p>
            <p>最高気温: ${maxTemp !== null ? `${maxTemp}°C` : 'データなし'}</p>
            <p>最低気温: ${minTemp !== null ? `${minTemp}°C` : 'データなし'}</p>
            <hr>
        `;
        container.appendChild(forecastElement);
    });
}

// ページが読み込まれた後にデータを取得
window.onload = fetchData;