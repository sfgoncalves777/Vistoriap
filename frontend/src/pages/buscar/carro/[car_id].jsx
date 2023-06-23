import Head from 'next/head';
import Link from 'next/link';
import { FiArrowLeft, FiCamera, FiLogOut } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

import styles from '../../../styles/pages/ShowCar.module.css'
import request from '../../../utils/request';

export default function ShowCar({ car }) {
  return (
    <>
      <Head>
        <title>Vistoriap | Carro encontrado</title>
      </Head>
      <div className={styles.container} >
        <header>
          <picture>
            <img src="../../assets/logo.svg" alt="logo" />
          </picture>
          <Link href='/buscar/carro/'>
            <a>
              <FiArrowLeft />
            </a>
          </Link>
        </header>
        <main>
          <picture>
            <img src={car.photoLink} alt={car.model} />
          </picture>
          <div className={styles.model} >
            <h2>{car.model}</h2>
            <h1>{car.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h1>
            <h4>Modelo completo</h4>
            <h3>{car.fullModel}</h3>
            <div>
              <div>
                <h4>km</h4>
                <h3>{car.kms.toLocaleString('pt-BR')}</h3>
              </div>
              <div>
                <h4>Ano</h4>
                <h3>{car.year}</h3>
              </div>
            </div>
            <div>
              <div>
                <h4>Localização</h4>
                <h3>{car.location.city}</h3>
              </div>
              <div>
                <h4>Vendedor</h4>
                <h3>{car.salesman}</h3>
              </div>
            </div>
            <div className={styles.buttons}>
              <a
                href={car.albumLink}
                target='_blank'
                rel="noreferrer"
              >
                <FiCamera />
                fotos
              </a>
              <a
                href={`https://api.whatsapp.com/send?phone=55${car.whatsapp.replace(/\D/g, '')}&text=Olá ${car.salesman}, encontrei seu ${car.model} no vistoriap e estou interessado nele.`}
                target='_blank'
                rel="noreferrer"
              >
                <FaWhatsapp />
                conversar
              </a>
            </div>
            {
              car.reportLink && (
                <a
                  href={car.reportLink}
                  target='_blank'
                  rel="noreferrer"
                >
                  <FiLogOut />
                  Laudo da vistoria
                </a>
              )
            }
          </div>
          <div className={styles.specification}>
            <h2>Especificações</h2>
            <div>
              <div>
                <h4>Pneus</h4>
                <h3>{car.tires.brand}</h3>
                <h3>{car.tires.kms.toLocaleString('pt-BR')} km</h3>
              </div>
              <div>
                <h4>Última revisão</h4>
                <h3>{car.revision.date}</h3>
                <h3>{car.revision.kms.toLocaleString('pt-BR')} km</h3>
              </div>
              <div>
                <h4>Combústivel</h4>
                <h3>{car.fuel}</h3>
              </div>
              <div>
                <h4>Câmbio</h4>
                <h3>{car.exchange}</h3>
              </div>
              <div>
                <h4>Portas</h4>
                <h3>{car.doors}</h3>
              </div>
              <div>
                <h4>Vidros</h4>
                <h3>{car.glasses}</h3>
              </div>
              <div>
                <h4>Repinturas</h4>
                <h3>{car.repaiting}</h3>
              </div>
              <div>
                <h4>Faróis</h4>
                <h3>{car.headlights}</h3>
              </div>
            </div>
          </div>
          <div className={styles.optionals}>
            <h2>Opcionais</h2>
            <div>
              {
                car.optionals.map((optional) => (
                  <h3>{optional}</h3>    
                ))
              }
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { car_id } = context.params
  const { data } = await request.get(`/car/${car_id}`);
  return {
    props: { car: data }
  };
};