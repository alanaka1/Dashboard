<?php

use Illuminate\Support\Facades\Route;

Route::get('dashboard', function () {
    return view('Projects.Dashboard.index');
    // return view('Projects.Dashboard.test.form');
});


Route::get('admin/login', function () {
    return view('Projects.Auth.login');
    // return view('Projects.Auth.register');
    // return view('Projects.Auth.forgot-password');
});