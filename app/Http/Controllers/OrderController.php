<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    public function save(Request $request)
    {
        $customerName = $request->customer_name ?? "Не заполнено";
        $customerContact = $request->contact ?? "Не заполнено";
        $customerComment = $request->comment ?? "Не заполнено";
        $user = Auth::user()->id;

        $orders = new Order();
        $orders->user_id = $user;
        $orders->customer_name = $customerName;
        $orders->contact = $customerContact;
        $orders->comment = $customerComment;
        $orders->save();
        return back();

    }
}
