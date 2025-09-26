import { useState, useEffect } from "react";

export default function WelcomeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShow(true);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
    // Mark that user has visited
    localStorage.setItem("hasVisited", "true");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      // Simple feedback - you could enhance this with a toast notification
      console.log("Copied to clipboard:", text);
    });
  };

  if (!show) return null;

  return (
    <div
      className="modal show d-block welcome-modal"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h4 className="modal-title d-flex align-items-center">
              <i className="bi bi-star-fill me-2"></i>
              Welcome to React Movies Demo
            </h4>
          </div>
          <div className="modal-body p-4">
            <div className="text-center mb-4">
              <i className="bi bi-film display-1 text-primary mb-3"></i>
              <h4 className="text-primary">Welcome to this demo website!</h4>
            </div>

            <div className="alert alert-info">
              <h5 className="alert-heading">
                <i className="bi bi-info-circle me-2"></i>
                Demo Credentials
              </h5>
              <p className="mb-3">
                To explore the administrative dashboard and its features
                (creating, editing, deleting content), please use the following
                credentials:
              </p>

              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-bold">Email:</label>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      value="toni145@gmail.com"
                      readOnly
                      id="demo-email"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => copyToClipboard("toni145@gmail.com")}
                      title="Copy to clipboard"
                    >
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </div>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-bold">Password:</label>
                  <div className="input-group">
                    <input
                      type="password"
                      className="form-control"
                      value="Toni145@!"
                      readOnly
                      id="demo-password"
                    />
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => copyToClipboard("Toni145@!")}
                      title="Copy to clipboard"
                    >
                      <i className="bi bi-clipboard"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="alert alert-success">
              <h5 className="alert-heading">
                <i className="bi bi-person-plus me-2"></i>
                For Normal Users
              </h5>
              <p className="mb-0">
                You can also register a new account to explore the application
                as a regular user.
              </p>
            </div>

            <div className="text-center mt-4">
              <small className="text-muted">
                <i className="bi bi-lightbulb me-1"></i>
                This modal will only appear on your first visit
              </small>
            </div>
          </div>
          <div className="modal-footer bg-light">
            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={handleClose}
            >
              <i className="bi bi-check-circle me-2"></i>
              Got it, let's start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
