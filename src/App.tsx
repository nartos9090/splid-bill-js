import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {
  Container,
  Input,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  css,
  SimpleGrid,
  Box,
  Button
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
      <Container>
        <ItemsForm />
        <AdditionalForm />
        <MainForm />
        <Button onClick={() => calculateItemsAndAdditionalDiscount()}>
          Generate
        </Button>
      </Container>
    </>
  );
};

export default App;
