const UI = {
    loading: document.getElementById('loading'),
    error: document.getElementById('error'),
    result: document.getElementById('result')
};

function showState(state) {
    UI.loading.classList.add('hidden');
    UI.error.classList.add('hidden');
    UI.result.classList.add('hidden');
    UI[state].classList.remove('hidden');
}

async function searchWeather(city = document.getElementById('cityInput').value) {
    if (!city) return;
    showState('loading');

    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);
        if (!res.ok) throw new Error("Thành phố không tồn tại hoặc mất mạng!");
        
        const data = await res.json();
        const current = data.current_condition[0];

        document.getElementById('cityName').textContent = city.toUpperCase();
        document.getElementById('temp').textContent = current.temp_C;
        document.getElementById('humidity').textContent = current.humidity;
        
        showState('result');
        saveHistory(city);
    } catch (err) {
        UI.error.textContent = err.message;
        showState('error');
    }
}

function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    if (!history.includes(city)) {
        history.unshift(city);
        if (history.length > 5) history.pop();
        localStorage.setItem('weatherHistory', JSON.stringify(history));
    }
    renderHistory();
}

function renderHistory() {
    const history = JSON.parse(localStorage.getItem('weatherHistory')) || [];
    const list = document.getElementById('historyList');
    list.innerHTML = history.map(c => `<li style="cursor:pointer; color:blue;" onclick="searchWeather('${c}')">${c}</li>`).join('');
}

renderHistory(); // Chạy lúc mới mở trang