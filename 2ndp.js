window.addEventListener('DOMContentLoaded', () => {
  const studyTime = 25 * 60; // 25 minutes in seconds
  const breakTime = 5 * 60; // 5 minutes in seconds

  let studyTimerInterval;
  let breakTimerInterval;
  let studyCurrentTime = studyTime;
  let breakCurrentTime = breakTime;
  let sessionCount = 0;

  const studyTimerDisplay = document.getElementById('studyTimerDisplay');
  const breakTimerDisplay = document.getElementById('breakTimerDisplay');
  const studyStartBtn = document.getElementById('studyStartBtn');
  const studyResetBtn = document.getElementById('studyResetBtn');
  const breakStartBtn = document.getElementById('breakStartBtn');
  const breakResetBtn = document.getElementById('breakResetBtn');
  const sessionCountDisplay = document.getElementById('sessionCount');
  const motivationSentenceElement = document.getElementById('motivationSentence');

  function startStudyTimer() {
    if (!studyTimerInterval) {
      studyTimerInterval = setInterval(updateStudyTimer, 1000);
      updateStudyTimer();
    }
  }

  function updateStudyTimer() {
    const minutes = Math.floor(studyCurrentTime / 60).toString().padStart(2, '0');
    const seconds = (studyCurrentTime % 60).toString().padStart(2, '0');
    studyTimerDisplay.textContent = `${minutes}:${seconds}`;

    if (studyCurrentTime <= 0) {
      clearInterval(studyTimerInterval);
      studyTimerInterval = null;
      sessionCount++;
      sessionCountDisplay.textContent = sessionCount;
      startBreakTimer();
      studyStartBtn.disabled = true; // Disable the "Start Studying" button
    } else {
      studyCurrentTime--;
    }
  }

  function resetStudyTimer() {
    clearInterval(studyTimerInterval);
    studyTimerInterval = null;
    studyCurrentTime = studyTime;
    studyTimerDisplay.textContent = '';
    studyStartBtn.disabled = false; // Enable the "Start Studying" button
  }

  function startBreakTimer() {
    if (!breakTimerInterval) {
      breakTimerInterval = setInterval(updateBreakTimer, 1000);
      updateBreakTimer();
    }
  }

  function updateBreakTimer() {
    const minutes = Math.floor(breakCurrentTime / 60).toString().padStart(2, '0');
    const seconds = (breakCurrentTime % 60).toString().padStart(2, '0');
    breakTimerDisplay.textContent = `${minutes}:${seconds}`;

    if (breakCurrentTime <= 0) {
      clearInterval(breakTimerInterval);
      breakTimerInterval = null;
      resetBreakTimer();
      motivationSentenceElement.textContent = ''; // Clear the motivation sentence
      breakStartBtn.disabled = false; // Enable the "Start Break" button
    } else {
      breakCurrentTime--;
    }
  }

  function resetBreakTimer() {
    clearInterval(breakTimerInterval);
    breakTimerInterval = null;
    breakCurrentTime = breakTime;
    breakTimerDisplay.textContent = '';
  }

  studyStartBtn.addEventListener('click', () => {
    startStudyTimer();
    studyStartBtn.disabled = true; // Disable the "Start Studying" button
    motivationSentenceElement.textContent = ''; // Clear the motivation sentence
  });

  studyResetBtn.addEventListener('click', resetStudyTimer);

  breakStartBtn.addEventListener('click', () => {
    startBreakTimer();
    breakStartBtn.disabled = true; // Disable the "Start Break" button
  });

  breakResetBtn.addEventListener('click', resetBreakTimer);
});
