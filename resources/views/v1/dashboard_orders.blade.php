@extends('layouts.dashboardv1')
@section('title','Home')

@section('content')

<div class="container-fluid">
    <div class="row mt-4 mb-2">
        <div class="col ms-2">
            <div class="header-text-full">
                <h3 class="dashboard_breadcurmb_heading mb-1">Мои заявки</h3>
                <nav aria-label="breadcrumb" class="ms-2">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><a href="/dashboard">Dashboard</a>
                        </li>
                        <li class="breadcrumb-item active" aria-current="page">Мои заявки</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>

    <!-- search area -->
    <div class="search-bar mt-3 me-2 ms-2 p-0">
        <form action="/dashboard/orders" method="post" enctype="multipart/form-data">
            @csrf
            <div class="row g-3 align-items-end">
                <div class="input-box col-lg-2">
                    <label for="">Имя клиента</label>
                    <input type="text" required name="customer_name" value="" class="form-control">
                </div>
                <div class="input-box col-lg-2">
                    <label for="">Контакт клиента</label>
                    <input type="text" required name="contact" value="" class="form-control">
                </div>
                <div class="input-box col-lg-2">
                    <label for="">Комментарий</label>
                    <input type="text" name="comment" value="" class="form-control">
                </div>
                <div class="input-box col-lg-2">
                    <button class="btn-custom w-100" type="submit">Добавить</button>
                </div>
            </div>
        </form>
    </div>

    <div class="table-parent table-responsive me-2 ms-2 mt-4">
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">ID</th>
                <th scope="col">Имя</th>
                <th scope="col">Контакт</th>
                <th scope="col">Комментарий</th>
            </tr>
            </thead>
            <tbody>
            @foreach($orders as $order)
                <tr>
                    <td data-label="SL">{{$order->id}}</td>
                    <td data-label="SL">{{$order->customer_name}}</td>
                    <td data-label="SL">{{$order->contact}}</td>
                    <td data-label="SL">{{$order->comment}}</td>
                </tr>
            @endforeach
            </tbody>
        </table>
    </div>
</div>
@endsection
