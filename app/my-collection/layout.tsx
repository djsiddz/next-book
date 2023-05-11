import { Header } from '@/templates/Header';

export const metadata = {
  title: 'Next Book | My Collection',
  description: 'Manage your books!',
};

export default function MyCollectionLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-10">
      <Header showNavigation />
      <main className="p-10 bg-white mt-3 w-full flex">{children}</main>
    </div>
  );
}
