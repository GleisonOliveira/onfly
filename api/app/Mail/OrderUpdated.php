<?php

namespace App\Mail;

use App\Models\Enums\OrderStatus;
use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class OrderUpdated extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public function __construct(private readonly Order $order) {}

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Pedido atualizado',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        $status = match ($this->order->status) {
            OrderStatus::Approved => "aprovado",
            OrderStatus::Canceled => "cancelado",
            default => "pendente"
        };

        return new Content(
            view: 'OrderUpdated',
            with: [
                'status' => $status,
                'finished' => $this->order->finished ? 'finalizado' : 'não finalizado',
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
