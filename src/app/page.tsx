export default function Home() {
  return (
    <main className="container">
      <div className="eyebrow">RMIT Hackathon · Tide UNLOCKED</div>
      <h1>Your project starts here.</h1>
      <p className="lead">A lightweight starter for your team's prototype. Replace this page with your chosen solution.</p>
      <section className="panel">
        <h2>Getting started</h2>
        <ol>
          <li>Agree on your problem and user flow.</li>
          <li>Build your features in <code>src/app</code>.</li>
          <li>Add integrations and helpers in <code>src/lib</code>.</li>
          <li>Document your setup and record your demo.</li>
        </ol>
      </section>
      <p className="hint">Starter only · No authentication or TideCloak integration configured yet.</p>
    </main>
  );
}
