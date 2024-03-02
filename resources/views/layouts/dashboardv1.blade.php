<!DOCTYPE html>
<!--[if lt IE 7 ]>
<html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]>
<html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]>
<html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html class="no-js" lang="en"  >
<head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta http-equiv='X-UA-Compatible' content='IE=edge,chrome=1'/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    @csrf
    <title>Личный кабинет Re-Stors</title>


    <link rel="stylesheet" type="text/css" href="/v1/assets/themes/original/css/bootstrap.min.css"/>
    <link href="/v1/assets/global/css/select2.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/v1/assets/themes/original/css/animate.css">
    <link rel="stylesheet" href="/v1/assets/global/css/owl.carousel.min.css"/>
    <link rel="stylesheet" href="/v1/assets/global/css/owl.theme.default.min.css"/>
    <link rel="stylesheet" type="text/css" href="/v1/assets/themes/original/css/range-slider.css">
    <link rel="stylesheet" type="text/css" href="/v1/assets/themes/original/css/fancybox.css">


    <link rel="stylesheet" type="text/css" href="/v1/assets/themes/original/css/style.css">
    <script src="/v1/assets/themes/original/js/fontawesomepro.js"></script>
    <script src="/v1/assets/themes/original/js/modernizr.custom.js"></script>

    <style>
        .balance-box {
            background: linear-gradient(to right,rgb(204,84,244),rgb(72,143,249));
        }
    </style>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script type="application/javascript" src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script type="application/javascript" src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body >

<!------- Nav + Content ---------->
<div class="bottom-nav fixed-bottom d-lg-none">
    <div class="link-item ">
        <a href="/dashboard/orders">
            <i class="fal fa-project-diagram" aria-hidden="true"></i>
            <span>Заявки</span>
        </a>
    </div>

    <div class="link-item ">
        <a href="">
            <i class="fal fa-funnel-dollar" aria-hidden="true"></i>
            <span>Объекты</span>
        </a>
    </div>

    <div class="link-item active">
        <a href="/dashboard">
            <i class="fal fa-home-lg-alt"></i>
            <span>Home</span>
        </a>
    </div>

    <div class="link-item ">
        <a href="">
            <i class="fal fa-hand-holding-usd" aria-hidden="true"></i>
            <span>Застройщики</span>
        </a>
    </div>
    <div class="link-item ">
        <button onclick="toggleSideMenu()">
            <i class="fal fa-ellipsis-v-alt"></i>
            <span>Menu</span>
        </button>
    </div>
</div>

<div class="wrapper">
    <!------ sidebar ------->
    <!-- sidebar -->
    <div id="sidebar" class="">
        <div class="sidebar-top">
            <a class="navbar-brand d-none d-lg-block" href="/dashboard"> <img src="/v1/assets/uploads/logo/logo.png" alt="Re-Stors" /></a>
            <div class="mobile-user-area d-lg-none">

                <div class="content">
                    <h5 class="mt-1 mb-1">{{Auth::user()->name}}</h5>
                </div>
            </div>
            <button class="sidebar-toggler d-lg-none" onclick="toggleSideMenu()">
                <i class="fal fa-times"></i>
            </button>
        </div>

        <ul class="main">
            <li>
                <a class="active" href="/dashboard"><i class="fal fa-house-flood"></i>Личный кабинет</a>
            </li>

            <li>
                <a href="/dashboard/orders"><i class="fal fa-house-flood"></i>Мои заявки</a>
            </li>

            <li class="d-lg-none">
                <a href="/logout" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <i class="fal fa-sign-out-alt"></i> Выход            </a>
                <form id="logout-form" action="/logout" method="POST" class="d-none">
               @csrf
                        </form>
            </li>
        </ul>
    </div>

    <!-- content -->
    <div id="content">
        <div class="overlay">
            <!-- navbar -->
            <nav class="navbar navbar-expand-lg">
                <div class="container-fluid">
                    <a class="navbar-brand d-lg-none" href="/dashboard">
                        <img src="/v1/assets/uploads/logo/logo.png"
                             alt="Re-Stors">
                    </a>
                    <button class="sidebar-toggler d-none d-lg-block" onclick="toggleSideMenu()">
                        <i class="far fa-bars"></i>
                    </button>
                    <!-- navbar text -->
                    <span class="navbar-text" id="pushNotificationArea">
                            <!-- notification panel -->
                        <!-- User panel -->
                        <div class="user-panel d-none d-lg-inline-block">
       <span class="profile">
        {{Auth::user()->name}}
       </span>
        <ul class="user-dropdown">
            <li>
                <a href="/logout" onclick="event.preventDefault(); document.getElementById('logout-form').submit();">
                    <i class="fal fa-sign-out-alt"></i> Logout                </a>
                <form id="logout-form" action="/logout" method="POST" class="d-none">
                    @csrf
                                  </form>
            </li>
        </ul>
