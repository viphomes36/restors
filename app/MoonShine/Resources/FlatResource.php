<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Flat;

use MoonShine\Fields\Number;
use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;

/**
 * @extends ModelResource<Flat>
 */
class FlatResource extends ModelResource
{
    protected string $model = Flat::class;

    protected string $title = 'Flats';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Number::make('Этаж','flat_num'),
                Number::make('Цена от','start_price'),
                Number::make('Цена до','end_price'),
                Number::make('Общее кол-во квартир','apartment_count'),
                Number::make('Квартир продано','apartment_with_sale'),
                BelongsTo::make('Блок','building', resource: new BuildingResource())
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
