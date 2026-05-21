<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes — Patient Registration Challenge
|--------------------------------------------------------------------------
|
| Implementar en la rama de feature (no en main):
| - GET  /patients
| - POST /patients
|
*/

Route::get('/health', fn () => response()->json(['status' => 'ok']));
