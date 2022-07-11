export const localeStringToNumber = (localeString: string, setter: Function): void => {
  setter(Number(localeString.replace(/\D/g, '')))
}

export const numberToLocaleString = (number: number) => {
  return 'Rp ' + number.toLocaleString('id-id')
}