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
  value: string,
  onChange: (v: string) => void,
  className?: string,
  disabled?: boolean
}
export function EnumPicker({ tipo, value, onChange, className = 'block w-full rounded-md border-0 pb-1.5', disabled = false }: TInput) {
  function getOptionsByEnum(t: Object) {
    return <>
      {Object.values(t).filter((v) => isNaN(Number(v))).map((key, value) => (
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
