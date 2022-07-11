import type {Component} from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import {Container, Input, Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr, css, SimpleGrid, Box} from "@hope-ui/solid";
import TableCurrencyInput from "../components/TableCurrencyInput";
import MainForm from '../components/MainForm';
import ItemsForm, {Item} from '../components/ItemsForm';
import AdditionalForm from '../components/AdditionalForm';
import {createSignal} from 'solid-js';


const App: Component = () => {
  const [totalAmount, setTotalAmount] = createSignal<number>(0)
  const [totalPrice, setTotalPrice] = createSignal<number>(0)
  const [totalDiscount, setTotalDiscount] = createSignal<number>(0)
  const [totalFinalPrice, setTotalFinalPrice] = createSignal<number>(0)

  const setTotal = (items: Item[]) => {
    setTotalAmount(items.reduce((prev, item) => prev + item.amount(), 0))
    setTotalPrice(items.reduce((prev, item) => prev + item.total(), 0))
    setTotalDiscount(items.reduce((prev, item) => prev + item.discount(), 0))
    setTotalFinalPrice(items.reduce((prev, item) => prev + item.finalPrice(), 0))
  }

  return (
    <>
      <Container>
        <ItemsForm onChange={setTotal} />
        <MainForm totalPrice={totalPrice} />
        <AdditionalForm />
      </Container>
    </>
  );
};

export default App;
