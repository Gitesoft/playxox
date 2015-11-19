<?php

namespace App\Http\Requests;
use App\Http\Requests\Request;

class PlayerRequest extends Request
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    public function wantsJson() {
        return true;
    }
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'nickname' => 'required|unique:users,nickname|regex:/^[a-z\d_-]{3,15}$/i'
        ];
    }
}