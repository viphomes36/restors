@extends('layouts.dashboardv1')
@section('title','Home')

@section('content')
    <!-- Balance Box -->
    <div class="container-fluid">
        <div class="main row">
            <div class="col-12">
                <div class="row g-3">
                    <div style="background: #e84949;
  color: #fff;
  padding: 10px 15px;
  text-align: center;">
                        Демо-контент, страница в разработке
                    </div>

                </div>
            </div>
        </div>
        <div class="main row">
            <div class="col-12">
                <div class="row g-3">
                    <div class="col-xl-4 col-lg-6">
                        <div class="card-box balance-box p-0 h-100">
                            <div class="user-account-number p-4 h-100">
                                <i class="account-wallet far fa-wallet"></i>
                                <div class="mb-4">
                                    <h5 class="text-white mb-2">
                                        Баланс                                   </h5>
                                    <h3>
                                        <span class="text-white"><small><sup>$</sup></small>51.87</span>
                                    </h3>
                                </div>


                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-6 d-sm-block d-none">
                        <div class="row g-3">
                            <div class="col-lg-12 col-6">
                                <div class="dashboard-box gr-bg-1">
                                    <h5 class="text-white">Всего продано</h5>
                                    <h3 class="text-white"><small><sup>$</sup></small><span>354081</span></h3>
                                    <i class="fal fa-file-invoice-dollar text-white"></i>
                                </div>
                            </div>

                            <div class="col-lg-12 col-6">
                                <div class="dashboard-box gr-bg-2">
                                    <h5 class="text-white">Доступно для вывода</h5>
                                    <h3 class="text-white"><small><sup>$</sup></small><span>5900</span></h3>
                                    <i class="fal fa-usd-circle text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 d-sm-block d-none">
                        <div class="row g-3">
                            <div class="col-xl-12 col-6">
                                <div class="dashboard-box gr-bg-3">
                                    <h5 class="text-white">Всего лидов</h5>
                                    <h3 class="text-white"><span>59</span></h3>
                                    <i class="far fa-funnel-dollar text-white"></i>
                                </div>
                            </div>
                            <div class="col-xl-12 col-6 box">
                                <div class="dashboard-box gr-bg-4">
                                    <h5 class="text-white">Лидов в работе</h5>
                                    <h3 class="text-white"><small></small><span>8</span></h3>
                                    <i class="far fa-funnel-dollar text-white"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-12 d-lg-none">
                        <div class="quick-links">
                            <div class="row g-2 g-lg-4">

                                <div class="col-md-3 col-4 col-sm-3">
                                    <div class="link-item">
                                        <a href="/dashboard/orders">
                                            <i class="fal fa-funnel-dollar" aria-hidden="true"></i>
                                            <span>Заявки</span>
                                        </a>
                                    </div>
                                </div>


                                <div class="col-md-3 col-4 col-sm-3">
                                    <div class="link-item">
                                        <a href="https://Re-Stors.bugfinder.net/user/ticket">
                                            <i class="fal fa-user-headset"></i>
                                            <span>Поддержка</span>
                                        </a>
                                    </div>
                                </div>

                                <div class="col-md-3 col-4 col-sm-3">
                                    <div class="link-item">
                                        <a href="">
                                            <i class="fal fa-user-cog"></i>
                                            <span>Настройки</span>
                                        </a>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- main -->
    <div class="container-fluid">
        <div class="main row">
            <div class="col-12">
                <div class="dashboard-box-wrapper d-none d-lg-block">
                    <div class="row g-3 mb-4">

                        <div class="col-xl-3 col-md-6 box">
                            <div class="dashboard-box">
                                <h5>Всего продано</h5>
                                <h3>164</h3>
                                <i class="fal fa-lightbulb-dollar"></i>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 box">
                            <div class="dashboard-box">
                                <h5>Доступно для вывода</h5>
                                <h3>153</h3>
                                <i class="fal fa-lightbulb-dollar"></i>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 box">
                            <div class="dashboard-box">
                                <h5>Всего лидов</h5>
                                <h3>11</h3>
                                <i class="fal fa-lightbulb-dollar"></i>
                            </div>
                        </div>

                        <div class="col-xl-3 col-md-6 box">
                            <div class="dashboard-box">
                                <h5>Лидов в работе</h5>
                                <h3>0</h3>
                                <i class="fal fa-lightbulb-dollar"></i>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="d-lg-none mb-4">
                    <div class="card-box-wrapper owl-carousel card-boxes">
                        <div class="dashboard-box gr-bg-1">
                            <h5 class="text-white">Всего продано</h5>
                            <h3 class="text-white">
                                <small><sup>$</sup></small>51.87
                            </h3>
                            <i class="fal fa-funnel-dollar text-white"></i>
                        </div>
                        <div class="dashboard-box gr-bg-7">
                            <h5 class="text-white">Доступно для вывода</h5>
                            <h3 class="text-white">
                                <small><sup>$</sup></small>4720
                            </h3>
                            <i class="fal fa-lightbulb-dollar text-white"></i>
                        </div>

                        <div class="dashboard-box gr-bg-8">
                            <h5 class="text-white">Всего лидов</h5>
                            <h3 class="text-white">
                                <small><sup>$</sup></small>0.7
                            </h3>
                            <i class="fal fa-box-open text-white"></i>
                        </div>

                        <div class="dashboard-box gr-bg-9">
                            <h5 class="text-white">Лидов в работе</h5>
                            <h3 class="text-white">7</h3>
                            <i class="fal fa-ticket text-white"></i>
                        </div>
                    </div>
                </div>

                <!---- charts ----->
                <div class="chart-information d-none d-lg-block">
                    <div class="row justify-content-center">
                        <div class="row">
                            <div class="col-lg-6 mb-4 mb-lg-0">
                                <div class="progress-wrapper">
                                    <div id="container" class="apexcharts-canvas"></div>
                                </div>
                            </div>

                            <div class="col-lg-6 col-md-6">
                                <div class="progress-wrapper2">
                                    <div class="row">

                                    </div>

                                    <div class="row">
                                        <div class="col-12">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- refferal-information -->
                <div class="search-bar refferal-link  g-4 mt-4 mb-4 coin-box-wrapper">
                    <form class="mb-3">
                        <div class="row g-3 align-items-end">
                            <div class="input-box col-lg-12">
                                <label for="">Партнерская программа</label>
                                <div class="input-group mt-0">
                                    <input
                                        type="text"
                                        value="https://re-stors.com"
                                        class="form-control"
                                        id="sponsorURL"
                                        readonly />
                                    <button class="gold-btn copyReferalLink" type="button"><i class="fal fa-copy"></i></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    </div>
@endsection
