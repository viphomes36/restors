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
use MoonShine\Fields\TinyMce;
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
                Text::make('Address')->nullable()->hideOnIndex(),
                TinyMce::make('Короткое описание','short_description')->nullable()->hideOnIndex(),
                TinyMce::make('История застройщика','full_description')->nullable()->hideOnIndex(),
                Text::make('Ссылка на видео','video')->nullable()->hideOnIndex(),
                Number::make('Год начала работы','start_year')->nullable(),
                Text::make('Ссылка на прайс','price_link')->nullable()->hideOnIndex(),
                MediaLibrary::make('Фото офиса', 'photos')->multiple()->removable()->hideOnIndex(),
                Switcher::make('Активно', 'active')
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
