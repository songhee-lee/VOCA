import Link from 'next/link';

export default function Navbar({ user_id }) {
    return(
        <div>
            <Link href="/dictionary" user_id={user_id}>
                <a>Dictionary</a>
            </Link>
        </div>
    );
}