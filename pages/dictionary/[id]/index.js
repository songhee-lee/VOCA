import { useRouter } from 'next/router';
import Link from 'next/link';
import { connectToDatabase } from '../../../lib/mongodb';


const Dictionary = ({ dictionaries }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
        <h1>Dictionary</h1>
        <ul>
            {dictionaries.map((dic) => (
                <li>
                <Link href="/dictionary/[id]/[dictionary]" as={`/dictionary/${id}/${dic.name}`}>
                    <a>{dic.name}</a>
                </Link>
                <h3>{dic.description}</h3>
                </li>
            ))}
            </ul>
        </div>
    )
}

export default Dictionary;

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();

    const dictionaries = await db
        .collection("dictionary")
        .find({"user_id" : context.params.id})
        //.find({})
        .toArray();
    
    return {
        props: {
        dictionaries: JSON.parse(JSON.stringify(dictionaries)),
        },
    };
}
