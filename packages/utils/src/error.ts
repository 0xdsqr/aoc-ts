class AocError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "AocError"
  }
}

export { AocError }
