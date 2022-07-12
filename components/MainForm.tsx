import {Accessor, Component, createEffect, createSignal, JSX} from 'solid-js';
import {Box, FormControl, FormHelperText, FormLabel, SimpleGrid} from '@hope-ui/solid';
import {inputCurrencyStyle} from '../styles/styles';
import InputCurrency from './InputCurrency';

interface MainProps {
  totalPrice: Accessor,
}

const MainForm: Component = (props: MainProps) => {
  const [price, setPrice] = createSignal<number>(0, {equals: false})
  const [total, setTotal] = createSignal<number>(0, {equals: false})
  const [discount, setDiscount] = createSignal<number>(0)
  const [percentage, setPercentage] = createSignal<number>(0)

  const discountText = (text: string) => {
    let valueDiscount = percentage()
    if (!Number.isFinite(percentage())) {
      valueDiscount = 100
    } else if (isNaN(percentage())) {
      valueDiscount = 0
    }
    return `${text} (${Math.floor(valueDiscount)}%)`
  }

  createEffect(() => {
    setDiscount(price() - total())
    setPercentage(discount() / price() * 100)
  })

  createEffect(() => {
    setPrice(props.totalPrice?.())
  })

  return (
    <>
      <SimpleGrid columns={{'@initial': 1, '@md': 3}} gap="40px">
        <Box>
          <FormControl>
            <FormLabel for="input-total-price">Total Harga</FormLabel>
            <InputCurrency
              id="input-total-price"
              class={inputCurrencyStyle()}
              onInput={setPrice}
              value={price}
            />
            <FormHelperText>
              Total harga termasuk seluruh biaya admin dan ongkos kirim
              <span style={{color: 'red'}}> sebelum diskon</span>
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel for="input-total-price">Harga Setelah Diskon</FormLabel>
            <InputCurrency
              id="input-total-price"
              class={inputCurrencyStyle()}
              onInput={setTotal}
              value={total}
            />
            <FormHelperText>
              Total harga termasuk seluruh biaya admin dan ongkos kirim
              <span style={{color: 'blue'}}> setelah diskon</span>
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel for="input-total-price">Total Diskon</FormLabel>
            <InputCurrency
              id="input-total-price"
              class={inputCurrencyStyle()}
              onInput={setDiscount}
              value={discount}
              readonly
              text={discountText}
            />
            <FormHelperText>
              <span style={{color: 'green'}}>Total diskon </span>
              yang didapat termasuk seluruh biaya admin dan ongkos kirim
            </FormHelperText>
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default MainForm