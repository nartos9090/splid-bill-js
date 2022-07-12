import {Component, createEffect, createSignal} from "solid-js"
import {Input} from "@hope-ui/solid"

const addCurrency = (amount: number | string) => {
  return 'Rp ' + amount
}

interface InputProps {
  onInput: Function,
  value: Function,
  text: Function,
}

const InputCurrency: Component = (props: InputProps | any) => {
  const [value, setValue] = createSignal<number>(0)
  const [text, setText] = createSignal<string>(addCurrency(0))

  const formatCurrency = (localeString: string, textSetter: Function, valueSetter: Function): void => {
    const number = Number(localeString.replace(/\D/g, ''))
    const _text = numberToLocaleString(number)
    if (number === value()) {
      textSetter(localeString)
    }
    valueSetter(number)
    textSetter(_text)
  }

  const numberToLocaleString = (number: number) => {
    return addCurrency(number.toLocaleString('id-id'))
  }

  createEffect(() => {
    props.onInput?.(value())
  })

  createEffect(() => {
    const parentValue = typeof props.value === 'function' ? props.value() : props.value
    setValue(parentValue)
    let text = numberToLocaleString(parentValue)
    if (props.text) {
      text = props.text(text)
    }
    setText(text)
  })

  return (
    <>
      <Input {...props} value={text()} onInput={(e) => formatCurrency(e.target.value, setText, setValue)} />
    </>
  )
}

export default InputCurrency