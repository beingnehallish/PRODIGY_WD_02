  let startTime;
  let isrunning = false;
  let lapTimes = [];
  let interval;

  function start() {
    if (isrunning) {
      isrunning = false;
      clearInterval(interval);
      document.querySelector('button').textContent = 'START';
    } else {
      isrunning = true;
      startTime = Date.now() - (lapTimes.length > 0 ? lapTimes[lapTimes.length - 1] : 0);
      interval = setInterval(update, 1000);
      document.querySelector('button').textContent = 'STOP';
    }
}
  function lap() {
    if (isrunning) {
      const currentTime = Date.now() - startTime;
      lapTimes.push(currentTime);
      displayLapTimes();
    }
  }

  function reset() {
    clearInterval(interval);
    isrunning = false;
    startTime = 0;
    lapTimes = [];
    document.getElementById('stopwatch').textContent = '00:00:00';
    document.getElementById('lapTimes').textContent = '';
    document.querySelector('button').textContent = 'START';
  }

  function update() {
    const currentTime = Date.now() - startTime;
    document.getElementById('stopwatch').textContent = formatTime(currentTime);
  }

  function displayLapTimes() {
    const lapTimesElement = document.getElementById('lapTimes');
    lapTimesElement.innerHTML = '<strong>Lap Times:</strong><br>';
    lapTimes.forEach((lapTime, index) => {
        const lapTimeDisplay = document.createElement('div');
        lapTimeDisplay.textContent = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapTimesElement.appendChild(lapTimeDisplay);
    });
  }

  function formatTime(time){
    const hours=Math.floor(time/3600000);
    const minutes=Math.floor((time%3600000)/60000);
    const seconds=Math.floor((time%60000)/1000);

    return (
      (hours < 10 ? '0' : '') + hours + ':' +(minutes < 10 ? '0' : '') + minutes + ':' +(seconds < 10 ? '0' : '') + seconds
    );
  }