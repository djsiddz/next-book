import { Header } from '@/templates/Header';

export const metadata = {
  title: 'Next Book',
  description: 'Manage your books!',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <Header showNavigation={true} />
      <main>{children}</main>
    </div>
  );
}
