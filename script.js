document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('scoreChart').getContext('2d');

  let scores = {
    BNHS: 0,
    CHS: 0,
    DWCL: 0,
    IDSCI: 0,
    LEGASCI: 0,
    MORMS: 0,
    OSHS: 0
    // Add other schools here
  };

  let totalScores = {
    BNHS: 0,
    CHS: 0,
    DWCL: 0,
    IDSCI: 0,
    LEGASCI: 0,
    MORMS: 0,
    OSHS: 0
    // Add other schools here
  };

  let previousScores = {
    BNHS: 0,
    CHS: 0,
    DWCL: 0,
    IDSCI: 0,
    LEGASCI: 0,
    MORMS: 0,
    OSHS: 0
    // Add other schools here
  };

  let scoreChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(scores),
      datasets: [{
        label: 'Scores',
        data: Object.values(scores),
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  const updateChart = () => {
    scoreChart.data.datasets[0].data = Object.values(scores);
    scoreChart.update();
  };

  const updateTotalScores = () => {
    for (const school in scores) {
      document.getElementById(`${school}-total-score`).textContent = totalScores[school];
    }
  };

  const incrementScore = (school, points) => {
    previousScores[school] = points;
    scores[school] += points;
    totalScores[school] += points;
    updateChart();
    updateTotalScores();
  };

  const deleteLastAddedScore = (school) => {
    scores[school] -= previousScores[school];
    totalScores[school] -= previousScores[school];
    previousScores[school] = 0;
    updateChart();
    updateTotalScores();
  };

  document.querySelectorAll('.increment').forEach(button => {
    button.addEventListener('click', function() {
      const school = this.getAttribute('data-school');
      const points = parseInt(this.getAttribute('data-points'));
      incrementScore(school, points);
    });
  });

  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', function() {
      const school = this.getAttribute('data-school');
      deleteLastAddedScore(school);
    });
  });

  updateChart();
  updateTotalScores();
});
