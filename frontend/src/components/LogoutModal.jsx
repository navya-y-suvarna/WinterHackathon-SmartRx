import { createPortal } from "react-dom";
import "./LogoutModal.css";

export default function LogoutModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return createPortal(
    <div className="logout-overlay">
      <div className="logout-modal" role="dialog" aria-modal="true">
        <h2 className="logout-title">Logout</h2>
        <p className="logout-text">Are you sure you want to logout?</p>
        <div className="logout-actions">
          <button className="btn btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Logout
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
