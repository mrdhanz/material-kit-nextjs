import merge from 'lodash/merge';
// components
import ReactApexChart, { BaseOptionChart } from '../../../../components/chart';
import { ApexOptions } from 'apexcharts';

// ----------------------------------------------------------------------

const CHART_DATA = [44, 55, 13, 43];

export default function ChartDonut() {
  const chartOptions = merge(BaseOptionChart(), {
    labels: ['Apple', 'Mango', 'Orange', 'Watermelon'],
    stroke: { show: false },
    legend: { horizontalAlign: 'center' },
    plotOptions: { pie: { donut: { size: '90%' } } },
  }) as ApexOptions;

  return <ReactApexChart type="donut" series={CHART_DATA} options={chartOptions} width={400} />;
}
