<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePatientRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'full_name' => [
                'required',
                'string',
                'max:120',
                'regex:/^[A-Za-z\s]+$/',
            ],
            'email' => [
                'required',
                'email',
                'max:255',
                'regex:/@gmail\.com$/i',
                Rule::unique('patients', 'email'),
            ],
            'phone_country_code' => [
                'required',
                'string',
                'regex:/^\+\d{1,4}$/',
            ],
            'phone_number' => [
                'required',
                'string',
                'regex:/^\d{6,15}$/',
            ],
            'document_photo' => [
                'required',
                'file',
                'mimes:jpg,jpeg',
                'max:5120',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'full_name.regex' => 'The full name may only contain letters and spaces.',
            'email.regex' => 'The email must be a Gmail address (@gmail.com).',
            'email.unique' => 'Este correo ya está registrado.',
            'phone_country_code.regex' => 'The country code must start with + followed by digits.',
            'phone_number.regex' => 'The phone number must contain only digits.',
            'document_photo.mimes' => 'The document photo must be a JPG image.',
        ];
    }
}
