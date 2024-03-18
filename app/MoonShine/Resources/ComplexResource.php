<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Complex;

use MoonShine\Fields\Date;
use MoonShine\Fields\Image;
use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Fields\Select;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;
use VI\MoonShineSpatieMediaLibrary\Fields\MediaLibrary;

/**
 * @extends ModelResource<Complex>
 */
class ComplexResource extends ModelResource
{
    protected string $model = Complex::class;

    protected string $title = 'Complexes';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make('Name'),
                Slug::make('Slug')->from('name')
                    ->unique(),
                Image::make('Главное фото','preview')->nullable(),
                Select::make('Статус', 'status')
                    ->options([
                        '1' => 'Строится',
                        '2' => 'Сдан',
                        '3' => 'Проблемные',
                    ]),
                Select::make('Класс жилья', 'complex_class')
                    ->options([
                        '1' => 'Премиум',
                        '2' => 'Эконом',
                        '3' => 'Комфорт',
                        '4' => 'Бизнес',
                    ])->nullable(),
                Text::make('Address')->nullable(),
                Text::make('Координаты','location')->nullable(),
                Textarea::make('Описание','description')->nullable(),
                Date::make('Начало строительства', 'start_date'),
                BelongsTo::make('Country'),
                BelongsTo::make('City'),
                BelongsTo::make('Developer'),
                MediaLibrary::make('Общие фото', 'allphotos')->multiple()->removable(),
                MediaLibrary::make('Ход строительства', 'build_photos')->multiple()->removable(),
                MediaLibrary::make('Инфраструктура', 'infra_photos')->multiple()->removable(),
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
