import {BarChart} from "../helper/chartHelper";
import {Sort} from "./sort";
import {DataHelper} from "../helper/dataHelper";

export class MergeSort extends Sort {
    chartLeft!: BarChart;
    chartRight!: BarChart;

    constructor(
        chart: BarChart
    ) {
        super(chart, 'mergeSort');
        this.delayTime = 600;
        this.initMergeChart();
    }

    initMergeChart() {
        let left = <HTMLCanvasElement> document.getElementById('chart-left'),
            right = <HTMLCanvasElement> document.getElementById('chart-right');

        this.chartLeft = new BarChart(left);
        this.chartRight = new BarChart(right);
    }

    async sort() {
        let arr = this.chart.getChart().data.datasets[0].data,
            size = arr.length;

        await this.mergeSort(0, size - 1, arr);
    }

    end(): this {
        super.end();
        this.chartLeft
            .reset()
            .updateChartData({})
            .updateChart();

        this.chartRight
            .reset()
            .updateChartData({})
            .updateChart();

        return this;
    }

    private async mergeSort(begin: number, end: number, arr: Array<any>) {
        if (begin >= end)
            return;

        let mid = begin + Math.floor((end - begin)/2);

        await this.mergeSort(begin, mid, arr);
        await this.mergeSort(mid + 1, end, arr);
        await this.merge(begin, mid, end, arr);
    }

    private async merge(begin: number, mid: number, end: number, arr: Array<any>) {
        try {
            await this.handle(0);

            let lLeft = mid - begin + 1,
                lRight = end - mid;

            let left: Array<any> = [],
                right: Array<any> = [],
                chartL: {[key: number]: number} = {},
                chartR: {[key: number]: number} = {};

            for (let i = begin; i <= mid; ++i) {
                left.push(arr[i]);
                chartL[i] = arr[i];
                this.chartLeft.updateChartData(chartL);
            }

            for (let i = mid + 1; i <= end; ++i) {
                right.push(arr[i]);
                chartR[i] = arr[i];
                this.chartRight.updateChartData(chartR);
            }

            let iL = 0,
                iR = 0,
                index = begin;

            while (iL < lLeft && iR < lRight) {
                this.chart
                    .mark(index, 'rgb(46, 204, 113)')
                    .updateChart();
                this.chartLeft
                    .mark(iL,'rgb(155, 89, 182)')
                    .updateChart();
                this.chartRight
                    .mark(iR, 'rgb(52, 152, 219)')
                    .updateChart();

                await this.handle();
                if (left[iL] < right[iR]) {
                    arr[index] = left[iL];
                    this.chartLeft
                        .unMark(iL)
                        .updateChart();
                    iL++;
                } else {
                    arr[index] = right[iR];
                    this.chartRight
                        .unMark(iR)
                        .updateChart();
                    iR++;
                }

                this.chart
                    .unMark(index)
                    .updateChart();
                index++;
            }

            while (iL < lLeft) {
                this.chart
                    .mark(index, 'rgb(46, 204, 113)')
                    .updateChart();
                this.chartLeft
                    .mark(iL,'rgb(155, 89, 182)')
                    .updateChart();
                await this.handle();

                arr[index] = left[iL];
                this.chart
                    .unMark(index)
                    .updateChart();
                this.chartLeft
                    .unMark(iL)
                    .updateChart();
                iL++;
                index++;
            }

            while (iR < lRight) {
                this.chart
                    .mark(index, 'rgb(46, 204, 113)')
                    .updateChart();
                this.chartRight
                    .mark(iR, 'rgb(52, 152, 219)')
                    .updateChart();
                arr[index] = right[iR];

                await this.handle();
                this.chart
                    .unMark(index)
                    .updateChart();
                this.chartRight
                    .unMark(iR)
                    .updateChart();
                iR++;
                index++;
            }
            await this.handle(0);
        } catch (e) {
            return;
        }
    }
}
