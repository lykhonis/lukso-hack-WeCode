import Layout from '../components/layout'

export default function Build() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Layout page="Build" back>
      <form
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
