import "./SupportedLibraries.css";

function SupportedLibraries() {
  return (
    <div className="library-wrapper">
      <h3>Supported libraries</h3>
      <div className="library-grid">
      <div className="library-card">
        <div className="library-card__content">
          <h2 className="library-card__title">Epidemic Sound</h2>
        </div>
      </div>
      <div className="library-card">
        <div className="library-card__content">
          <h2 className="library-card__title">Extreme Music</h2>
        </div>
      </div>
      <div className="library-card">
        <div className="library-card__content">
          <h2 className="library-card__title">Upright Music</h2>
        </div>
      </div>
      </div>
      <h3>Coming soon</h3>

      <div className="library-grid">
      <div className="library-card">
        <div className="library-card__content library-card--disabled">
          <h2 className="library-card__title">Commercial</h2>
        </div>
      </div>
      <div className="library-card">
        <div className="library-card__content library-card--disabled">
          <h2 className="library-card__title">APM Music</h2>
        </div>
      </div>
      <div className="library-card">
        <div className="library-card__content library-card--disabled">
          <h2 className="library-card__title">Universal</h2>
        </div>
      </div>
      <div className="library-card">
        <div className="library-card__content library-card--disabled">
          <h2 className="library-card__title">Audio Network</h2>
        </div>
      </div>
      </div>
    </div>
  );
}

export default SupportedLibraries;
