/**
 * Send an event.
 *
 * @param  {string | null} apiEndpoint The full api endpoint e.g. https://myloggingplatform.com/function
 * @param  {string | null} severity The severity of the event e.g. EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, DEBUG, INFO, NOTICE, DEFAULT
 * @param  {string | null} location The location of the event e.g. URL, class, etc
 * @param  {string | null} userAgent User agent details e.g. navigator.userAgent
 * @param  {string | null} message A custom message to send with event e.g. 'Lorem ipsum'
 * @param  {function | null} err Expects Error() to be passed in from where the error occured
 * @return {json}
 */
export default BBLogger = async (apiEndpoint, severity, location, userAgent, message, err) => {
  const eventDate = new Date()
  const event = {
    logs: [
      `severity=${severity}, location=${location}, agent_date=${eventDate}, agent=${userAgent}, error_stack=${JSON.stringify(
        err.stack
      )}, error_name=${JSON.stringify(err.name)}, error_message=${JSON.stringify(
        err.message
      )}, message=${JSON.stringify(message)}`,
    ],
  }
  const settings = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(event),
  }
  try {
    const res = await fetch(apiEndpoint, settings)
    const logResponse = await res.json()
    return logResponse
  } catch (e) {
    console.error(e)
  }
}
