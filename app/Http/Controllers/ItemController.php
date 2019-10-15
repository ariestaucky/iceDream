<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Item;

class ItemController extends Controller
{
    public function item() 
    {
        $item = Item::all();

        return $item->toJson();
    }

    public function add(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpeg,jpg,png|max:599',
            'price' => 'required',
            'item_qty' => 'required',
        ]);

        $NameArray = explode(' ',$request->name);
        $first_name = $NameArray[0];

        // Get filename with the extension
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        // Get just ext
        $extension = $request->file('image')->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore= "item_".trim(strtolower($first_name)).trim(substr(time(), 0,4)).time().'.'.$extension;
        // Upload Image
        $path = $request->file('image')->move('public/item_image', $fileNameToStore);

        $item = Item::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => url('public/item_image/'.$fileNameToStore),
            'price' => $validatedData['price'],
            'item_qty' => $validatedData['item_qty'],
            'product_id' => $request->product_id,
        ]);

        return $item->toJson();
    }

    public function show($id)
    {
        $item = Item::findorFail($id);

        return $item->toJson();
    }

    public function update(Request $request, $id)
    {
        $item = Item::findorFail($id);

        $validatedData = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'image' => 'required|mimes:jpeg,jpg,png|max:599',
            'price' => 'required',
            'item_qty' => 'required',
        ]);

        $NameArray = explode(' ',$request->name);
        $first_name = $NameArray[0];

        // Get filename with the extension
        $filenameWithExt = $request->file('image')->getClientOriginalName();
        // Get just ext
        $extension = $request->file('image')->getClientOriginalExtension();
        // Filename to store
        $fileNameToStore= "item_".trim(strtolower($first_name)).trim(substr(time(), 0,4)).time().'.'.$extension;
        // Upload Image
        $path = $request->file('image')->move('public/item_image', $fileNameToStore);

        $item->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => url('public/item_image/'.$fileNameToStore),
            'price' => $validatedData['price'],
            'item_qty' => $validatedData['item_qty'],
        ]);

        return $item->toJson();
    }

    public function delete($id) {
        $item = Item::where('id', $id)->delete();

        if($item) {
            $response = 'success';
        } else {
            $response = 'failed';
        }

        return response()->json($response, 201);
    }

    public function search(Request $request) 
    {   
        $searchTerm = $request->search;
        $search = Item::search($searchTerm)->get();
        return response()->json($search, 201);
    }
}
