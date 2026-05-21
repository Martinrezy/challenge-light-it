<?php

namespace App\Services;

use App\Jobs\SendPatientConfirmationEmail;
use App\Models\Patient;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class PatientService
{
    public function register(array $attributes, UploadedFile $documentPhoto): Patient
    {
        $path = $documentPhoto->storeAs(
            'documents',
            Str::uuid().'.'.$documentPhoto->getClientOriginalExtension(),
            'public',
        );

        $patient = Patient::create([
            ...$attributes,
            'document_photo_path' => $path,
        ]);

        SendPatientConfirmationEmail::dispatch($patient);

        return $patient;
    }

    public function delete(Patient $patient): void
    {
        if ($patient->document_photo_path) {
            Storage::disk('public')->delete($patient->document_photo_path);
        }

        $patient->delete();
    }
}
