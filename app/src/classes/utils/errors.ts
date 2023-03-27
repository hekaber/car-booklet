export const parseMMError = (error: Error) => {
    const regex = /reason="([^"]+)"/;
    const match = error.message.match(regex);
    return match ? match[1] : 'unknown';
};