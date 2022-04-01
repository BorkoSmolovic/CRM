<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $permissions = [
            [
                'name' => 'create_user',
                'label' => 'Create user'
            ],
            [
                'name' => 'read_user',
                'label' => 'Read user'
            ],
            [
                'name' => 'update_user',
                'label' => 'Update user'
            ],
            [
                'name' => 'delete_user',
                'label' => 'Delete user'
            ],
            [
                'name' => 'create_project',
                'label' => 'Create project'
            ],
            [
                'name' => 'read_project',
                'label' => 'Read project'
            ],
            [
                'name' => 'update_project',
                'label' => 'Update project'
            ],
            [
                'name' => 'delete_project',
                'label' => 'Delete project'
            ]
        ];

        collect($permissions)->each(function ($permission) { \App\Models\Permission::create($permission); });   
    }
}
