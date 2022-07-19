import { useRouter } from 'next/router';
import Link from 'next/link';
import { connectToDatabase } from '../../../lib/mongodb';


const Test = ({ tests }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
        <h1>Test</h1>
        <ul>
            {tests.map((test) => (
                <li>
                <Link href="/test/[id]/[test]" as={`/test/${id}/${test.name}`}>
                    <a>{test.name}</a>
                </Link>
                <h3>{test.description}</h3>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Test;

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();
    
    const tests = await db
        .collection("test")
        .find({"user_id" : context.params.id})
        //.find({})
        .toArray();
    
    return {
        props: {
        tests: JSON.parse(JSON.stringify(tests)),
        },
    };
}
