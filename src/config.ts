export type Config = {
  pid?: string
  debug?: boolean
  from?: string
  closeHandler?: () => void
  resizeHandler?: (height: number) => void
}
