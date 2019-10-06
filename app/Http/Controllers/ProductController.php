<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;

class ProductController extends Controller
{
    public function product() {
        $product = Product::all();
        $product = Product::withCount('items')->get();

        return $product->toJson();
    }

    public function add(Request $request) {
        $validatedData = $request->validate([
            'name' => 'required',
            'image' => 'required',
        ]);

        $product = Product::create([
            'product' => $validatedData['name'],
            'image' => $validatedData['image'],
        ]);

        return $product->toJson();
    }

    public function show($id)
    {
        $product = Product::findorFail($id);
        $items = $product->items()->get();

        $response = [
            'product' => $product,
            'items' => $items
        ];

        return response()->json($response, 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findorFail($id);

        $validatedData = $request->validate([
            'name' => 'required',
            'image' => 'required',
        ]);

        $product->update([
            'product' => $validatedData['name'],
            'image' => $validatedData['image'],
        ]);

        return $product->toJson();
    }

    public function delete($id) {
        $product = Product::findorFail($id);
        $product->delete();

        $response = 'success';

        return response()->json($response, 201);
    }
}
