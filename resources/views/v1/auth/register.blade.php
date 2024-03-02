@extends('layouts.appv1')
@section('title','Регистрация')

@section('content')
    <section class="login-section">
        <div class="container h-100">
            <div class="row h-100 justify-content-center">
                <div class="col-lg-7">
                    <div class="img-box">
                        <img src="/v1/assets/themes/original/img/login.png" alt="login-image" class="img-fluid">
                    </div>
                </div>
                <div class="col-lg-5">
                    <div class="form-wrapper d-flex align-items-center h-100">
                        <div class="form-box">
                            <form action="{{ route('register') }}" method="post">
                                @csrf
                                <div class="row g-4">
                                    <div class="col-12">
                                        <h4>Регистрация</h4>
                                    </div>
                                    <div class="input-box col-12">
                                        <input type="text" name="name" value="" class="form-control"
                                               placeholder="Имя">
                                    </div>

                                    <div class="input-box col-12">
                                        <input type="text" name="email" value="" class="form-control"
                                               placeholder="email">
                                    </div>

                                    <div class="input-box col-12">
                                        <input type="password" name="password" value="" class="form-control"
                                               placeholder="Пароль">
                                    </div>
                                    <div class="input-box col-12">
                                        <input type="password" name="password_confirmation" value="" class="form-control"
                                               placeholder="Подтвердить пароль">
                                    </div>

                                    <div class="input-box col-12 text-center">
                                        <input type="hidden" name="timezone" class="form-control timezone"
                                               placeholder="timezone" value="Europe/Moscow">
                                    </div>

                                </div>
                                <button class="btn-custom" type="submit">Зарегистрироваться</button>
                                <div class="bottom">
                                   Уже есть аккаунт?
                                    <a href="/login">Войти</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
