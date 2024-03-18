@extends('layouts.appv1')
@section('title','Login')

@section('content')
    <section class="banner-section" style="background: none !important;">
        <div class="overlay">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <h3>Застройщики</h3>
                        <nav aria-label="breadcrumb">
                            <ol class="breadcrumb">
                                <li class="breadcrumb-item"><a href="/">Главная</a></li>
                                <li class="breadcrumb-item active" aria-current="page">Застройщики</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section>
        <div class="container h-100">
            <div class="row h-100 justify-content-center">
                @foreach($developers as $developer)
                    <div class="col-md-6 col-lg-4">
                        <div class="property-box">

                            <div class="text-box">
                                <a class="title" href="">{{$developer->name}}</a>
                                <p class="address">
                                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i>
                                    Moscow, Russia        </p>


                                <div class="invest-btns d-flex justify-content-between">
                                    <button type="button" class="investNow">

                                        Оставить заявку                            </button>


                                </div>

                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

@endsection
