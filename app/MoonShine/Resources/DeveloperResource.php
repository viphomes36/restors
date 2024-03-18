<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Developer;

use MoonShine\Fields\Image;
use MoonShine\Fields\Number;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Switcher;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use VI\MoonShineSpatieMediaLibrary\Fields\MediaLibrary;

/**
 * @extends ModelResource<Developer>
 */
class DeveloperResource extends ModelResource
{
    protected string $model = Developer::class;

    protected string $title = 'Застройщики';

    protected string $column = 'name';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make('Name'),
                Slug::make('Slug')->from('name')
                    ->unique(),
                Image::make('Logo')->nullable(),
                Text::make('Address')->nullable(),
                Textarea::make('Короткое описание','short_description')->nullable(),
                Textarea::make('История застройщика','full_description')->nullable(),
                Text::make('Ссылка на видео','video')->nullable(),
                Number::make('Год начала работы','start_year')->nullable(),
                Text::make('Ссылка на прайс','price_link')->nullable(),
                MediaLibrary::make('Фото офиса', 'photos')->multiple()->removable(),
                Switcher::make('Активно', 'active')
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
