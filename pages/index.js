import { useCallback, useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import useAddress from '../hooks/useAddress'
import { getTokenByOwner, getTokenContract } from '../lukso/token';
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
  const { address } = useAddress();
  const [lessons, setLessons] = useState([]);

  const completLesson = useCallback(async (lesson) => {
    try {
      const tokenAddress = await getTokenByOwner(lesson.author);
      const tokenContract = getTokenContract(tokenAddress);
      const award = tokenContract.methods.award(address);
      const gas = (await award.estimateGas()) * 110 / 100;
      // const result = await award.send({ gas });
      console.log(gas);
    } catch (e) {
      console.error(e);
    }
  }, [address]);

  useEffect(async () => {
    try {
      const indexData = await s3.fetch('index');
      const index = JSON.parse(indexData);
      const lessons = await Promise.all(index.lessons.map(async (lesson) => {
        const data = await s3.fetch(lesson);
        return JSON.parse(data);
      }));
      setLessons(lessons.reverse().map((data, index) => buildLesson(index, data, completLesson)));
    } catch (e) {
      console.log(e);
    }
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
    </Layout>
  );
}
