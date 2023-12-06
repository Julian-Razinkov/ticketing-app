const expiresAtJob = () => {
    const expirationDate = new Date();
    const currentSeconds = expirationDate.getSeconds()
    const EXPIRATION_WINDOW_SECONDS = 15 * 60

    return expirationDate.setSeconds(currentSeconds + EXPIRATION_WINDOW_SECONDS)
}

export {expiresAtJob}