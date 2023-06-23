import Head from 'next/head';
import Link from 'next/link';
import { FaWhatsapp } from 'react-icons/fa';
import styles from '../styles/pages/About.module.css';

export default function About() {
  return (
    <>
      <Head>
        <title>Vistoriap | Saiba mais sobre nós.</title>
        <meta name="description" content="Saiba mais sobre nós." />
      </Head>
      <div className={styles.container} >
        <header>
          <Link href='/'>
            <a>
              <picture>
                <img src="assets/logo.svg" alt="logo" />
              </picture>
            </a>
          </Link>
          <h1>Sobre nós</h1>
          <p>
            Somos uma startup, com a missão de ajudar a você
            fazer os melhores negócios no mundo automotivo
            encontrando consultores e excelentes automóveis.
          </p>
        </header>
        <div className={styles.contentContact} >
          <h2>Contatos</h2>
          <div>
            <a href="https://api.whatsapp.com/send?phone=5532984835145" target='_blank' rel="noreferrer" >
              Silvani Gonçalves
              <FaWhatsapp />
            </a>
            <a href="https://api.whatsapp.com/send?phone=556196629919" target='_blank' rel="noreferrer" >
              Tiago Neves - 250s
              <FaWhatsapp />
            </a>
          </div>
        </div>
        <div className={styles.contentImg} >
          <picture>
            <img src="assets/ilustration.svg" alt="ilustração" />
          </picture>
        </div>
      </div>
    </>
  )
}