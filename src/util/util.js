import dayjs from 'dayjs';

export function formatPriceCents(priceCents) {
    return `$${(priceCents / 100).toFixed(2)}`;
}

export function convertMillisecondsToCorrectDate(milliseconds) {
    return dayjs(milliseconds).format('dddd, MMMM D');
}