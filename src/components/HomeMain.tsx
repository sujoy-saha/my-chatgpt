import styles from '../styles/page.module.css'

export default function HomeMain() {
  return (
    <main className={styles.main}>
        <h1 className={styles.description}>
          Welcome to Azure OpenAI ChatGPT 
        </h1>    

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://azure.microsoft.com/en-us/products/cognitive-services/openai-service" className={styles.card}>
            <h3>Azure OpenAI &rarr;</h3>
            <p>Power your apps with large-scale AI models</p>
          </a>

          <a
            href="https://next-auth.js.org/"
            className={styles.card}
          >
            <h3>NextAuth.js &rarr;</h3>
            <p>Authentication for Next.js made simple</p>
          </a>

          <a href="https://www.okta.com/" className={styles.card}>
            <h3>Okta &rarr;</h3>
            <p>Connect your workforce to every app.</p>
          </a>

        </div>
      </main>
  )
}