import { Modal } from './Modal';
import { Button } from './Button';
import './StatusModal.css';
import type { SubmitModalState } from '@/types/patient';

interface StatusModalProps {
  state: SubmitModalState;
  message?: string;
  onClose: () => void;
}

export function StatusModal({ state, message, onClose }: StatusModalProps) {
  if (state === 'idle') return null;

  const titles: Record<Exclude<SubmitModalState, 'idle'>, string> = {
    submitting: 'Saving...',
    success: 'Saved',
    error: 'Error',
  };

  return (
    <Modal open onClose={state !== 'submitting' ? onClose : () => {}} title={titles[state]}>
      <div className={`status-modal status-modal--${state}`}>
        {state === 'submitting' && (
          <>
            <div className="status-modal__icon status-modal__spinner" />
            <p>Saving patient...</p>
          </>
        )}
        {state === 'success' && (
          <>
            <div className="status-modal__icon status-modal__icon--success">✓</div>
            <p>Patient registered. Confirmation email queued.</p>
            <Button onClick={onClose}>Close</Button>
          </>
        )}
        {state === 'error' && (
          <>
            <div className="status-modal__icon status-modal__icon--error">!</div>
            <p>{message || 'Could not save. Try again.'}</p>
            <Button onClick={onClose}>Close</Button>
          </>
        )}
      </div>
    </Modal>
  );
}
