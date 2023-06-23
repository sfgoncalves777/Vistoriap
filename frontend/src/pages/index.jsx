import Head from 'next/head';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import styles from '../styles/pages/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>Vistoriap | Faça bons negócios</title>
        <meta name="description" content="Te ajudamos a fazer os melhores negócios no mundo automotivo encontrando consultores e excelentes automóveis." />
      </Head>
      <div className={styles.container} >
        <header >
          <picture>
            <img src='assets/logo.svg' alt='logo' />
          </picture>
          <p>
            Te ajudamos a encontrar os melhores
            negócios no mundo automotivo.
          </p>
        </header>
        <div className={styles.contentImg} >
          <picture>
            <img src="assets/ilustration.svg" alt="ilustração" />
          </picture>
        </div>
        <div className={styles.contentButton}>
          <Link href='/buscar/consultor'>
            <a>
              <div>
                <strong>Consultor</strong>
                <FiSearch />
              </div>
            </a>
          </Link>
          <Link href='/buscar/carro'>
            <a>
              <div>
                <strong>Carro</strong>
                <FiSearch />
              </div>
            </a>
          </Link>
        </div>
        <footer>
          <Link href='/sobre'>
            <a> Sobre </a>
          </Link>
        </footer>
      </div>
    </>
  )
}