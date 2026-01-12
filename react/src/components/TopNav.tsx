import React, { useId } from 'react'

const TopNav: React.FC<any> = () => {
  const id = useId().replace(/:/g, '')

  return (
    <header className="flex items-center gap-3 h-[60px] px-4 text-[var(--header-fg)] bg-[var(--header-bg)] border-b border-[var(--header-border)] backdrop-blur-md shadow-[var(--header-shadow)]">
      <button className="icon-btn grid place-items-center w-9 h-9 bg-[var(--surface)] border border-[var(--border)] rounded-[10px]">☰</button>
      <div className="font-semibold tracking-tight">OEM+ App</div>
    </header>
  )
}

export default TopNav
