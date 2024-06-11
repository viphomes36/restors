<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use App\MoonShine\Pages\PostFormPage;
use Illuminate\Database\Eloquent\Model;
use App\Models\Complex;

use MoonShine\Decorations\Block;
use MoonShine\Fields\Date;
use MoonShine\Fields\Image;
use MoonShine\Fields\Json;
use MoonShine\Fields\Number;
use MoonShine\Fields\Position;
use MoonShine\Fields\Relationships\BelongsTo;
use MoonShine\Fields\Relationships\BelongsToMany;
use MoonShine\Fields\Relationships\HasMany;
use MoonShine\Fields\Select;
use MoonShine\Fields\Slug;
use MoonShine\Fields\Text;
use MoonShine\Fields\Textarea;
use MoonShine\Fields\TinyMce;
use MoonShine\Pages\Crud\DetailPage;
use MoonShine\Pages\Crud\FormPage;
use MoonShine\Pages\Crud\IndexPage;
use MoonShine\Resources\ModelResource;
use MoonShine\Fields\ID;
use VI\MoonShineSpatieMediaLibrary\Fields\MediaLibrary;

/**
 * @extends ModelResource<Complex>
 */
class ComplexResource extends ModelResource
{
    protected string $model = Complex::class;

    protected string $title = 'Complexes';

    public array $with = ['buildings'];

    protected function pages(): array
    {
        return [
            IndexPage::make($this->title()),
            PostFormPage::make(
                $this->getItemID()
                    ? __('moonshine::ui.edit')
                    : __('moonshine::ui.add')
            ),
            DetailPage::make(__('moonshine::ui.show')),
        ];
    }

    public function fields(): array
    {
        return [
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
            Select::make('Валюта', 'currency')
                ->options([
                    '1' => 'USD',
                    '2' => 'EUR',
                    '3' => 'RUB',
                    '4' => 'AED'
                ]),
                Select::make('Класс жилья', 'complex_class')
                    ->options([
                        '1' => 'Премиум',
                        '2' => 'Эконом',
                        '3' => 'Комфорт',
                        '4' => 'Бизнес',
                    ])->nullable(),
            Select::make('Тип жилья', 'building_type')
                ->options([
                    '1' => 'Квартира',
                    '2' => 'Вилла',
                    '3' => 'Пентхаус',
                ])->nullable(),

            Json::make('Дистанция', 'infra_distanse')
                ->fields([
                    Number::make('Общественный транспорт', 'transport'),
                    Number::make('Море', 'sea'),
                    Number::make('Средняя школа', 'school'),
                    Number::make('Магазин', 'markets'),
                    Number::make('Медицинский центр', 'medical'),
                ])->hideOnIndex()->creatableLimit(1),

                Text::make('Address')->nullable()->hideOnIndex()->required()->hideOnIndex(),
                Text::make('Координаты','location')->nullable()->hideOnIndex(),
                TinyMce::make('Описание','description')->nullable()->hideOnIndex(),
                Date::make('Начало строительства', 'start_date')->hideOnIndex(),
                BelongsTo::make('Country'),
                BelongsTo::make('City'),
                BelongsTo::make('Developer'),
                MediaLibrary::make('Общие фото', 'allphotos')->multiple()->removable()->hideOnIndex(),
                MediaLibrary::make('Ход строительства', 'build_photos')->multiple()->removable()->hideOnIndex(),
                MediaLibrary::make('Инфраструктура', 'infra_photos')->multiple()->removable()->hideOnIndex(),
                HasMany::make('Блоки','buildings',resource: new BuildingResource())->creatable()->searchable(false)->hideOnIndex(),
                BelongsToMany::make('Инфраструктура','infrastructures',resource: new InfrastructureResource())->hideOnIndex()
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
