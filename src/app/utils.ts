export const formatRating = (value: number) => {
    if (value <= 1) return 1;
    else if (value <= 2) return 2;
    else if (value <= 3) return 3;
    else if (value <= 4) return 4;
    else if (value <= 5) return 5;
    else return 0;
};

export const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
};