import React, { useState, useEffect, Component, Fragment } from 'react';
import Select from 'react-select';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Form from 'react-bootstrap/Form';
import { useRecoilValue } from 'recoil';
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';

const indirizzo = atom({
  key: 'indirizzo',
  default: [],
});

const ListaClienti = ({ customers }) => {
  const [indirizzoSelezionato, setIndirizzoSelezionato] =
    useRecoilState(indirizzo);
  const [idsel, setIdsel] = useState();

  const clienteSelezionato = customers.map((cliente) => {
    if (cliente.nome2 === null) {
      return {
        value: cliente.id,
        label: `${cliente.nome1}`,
      };
    } else {
      return {
        value: cliente.id,
        label: `${cliente.nome1} ${cliente.nome2}`,
      };
    }
  });

  // gestisco la selezione del cliente
  const HandleSelClient = (e) => {
    console.log('il cliente selezionato è:', e.label, e.value);
    setIdsel(e.value);
  };

  useEffect(() => {
    customers.map((customer) => {
      if (idsel === customer.id) {
        setIndirizzoSelezionato(customer.addresses);
      }
    });
  }, [idsel]);

  const indirizzosel = indirizzoSelezionato.map((inidirzzo) => {
    return {
      value: inidirzzo.id,
      label: `${inidirzzo.nome}`,
    };
  });

  return (
    <Container className="card-ordini">
      <Row>
        <Col></Col>
        <Col xs={50}>
          <Card className="card-ordini">
            <Card.Header>Seleziona il cliente</Card.Header>
            <Card.Body>
              <Card.Text>
                Selezionare un cliente dalla lista di quelli visulizzati, se non
                si visualizza un cliente contattare l'amministratore di rete
              </Card.Text>
              <div>
                <Select
                  onChange={HandleSelClient}
                  options={clienteSelezionato}
                  placeholder="Seleziona un cliente"
                />
              </div>
            </Card.Body>
            <Card.Text>
              <Form className="m-4"></Form>
            </Card.Text>
          </Card>
          <></>
          <Card className="card-ordini">
            <Card.Header>Seleziona l'indirizzo di spedizione</Card.Header>
            <Card.Body>
              <Card.Text>
                Selezionare un indirizzo dalla lista di quelli visulizzati.
                <Select options={indirizzosel} />
              </Card.Text>
              <div></div>
            </Card.Body>
          </Card>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};

export default ListaClienti;
