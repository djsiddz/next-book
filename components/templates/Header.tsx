import Link from 'next/link';

type HeaderProps = {
  showNavigation: boolean;
};

export function Header({ showNavigation = false }: HeaderProps) {
  return (
    <header className="flex h-12 min-w-full flex-row items-center">
      <Link href="/" className="mr-8 text-xl">
        Next Book
      </Link>
      {showNavigation && (
        <nav className="flex flex-grow">
          <ul className="flex flex-grow list-none flex-row items-center justify-center">
            <li className="mx-6">
              <Link href="/dashboard" className="text-md p-3">
                Dashboard
              </Link>
            </li>
            <li className="mx-6">
              <Link href="/my-collection" className="text-md">
                My Collection
              </Link>
            </li>
            <li className="mx-6">
              <Link href="/settings" className="text-md">
                Settings
              </Link>
            </li>
            <li className="ml-auto">
              <Link href="/settings" className="text-md">
                <span className="pr-3">Hello User</span>
                <img
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User Profile"
                />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
