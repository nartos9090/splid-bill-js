import {Component, createSignal, For, JSX, Setter, Accessor, createEffect, onMount} from 'solid-js';
import {Button, Center, Input, Table, TableCaption, Tbody, Th, Thead, Tr, Td, css, Icon} from '@hope-ui/solid';
import TableCurrencyInput from './TableCurrencyInput';
import InputCurrency from './InputCurrency';
import {inputCurrencyStyle} from '../styles/styles';
import {Motion} from "@motionone/solid";

export interface Item {
  name: Accessor<string>
  setName: Setter<string>
  price: Accessor<number>
  setPrice: Setter<number>
  amount: Accessor<number>
  setAmount: Setter<number>
  total: Accessor<number>
  setTotal: Setter<number>
  totalWithAdditional: Accessor<number>,
  setTotalWithAdditional: Setter<number>,
  discount: Accessor<number>
  setDiscount: Setter<number>
  finalPrice: Accessor<number>
  setFinalPrice: Setter<number>
}

interface ItemsProps {
  onChange: Function
}

const [totalPrice, setTotalPrice] = createSignal<number>(0)
const [items, setItems] = createSignal<Item[]>([], {equals: false})
export {totalPrice, items}

const ItemsForm: Component = (props: ItemsProps) => {

  const addNewItem = () => {
    const [name, setName] = createSignal<string>('')
    const [price, setPrice] = createSignal<number>(0)
    const [amount, setAmount] = createSignal<number>(1)
    const [total, setTotal] = createSignal<number>(0)
    const [totalWithAdditional, setTotalWithAdditional] = createSignal<number>(0)
    const [discount, setDiscount] = createSignal<number>(0)
    const [finalPrice, setFinalPrice] = createSignal<number>(0)

    setItems(prev => [
      ...prev,
      {
        name,
        setName,
        price,
        setPrice,
        amount,
        setAmount,
        total,
        setTotal,
        totalWithAdditional,
        setTotalWithAdditional,
        discount,
        setDiscount,
        finalPrice,
        setFinalPrice,
      }
    ])

    createEffect(() => {
      setTotal(price() * amount())
      setTotalPrice(items().reduce((a, c: Item) => a + c.total(), 0))
    })

    // createEffect(() => {
    //   setFinalPrice(total() - discount())
    // })
  }

  addNewItem()

  return (
    <div>
      <Table>
        {/*<TableCaption>Imperial to metric conversion factors</TableCaption>*/}
        <Thead>
          <Tr>
            <Th>No.</Th>
            <Th>Nama</Th>
            <Th numeric>Harga</Th>
            <Th numeric>Jumlah</Th>
            <Th numeric>Total</Th>
            <Th numeric>Total + Ongkir</Th>
            <Th numeric>Diskon</Th>
            <Th numeric>Harga Akhir</Th>
          </Tr>
        </Thead>
        <Tbody>
          <For each={items()} fallback={<div>loading...</div>}>
            {(item, i) => (
              <Motion.tr animate={{transform: ['scaleY(0)', 'scaleY(1)'], transformOrigin: 'left top'}}
                         transition={{duration: 0.25, easing: "ease-in-out"}}
              >
                {/*Nomor*/}
                <Td py={0}>
                  {i() + 1}
                </Td>

                {/*Nama Barang*/}
                <Td py={0}>
                  <Input
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.name()}
                    placeholder={'Barang ' + (i() + 1)}
                    onInput={(e) => item.setName(e.target.value)}
                  />
                </Td>

                {/*Harga*/}
                <Td py={0}>
                  <InputCurrency
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.price()}
                    class={inputCurrencyStyle()}
                    onInput={(price: number) => item.setPrice(price)}
                  />
                </Td>

                {/*Jumlah*/}
                <Td py={0}>
                  <Input
                    px={0}
                    py={0}
                    type="number"
                    variant="unstyled"
                    value={item.amount()}
                    class={inputCurrencyStyle()}
                    onInput={(e) => item.setAmount(e.target.value)}
                  />
                </Td>

                {/*Total*/}
                <Td py={0}>
                  <InputCurrency
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.total()}
                    class={inputCurrencyStyle()}
                    readonly
                  />
                </Td>

                {/*Total With Additional*/}
                <Td py={0}>
                  <InputCurrency
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.totalWithAdditional()}
                    class={inputCurrencyStyle()}
                    readonly
                  />
                </Td>

                {/*Diskon*/}
                <Td py={0}>
                  <InputCurrency
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.discount}
                    class={inputCurrencyStyle()}
                    readonly
                  />
                </Td>

                {/*Harga Akhir*/}
                <Td py={0}>
                  <InputCurrency
                    px={0}
                    py={0}
                    type="text"
                    variant="unstyled"
                    value={item.finalPrice}
                    class={inputCurrencyStyle()}
                    readonly
                  />
                </Td>
              </Motion.tr>
            )}
          </For>
        </Tbody>
      </Table>
      <Center mt={10}>
        <Button onClick={addNewItem}>
          Tambah Barang
        </Button>
      </Center>
    </div>
  )
}

// diskon akhir %
//   nama item
// harga per item
// jumlah per item
// total per item
// diskon per item
// harga akhir per item
// harga akhir per item + rata rata ongkir
//
// ongkir + admin
export default ItemsForm