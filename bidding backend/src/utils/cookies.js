let Cookies = (res, tokenType, token, expiresIn) => {
    res.cookie(tokenType, token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        expire: expiresIn
    })
}

export default Cookies;