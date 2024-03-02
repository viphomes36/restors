@extends('layouts.appv1')
@section('title','Login')

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
                            <form action="/login" method="post">
                                @csrf
                                <div class="row g-4">
                                    <div class="col-12">
                                        <h4>Войти в личный кабинет</h4>
                                    </div>
                                    <div class="input-box col-12">
                                        <input type="text" name="email" value="" class="form-control"
                                               placeholder="Email">
                                    </div>

                                    <div class="input-box col-12">
                                        <input type="hidden" name="timezone" class="form-control timezone"
                                               placeholder="timezone" value="Europe/Moscow">
                                    </div>

                                    <div class="input-box col-12">
                                        <input type="password" name="password" value="" class="form-control"
                                               placeholder="Пароль">
                                    </div>


                                    <div class="col-12">
                                        <div class="links">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="remember"
                                                       id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault"> Сохранить пароль</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button class="btn-custom" type="submit">Войти</button>
                                <div class="bottom">
                                   Нет аккаунта?
                                    <a href="/register">Регистрация</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection
