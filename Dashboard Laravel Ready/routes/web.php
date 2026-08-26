<?php

use Illuminate\Support\Facades\Route;

Route::get('dashboard', function () {
    return view('Projects.Dashboard.index');
});

Route::get('admin/login', function () {
    return view('Projects.Auth.login');
});