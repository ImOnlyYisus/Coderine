<?php

namespace App\Http\Controllers;

use App\Models\Component;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Traits\HttpResponses;

class ComponentsController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $components = Component::with('votes', 'comments', 'user')->orderBy('created_at', 'asc')->get();

        return $this->success([
            'components' => $components,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $request->validate([
            'id' => 'required|string',
            'name' => 'required|string',
            'code' => 'required|string',
        ]);

        Auth::user()->components()->create([
            'id' => $request->id,
            'name' => $request->name,
            'code' => $request->code,
        ]);

        return $this->success([], 'Component created successfully');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function getById(Request $request)
    {
        //Send id_component like string
        $component = Auth::user()->components()->where('id', $request->id)->first();

        if(!$component){
            return $this->error([], 'Component not found', 404);
        }

        return $this->success([
            'component' => $component,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $component = Auth::user()->components()->where('id', $id)->first();

        if(!$component){
            return $this->error([], 'Component not found', 404);
        }

        $component->update([
            'name' => $request->name,
            'code' => $request->code,
        ]);

        return $this->success([$component], 'Component updated successfully');
    }

    public function like(Request $request)
    {
        $component = Component::find($request->id);

        if(!$component){
            return $this->error([], 'Component not found', 404);
        }

        if ($component->votes()->where('user_id', Auth::user()->id)->exists()) {
            $component->votes()->detach(Auth::user()->id);
        }else{
            $component->votes()->attach(Auth::user()->id);
        }

        $component = Component::with('votes', 'comments', 'user')->where('id', $request->id)->first();

        return $this->success(['component'=> $component], 'Component liked successfully');
    }

    public function postComment(Request $request)
    {
        $component = Component::find($request->id);

        if(!$component){
            return $this->error([], 'Component not found', 404);
        }

        //Attach comment to component and set created_at and updated_at
        $component->comments()->attach(Auth::user()->id, ['comment' => $request->comment, 'created_at' => now(), 'updated_at' => now()]);

        //Return component with comments
        $component = Component::with('votes', 'comments', 'user')->where('id', $request->id)->first();
        return $this->success(['component'=>$component], 'Comment posted successfully');
    }
}
