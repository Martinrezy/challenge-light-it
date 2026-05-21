<?php

namespace App\Mail;

use App\Models\Patient;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class PatientRegisteredMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Patient $patient) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Patient Registration Confirmation',
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.patient-registered',
        );
    }
}
