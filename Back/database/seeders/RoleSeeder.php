<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roles = [
            [
                'name' => 'administrator',
                'label' => 'Administrator'
            ],
            [
                'name' => 'client',
                'label' => 'Client'
            ]
        ];
        
        collect($roles)->each(function ($role) { \App\Models\Role::create($role); });
    }
}
