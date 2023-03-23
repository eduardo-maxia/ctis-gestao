import { Select } from "antd"

export enum Professor {
  Arlen,
  'André',
  Iury
}

export enum Sede {
  Arclo = 1,
  'Viva Esportes' = 2
}

export enum Dias {
  'Segunda e Quarta',
  'Terça e Quinta',
  'Outros'
}

type TInput = {
  tipo: 'professor' | 'sede' | 'dias',
  value: number,
  onChange: (v: number) => void,
  className?: string
}
export function EnumPicker({ tipo, value, onChange, className = 'block w-full rounded-md border-0 pb-1.5' }: TInput) {
  function getOptionsByEnum(t: Object) {
    return <>
      {Object.values(t).filter((v) => isNaN(Number(v))).map((key, value) => (
        <Select.Option key={value + 1} value={value + 1}>{key}</Select.Option>
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
    <Select value={value} onChange={onChange} className={className}>
      {getOptions()}
    </Select>
  )
}
