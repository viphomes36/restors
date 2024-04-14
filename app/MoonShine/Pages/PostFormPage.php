<?php

declare(strict_types=1);

namespace App\MoonShine\Pages;

use MoonShine\Decorations\Block;
use MoonShine\Decorations\Tab;
use MoonShine\Decorations\Tabs;
use MoonShine\Enums\Layer;
use MoonShine\Pages\Crud\FormPage;

class PostFormPage extends FormPage
{
    public function components(): array
	{
        if(! $this->getResource()->getItemID()) {
            return parent::components();
        }
        $bottomComponents = $this->getLayerComponents(Layer::BOTTOM);

        $buildingsComponent = collect($bottomComponents)->filter(fn($component) => $component->getName() === 'buildings')->first();

        $tabLayer = [
            Block::make('', [
                Tabs::make([
                    Tab::make('Редактирование', $this->mainLayer()),
                    Tab::make('Блоки', [$buildingsComponent]),
                ])
            ])
        ];


        return [
        ...$this->getLayerComponents(Layer::TOP),
            ...$tabLayer
        ];
	}
}
