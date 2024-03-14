<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', [\App\Http\Controllers\PageController::class,'index']);

Route::get('/admin', function () {
    abort(403);
});

Route::get('/dashboard', function () {
    return view('v1/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/orders', [\App\Http\Controllers\DashboardController::class,'orders'])->middleware(['auth', 'verified'])->name('dashboard_orders');

Route::post('/dashboard/orders', [\App\Http\Controllers\OrderController::class,'save'])->middleware(['auth', 'verified']);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
