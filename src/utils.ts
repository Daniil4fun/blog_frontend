export const getUserFromStorage = () => {
    const user = localStorage.getItem('user');
    if (user) {
        const { username, id } = JSON.parse(user);
        return { username, id };
    }
    return { username: null, id: null };
}

export const formatDate = (isoDateString: string) => {
    const date = new Date(isoDateString);

    const addLeadingZero = (num: number) => num < 10 ? `0${num}` : num;

    const day = addLeadingZero(date.getUTCDate());
    const month = addLeadingZero(date.getUTCMonth() + 1);
    const year = date.getUTCFullYear();
    const hours = addLeadingZero(date.getUTCHours());
    const minutes = addLeadingZero(date.getUTCMinutes());
    const seconds = addLeadingZero(date.getUTCSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
}