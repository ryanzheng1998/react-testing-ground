export type Mapped<
  N extends number,
  Result extends Array<unknown> = []
> = Result['length'] extends N
  ? Result
  : Mapped<N, [...Result, Result['length']]>
