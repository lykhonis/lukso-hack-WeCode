import { useCallback, useRef } from 'react';
import s3 from '../lukso/s3';
import hash from 'object-hash';
import useAddress from '../hooks/useAddress';
import Layout from '../components/layout'

export default function Build() {
  const form = useRef();
  const { address } = useAddress();
  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    const lesson = {
      subject: event.target.subject.value,
      content: event.target.content.value,
      author: address,
    };
    if (lesson.subject.length === 0 || lesson.content.length === 0) {
      return;
    }
    const data = JSON.stringify(lesson);
    const key = 'lesson-' + hash(lesson);
    try {
      await s3.upload(key, data);

      let index = {
        lessons: [],
      };
      try {
        const indexData = await s3.fetch('index');
        index = JSON.parse(indexData);
      } catch {}
      console.log(index);
      if (!index.lessons.includes(key)) {
        index.lessons.push(key);
      }
      await s3.upload('index', JSON.stringify(index));

      form.current.reset();
    } catch (e) {
      console.error(e);
    }
  }, [address, form]);

  return (
    <Layout page="Build" back publish={false}>
      <form
        ref={form}
        onSubmit={handleSubmit}>
        <h1>Submit a Lesson</h1>

        <div className="form-row">
          <input
            type="text"
            className="form-control"
            placeholder="Subject"
            name="subject" />
        </div>

        <div className="form-row">
          <textarea
            className="form-control"
            placeholder="Content"
            name="content"
            style={{ height: "400px" }} />
        </div>

        <div className="form-row">
          <button
            type="submit"
            value="Submit"
            className="form-submit">
            Publish
          </button>
        </div>
      </form>
    </Layout>
  );
}
