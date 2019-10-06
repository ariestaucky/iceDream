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
            'image' => 'required',
            'price' => 'required',
            'item_qty' => 'required',
        ]);

        $item = Item::create([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => $validatedData['image'],
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
            'image' => 'required',
            'price' => 'required',
            'item_qty' => 'required',
        ]);

        $item->update([
            'name' => $validatedData['name'],
            'description' => $validatedData['description'],
            'image' => $validatedData['image'],
            'price' => $validatedData['price'],
            'item_qty' => $validatedData['item_qty'],
        ]);

        return $item->toJson();
    }

    public function delete($id) {
        $item = Item::findorFail($id);
        $item->delete();

        $response = 'success';

        return response()->json($response, 201);
    }
}
