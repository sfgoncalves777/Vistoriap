import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import request from '../../../utils/request';
import styles from '../../../styles/pages/SearchCar.module.css';

export default function SearchCar({ infos }) {
  const [selectData, setSelectData] = useState({ model: '', year: '', state: '' });
  const [infosYears, setInfosYears] = useState([]);
  const [infosLocations, setInfosLocations] = useState([]);
  const [cars, setCars] = useState([]);

  const handleSelectModel = (model) => {
    setSelectData({ ...selectData, model });
    const { years: infoYears } = infos.find(info => info.model === model);
    setInfosYears(infoYears)
  }

  const handleSelectYear = (year) => {
    setSelectData({ ...selectData, year });
    const { locattions } = infosYears.find(info => info.year === year);
    setInfosLocations(locattions);
  }

  const handleSelectState = (state) => {
    setSelectData({ ...selectData, state });
  }

  const handleFindCar = async () => {
    const { model, year, state } = selectData;
    const { data } = await request(`/car?model=${model}&year=${year}&state=${state}`);
    setCars(data);
  }

  return (
    <>
      <Head>
        <title>Vistoriap | Buscar carros</title>
        <meta name="description" content="Busque os melhores carros." />
      </Head>
      <div className={styles.container} >
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
        <main>
          <div className={styles.contentFind} >
            <h1>Buscar carros</h1>
            <div>
              <select name="model" onChange={(event) => handleSelectModel(event.target.value)}>
                <option value="" hidden>Modelo</option>
                {
                  infos.map(info => (
                    <option key={info.model} value={info.model} >{info.model}</option>
                  ))
                }
              </select>
              <div>
                <select name="year" onChange={(event) => handleSelectYear(event.target.value)} >
                  <option value="" hidden>Ano</option>
                  {
                    infosYears.map(info => (
                      <option key={info.year} value={info.year} >{info.year}</option>
                    ))
                  }
                </select>
                <select name="state" onChange={(event) => handleSelectState(event.target.value)}>
                  <option value="" hidden>Estado</option>
                  {
                    infosLocations.map(info => (
                      <option key={info.state} value={info.state} >{info.state}</option>
                    ))
                  }
                </select>
              </div>
              <button onClick={handleFindCar}>
                <FiSearch />
                Buscar
              </button>
            </div>
          </div>
          <div className={styles.contentResult} >
            {!!cars.length && (<h2>Carros encontrados</h2>)}
            <div>
              {
                cars.map((car) => (
                  <Link href={`/buscar/carro/${car._id}`}>
                    <a>
                      <div className={styles.contentCar} >
                        <picture>
                          { !! car.reportLink && (<span>vistoriado</span>) }
                          <img src={car.photoLink} alt="foto do carro" />
                        </picture>
                        <div>
                          <h3>{car.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                          <div>
                            <span>{car.year}</span>
                            <span>{car.kms.toLocaleString('pt-BR')} km</span>
                          </div>
                          <span>{car.fullModel}</span>
                          <span>{car.location.city}</span>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export const getStaticProps = async () => {
  const { data } = await request.get('/car/infos');
  return {
    props: { infos: data },
  }
};