import { useRouter } from 'next/router';
import { connectToDatabase } from '../../../lib/mongodb';


const Dictionary = ({ dic }) => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
        <h1>{dic.name}</h1>
        <h3>{dic.description}</h3>
        <ul>
            { (dic.words).map((word) => (
            <dev>
                <li>{word.word}</li>
                <li>{word.meaning}</li>
                <dev>
                    { (word.sentences).map((sen) => (
                        <li>{sen}</li>
                    ))}
                </dev>
            </dev>
            ))}
        </ul>
        </div>
    )
}

export default Dictionary;

export async function getServerSideProps(context) {
    const { db } = await connectToDatabase();

    const dic = await db
        .collection("dictionary")
        .find({"user_id" : context.params.id, "name" : context.params.dictionary}) 
        //.find({})
        .toArray();
    
    return {
        props: {
        dic: JSON.parse(JSON.stringify(dic[0])),
        },
    };
}
