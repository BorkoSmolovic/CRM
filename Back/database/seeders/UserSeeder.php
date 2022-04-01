<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

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
                'name' => 'Borko',
                'email' => 'borko.smolovic@gmail.com',
                'password' => 'qwer'
            ],
            [
                'name' => 'Marko',
                'email' => 'marko@gmail.com',
                'password' => 'qwer'
            ]
        ];

        collect($users)->each(function ($user) { \App\Models\User::create($user); });   
    }
}
