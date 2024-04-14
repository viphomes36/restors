<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Building;

use MoonShine\Fields\Date;
use MoonShine\Fields\Number;
use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Fields\Relationships\HasMany;
use MoonShine\Fields\Select;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;

/**
 * @extends ModelResource<Building>
 */
class BuildingResource extends ModelResource
{
    protected string $model = Building::class;

    protected string $title = 'Buildings';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Number::make('Этажность','flat_count'),
                Number::make('Минимальный первый взнос','flat_count'),
                Select::make('План платежей', 'credit_plan')->nullable()
                    ->options([
                        '1' => 'Квартал',
                        '2' => 'Месяц',
                        '3' => 'Индивидуально',
                    ])->nullable()->hideOnIndex(),
                Date::make('Срок сдачи', 'finish_date')->nullable(),
                HasMany::make('Этажи','flats',resource: new FlatResource())->creatable()->searchable(false)->hideOnIndex(),
                BelongsTo::make('Complex')->hideOnIndex(),
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
