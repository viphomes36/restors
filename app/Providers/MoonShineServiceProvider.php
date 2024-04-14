<?php

declare(strict_types=1);

namespace App\Providers;

use App\Models\Order;
use App\MoonShine\Resources\BuildingResource;
use App\MoonShine\Resources\CityResource;
use App\MoonShine\Resources\ComplexResource;
use App\MoonShine\Resources\CountryResource;
use App\MoonShine\Resources\DeveloperResource;
use App\MoonShine\Resources\FlatResource;
use App\MoonShine\Resources\InfrastructureResource;
use App\MoonShine\Resources\OrderResource;
use MoonShine\Providers\MoonShineApplicationServiceProvider;
use MoonShine\MoonShine;
use MoonShine\Menu\MenuGroup;
use MoonShine\Menu\MenuItem;
use MoonShine\Resources\MoonShineUserResource;
use MoonShine\Resources\MoonShineUserRoleResource;

class MoonShineServiceProvider extends MoonShineApplicationServiceProvider
{
    protected function resources(): array
    {
        return [
            new BuildingResource(),
        ];
    }

    protected function pages(): array
    {
        return [];
    }

    protected function menu(): array
    {
        return [
            MenuGroup::make(static fn() => __('moonshine::ui.resource.system'), [
               MenuItem::make(
                   static fn() => __('moonshine::ui.resource.admins_title'),
                   new MoonShineUserResource()
               ),
               MenuItem::make(
                   static fn() => __('moonshine::ui.resource.role_title'),
                   new MoonShineUserRoleResource()
               ),
            ]),
            MenuGroup::make(static fn() => "Регионы", [
                MenuItem::make(
                    static fn() =>  "Страны",
                    new CountryResource()
                ),
                MenuItem::make(
                    static fn() =>  "Города",
                    new CityResource()
                ),
            ]),
            MenuItem::make(
                static fn() =>  "Застройщики",
                new DeveloperResource()
            ),
            MenuItem::make(
                static fn() =>  "Заявки",
                new OrderResource()
            ),
            MenuItem::make(
                static fn() =>  "Объекты (в процессе)",
                new ComplexResource()
            ),
            MenuItem::make(
                static fn() =>  "Инфраструктура",
                new InfrastructureResource()
            ),
        ];
    }

    /**
     * @return array{css: string, colors: array, darkColors: array}
     */
    protected function theme(): array
    {
        return [];
    }
}
