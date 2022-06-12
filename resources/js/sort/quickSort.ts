import {BarChart} from "../helper/chartHelper";
import {Sort} from "./sort";

export class QuickSort extends Sort {
    constructor(chart: BarChart) {
        super(chart, 'quickSort');
        this.delayTime = 200;
    }

    async sort() {
        let arr = this.chart.getChart().data.datasets[0].data,
            size = arr.length;
        await this.quickSort(arr, 0, size - 1);
    }

    private async quickSort(arr: Array<any>, low: number, high: number) {
        if (low < high) {
            let pi = await this.partition(arr, low, high);

            await this.quickSort(arr, low, pi - 1);
            await this.quickSort(arr, pi + 1, high);
        }
    }

    private async partition(arr: Array<any>, low: number, high: number) {
        await this.handle(0);

        let pivot = arr[high],
            i = low - 1,
            j;
        this.chart
            .mark(i,'rgb(153, 128, 250)')
            .mark(low,'rgb(27, 20, 100)')
            .mark(high,'rgb(0, 148, 50)')
            .updateChart();
        await this.handle();

        for (j = low; j <= high; j++) {
            await this.handle(0);
            this.chart.mark(j, 'rgb(111, 30, 81)').updateChart();
            await this.handle();

            if (arr[j] < pivot) {
                i++;
                this.chart
                    .unMark(i - 1)
                    .mark(i, 'rgb(153, 128, 250)')
                    .updateChart();
                await this.handle();
                [arr[j], arr[i]] = [arr[i], arr[j]];
            }

            this.chart.unMark(j).updateChart();
            await this.handle(0);
        }

        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        this.chart
            .mark(i + 1, 'rgb(153, 128, 250)')
            .unMark(i)
            .updateChart();
        await this.handle();

        this.chart
            .unMark(i+1)
            .unMark(j)
            .unMark(low)
            .unMark(high)
            .updateChart();
        await this.handle(0);

        return i + 1;
    }
}
