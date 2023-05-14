import NavigationStudent from '@/components/navigationStudent'
import { Inter } from 'next/font/google'
import { collection, doc, getDocs, getFirestore, limit, orderBy, query } from 'firebase/firestore';
import { FirebaseAppProvider, FirestoreProvider, useFirestoreDocData, useFirestore, useFirestoreCollectionData, useSigninCheck } from 'reactfire';
import { db } from '../_app';
import { useState } from 'react';

const inter = Inter({
    subsets: ['latin']
})

export default function evaluation() {

    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [solution, setSolution] = useState("");
    const [lessonName, setLessonName] = useState("");
    const [youtubeSuggestions, setYoutubeSuggestions] = useState([]);

    const updateAnswer = (event: any) => {
        setAnswer(event.target.value);
    }

    async function getLessons() {
        const lessonsRef = collection(db, "lessons");
        const q = query(lessonsRef, orderBy('time', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const docSnapshot = querySnapshot.docs[0];
        console.log("docSnapshot : ", docSnapshot);

        const data = docSnapshot.data();
        console.log("data : ", JSON.stringify(data));
        setQuestion(data.question);
        console.log("new data " + question);
        setLessonName(data.lessonName);
    }

    getLessons();

    function evaluate() {
        try {
            fetch('/api/openaiStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    answer: answer
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setSolution(data.responseData);
                })
        } catch (error) {
            console.error(error)

        }

        try {
            fetch(`https://warpspeedapi.herokuapp.com/getYoutubeLinks?query=${lessonName}`, {
                method: 'GET',
            })
                .then(response => response.json())
                .then(data => {
                    console.log("getYoutbeLinks Data ; ", data);
                    setYoutubeSuggestions(data);
                })
        } catch (error) {
            console.error(error)

        }
    }

    return (
        <div>
            <div className='m-4'>
                <div>
                    <NavigationStudent />
                </div>
                <div className='py-3'>
                    <h1 className='text-2xl'>Question</h1>
                    <div className='py-2 mx-10 flex flex-col gap-2'>
                        <p className={`${inter.className}`}> {question}</p>
                        <textarea value={answer} onChange={updateAnswer} rows={6} className='w-full p-2 border-2 border-black' />
                        <div className='flex justify-center'>
                            <button onClick={evaluate} className='p-3 px-10 bg-yellow-400 hover:bg-yellow-500'>Evaluate</button>
                        </div>
                    </div>
                    <h1 className='text-3xl'>Answers</h1>
                    <p>{solution}</p>
                    <h1 className='text-2xl'>Youtube Suggestions : </h1>
                    <p>{youtubeSuggestions}</p>
                </div>
            </div>
        </div>
    )
}
