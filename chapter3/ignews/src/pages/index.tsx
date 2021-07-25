import Head from "next/head";
import styles from "./home.module.scss";
export default function Home() {
  return (
    <>
      <Head>
        <title> Início | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero} >
          <span>👏 Hey, Welcome!</span>
          <h1>
            News About the <span>React</span> world!
          </h1>
          <p>
            Get access to all the publications <br />
            <span>for $9.99 month</span>
          </p>
        </section>
        <img src="/images/avatar.svg" alt="Girl Coding" />
      </main>
    </>
  );
}
