import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';
import useAddress from '../hooks/useAddress';
import Loader from 'react-spinners/BeatLoader';
import { getTokenByOwner, awardToken } from '../lukso/token';
import s3 from '../lukso/s3';
import Layout from '../components/layout'
import styles from './home.module.css'
import Profile from '../components/profile';

function buildLesson(key, data, onComplete) {
  return (
    <div
      key={key}
      className={styles.lesson}>
      <div className={styles.header}>
        <Profile address={data.author} />
        <div className={styles.subject}>subject: {data.subject}</div>
      </div>
      <div className={styles.code}>
        <Markdown>
          {data.content}
        </Markdown>
      </div>
      <div className={styles.actions}>
        <a
          className={styles.action}
          onClick={() => onComplete(data)}>
          Complete &amp; Claim
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const { address } = useAddress();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);

  const completLesson = useCallback(async (lesson) => {
    try {
      setLoading(true);
      const tokenAddress = await getTokenByOwner(lesson.author);
      await awardToken(tokenAddress, { student: address });
      router.reload();
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [address, router]);

  useEffect(() => {
    async function fetchLessons() {
      try {
        const indexData = await s3.fetch('index');
        const index = JSON.parse(indexData);
        console.log(index);
        const lessons = await Promise.all(index.lessons.map(async (lesson) => {
          const data = await s3.fetch(lesson);
          return JSON.parse(data);
        }));
        setLessons(lessons.reverse().map((data, index) => buildLesson(index, data, completLesson)));
      } catch (e) {
        console.log(e);
      }
    }
    fetchLessons();
  }, [completLesson]);

  return (
    <Layout>
      <h1 className={styles.title}>
        Welcome to WeCode
      </h1>

      <p className={styles.description}>
        Join communities by learning, building, and earning together.
      </p>

      <div className={styles.lessons}>
        {lessons}
      </div>

      {loading && (
        <div className="loader">
          <Loader loading={true} />
        </div>
      )}
    </Layout>
  );
}
