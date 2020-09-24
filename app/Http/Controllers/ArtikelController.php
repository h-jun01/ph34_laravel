<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use App\Artikel;

class ArtikelController extends Controller
{
    public function index()
    {
        $articles = Artikel::all();
        
        return $articles->toJson();
    }
 
    public function store(Request $request)
    {
        $validatedData = $request->validate([
          'title' => 'required',
          'content' => 'required',
        ]);
 
        $project = Artikel::create([
          'title' => $validatedData['title'],
          'content' => $validatedData['content'],
        ]);
 
        $msg = [
            'success' => true,
            'message' => 'Article created successfully!'
        ];
 
        return response()->json($msg);
    }
 
    public function getArticle($id)
    {
        $article = Artikel::find($id);
 
        return $article->toJson();
    }
 
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
          'title' => 'required',
          'content' => 'required',
        ]);
 
        $article = Artikel::find($id);
        $article->title = $validatedData['title'];
        $article->content = $validatedData['content'];
        $article->save();
 
        $msg = [
            'success' => true,
            'message' => 'Article updated successfully'
        ];
 
        return response()->json($msg);
    }
 
    public function delete($id)
    {
        $article = Artikel::find($id);
        if (!empty($article)) {
            $article->delete();
            $msg = [
                'success' => true,
                'message' => 'Article deleted successfully!'
            ];
            return response()->json($msg);
        } else {
            $msg = [
                'success' => false,
                'message' => 'Article deleted failed!'
            ];
            return response()->json($msg);
        }
    }
}
