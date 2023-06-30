import { Header } from '@/templates/Header';

export const metadata = {
  title: 'Next Book | Dashboard',
  description: 'Manage your books!',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <Header showNavigation />
      <main className="mt-3 flex w-full bg-white p-10">{children}</main>
    </div>
  );
}
