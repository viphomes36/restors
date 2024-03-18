<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Country;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Switcher;
use VI\MoonShineSpatieTranslatable\Fields\Translatable;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;

/**
 * @extends ModelResource<Country>
 */
class CountryResource extends ModelResource
{
    protected string $model = Country::class;

    protected string $title = 'Страны';

    protected string $column = 'slug';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Translatable::make('Название', 'name')
                    ->requiredLanguages([config('app.fallback_locale'), 'ru'])->removable(),
                Slug::make('Slug')->from('name')
                    ->unique(),
                Switcher::make('Активно', 'active')
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
