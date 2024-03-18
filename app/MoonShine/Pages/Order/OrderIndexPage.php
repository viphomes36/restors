<?php

declare(strict_types=1);

namespace App\MoonShine\Pages\Order;

use MoonShine\Fields\ID;
use MoonShine\Fields\Text;
use MoonShine\Pages\Crud\IndexPage;

class OrderIndexPage extends IndexPage
{
    public function fields(): array
    {
        return [
            ID::make()->sortable(),
            Text::make('Comment'),
            Text::make('customer_name'),
            Text::make('contact'),
        ];
    }

    protected function topLayer(): array
    {
        return [
            ...parent::topLayer()
        ];
    }

    protected function mainLayer(): array
    {
        return [
            ...parent::mainLayer()
        ];
    }

    protected function bottomLayer(): array
    {
        return [
            ...parent::bottomLayer()
        ];
    }
}
