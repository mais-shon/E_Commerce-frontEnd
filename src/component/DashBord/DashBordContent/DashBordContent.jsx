import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import ApexChart from 'react-apexcharts';
import Style from './DashBordContent.module.css';
import { FaUser, FaBox } from 'react-icons/fa';
const ChartContainer = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    border: `1px solid ${theme.palette.primary ? theme.palette.primary.main : 'defaultColor'}`,
    borderRadius: '8px',
    boxShadow: `0 0 10px rgba(0, 0, 0, 0.1)`,
  }));


// ... (your imports)

export default function Dashboard() {
    const totalUsers = 150;
    const totalProducts = 200;
    const [currentVisitData, setCurrentVisitData] = useState([25, 75]);
  
    const DashboardContainer = styled('div')({
      display: 'flex',
      justifyContent: 'space-around',
      marginTop: '1%',
      fontFamily: 'Dosis, sans-serif',
    });
  
    const SquareContainer = styled('div')({
      width: '210px',
      height: '150px',
      borderRadius: '8px',
      backgroundColor: '#3498db',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#fff',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    });
  
    const ChartContainerWithMargin = styled(ChartContainer)({
      margin: '20px 0',
    });
  
    const [chartData1, setChartData1] = useState({
      series: [
        {
          name: 'Sales',
          data: [30, 40, 25, 50, 49, 21, 70, 51, 60],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 400,
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
        colors: ['rgb(77, 73, 73)'],
      },
    });
  
    const [chartData, setChartData] = useState({
      series: [44, 55, 41, 17, 15],
      options: {
        chart: {
          type: 'donut',
          height: 500,
        },
        labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
      },
    });
  
    const [productChartData, setProductChartData] = useState({
      series: [
        {
          name: 'stores',
          data: [50, 30, 41, 60, 25],
        },
      ],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        xaxis: {
          categories: ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'],
        },
        colors: ['rgb(77, 73, 73)'],
      },
    });
  
    const visitData = {
        series: [25, 75],
        options: {
          chart: {
            type: 'donut',
          },
          plotOptions: {
            pie: {
              donut: {
                size: '70%', // Adjust the size as needed
              },
            },
          },
          labels: ['Current Visit', 'Remaining'],
        },
      };
    return (
      <div className={Style.super}>
        <h1 className={Style.head}>Dashboard</h1>
  
        <div className={Style.father}>
          <div className={Style.char3}>
            <ChartContainer>
              <ApexChart options={chartData.options} series={chartData.series} type="donut" height={350} />
            </ChartContainer>
            <DashboardContainer>
              <SquareContainer>
                <h2>Users</h2>
                <p>250</p>
              </SquareContainer>
              <SquareContainer style={{ backgroundColor: '#27ae60' }}>
                <h2>Products</h2>
                <p>120</p>
              </SquareContainer>
            </DashboardContainer>
          </div>
          <div className={Style.char1}>
            <ChartContainerWithMargin>
              <h2>Sales Chart</h2>
              <ApexChart options={chartData1.options} series={chartData1.series} type="bar" height={350} />
            </ChartContainerWithMargin>
          </div>
        </div>
  <div className={Style.father2}>

  <div className={Style.visitChart}>
          <ChartContainerWithMargin style={{height:'88%',width:'113%'}}>
            <h2>Visit Chart</h2>
            <ApexChart options={visitData.options}  series={visitData.series} type="donut"  />
          </ChartContainerWithMargin>
        </div>
        <div className={Style.char4}>
          <ChartContainerWithMargin>
            <h2>Number of Stores by Category</h2>
            <ApexChart
              options={productChartData.options}
              series={productChartData.series}
              type="bar"
              height={200}
            />
          </ChartContainerWithMargin>
        </div>
  
    </div>
      </div>
    );
  }
  