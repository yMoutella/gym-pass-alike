export default class CheckinTimeException extends Error {
  constructor() {
    super('Check-in time is invalid ⏲️')
  }
}
