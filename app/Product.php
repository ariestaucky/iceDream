<?php

namespace App;

use App\Item;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $guarded = [];
    
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
