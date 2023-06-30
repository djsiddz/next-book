import { Header } from '@/templates/Header';

export const metadata = {
  title: 'Next Book | My Collection',
  description: 'Manage your books!',
};

export default function MyCollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <Header showNavigation />
      <main className="mt-3 flex w-full bg-white p-10">{children}</main>
    </div>
  );
}
