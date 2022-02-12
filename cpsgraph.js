function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.shift();
    chart.data.datasets.forEach((dataset) => {
        dataset.data.shift();
    });
    chart.update();
}

const graphHTML = document.getElementById('cpsgraph');
const ctx = graphHTML.getContext('2d');
const cpsGraph = new Chart(graphHTML, {
    type: 'line',
    data: {
        labels: new Array(20).fill('0.0s'),
        datasets: [{
            label: 'CPS',
            data: new Array(20).fill(0),
            fill: true,
            backgroundColor: '#4fbd0f',
            borderColor: '#4fbd0f',
            borderWidth: 1,
            tension: 0.5
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            },
            x: {
                beginAtZero: false,
                min: 4
            }
        },
        elements: {
            point: {
                radius: 0
            }
        }
    }
});