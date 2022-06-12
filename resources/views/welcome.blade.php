@extends('layouts.main')

@section('title', 'Welcome')

@section('content')
    <div class="container-fluid">
        <canvas id="myChart" height="100"></canvas>
    </div>

    <div class="row">
        <div class="col">
            <canvas id="chart-left" height="100"></canvas>
        </div>

        <div class="col">
            <canvas id="chart-right" height="100"></canvas>
        </div>
    </div>
    <hr>
    <div class="container">
        <button id="quickSort">Change</button>
    </div>
    <br>

    <div class="container">
        <button id="shuffle">Shuffle</button>
    </div>

    <br>
    <div class="container">
        <button id="random">Random</button>
    </div>

    <br>
    <div class="container">
        <button id="play">Pause / Continue</button>
    </div>
    <br>
    <div class="container">
        <button id="cancel">Stop</button>
    </div>
@endsection


@section('scripts')
    <script src="{{ asset('js/sort/_main.js') }}"></script>
@endsection
