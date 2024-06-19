<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\District;

use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Switcher;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use VI\MoonShineSpatieTranslatable\Fields\Translatable;

/**
 * @extends ModelResource<District>
 */
class DistrictResource extends ModelResource
{
    protected string $model = District::class;

    protected string $title = 'Districts';

    protected string $column = 'name';
    
    public function fields(): array
    {
        return [
            Block::make([
                Block::make([
                    ID::make()->sortable(),
                    Translatable::make('Название', 'name')
                        ->requiredLanguages([config('app.fallback_locale'), 'ru'])->removable(),
                    Slug::make('Slug')->from('name')
                        ->unique(),
                    BelongsTo::make('City'),
                    Switcher::make('Активно', 'active'),
                ]),
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
