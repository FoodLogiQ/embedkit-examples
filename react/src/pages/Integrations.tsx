import React from 'react'
import BoomiMount from '../components/BoomiMount'

const Integrations: React.FC = () => {
  return (
    <div className="bg-[var(--card-bg)] border border-[var(--card-border)] rounded-[12px] shadow-[var(--card-shadow)] h-full overflow-hidden">
      <h3 className="text-lg mb-3">Integrations</h3>
      <BoomiMount component="Integrations" props={{ componentKey: 'integrationsPage' }} />
    </div>
  )
}
export default Integrations
