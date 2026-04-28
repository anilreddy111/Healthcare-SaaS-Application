interface ViewToggleProps {
  value: 'grid' | 'list';
  onChange: (value: 'grid' | 'list') => void;
}

function GridIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2" y="2" width="6" height="6" rx="1.5" />
      <rect x="12" y="2" width="6" height="6" rx="1.5" />
      <rect x="2" y="12" width="6" height="6" rx="1.5" />
      <rect x="12" y="12" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect x="2" y="3" width="4" height="4" rx="1.2" />
      <rect x="8" y="3.5" width="10" height="3" rx="1.2" />
      <rect x="2" y="8" width="4" height="4" rx="1.2" />
      <rect x="8" y="8.5" width="10" height="3" rx="1.2" />
      <rect x="2" y="13" width="4" height="4" rx="1.2" />
      <rect x="8" y="13.5" width="10" height="3" rx="1.2" />
    </svg>
  );
}

export function ViewToggle({ value, onChange }: ViewToggleProps) {
  return (
    <div className="view-toggle" role="tablist" aria-label="Patient view toggle">
      <button
        type="button"
        className={value === 'grid' ? 'toggle-button active' : 'toggle-button'}
        onClick={() => onChange('grid')}
      >
        <GridIcon />
        <span>Grid</span>
      </button>
      <button
        type="button"
        className={value === 'list' ? 'toggle-button active' : 'toggle-button'}
        onClick={() => onChange('list')}
      >
        <ListIcon />
        <span>List</span>
      </button>
    </div>
  );
}
