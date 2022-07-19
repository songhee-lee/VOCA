import { connectToDatabase } from "../lib/mongodb";
import Link from 'next/link';

export default function Home({ user }) {
  return (
    <div>
      <h1>Welcome to {user[0].name} </h1>
      <div>
        <Link href={`/dictionary/${user[0].user_id}`}>
          <a>Dictionary</a>
        </Link>
        <Link href={`/test/${user[0].user_id}`}>
          <a>Test</a>
        </Link>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
	const { db } = await connectToDatabase();
 
	const user = await db
    .collection("user")
    .find({"email":"songhee172@gmail.com", "pwd":"song1025"})
    .sort({ metacritic: -1 })
    .toArray();

	return {
		props: {
			user: JSON.parse(JSON.stringify(user)),
		},
	};
};