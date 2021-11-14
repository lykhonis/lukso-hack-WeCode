import { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';
import s3 from '../lukso/s3';
import Layout from '../components/layout'
import styles from './home.module.css'
import Profile from '../components/profile';

function buildLesson(key, data) {
  return (
    <div
      key={key}
      className={styles.lesson}>
      <div className={styles.header}>
        <Profile address={data.author} />
        <h3 className={styles.subject}>{data.subject}</h3>
      </div>
      <div className={styles.code}>
        <Markdown>
          {data.content}
        </Markdown>
      </div>
      <div className={styles.actions}>
        <a className={styles.action}>
          Complete &amp; Claim
        </a>
      </div>
    </div>
  );
}

export default function Home() {
  const [lessons, setLessons] = useState([]);

  useEffect(async () => {
    try {
      const indexData = await s3.fetch('index');
      const index = JSON.parse(indexData);
      const lessons = await Promise.all(index.lessons.map(async (lesson) => {
        const data = await s3.fetch(lesson);
        return JSON.parse(data);
      }));
      setLessons(lessons.reverse().map((data, index) => buildLesson(index, data)));
    } catch { }
  }, []);

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
