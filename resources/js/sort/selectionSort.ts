import {BarChart} from "../helper/chartHelper";
import {Sort} from "./sort";

export class SelectionSort extends Sort {
    constructor(chart: BarChart) {
        super(chart, 'selectionSort');
        this.delayTime = 200;
    }

    async sort() {
        let arr = this.chart.getChart().data.datasets[0].data;
        await this.selectionSort(arr);
    }

    private async selectionSort(arr: Array<any>) {
        let size = arr.length;

        try {
            for (let i = 0; i < size; ++i) {
                await this.handle(0);
                let min_idx = i;
                this.chart.mark(i, 'rgb(46, 204, 113)').updateChart();

                for (let j = i + 1; j < size; ++j) {
                    this.chart.mark(j, 'rgb(52, 73, 94)').updateChart();
                    await this.handle();

                    if (arr[j]! < arr[min_idx]!) {
                        min_idx = j;
                    }

                    this.chart
                        .unMark(j)
                        .updateChart();
                }

                this.chart.mark(min_idx, 'rgb(46, 204, 113)').updateChart();
                await this.handle();

                let b = arr[min_idx];
                arr[min_idx] = arr[i];
                arr[i] = b;

                this.chart
                    .unMark(i)
                    .unMark(min_idx)
                    .updateChart();

                await this.handle(0);
            }
        } catch (e) {
            return;
        }
    }
}
