import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiSearch, FiAward, FiPhone } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import request from '../../utils/request';
import styles from '../../styles/pages/SearchConsultant.module.css';

export default function SearchConsultant({ infos }) {
  const [selectData, setselectData] = useState({ state: '', city: '' });
  const [cities, setCities] = useState([]);
  const [consultants, setConsultants] = useState([]);

  const handleSelectState = (state) => {
    setselectData({ ...selectData, state });
    const { cities: statesCities } = infos.find(info => info.state === state);
    setCities(statesCities);
  }

  const handleSelectCity = (city) => {
    setselectData({ ...selectData, city });
  }

  const handleFindConsult = async () => {
    const { data } = await request.get(`/consultant/${selectData.state}/${selectData.city}`);
    setConsultants(data);
  }

  return (
    <>
      <Head>
        <title>Vistoriap | Buscar consultores</title>
        <meta name="description" content="Busque os melhores consultores." />
      </Head>
      <div className={styles.container}>
        <header>
          <picture>
            <img src="../assets/logo.svg" alt="logo" />
          </picture>
          <Link href='/'>
            <a>
              <FiArrowLeft />
            </a>
          </Link>
        </header>
        <div className={styles.contentFind}>
          <h1>Buscar consultor</h1>
          <div>
            <select name="state" onChange={event => handleSelectState(event.target.value)}>
              <option value="" hidden>Estado</option>
              {
                infos.map(info => (
                  <option key={info.state} value={info.state} >{info.state}</option>
                ))
              }
            </select>
            <select name="city" onChange={event => handleSelectCity(event.target.value)}>
              <option value="" hidden>Cidade</option>
              {
                cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))
              }
            </select>
            <button onClick={handleFindConsult}>
              <FiSearch />
              Buscar
            </button>
          </div>
        </div>
        <div className={styles.contentResult}>
          {
            !!consultants.length && (<h2>Consultores encontrados</h2>)
          }
          <div>
            {
              consultants.map(consultant => (
                <div key={consultant._id} className={styles.contentConsult}>
                  <div className={styles.contentConsultantInfo}>
                    {
                      consultant?.gold ? (
                        <>
                          <a
                            href={consultant.profileLink}
                            target='_blank'
                            rel="noreferrer"
                          >
                            {consultant.name}
                          </a>
                          <div>
                            <FiAward /> Gold
                          </div>
                        </>
                      ) : (
                        <h3>{consultant.name}</h3>
                      )
                    }
                  </div>
                  <div className={styles.contentConsultantContact}>
                    <a
                      href={`https://api.whatsapp.com/send?phone=55${consultant.contact.replace(/\D/g, '')}&text=Olá ${consultant.name}, encontrei você no vistoriap e estou interessado em seus serviços.`}
                      target='_blank'
                      rel="noreferrer"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href={`tel:+55${consultant.contact.replace(/\D/g, '')}`}
                      rel="noreferrer"
                    >
                      <FiPhone />
                    </a>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await request.get('/consultant/infos');
  return {
    props: { infos: data },
  }
};