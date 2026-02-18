import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="/slogo.png"
          alt="Storhub"
          width={100}
          height={55}
          priority
        />
        <div className={styles.intro}>
          <h1>NHNKCP <span style={{ color: "#FF3A4A"}}>PASS</span> for Storhub</h1>
          <p>
            Looking for Testing PASS? {" "} <br/>Test with {" "}
            <a
              href="/pass-dev"
              target="_blank"
              rel="noopener noreferrer"
            >
              DEV ENV/Setup
            </a>{" "}
            or {" "}
            <a
              href="/pass-prod"
              target="_blank"
              rel="noopener noreferrer"
            >
              PROD ENV/Setup
            </a>{" "}
            .
          </p>
        </div>
        <div className={styles.ctas}>
          
          
        </div>
      </main>
    </div>
  );
}
