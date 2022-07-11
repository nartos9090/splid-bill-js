import {Component} from "solid-js";
import {css, Input, InputLeftAddon, Td} from "@hope-ui/solid";
import {inputCurrencyStyle} from "../styles/styles";

const rowStyle = css({
  display: 'flex',
  alignItems: 'center',
})

const TableCurrencyInput: Component = () => {
  return (
    <Td py={0}>
      <div class={rowStyle()}>
        <Input
          variant="unstyled"
          type="number"
          placeholder="Basic usage"
          class={inputCurrencyStyle()}/>
      </div>
    </Td>
  )
}

export default TableCurrencyInput