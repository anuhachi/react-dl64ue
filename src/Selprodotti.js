import React, { useState, useEffect, Component, Fragment } from 'react';
import Select from 'react-select';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import { useAuthHeader } from 'react-auth-kit';
import axios from 'axios';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {useRecoilValue} from 'recoil'
import { useRecoilState } from 'recoil'
import { atom } from "recoil";

const carrello = atom({
  key: 'carrello',
  default: [],
});




export default function Selprodotti() {

  const [prodottiFetchati, setProdottiFetchati] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prodottiSelezionati, setProdottiSelezionati] = useRecoilState(carrello);;
  const [selectedOption, setSelect] = useState(null);
  const authHeader = useAuthHeader();
  const config = {
    headers: { Authorization: `${authHeader()}` },
  };




  function getProdotti() {
    axios
      .get(`https://ordini-bioservicesrl.herokuapp.com/products`, config)
      .then((res) => {
        const prodotti = res.data;
        setProdottiFetchati(prodotti);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getProdotti();
  }, []);

  const options = prodottiFetchati.map((q) => {
    return {
      value: `${q.id}`,
      label: `${q.nome}`,
      quantità: 1,
    };
  });

  const handleChange = (prodottiSelezionati) => {
    const data = prodottiSelezionati.map((obj) => ({ ...obj }));
    setProdottiSelezionati(data);
  };

  const removeOption = (e) => {
    console.log('click', e.currentTarget.name);
    const newSelect = prodottiSelezionati.filter(
      (item) => item.label !== e.target.name
    );
    setProdottiSelezionati(newSelect);
  };

  const HandleIncrement = (nome) => {
    console.log('click', nome);

    let update = prodottiSelezionati.map((x) => {
      if (x.label === nome) {
        let inc = x.quantità + 1;
        return { ...x, quantità: inc };
      }
      return x;
    });
    setProdottiSelezionati(update);
  };

  const Handledec = (nome) => {
    console.log('click', nome);

    let update = prodottiSelezionati.map((x) => {
      if (x.label === nome) {

        if(x.quantità>1){
        let inc = x.quantità - 1;
        return { ...x, quantità: inc };
        }else{return { ...x, quantità: 1 };}
      }
      return x;
    });
    setProdottiSelezionati(update);
  };

  console.log('product', prodottiSelezionati);

  return (
    <div>
      <Container className="card-ordini">
        <Card className="card-ordini">
          <Card.Header>Seleziona i prodotti</Card.Header>
          <Card.Body>
            <Card.Text>Selezionare i prodotti da ordinare</Card.Text>
            <div>
              <Select
                options={options}
                isMulti
                value={prodottiSelezionati}
                onChange={handleChange}
                controlShouldRenderValue={true}
                placeholder="Cerca un articolo"
              />
            </div>
            <Table className="mt-5" striped bordered hover>
              <thead>
                <tr>
                  <th>Prodotto</th>
                  <th>Quantita</th>
                </tr>
              </thead>
              <tbody>
                {prodottiSelezionati.map((v) => (
                  <tr>
                    <td>
                      {v.label}
                      
                    </td>
                    <td>
                      <Button onClick={() => HandleIncrement(v.label)}>
                        +
                      </Button>
                      {v.quantità}
                      <Button onClick={() => Handledec(v.label)}>-</Button>
                      <Button variant="danger" name={`${v.label}` } onClick={removeOption}>X</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
          <Card.Text>
            <Form className="m-4"></Form>
          </Card.Text>
        </Card>
      </Container>

      <p>pagina 2</p>
    </div>
  );
}
