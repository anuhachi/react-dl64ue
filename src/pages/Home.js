import React, { useState, useEffect } from 'react';
import { useAuthUser } from 'react-auth-kit';
import { useAuthHeader } from 'react-auth-kit';
import { useIsAuthenticated } from 'react-auth-kit';
import Button from 'react-bootstrap/Button';
import { useSignOut } from 'react-auth-kit';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Select from 'react-select';
import axios from 'axios';
import ListaClienti from '../ListaClienti';
import Selprodotti from '../Selprodotti'
import Riepilogo from '../Riepilogo'
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue,
} from 'recoil';



function Home() {

 

 

  const user = useAuthUser();
  const authHeader = useAuthHeader();
  const signOut = useSignOut();

  const [customers, setCustomers] = useState([]);
  const [page, setPage] = useState(1);
 
  const [inidrizzi, setIndirizzi] = useState([]);

  const config = {
    headers: { Authorization: `${authHeader()}` },
  };

  const codice_venditore = user().codice_venditore;

  function getclientepergruppo() {
    axios
      .get(
        `https://ordini-bioservicesrl.herokuapp.com/clients?codice_venditore=${codice_venditore}`,
        config
      )
      .then((res) => {
        console.log(res);
        const data = res.data;
        setCustomers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getclientepergruppo();
 
  }, []);




  // gestisco la selezione del indirizzo di spedizione
  const HandleSelFatt = (e) => {
    console.log('indirizzo di fatturazione', e.label, e.value);
  };
  // gestisco la selezione del indirizzo di spedizione
  const HandleSelSped = (e) => {
    console.log('indirizzo di spedizone', e.label, e.value);
  };

  const BackPage = () => {
    if (page === 1) {
      return;
    }
    setPage((page) => page - 1);
  };

  const NextPage = () => {
    if (page === 3) {
      return;
    }
    setPage((page) => page + 1);
  };

  return (
    <>
      <h2>
        Benvenuto {user().username}{' '}
        <Button onClick={() => signOut()}>logout</Button>
      </h2>
      <div className="centered">
        <h3>Effettua un ordine</h3>
      </div>
      <Container>
        <div>
          <ProgressBar now={page} max={3} />
          {page === 1 && (
            <ListaClienti
              customers={customers}
            
            />
          )}
          {page === 2 && <Selprodotti/>}
          {page === 3 && 'ciao'}

          <Button
            variant="outline-primary"
            className="button-ordine-sinistra"
            onClick={BackPage}
          >
            Indietro
          </Button>
          <Button
            variant="outline-primary"
            className="button-ordine-destra"
            onClick={NextPage}
          >
            {' '}
            {page === 3 ? 'invia ordine' : 'avanti'}{' '}
          </Button>
        </div>
      </Container>
    </>
  );
}

export default Home;
