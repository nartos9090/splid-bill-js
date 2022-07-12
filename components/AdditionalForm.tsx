import {Component, createEffect, createSignal, Setter} from 'solid-js';
import {Box, FormControl, FormHelperText, FormLabel, SimpleGrid} from '@hope-ui/solid';
import InputCurrency from './InputCurrency';
import {inputCurrencyStyle} from '../styles/styles';

interface AdditionalProps {
  onTaxChange: Setter<number>
  onDeliveryChange: Setter<number>
}

const AdditionalForm: Component = (props: AdditionalProps) => {
  const [tax, setTax] = createSignal<number>(0)
  const [delivery, setDelivery] = createSignal<number>(0)

  if (props.onTaxChange) {
    createEffect(() => {
      props.onTaxChange(tax())
    })
  }

  if (props.onDeliveryChange) {
    createEffect(() => {
      props.onDeliveryChange(delivery())
    })
  }

  return (
    <>
      <SimpleGrid columns={{'@initial': 1, '@md': 3}} gap="40px">
        <Box>
          <FormControl>
            <FormLabel for="input-tax">Biaya Layanan</FormLabel>
            <InputCurrency
              id="input-tax"
              class={inputCurrencyStyle()}
              onInput={setTax}
              value={tax}
            />
            <FormHelperText>
              Total biaya layanan seperti
              <span style={{color: 'red'}}> biaya admin, pajak, dll.</span>
            </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <FormLabel for="input-delivery">Biaya Ongkir</FormLabel>
            <InputCurrency
              id="input-delivery"
              class={inputCurrencyStyle()}
              onInput={setDelivery}
              value={delivery}
            />
            <FormHelperText>
              Jumlah biaya ongkir
              <span style={{color: 'red'}}> sebelum diskon</span>
            </FormHelperText>
          </FormControl>
        </Box>
      </SimpleGrid>
    </>
  )
}

export default AdditionalForm