import { Bar, Line } from 'react-chartjs-2';
import { LinearScale, 
    registerables,
    PointElement,
    LineElement, 
    Chart as ChartJs, 
    CategoryScale,
    Title,
    Tooltip,
    Legend,
    Filler } from "chart.js"
    ChartJs.register(
        ...registerables,
        PointElement,
        LineElement, 
        CategoryScale,
        LinearScale,
        Title,
        Tooltip,
        Legend,
    )
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [{
    Legend:false,
    data: [400, 300, 400, 10,500, 3],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(255, 206, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(255, 159, 64, 0.2)'
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
}

const LineChart = () => {
    return (
      
        <Line
          data={data}
          backgroundColor ="#000"
          width={100}
          height={200}
          options={{
            maintainAspectRatio: false,
            fill: "start",
            
            legend:false,
            plugins:{
                legend:{
                    display: false,
                },
            },
          }}
        />
     
    );
}
export default LineChart