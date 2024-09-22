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

    public function complexes()
    {
        $complexes = Complex::paginate(9);

        return view($this->templateVersion . "/complexes",[
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

    public function complex($slug)
    {
        $complex = Complex::query()
            ->where('slug', $slug)
            ->first();
        if(!$complex) {
            abort(404);
        }
        $similarComplexes = Complex::query()->limit(3)->get();
        return view($this->templateVersion .'/complex', [
            'complex' => $complex,
            'similarComplexes' => $similarComplexes
        ]);
    }
}
