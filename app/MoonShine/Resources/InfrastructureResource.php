<?php

declare(strict_types=1);

namespace App\MoonShine\Resources;

use Illuminate\Database\Eloquent\Model;
use App\Models\Infrastructure;

use MoonShine\Fields\Slug;
use MoonShine\Fields\Switcher;
use MoonShine\Fields\Text;
use MoonShine\Resources\ModelResource;
use MoonShine\Decorations\Block;
use MoonShine\Fields\ID;

/**
 * @extends ModelResource<Infrastructure>
 */
class InfrastructureResource extends ModelResource
{
    protected string $model = Infrastructure::class;

    protected string $title = 'Infrastructures';

    protected string $column = 'name';

    public function fields(): array
    {
        return [
            Block::make([
                ID::make()->sortable(),
                Text::make('Name'),
                Slug::make('Slug')->from('name')
                    ->unique(),
                Switcher::make('Внешняя', 'internal')
            ]),
        ];
    }

    public function rules(Model $item): array
    {
        return [];
    }
}
