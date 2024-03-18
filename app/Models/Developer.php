<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Image\Enums\Fit;
use Spatie\MediaLibrary\HasMedia;
use Spatie\MediaLibrary\InteractsWithMedia;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class Developer extends Model implements HasMedia
{
    use HasFactory;
    use InteractsWithMedia;
    protected $guarded = [];

    public function registerMediaConversions(Media $media = null): void
    {
        $this
            ->addMediaConversion('photos')
            ->fit(Fit::Contain, 300, 300)
            ->nonQueued();
    }
}
