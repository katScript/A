import {BarChart} from "../helper/chartHelper";
import {SelectionSort} from "./selectionSort";
import {MergeSort} from "./mergeSort";
import {BubbleSort} from "./bubbleSort";
import {InsertionSort} from "./insertionSort";
import {QuickSort} from "./quickSort";

const ctx = <HTMLCanvasElement> document.getElementById('myChart');
let chart = new BarChart(ctx);

let selectionSort = new SelectionSort(chart);
let mergeSort = new MergeSort(chart);
let bubbleSort = new BubbleSort(chart);
let insertionSort = new InsertionSort(chart);
let quickSort = new QuickSort(chart);
