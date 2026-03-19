/**
 * ICT Governance Dashboard - Custom JavaScript
 * Handles Chart.js charts, animated counters, filters, and progress bars
 */

(function () {
  'use strict';

  /* =============================================
   * ANIMATED STAT COUNTERS
   * ============================================= */
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-target'));
      if (!target) return;
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      function updateCounter() {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString();
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }
      updateCounter();
    });
  }

  /* =============================================
   * PROGRESS BAR ANIMATION ON SCROLL
   * ============================================= */
  function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress-bar-animated');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-progress');
          bar.style.width = targetWidth + '%';
          observer.unobserve(bar);
        }
      });
    }, { threshold: 0.3 });

    progressBars.forEach(bar => {
      bar.style.width = '0%';
      observer.observe(bar);
    });
  }

  /* =============================================
   * HOMEPAGE CHARTS
   * ============================================= */
  function initHomepageCharts() {
    // Cybercrime Bar Chart
    const barCtx = document.getElementById('cybercrimeBarChart');
    if (barCtx) {
      new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: ['Phishing', 'Identity Theft', 'Online Fraud', 'Hacking', 'Data Breach', 'Online Threats'],
          datasets: [{
            label: 'Reported Cases (2025 YTD)',
            data: [4250, 2980, 2640, 1875, 1320, 777],
            backgroundColor: [
              'rgba(13, 110, 253, 0.85)',
              'rgba(220, 53, 69, 0.85)',
              'rgba(255, 193, 7, 0.85)',
              'rgba(25, 135, 84, 0.85)',
              'rgba(111, 66, 193, 0.85)',
              'rgba(253, 126, 20, 0.85)'
            ],
            borderColor: [
              'rgba(13, 110, 253, 1)',
              'rgba(220, 53, 69, 1)',
              'rgba(255, 193, 7, 1)',
              'rgba(25, 135, 84, 1)',
              'rgba(111, 66, 193, 1)',
              'rgba(253, 126, 20, 1)'
            ],
            borderWidth: 2,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  return ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + ' cases';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { callback: v => v.toLocaleString() }
            }
          }
        }
      });
    }

    // Project Status Doughnut Chart
    const doughnutCtx = document.getElementById('projectDoughnutChart');
    if (doughnutCtx) {
      new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'In Progress', 'Planning', 'On Hold', 'Delayed'],
          datasets: [{
            data: [12, 18, 8, 5, 4],
            backgroundColor: [
              'rgba(25, 135, 84, 0.85)',
              'rgba(13, 110, 253, 0.85)',
              'rgba(255, 193, 7, 0.85)',
              'rgba(108, 117, 125, 0.85)',
              'rgba(220, 53, 69, 0.85)'
            ],
            borderColor: '#ffffff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = ((ctx.parsed / total) * 100).toFixed(1);
                  return ctx.label + ': ' + ctx.parsed + ' projects (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }
  }

  /* =============================================
   * DASHBOARD METRICS PAGE CHARTS
   * ============================================= */

  // Full data for the dashboard page
  const fullCybercrimeData = {
    labels: ['Phishing', 'Identity Theft', 'Online Fraud', 'Hacking', 'Data Breach', 'Online Threats'],
    allAgencies: [4250, 2980, 2640, 1875, 1320, 777],
    DICT: [1200, 800, 720, 530, 380, 220],
    DOJ: [1350, 950, 880, 620, 430, 250],
    NBI: [1100, 780, 650, 480, 340, 190],
    NPC: [600, 450, 390, 245, 170, 117]
  };

  const regionData = {
    'All Regions': [4250, 2980, 2640, 1875, 1320, 777],
    'NCR': [1700, 1192, 1056, 750, 528, 311],
    'Region III': [638, 447, 396, 281, 198, 117],
    'Region IV-A': [850, 596, 528, 375, 264, 155],
    'Visayas': [510, 358, 317, 225, 158, 93],
    'Mindanao': [552, 387, 343, 244, 172, 101]
  };

  let dashboardBarChart = null;
  let dashboardPieChart = null;
  let dashboardLineChart = null;

  function initDashboardCharts() {
    // Bar chart - cybercrime cases by type
    const barCtx = document.getElementById('dashboardBarChart');
    if (barCtx) {
      dashboardBarChart = new Chart(barCtx, {
        type: 'bar',
        data: {
          labels: fullCybercrimeData.labels,
          datasets: [{
            label: 'All Agencies - Reported Cases (2025 YTD)',
            data: fullCybercrimeData.allAgencies,
            backgroundColor: [
              'rgba(13, 110, 253, 0.85)',
              'rgba(220, 53, 69, 0.85)',
              'rgba(255, 193, 7, 0.85)',
              'rgba(25, 135, 84, 0.85)',
              'rgba(111, 66, 193, 0.85)',
              'rgba(253, 126, 20, 0.85)'
            ],
            borderColor: [
              'rgba(13, 110, 253, 1)',
              'rgba(220, 53, 69, 1)',
              'rgba(255, 193, 7, 1)',
              'rgba(25, 135, 84, 1)',
              'rgba(111, 66, 193, 1)',
              'rgba(253, 126, 20, 1)'
            ],
            borderWidth: 2,
            borderRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: {
              callbacks: {
                label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + ' cases'
              }
            }
          },
          scales: {
            y: { beginAtZero: true, ticks: { callback: v => v.toLocaleString() } }
          }
        }
      });
    }

    // Pie chart - cases by agency
    const pieCtx = document.getElementById('dashboardPieChart');
    if (pieCtx) {
      dashboardPieChart = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: ['DICT', 'DOJ - Office of Cybercrime', 'NBI Cybercrime Division', 'NPC'],
          datasets: [{
            data: [3850, 4480, 3540, 1972],
            backgroundColor: [
              'rgba(13, 110, 253, 0.85)',
              'rgba(220, 53, 69, 0.85)',
              'rgba(255, 193, 7, 0.85)',
              'rgba(25, 135, 84, 0.85)'
            ],
            borderColor: '#ffffff',
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: function (ctx) {
                  const total = ctx.dataset.data.reduce((a, b) => a + b, 0);
                  const pct = ((ctx.parsed / total) * 100).toFixed(1);
                  return ctx.label + ': ' + ctx.parsed.toLocaleString() + ' cases (' + pct + '%)';
                }
              }
            }
          }
        }
      });
    }

    // Line chart - privacy complaints monthly
    const lineCtx = document.getElementById('dashboardLineChart');
    if (lineCtx) {
      dashboardLineChart = new Chart(lineCtx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Privacy Complaints (2025)',
            data: [245, 310, 285, 340, 298, 365, 320, 355, 290, 275, 198, 133],
            borderColor: 'rgba(111, 66, 193, 1)',
            backgroundColor: 'rgba(111, 66, 193, 0.15)',
            fill: true,
            tension: 0.4,
            pointBackgroundColor: 'rgba(111, 66, 193, 1)',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: {
              callbacks: {
                label: ctx => ctx.dataset.label + ': ' + ctx.parsed.y.toLocaleString() + ' complaints'
              }
            }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      });
    }
  }

  /* =============================================
   * FILTER CONTROLS (Dashboard Page)
   * ============================================= */
  function initFilterControls() {
    const agencyFilter = document.getElementById('agencyFilter');
    const regionFilter = document.getElementById('regionFilter');
    const resetBtn = document.getElementById('resetFilters');

    if (agencyFilter) {
      agencyFilter.addEventListener('change', function () {
        const val = this.value;
        if (dashboardBarChart) {
          const newData = val === 'all' ? fullCybercrimeData.allAgencies : fullCybercrimeData[val];
          const label = val === 'all' ? 'All Agencies' : val;
          dashboardBarChart.data.datasets[0].data = newData;
          dashboardBarChart.data.datasets[0].label = label + ' - Reported Cases (2025 YTD)';
          dashboardBarChart.update();
        }
      });
    }

    if (regionFilter) {
      regionFilter.addEventListener('change', function () {
        const val = this.value;
        if (dashboardBarChart) {
          const newData = regionData[val] || regionData['All Regions'];
          dashboardBarChart.data.datasets[0].data = newData;
          dashboardBarChart.update();
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (agencyFilter) agencyFilter.value = 'all';
        if (regionFilter) regionFilter.value = 'All Regions';
        if (dashboardBarChart) {
          dashboardBarChart.data.datasets[0].data = fullCybercrimeData.allAgencies;
          dashboardBarChart.data.datasets[0].label = 'All Agencies - Reported Cases (2025 YTD)';
          dashboardBarChart.update();
        }
      });
    }
  }

  /* =============================================
   * INITIALIZATION
   * ============================================= */
  window.addEventListener('load', function () {
    animateCounters();
    animateProgressBars();
    initHomepageCharts();
    initDashboardCharts();
    initFilterControls();
  });

})();
