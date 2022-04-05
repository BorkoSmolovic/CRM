<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\Project;
use App\Models\User;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $page = $request->query("page");
        $size = $request->query("size");

        if ($request->user()->is("administrator")) {
            if ($page == null && $size == null)
                return Project::all();

            //pagination takes only certain amount of records as instructed ffrom front
            return Project::query()->skip($page * $size)->take($size)->get();
        }

        if ($page == null && $size == null)
            return Project::where('owner_id', $request->user()->id)->get();



        //pagination takes only certain amount of records as instructed ffrom front
        return Project::query()->skip($page * $size)->take($size)->get();


        // $response['count'] = count(Project::all());

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreProjectRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $id = $request->query("id");

        $request->validate([
            'title' => 'required|max:255|string',
            'description' => 'required|string',
            'deadline' => 'required|date',
            'status_id' => 'required|integer|exists:project_statuses,id',

        ]);

        if ($id) {
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'deadline' => $request->deadline,
                'status_id' => $request->status_id,
                'owner_id' => $id,
            ]);
        } else {
            $project = Project::create([
                'title' => $request->title,
                'description' => $request->description,
                'deadline' => $request->deadline,
                'status_id' => $request->status_id,
                'owner_id' => $request->user()->id,
            ]);
        }


        return Project::find($project->id);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function show(Project $project)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateProjectRequest  $request
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Project $project)
    {
        $request->validate([
            'title' => 'required|max:255|string',
            'description' => 'required|string',
            'deadline' => 'required|date',
            'status_id' => 'required|integer|exists:project_statuses,id',
        ]);

        $project->update([
            'title' => $request->title,
            'description' => $request->description,
            'deadline' => $request->deadline,
            'status_id' => $request->status_id,
        ]);

        return Project::find($project->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Project  $project
     * @return \Illuminate\Http\Response
     */
    public function destroy(Project $project)
    {
        return $project->delete();
    }
}
