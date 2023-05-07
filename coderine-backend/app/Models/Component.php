<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Component extends Model
{
    use HasFactory;
    //Primary key
    protected $primaryKey = 'id';
    protected $keyType = 'string';

    protected $fillable = [
        'id',
        'name',
        'code',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    //NM relationship
    public function votes()
    {
        return $this->belongsToMany(User::class, 'votes');
    }

    //NM relationship
    public function comments()
    {
        return $this->belongsToMany(User::class, 'comments')->withPivot('comment', 'created_at');
    }
}
