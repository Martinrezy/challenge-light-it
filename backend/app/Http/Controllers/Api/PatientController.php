<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Patient;
use App\Services\PatientService;
use Illuminate\Http\JsonResponse;

class PatientController extends Controller
{
    public function __construct(private readonly PatientService $patientService) {}

    public function index(): JsonResponse
    {
        $patients = Patient::query()
            ->orderByDesc('created_at')
            ->get();

        return PatientResource::collection($patients)
            ->response();
    }

    public function store(StorePatientRequest $request): JsonResponse
    {
        $patient = $this->patientService->register(
            $request->safe()->only([
                'full_name',
                'email',
                'phone_country_code',
                'phone_number',
            ]),
            $request->file('document_photo'),
        );

        return (new PatientResource($patient))
            ->additional(['message' => 'Patient registered successfully.'])
            ->response()
            ->setStatusCode(201);
    }

    public function destroy(Patient $patient): JsonResponse
    {
        $this->patientService->delete($patient);

        return response()->json(['message' => 'Patient deleted successfully.']);
    }
}
