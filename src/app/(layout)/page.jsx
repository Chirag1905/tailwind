'use client';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  IconBriefcase,
  IconCash,
  IconCornerRightUp,
  IconCreditCard,
  IconDots,
  IconUserScan,
  IconCheck,
  IconX,
} from '@tabler/icons-react';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
} from '@/assets/images';
import Breadcrumb from '@/components/common/Breadcrumb';
import WelcomeHeader from '@/components/common/WelcomeHeader';
import Image from 'next/image';
import Link from 'next/link';
// import { useSelector } from 'react-redux';

export default function Analysis() {
  const breadcrumbItem = [{ name: "Dashboard" }];

  // const selectedAcademicYear = useSelector(state => state.academicYear.selectedAcademicYear);
  // console.log("Analysis", selectedAcademicYear)

  const chartData1 = {
    series: [
      { name: 'Income', data: [20, 10, 50, 30, 40, 30, 50, 60, 5, 20, 30, 20] },
      { name: 'Expense', data: [40, 20, 30, 50, 20, 20, 20, 5, 15, 40, 40, 50] },
      { name: 'Revenue', data: [40, 50, 10, 20, 20, 50, 10, 20, 60, 5, 20, 30] },
    ],
    options: {
      dataLabels: { enabled: false },
      colors: ['var(--chart-color1)', 'var(--chart-color2)', 'var(--chart-color3)'],
      chart: { stacked: true, toolbar: { show: false } },
      tooltip: { x: { show: false } },
      grid: { borderColor: 'var(--border-color)' },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        tooltip: { enabled: false },
        axisBorder: { color: 'var(--border-color)' },
        axisTicks: { color: 'var(--border-color)' },
      },
      yaxis: { min: 0, max: 100, tickAmount: 10 },
    },
  };

  const chartData2 = {
    series: [55, 35, 10],
    options: {
      colors: ['var(--chart-color1)', 'var(--chart-color2)', 'var(--chart-color3)'],
      legend: { show: true, position: 'bottom' },
      dataLabels: { enabled: false },
      stroke: { colors: ['var(--card-color)'] },
      plotOptions: {
        pie: {
          expandOnClick: true,
          donut: {
            labels: { show: true, total: { show: true, showAlways: true } },
          },
        },
      },
    },
  };

  const staticCards = [
    { id: 1, title: "NEW EMPLOYEE", image: avatar1, description: "21 mutual connections Sr. ReatJs Developer at Facebook" },
    { id: 2, title: "EXPENSE", image: avatar2, description: "5 mutual connections Web Designer at Google" },
    { id: 3, title: "REVENUE", image: avatar3, description: "9 mutual connections Laravel Developer at Linkedin" },
    { id: 4, title: "NEW LEADS", image: avatar4, description: "18 mutual connections PHP Developer at Facebook" },
    { id: 5, title: "SWIFT Revenue", image: avatar4, description: "18 mutual connections PHP Developer at Facebook" },
    { id: 6, title: "Sales by Category", image: avatar4, description: "18 mutual connections PHP Developer at Facebook" },
    { id: 7, title: "My Wallet", image: avatar4, description: "18 mutual connections PHP Developer at Facebook" },
    { id: 8, title: "Reports overview", image: avatar4, description: "18 mutual connections PHP Developer at Facebook" },
  ];

  const [dashboardCards, setDashboardCards] = useState(staticCards);
  const [modalOpen, setModalOpen] = useState(false);

  const RequestModal = () => setModalOpen(!modalOpen);

  useEffect(() => {
    document.body.classList[modalOpen ? "add" : "remove"]("overflow-hidden");
  }, [modalOpen]);

  const modalCards = staticCards.filter(card => !dashboardCards.find(dCard => dCard.id === card.id));

  const openModal = () => setModalOpen(true);

  const addCardToDashboard = (id) => {
    const cardToAdd = staticCards.find(card => card.id === id);
    setDashboardCards([...dashboardCards, cardToAdd]);
  };

  const removeCardFromDashboard = (id) => {
    setDashboardCards(dashboardCards.filter(card => card.id !== id));
  };

  return (
    <div>
      <Breadcrumb breadcrumbItem={breadcrumbItem} />
      <WelcomeHeader report />
      <div className="flex flex-wrap justify-between mb-4">
        <button onClick={openModal} className="card bg-card-color rounded-xl btn btn-primary uppercase ml-auto">
          View in modals
        </button>
      </div>
      {modalOpen && (
        <>
          <div className="fixed p-[15px] w-full max-w-[800px] left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] z-[6]">
            <div className="py-[10px] md:px-[10px] px-[7px] bg-card-color rounded-lg shadow-shadow-lg">
              <div className="my-[10px] lg:px-[20px] md:px-[10px] px-[7px] md:max-h-[80svh] max-h-[60svh] overflow-auto cus-scrollbar">
                <div className="flex justify-between items-start gap-4">
                  <div>
                    <p className="text-font-color-100 small">If you are going to use a passage of Lorem Ipsum, you need</p>
                  </div>
                  <button onClick={RequestModal}><IconX /></button>
                </div>
                <ul className="flex flex-col md:gap-8 gap-6 mt-6">
                  {modalCards.length > 0 ? (
                    modalCards.map((item, index) => (
                      <li key={index} className="flex sm:items-center sm:gap-4 gap-2 sm:flex-row flex-col">
                        <Image src={item.image} alt="user profile" className="rounded-md w-[36px] h-[36px] min-w-[36px]" />
                        <div className="flex-grow">
                          <h6 className="font-medium">{item.title}</h6>
                          <p className="text-font-color-100 small">{item.description}</p>
                        </div>
                        <div className="flex items-stretch gap-2">
                          <button className="btn btn-light-primary" onClick={() => addCardToDashboard(item.id)}>
                            <IconCheck className="w-[18px] h-[18px] min-w-[18px]" />
                            <span className="md:block hidden">Add</span>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="flex sm:items-center sm:gap-4 gap">No cards available to add.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div onClick={RequestModal} className="contents-[] fixed z-[5] w-full h-full left-0 top-0 bg-black-50 backdrop-blur-[5px]"></div>
        </>
      )}

      {/* Dashboard Cards */}
      <div className="space-y-4">
        {/* Group 1: New Employee and Expense */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {dashboardCards.find(card => card.title === "NEW EMPLOYEE") && (
            <div className="card bg-card-color rounded-xl relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "NEW EMPLOYEE").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="md:p-6 p-4 mt-[12px] border-b border-dashed border-border-color">
                <div className="flex items-center justify-between gap-[5px] mt-2 mb-2">
                  <p>NEW EMPLOYEE</p>
                  <IconUserScan className=" stroke-[1.5] w-[32px] h-[32px] " />
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="inline-block text-[24px]/[30px] font-medium">51</span>
                  <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
                  <span className="text-font-color-100 text-[14px]/[20px]">13%</span>
                </div>
                <div className="progress overflow-hidden h-[2px] bg-border-color rounded-full">
                  <div className="progress-bar w-[85%] bg-secondary h-full"></div>
                </div>
              </div>
              <div className="py-3 md:px-6 px-4 text-font-color-100 text-[14px]/[20px]">Analytics for last week</div>
            </div>
          )}
          {dashboardCards.find(card => card.title === "EXPENSE") && (
            <div className="card bg-card-color rounded-xl relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "EXPENSE").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="md:p-6 p-4 mt-[12px] border-b border-dashed border-border-color">
                <div className="flex items-center justify-between gap-[5px] mb-2">
                  <p>EXPENSE</p>
                  <IconCreditCard className="stroke-[1.5] w-[32px] h-[32px]" />
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="inline-block text-[24px]/[30px] font-medium">$3,251</span>
                  <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
                  <span className="text-font-color-100 text-[14px]/[20px]">13%</span>
                </div>
                <div className="progress overflow-hidden h-[2px] bg-border-color rounded-full mt-6">
                  <div className="progress-bar w-[13%] bg-primary h-full"></div>
                </div>
              </div>
              <div className="py-3 md:px-6 px-4 text-font-color-100 text-[14px]/[20px]">Analytics for last week</div>
            </div>
          )}
        </div>

        {/* Group 2: Revenue and New Leads */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {dashboardCards.find(card => card.title === "REVENUE") && (
            <div className="card bg-card-color rounded-xl relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "REVENUE").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="md:p-6 p-4 mt-[12px] border-b border-dashed border-border-color">
                <div className="flex items-center justify-between gap-[5px] mb-2">
                  <p>REVENUE</p>
                  <IconCash className="stroke-[1.5] w-[32px] h-[32px]" />
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="inline-block text-[24px]/[30px] font-medium">$18,925</span>
                  <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
                  <span className="text-font-color-100 text-[14px]/[20px]">78%</span>
                </div>
                <div className="progress overflow-hidden h-[2px] bg-border-color rounded-full">
                  <div className="progress-bar w-[70%] bg-success h-full"></div>
                </div>
              </div>
              <div className="py-3 md:px-6 px-4 text-font-color-100 text-[14px]/[20px]">Analytics for last week</div>
            </div>
          )}
          {dashboardCards.find(card => card.title === "NEW LEADS") && (
            <div className="card bg-card-color rounded-xl relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "NEW LEADS").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="md:p-6 p-4 mt-[12px] border-b border-dashed border-border-color">
                <div className="flex items-center justify-between gap-[5px] mb-2">
                  <p>NEW LEADS</p>
                  <IconBriefcase className="stroke-[1.5] w-[32px] h-[32px]" />
                </div>
                <div className="flex items-end gap-1 mb-4">
                  <span className="inline-block text-[24px]/[30px] font-medium">125</span>
                  <IconCornerRightUp className="stroke-font-color-100 w-[18px] h-[18px]" />
                  <span className="text-font-color-100 text-[14px]/[20px]">55%</span>
                </div>
                <div className="progress overflow-hidden h-[2px] bg-border-color rounded-full">
                  <div className="progress-bar w-[55%] bg-warning h-full"></div>
                </div>
              </div>
              <div className="py-3 md:px-6 px-4 text-font-color-100 text-[14px]/[20px]">Analytics for last week</div>
            </div>
          )}
        </div>

        {/* Group 3: Swift Revenue and Sales by Category */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {dashboardCards.find(card => card.title === "SWIFT Revenue") && (
            <div className="card rounded-xl bg-card-color relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "SWIFT Revenue").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="flex items-center mt-[12px] justify-between gap-[15px] md:p-6 p-4">
                <div className="font-semibold">SWIFT Revenue</div>
                <button className="bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white">
                  <IconDots className="w-[18px] h-[18px]" />
                </button>
              </div>
              <ReactApexChart options={chartData1.options} series={chartData1.series} type="bar" height="280" className="md:px-6" />
            </div>
          )}
          {dashboardCards.find(card => card.title === "Sales by Category") && (
            <div className="card bg-card-color rounded-xl md:p-6 p-4 relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "Sales by Category").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="font-semibold md:mb-6 mb-4">Sales by Category</div>
              <ReactApexChart options={chartData2.options} series={chartData2.series} type="donut" height="300" className="max-w-[300px] mx-auto" />
            </div>
          )}
        </div>

        {/* Group 4: My Wallet and Reports Overview */}
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {dashboardCards.find(card => card.title === "My Wallet") && (
            <div className="card bg-card-color rounded-xl relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "My Wallet").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="border-b border-dashed border-border-color md:p-6 p-4">
                <div className="font-semibold md:mb-6 mb-4">My Wallet</div>
                <p className="md:text-[24px]/[30px] text-[20px]/[26px] font-medium md:mb-2">0.0386245 BTC</p>
                <p>Available BTC <Link href="#" className="text-blue-400 transition-all hover:text-secondary ml-3 underline">View Account</Link></p>
                <div className="mt-6">
                  <span className="uppercase text-[14px]/[20px] text-font-color-100">BUY THIS MONTH</span>
                  <p className="md:text-[20px]/[26px] font-medium">3.0675432 BTC</p>
                </div>
                <div className="mt-6">
                  <span className="uppercase text-[14px]/[20px] text-font-color-100">SELL THIS MONTH</span>
                  <p className="md:text-[20px]/[26px] font-medium">2.0345618 BTC</p>
                </div>
              </div>
              <div className="md:px-6 px-4 py-4 flex gap-[10px]">
                <button className="btn btn-secondary w-full">Buy</button>
                <button className="btn btn-outline-secondary w-full">Sell</button>
              </div>
            </div>
          )}
          {dashboardCards.find(card => card.title === "Reports overview") && (
            <div className="card rounded-xl bg-card-color flex flex-col relative">
              <button onClick={() => removeCardFromDashboard(dashboardCards.find(card => card.title === "Reports overview").id)} className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700">
                <IconX className="w-[18px] h-[18px]" />
              </button>
              <div className="md:p-6 p-4">
                <div className="flex items-center justify-between gap-[15px] md:mb-6 mb-4">
                  <div className="font-semibold">Reports overview</div>
                  <button className="bg-primary-10 p-[2px] rounded text-primary transition-all hover:bg-primary hover:text-white">
                    <IconDots className="w-[18px] h-[18px]" />
                  </button>
                </div>
                <p className="md:text-[24px]/[30px] text-[20px]/[26px] font-bold mb-2">$7,431.14 USD</p>
                <div className="progress overflow-hidden h-[10px] bg-border-color rounded-full flex">
                  <div className="progress-bar w-[15%] bg-chart-color1 h-full"></div>
                  <div className="progress-bar w-[30%] bg-chart-color2 h-full"></div>
                  <div className="progress-bar w-[20%] bg-chart-color3 h-full"></div>
                </div>
                <div className="flex justify-between text-[14px]/[20px] text-font-color-100 mt-2">
                  <span>0%</span>
                  <span>100%</span>
                </div>
              </div>
              <div className="overflow-x-auto border-t border-border-color mt-auto">
                <table className="w-full min-w-[500px]">
                  <tbody>
                    <tr>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-[14px] h-[14px] min-w-[14px] rounded-full bg-chart-color1"></span>Gross value
                        </p>
                      </td>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">$3,500.71</td>
                      <td className="px-4 py-3 border-b border-dashed border-border-color"><span className="py-1 px-2 rounded-md text-white text-[12px]/[1] bg-success">+12.1%</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-[14px] h-[14px] min-w-[14px] rounded-full bg-chart-color2"></span>Net volume from sales
                        </p>
                      </td>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">$2,980.45</td>
                      <td className="px-4 py-3 border-b border-dashed border-border-color"><span className="py-1 px-2 rounded-md text-black text-[12px]/[1] bg-warning">+6.9%</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-[14px] h-[14px] min-w-[14px] rounded-full bg-chart-color3"></span>New volume from sales
                        </p>
                      </td>
                      <td className="px-4 py-3 border-e border-b border-dashed border-border-color">$950.00</td>
                      <td className="px-4 py-3 border-b border-dashed border-border-color"><span className="py-1 px-2 rounded-md text-white text-[12px]/[1] bg-danger">-1.5%</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 border-r border-dashed border-border-color">
                        <p className="flex items-center gap-2">
                          <span className="inline-block w-[14px] h-[14px] min-w-[14px] rounded-full bg-chart-color4"></span>Other
                        </p>
                      </td>
                      <td className="px-4 py-3 border-r border-dashed border-border-color">32</td>
                      <td className="px-4 py-3"><span className="py-1 px-2 rounded-md text-white text-[12px]/[1] bg-success">1.9%</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}