</div>
                        </span>
                </div>
            </nav>
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
        </div>
    </div>
</div>

<script src="/v1/assets/themes/original/js/bootstrap.bundle.min.js"></script>
<script src="/v1/assets/themes/original/js/jquery.min.js"></script>
<script src="/v1/assets/global/js/select2.min.js"></script>
<script src="/v1/assets/global/js/owl.carousel.min.js"></script>
<script src="/v1/assets/themes/original/js/range-slider.min.js"></script>
<script src="/v1/assets/themes/original/js/socialSharing.js"></script>
<script src="/v1/assets/themes/original/js/fancybox.umd.js"></script>
<script src="/v1/assets/themes/original/js/apexcharts.min.js"></script>


<script src="/v1/assets/global/js/notiflix-aio-2.7.0.min.js"></script>
<script src="/v1/assets/global/js/pusher.min.js"></script>
<script src="/v1/assets/global/js/vue.min.js"></script>
<script src="/v1/assets/global/js/axios.min.js"></script>
<!-- custom script -->
<script src="/v1/assets/themes/original/js/script.js"></script>


<script>
    'use strict';

    $(".card-boxes").owlCarousel({
        loop: true,
        margin: -25,
        rtl: false,
        nav: false,
        dots: false,
        autoplay: false,
        autoplayTimeout: 3000,
        responsive: {
            0: {
                items: 1,
            },
            576: {
                items: 2,
            },
        },
    });

    // dashboard sidebar
    window.onload = function () {
        var el = document.getElementById('sidebarCollapse');
        if (el == null) {
            return 0;
        } else {

            el.addEventListener("click", () => {
                document.getElementById("sidebar").classList.toggle("active");
                document.getElementById("content").classList.toggle("active");
            });
        }

        // for datepicker
        $(function () {
            $("#datepicker").datepicker({
                dateFormat: "yy-mm-dd"
            });
            $("#salutation").selectmenu();
        });
    }


</script>

<script src="/v1/assets/themes/original/js/apexcharts.js"></script>

<script>
    "use strict";

    var options = {
        theme: {
            mode: "light",
        },

        series: [
            {
                name: "Лиды",
                color: 'rgba(255, 72, 0, 1)',
                data: [100000,11000,0,0,0,0,0,0,0,0,0,0]
            },
            {
                name: "Успешные лиды",
                color: 'rgba(39, 144, 195, 1)',
                data: [0,0,0,0,0,0,0,0,0,0,0,0]
            },
        ],
        chart: {
            type: 'bar',
            height: 350,
            background: '#fff',
            toolbar: {
                show: false
            }

        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ["January","February","March","April","May","June","July","August","September","October","November","December"],

        },
        yaxis: {
            title: {
                text: ""
            }
        },
        fill: {
            opacity: 1
        },
        tooltip: {
            colors: ['#000'],
            y: {
                formatter: function (val) {
                    return "$" + val + ""
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#container"), options);
    chart.render();

    $(document).on('click', '#details', function () {
        var title = $(this).data('servicetitle');
        var description = $(this).data('description');
        $('#title').text(title);
        $('#servicedescription').text(description);
    });

    $(document).ready(function () {
        let isActiveCronNotification = '0';
        if (isActiveCronNotification == 1)
            $('#cron-info').modal('show');
        $(document).on('click', '.copy-btn', function () {
            var _this = $(this)[0];
            var copyText = $(this).parents('.input-group-append').siblings('input');
            $(copyText).prop('disabled', false);
            copyText.select();
            document.execCommand("copy");
            $(copyText).prop('disabled', true);
            $(this).text('Coppied');
            setTimeout(function () {
                $(_this).text('');
                $(_this).html('<i class="fas fa-copy"></i>');
            }, 500)
        });


        $(document).on('click', '.loginAccount', function () {
            var route = $(this).data('route');
            $('.loginAccountAction').attr('action', route)
        });

        $(document).on('click', '.copyReferalLink', function () {
            var _this = $(this)[0];
            var copyText = $(this).siblings('input');
            $(copyText).prop('disabled', false);
            copyText.select();
            document.execCommand("copy");
            $(copyText).prop('disabled', true);
            $(this).text('Copied');
            setTimeout(function () {
                $(_this).text('');
                $(_this).html('<i class="fal fa-copy"></i>');
            }, 500)
        });
    })
</script>






<script>
    "use strict";
    var root = document.querySelector(':root');
    root.style.setProperty('--primary', '#cc54f4');
    root.style.setProperty('--secondary', '#488ff9');

</script>

</body>
</html>
