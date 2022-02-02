const gtx = document.getElementById('Progress').getContext('2d');
const Progress = new Chart(gtx, {
    type: 'pie',
    data: {
        labels: ['ABU DHABI', 'DUBAI', 'SHARJAH', 'RAS AL KHAIMAH', 'AJMAN', 'UMM AL QUWAIN', 'FUJAIRAH'],
        datasets: [{
            label: 'PROJECTS ON SEVEN EMIRATES', 
            data: [80, 55, 99, 87, 45, 65,69,50,69],
            backgroundColor: [
<<<<<<< HEAD
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 102, 192, 1)',
                'rgba(125, 192, 192,1 )',
                'rgba(155, 162, 82, 1)',
                'rgba(255, 159, 64, 1)'
=======
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
>>>>>>> parent of 3ef1f67 (Merge branch 'main' of https://github.com/xmarkwilliam/assas into main)
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
       resposive: true,
    }
});


