<?php

use MoonShine\Exceptions\MoonShineNotFoundException;
use MoonShine\Forms\LoginForm;
use MoonShine\Http\Middleware\Authenticate;
use MoonShine\Http\Middleware\SecurityHeadersMiddleware;
use MoonShine\Models\MoonshineUser;
use App\MoonShine\MoonShineLayout;
use MoonShine\Pages\ProfilePage;

return [
    'dir' => 'app/MoonShine',
    'namespace' => 'App\MoonShine',

    'title' => env('MOONSHINE_TITLE', 'Re-Stors'),
    'logo' => '/v1/assets/uploads/logo/logo.png',
    'logo_small' => '/v1/assets/uploads/logo/logo.png',

    'route' => [
        'domain' => env('MOONSHINE_URL', ''),
        'prefix' => 'admin-manager-panel',
        'single_page_prefix' => 'page',
        'index' => 'moonshine.index',
        'middlewares' => [
            SecurityHeadersMiddleware::class,
        ],
        'notFoundHandler' => MoonShineNotFoundException::class,
    ],

    'use_migrations' => true,
    'use_notifications' => true,
    'use_theme_switcher' => true,

    'layout' => MoonShineLayout::class,

    'disk' => 'public',

    'disk_options' => [],

    'cache' => 'file',

    'forms' => [
        'login' => LoginForm::class
    ],

    'pages' => [
        'dashboard' => App\MoonShine\Pages\Dashboard::class,
        'profile' => ProfilePage::class
    ],

    'model_resources' => [
        'default_with_import' => true,
        'default_with_export' => true,
    ],

    'auth' => [
        'enable' => true,
        'middleware' => Authenticate::class,
        'fields' => [
            'username' => 'email',
            'password' => 'password',
            'name' => 'name',
            'avatar' => 'avatar',
        ],
        'guard' => 'moonshine',
        'guards' => [
            'moonshine' => [
                'driver' => 'session',
                'provider' => 'moonshine',
            ],
        ],
        'providers' => [
            'moonshine' => [
                'driver' => 'eloquent',
                'model' => MoonshineUser::class,
            ],
        ],
        'footer' => '',
        'pipelines' => [],
    ],
    'locales' => [
      //  'en',
        'ru',
    ],

    'global_search' => [
        // User::class
    ],

    'tinymce' => [
        'file_manager' => false, // or 'laravel-filemanager' prefix for lfm
        'token' => env('MOONSHINE_TINYMCE_TOKEN', ''),
        'version' => env('MOONSHINE_TINYMCE_VERSION', '6'),
    ],

    'socialite' => [
        // 'driver' => 'path_to_image_for_button'
    ],
];
