<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function orders()
    {
        $userId = Auth::user()->id;

        $orders = Order::query()
            ->where('user_id', $userId)
            ->orderBy('id','desc')
            ->get();

        return view('v1/dashboard_orders',[
            'orders' => $orders
        ]);
    }
}
