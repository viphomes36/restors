<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Building;

use MoonShine\Fields\Date;
use MoonShine\Fields\Json;
use MoonShine\Fields\Number;
use MoonShine\Fields\Position;
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
                Number::make('Этажность', 'flat_count'),
                Number::make('Минимальный первый взнос', 'min_credit_percent'),
                Select::make('План платежей', 'credit_plan')->nullable()
                    ->options([
                        '1' => 'Квартал',
                        '2' => 'Месяц',
                        '3' => 'Индивидуально',
                    ])->nullable()->hideOnIndex(),
                Date::make('Срок сдачи', 'finish_date')->nullable(),
                Json::make('Этажи', 'flats')
                    ->fields([
                        Position::make(),
                        Number::make('Этаж', 'flat_num'),
                        Select::make('Планировка', 'planstype')->nullable()
                            ->options([
                                '1' => '1+1',
                                '2' => '2+1',
                                '3' => '3+1',
                                '4' => '4+1',
                                '5' => '5+1',
                                '6' => '6+1',
                                '7' => '1+1dp',
                                '8' => '2+1dp',
                                '9' => '3+1dp',
                                '10' => '4+1dp',
                                '11' => '5+1dp',
                                '12' => '6+1dp',
                                '13' => '1+0 Студии',
                            ])->nullable()->hideOnIndex(),
                        Number::make('Цена от', 'start_price'),
                        Number::make('Цена до', 'end_price'),
                        Number::make('Квадрат от', 'count_square_min'),
                        Number::make('Квадрат до', 'count_square_max'),
                        Number::make('Цена за квадрат от', 'start_square_price'),
                        Number::make('Цена за квадрат до', 'end_square_price'),

                        Number::make('Общее кол-во квартир', 'apartment_count'),
                        Number::make('Квартир продано', 'apartment_with_sale'),
                    ])->hideOnIndex(),
                BelongsTo::make('Complex')->hideOnIndex(),
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
