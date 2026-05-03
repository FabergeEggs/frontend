import React, { useEffect } from 'react';
import styles from './modal.module.css'
import ReactPortal from './ReactPortal'

interface ConfirmationModalProps {
    isOpen: boolean;
    handleClose: () => void;
    closeText?: string;
    action: () => void;
    actionText: string,
    label: string;
    text: string;
}

const ConfirmationModal = ({
    isOpen,
    closeText = "Отмена",
    handleClose, // ?
    action,
    actionText,
    label,
    text
}: ConfirmationModalProps) => {
    // close modal on escape key press
    useEffect(() => {
        const closeOnEscapeKey = (e: KeyboardEvent) =>
            e.key === 'Escape' ? handleClose() : null;
        document.body.addEventListener('keydown', closeOnEscapeKey);
        return () => {
            document.body.removeEventListener('keydown', closeOnEscapeKey)
        };
    }, [handleClose])

    // disable scroll on modal load
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return (): void => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen])

    if (!isOpen) return null;

    return (
        <ReactPortal wrapperId="react-portal-modal-container">
            <>
                <div className={styles.blurredBackground}/>
                <div className={styles.content}>
                    <h1 className={styles.label}>{label}</h1>
                    <p className={styles.text}>{text}</p>
                    <button className={`basic-btn ${styles.actionBtn}`} onClick={() => { action(); handleClose()}}>{actionText}</button>
                    <button className={`basic-btn ${styles.closeBtn}`} onClick={handleClose}>{closeText}</button>
                </div>
            </>
        </ReactPortal>
    )
}

export default ConfirmationModal