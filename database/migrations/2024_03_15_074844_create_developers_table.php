<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('developers', function (Blueprint $table) {
            $table->id();
            $table->text('name');
            $table->text('slug');
            $table->text('logo')->nullable();
            $table->text('address')->nullable();
            $table->text('short_description')->nullable();
            $table->text('full_description')->nullable();
            $table->text('video')->nullable();
            $table->text('price_link')->nullable();
            $table->integer('start_year')->nullable();
            $table->boolean('active')->default(1);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('developers');
    }
};
