<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $projectStatuses = [
            [
                'name' => 'open',
                'label' => 'Open'
            ],
            [
                'name' => 'in_progress',
                'label' => 'In Progress'
            ],
            [
                'name' => 'cancelled',
                'label' => 'Cancelled'
            ],
            [
                'name' => 'completed',
                'label' => 'Completed'
            ]
        ];
        
        collect($projectStatuses)->each(function ($projectStatus) { \App\Models\ProjectStatus::create($projectStatus); });
    }
}
