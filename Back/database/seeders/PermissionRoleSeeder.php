<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionRoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        
        $permissionRoles = [
            [
                'permission_id' => '1',
                'role_id' => '1'
            ],
            [
                'permission_id' => '2',
                'role_id' => '1'
            ],
            [
                'permission_id' => '3',
                'role_id' => '1'
            ],
            [
                'permission_id' => '4',
                'role_id' => '1'
            ],
            [
                'permission_id' => '5',
                'role_id' => '1'
            ],
            [
                'permission_id' => '6',
                'role_id' => '1'
            ],
            [
                'permission_id' => '7',
                'role_id' => '1'
            ],
            [
                'permission_id' => '8',
                'role_id' => '1'
            ],
            [
                'permission_id' => '5',
                'role_id' => '2'
            ],
            [
                'permission_id' => '6',
                'role_id' => '2'
            ],
            [
                'permission_id' => '7',
                'role_id' => '2'
            ],
            [
                'permission_id' => '8',
                'role_id' => '2'
            ]
        ];

        collect($permissionRoles)->each(function ($permissionRole) { \App\Models\PermissionRole::create($permissionRole); }); 
    }
}
