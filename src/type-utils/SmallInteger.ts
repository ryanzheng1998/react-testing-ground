import { Mapped } from './Mapped'

type MAXIMUM_ALLOWED_BOUNDARY = 999

export type SmallInteger = Mapped<MAXIMUM_ALLOWED_BOUNDARY>[number] // 0.. 998
