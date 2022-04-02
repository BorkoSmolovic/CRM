<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $users = [
            [
                'name' => 'Admin',
                'email' => 'admin@gmail.com',
                'password' => Hash::make('admin.12')
            ],
            [
                'name' => 'Borko',
                'email' => 'borko.smolovic@gmail.com',
                'password' => Hash::make('borko.12')
            ],
            [
                'name' => 'Marko',
                'email' => 'marko@gmail.com',
                'password' => Hash::make('marko.12')
            ]
        ];

        collect($users)->each(function ($user) { \App\Models\User::create($user); });   
    }
}
