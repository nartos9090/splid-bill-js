import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {
  Container,
  Box,
  Text,
  Button,
  Heading
} from "@hope-ui/solid";
import TableCurrencyInput from "../components/TableCurrencyInput";
import MainForm, {price, setPrice, percentage} from '../components/MainForm';
import ItemsForm, {Item, totalPrice, items} from '../components/ItemsForm';
import AdditionalForm, {tax, delivery} from '../components/AdditionalForm';
import {createEffect, createSignal} from 'solid-js';

const App: Component = () => {
  const calculateItemsAndAdditionalDiscount = () => {
    const totalAmount = items().reduce((a, c) => a + Number(c.amount()), 0)
    const additionalPerItem = (tax() + delivery()) / totalAmount

    for (const item of items()) {
      item.setTotalWithAdditional(item.total() + additionalPerItem * item.amount())
      item.setDiscount(item.totalWithAdditional() * percentage() / 100)
      item.setFinalPrice(item.totalWithAdditional() - item.discount())
    }
  }

  createEffect(() => {
    setPrice(totalPrice() + tax() + delivery())
  })

  return (
    <>
      <Box style="position: fixed; top: 0; z-index: 1;" width="100%" background="#f0f0f0">
        <Container px="$4" style="display: flex;">
          <Heading size="5xl">
            <span style={{color: '#27835d'}}>INFISI</span>BILL
          </Heading>
          <Text mt="auto" ml="$1">
            Split your invisible <span style={{color: '#27835d'}}>bill</span>
          </Text>
        </Container>
      </Box>
      <Container p="$4" centered mt="48px">
        <ItemsForm />
        <AdditionalForm/>
        <MainForm/>
        <Box width="100%" justifyContent="center" display="flex">
          <Button onClick={() => calculateItemsAndAdditionalDiscount()}>
            Generate
          </Button>
        </Box>
      </Container>
      <Box style="position: fixed; bottom: 0; text-align: center;" width="100%" backgroundColor="#f0f0f0">
        Made with &#9829; by INFINITE UNY
      </Box>
    </>
  );
};

export default App;
