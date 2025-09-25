let iamToken = null;
let expiresAt = null;

const refreshIAMToken = async () => {
    const response = await fetch("https://iam.api.cloud.yandex.net/iam/v1/tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            yandexPassportOauthToken: process.env.YANDEX_OAUTH_TOKEN
        })
    });

    const data = await response.json();

    if (!data.iamToken) {
        throw new Error("Не удалось получить IAM токен: " + JSON.stringify(data));
    }

    iamToken = data.iamToken;
    expiresAt = new Date(data.expiresAt);
    console.log("New IAM token: ", expiresAt);
    return iamToken;
}

const getIAMToken = async () => {
    if (iamToken && expiresAt && new Date() < expiresAt) {
        return iamToken;
    }

    return await refreshIAMToken();
}

module.exports = { getIAMToken };