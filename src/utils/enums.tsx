import { Select } from "antd"

export const Professor: ('Arlen' | 'André' | 'Iury')[] = ['Arlen', 'André', 'Iury']
export const Sede: ('Arclo' | 'Viva Esportes')[] = ['Arclo', 'Viva Esportes']
export const Dias: ('Segunda e Quarta' | 'Terça e Quinta' | 'Outros')[] = ['Segunda e Quarta', 'Terça e Quinta', 'Outros']

type TInput = {
  tipo: 'professor' | 'sede' | 'dias',
  value: string,
  onChange: (v: string) => void,
  className?: string,
  disabled?: boolean
}
export function EnumPicker({ tipo, value, onChange, className = 'block w-full rounded-md border-0 pb-1.5', disabled = false }: TInput) {
  function getOptionsByEnum(t: string[]) {
    return <>
      {t.map((key, value) => (
        <Select.Option key={value + 1} value={key}>{key}</Select.Option>
      )
      )}
    </>
  }

  function getOptions() {
    switch (tipo) {
      case 'dias':
        return getOptionsByEnum(Dias);

      case 'professor':
        return getOptionsByEnum(Professor);

      case 'sede':
        return getOptionsByEnum(Sede);

      default:
        break;
    }
  }
  return (
    <Select disabled={disabled} value={value} onChange={onChange} className={className}>
      {getOptions()}
    </Select>
  )
}
