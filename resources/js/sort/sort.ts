import { BarChart } from "../helper/chartHelper";
import {Controller} from "../helper/controller";

export class Sort extends Controller {
    chart: BarChart;
    sortEvent: string;
    shuffleEvent: string = 'shuffle';
    randomEvent: string = 'random';

    constructor(
        chart: BarChart,
        sortEvent = 'sort'
    ) {
        super();
        this.chart = chart;
        this.sortEvent = sortEvent;
        this.initEvent();
    }

    async sort() {};

    async runAlgorithm() {
        await this.sort();
    }

    stop(): this {
        super.stop();
        if (this.isCancel())
            this.chart.reset().updateChart();

        return this;
    }

    initEvent() {
        let sort = document.getElementById(this.sortEvent),
            shuffle = document.getElementById(this.shuffleEvent),
            random = document.getElementById(this.randomEvent);
        let _this = this;

        sort?.addEventListener('click', function () {
            _this.main();
        });
        shuffle?.addEventListener('click', function () {
            _this.chart.suffer();
        });
        random?.addEventListener('click', function () {
            _this.chart.random(60, true, false, -20, 20);
        });

        super.initEvent();
    }
}
