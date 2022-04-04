<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $roleUsers = [
            [
                'role_id' => '1',
                'user_id' => '1'
            ],
            [
                'role_id' => '2',
                'user_id' => '2'
            ],
            [
                'role_id' => '2',
                'user_id' => '3'
            ],
        ];

        collect($roleUsers)->each(function ($roleUser) { \App\Models\RoleUser::create($roleUser); });
    }
}
