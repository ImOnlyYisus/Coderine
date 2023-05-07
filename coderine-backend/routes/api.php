<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ComponentsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

//Public routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


//Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/components', [ComponentsController::class, 'index']);
    Route::post('/components', [ComponentsController::class, 'create']);
    Route::put('/components/{id}', [ComponentsController::class, 'update']);
    Route::get('/components/{id}', [ComponentsController::class, 'getById']);
    Route::post('/components/vote', [ComponentsController::class, 'like']);
    Route::post('/components/comment', [ComponentsController::class, 'postComment']);

    Route::post('/logout', [AuthController::class, 'logout']);
});
