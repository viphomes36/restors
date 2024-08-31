<?php

namespace App\Http\Controllers;

use App\Models\Complex;
use App\Models\Developer;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function index()
    {
        $complexes = Complex::query('id','>',0)->limit(8)->get();
        return view($this->templateVersion . "/index",[
            'complexes' => $complexes
        ]);
    }

    public function developers()
    {
        $developers = Developer::query()->where('id','>',0)->limit(16)->get();
        return view($this->templateVersion . "/developers",[
            'developers' => $developers
        ]);
    }
}
