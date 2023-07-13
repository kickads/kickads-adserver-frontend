import { Outlet } from 'react-router-dom';

export function Intersticials() {
  return (
    <div className="relative min-h-[calc(100vh-64px)] py-6 lg:min-h-[calc(100vh-56px)] mx-auto">
      <div>
        <Outlet />
      </div>
    </div>
  );
}