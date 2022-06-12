import Chart from 'chart.js/auto';
import {ChartConfiguration, ChartItem} from "chart.js";
import { DataHelper } from "./dataHelper";

export class BarChart {
    private _config!: ChartConfiguration;
    private readonly element : ChartItem;

    private dataFeed : {
        data: Array<number>;
        label: Array<string>;
        backgroundColor: Array<string>
    } = {
        data: [],
        label: [],
        backgroundColor: []
    };

    private defaultData : Array<any> | {[key: number] : number};

    private dataHelper;

    private chart: Chart;

    readonly baseColor: string;

    constructor(element: ChartItem, data: Array<any> | {[key: number] : number} = {}, color = 'rgb(255,0,0)') {
        this.element = element;
        this.baseColor = color;
        this.dataHelper = new DataHelper();
        this.defaultData = data;

        this.chart = this.renderChart();
    }

    get config() {
        return this._config;
    }

    set config(config) {
        this._config = config;
    }

    private processDataInput(data: {[key: number] : number} | null = null) {
        if (data != null) {
            this.refreshDataFeed();
            Object.entries(data).forEach(([key, value], index) => {
                this.dataFeed.label.push("Index " + key);
                this.dataFeed.data.push(value);
                this.dataFeed.backgroundColor.push(this.baseColor);
            });
        } else {
            if (!this.dataFeed.data.length) {
                Object.entries(this.defaultData).forEach(([key, value], index) => {
                    this.dataFeed.label.push("Index " + key);
                    this.dataFeed.data.push(value);
                    this.dataFeed.backgroundColor.push(this.baseColor);
                });
            }
        }

        return this.dataFeed;
    }

    private renderChart() {
        this.processDataInput();
        return new Chart(this.element, this.getConfig());
    }

    getConfig() {
        return this.config ? this.config : this.getDefaultConfig();
    }

    private getDefaultConfig() {
        return <ChartConfiguration> {
            type: 'bar',
            data: {
                labels: this.dataFeed.label,
                datasets: [
                    {
                        label: 'Value',
                        data: this.dataFeed.data,
                        backgroundColor: this.dataFeed.backgroundColor
                    }
                ]
            },
            options: {
                animation: {
                    duration: 100,
                },
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                    title: {
                        display: false,
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            display: false
                        },
                        grid: {
                            display: false
                        }
                    },
                    y: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        }
    }

    private refreshDataFeed() {
        this.dataFeed = {
            data: [],
            label: [],
            backgroundColor: []
        };

        return this;
    }

    getChart() {
        return this.chart;
    }

    updateChart() {
        this.getChart().update();

        return this;
    }

    updateChartData(data: Array<any> | {}) {
        this.processDataInput(data);
        this.getChart().data.datasets = [
            {
                label: 'Value',
                data: this.dataFeed.data,
                backgroundColor: this.dataFeed.backgroundColor
            }
        ];
        this.getChart().data.labels = this.dataFeed.label;

        return this;
    }

    suffer() {
        let arr = this.dataHelper.shuffleData(this.dataFeed.data);
        this.defaultData = arr;

        return this.updateChartData(arr).updateChart();
    }

    random(size : number, isInt = true, isUnique = false, begin = Number.MIN_SAFE_INTEGER, end = Number.MAX_SAFE_INTEGER) {
        let arr = this.dataHelper.getRandomData(size, isInt, isUnique, begin, end);
        this.defaultData = arr;

        return this.updateChartData(arr).updateChart();
    }

    private setBarColor (index: number, color: string) {
        let bg = <Array<string>> this.getChart().config.data.datasets[0].backgroundColor,
            size = bg.length;

        if (index < 0 || index >= size)
            return this;

        bg[index] = color;

        return this;
    }

    mark(index: number, color: string) {
        return this.setBarColor(index, color);
    }

    unMark(index: number) {
        return this.setBarColor(index, this.baseColor);
    }

    reset() {
        this.updateChartData(this.defaultData);
        return this;
    }
}
