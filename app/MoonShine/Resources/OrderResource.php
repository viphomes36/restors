<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Order;
use App\MoonShine\Pages\Order\OrderIndexPage;
use App\MoonShine\Pages\Order\OrderFormPage;
use App\MoonShine\Pages\Order\OrderDetailPage;

use MoonShine\Resources\ModelResource;

/**
 * @extends ModelResource<Order>
 */
class OrderResource extends ModelResource
{
    protected string $model = Order::class;

    protected string $title = 'Orders';

    public function pages(): array
    {
        return [
            OrderIndexPage::make($this->title()),
            OrderDetailPage::make(__('moonshine::ui.show')),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
