<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Product;
use File;

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
            'image' => 'required|mimes:jpeg,jpg,png|max:599',
        ]);

        $NameArray = explode(' ',$request->name);
        $first_name = $NameArray[0];

        // Get filename with the extension
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        // Get just ext
        $extension = $request->file('image')->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore= "product_".trim(strtolower($first_name)).trim(substr(time(), 0,4)).time().'.'.$extension;
        // Upload Image
        $path = $request->file('image')->move('public/product_image', $fileNameToStore);

        $product = Product::create([
            'product' => $validatedData['name'],
            'image' => url('public/product_image/'.$fileNameToStore),
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
            'image' => 'required|mimes:jpeg,jpg,png|max:599',
        ]);

        $NameArray = explode(' ',$request->name);
        $first_name = $NameArray[0];

        // Get filename with the extension
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        // Get just ext
        $extension = $request->file('image')->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore= "product_".trim(strtolower($first_name)).trim(substr(time(), 0,4)).time().'.'.$extension;
        // Upload Image
        $path = $request->file('image')->move('public/product_image', $fileNameToStore);

        File::delete(public_path().'/public/product_image/'.$product->image);  

        $product->update([
            'product' => $validatedData['name'],
            'image' => url('public/product_image/'.$fileNameToStore),
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
