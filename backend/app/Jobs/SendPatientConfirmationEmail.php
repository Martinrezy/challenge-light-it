<?php

namespace App\Jobs;

use App\Mail\PatientRegisteredMail;
use App\Models\Patient;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Mail;

class SendPatientConfirmationEmail implements ShouldQueue
{
    use Queueable;

    public function __construct(public Patient $patient) {}

    public function handle(): void
    {
        Mail::to($this->patient->email)->send(new PatientRegisteredMail($this->patient));
    }
}
