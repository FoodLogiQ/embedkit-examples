import React, { useId } from 'react';
import { useAuth } from '../../state/authContext';

const LogoutButton: React.FC<any> = () => {
  const id = useId().replace(/:/g,'') // valid DOM id
  const { logout } = useAuth()

  return (
    <button className="btn btn-ghost border border-[var(--border)] px-3 py-2 rounded-[10px] text-[var(--muted)] hover:text-[var(--text)] hover:border-[var(--text)]"
            onClick={() => logout()}>
      <span className="msr">logout</span> Log out
    </button>
  )
}

export default LogoutButton
