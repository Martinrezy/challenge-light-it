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
    submitting: 'Registering patient...',
    success: 'Registration successful',
    error: 'Registration failed',
  };

  return (
    <Modal open onClose={state !== 'submitting' ? onClose : () => {}} title={titles[state]}>
      <div className={`status-modal status-modal--${state}`}>
        {state === 'submitting' && (
          <>
            <div className="status-modal__icon status-modal__spinner" />
            <p>Please wait while we save the patient data.</p>
          </>
        )}
        {state === 'success' && (
          <>
            <div className="status-modal__icon status-modal__icon--success">✓</div>
            <p>The patient was registered. A confirmation email will be sent shortly.</p>
            <Button onClick={onClose}>Close</Button>
          </>
        )}
        {state === 'error' && (
          <>
            <div className="status-modal__icon status-modal__icon--error">!</div>
            <p>{message || 'Something went wrong. Please try again.'}</p>
            <Button onClick={onClose}>Close</Button>
          </>
        )}
      </div>
    </Modal>
  );
}
