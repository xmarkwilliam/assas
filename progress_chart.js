const gtx = document.getElementById('Progress').getContext('2d');
const Progress = new Chart(gtx, {
    type: 'bar',
    data: {
        labels: ['ABU DHABI', 'DUBAI', 'SHARJAH', 'RAS AL KHAIMAH', 'AJMAN', 'UMM AL QUWAIN', 'FUJAIRAH'],
        datasets: [{
            label: 'PROJECTS ON SEVEN EMIRATES', 
            data: [80, 55, 99, 87, 45, 65,69],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 12)',
                'rgba(75, 192, 192, )',
                'rgba(153, 102, 255, 12)',
                'rgba(255, 159, 64, 12)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
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

