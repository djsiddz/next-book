export const metadata = {
    title: 'Next Book',
    description: 'Manage your books!',
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <nav>
                <ul>
                    <li>Next Book</li>
                    <li>Dashboard</li>
                    <li>My Collection</li>
                    <li>Settings</li>
                    <li>Logged-in User</li>
                </ul>
            </nav>
            <main>
                {children}
            </main>
        </>
    )
}