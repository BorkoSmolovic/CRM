<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projects = [
            [
                'title' => 'CRM',
                'description' => 'Upravljanje projektima',
                'deadline' => '2023-01-01',
                'status_id' => '1',
                'owner_id' => '1'
            ],
        ];
        
        collect($projects)->each(function ($project) { \App\Models\Project::create($project); });
    }
}
