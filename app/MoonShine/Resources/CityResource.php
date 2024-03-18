<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\City;

use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Switcher;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use VI\MoonShineSpatieTranslatable\Fields\Translatable;

/**
 * @extends ModelResource<City>
 */
class CityResource extends ModelResource
{
    protected string $model = City::class;

    protected string $title = 'Cities';

    protected string $column = 'name';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Translatable::make('Название', 'name')
                    ->requiredLanguages([config('app.fallback_locale'), 'ru'])->removable(),
                Slug::make('Slug')->from('name')
                    ->unique(),
                BelongsTo::make('Country'),
                Switcher::make('Активно', 'active'),
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
