import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function convertDateToString(dateToConvert: Date | string): string {
  return formatDistanceToNow(new Date(dateToConvert), {
    addSuffix: true,
    locale: ptBR
  })
}