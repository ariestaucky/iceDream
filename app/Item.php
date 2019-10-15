<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    protected $guarded = [];

    public function scopeSearch($query, $searchTerm){
        return $query->Where('name', 'like', '%' .$searchTerm. '%')
                     ->orWhere('description', 'like', '%' .$searchTerm. '%')
                     ->orWhere('price', 'like', '%' .$searchTerm. '%');
    }
}
