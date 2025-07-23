export function sortByKey<T extends Record<string, any>>(
    data: T[],
    key: keyof T,
    order: 'asc' | 'desc' = 'asc'
): T[] {
    return [...data].sort((a, b) => {
        const valA = a[key];
        const valB = b[key];

        if (valA === undefined || valB === undefined) return 0;

        if (typeof valA === 'string' && typeof valB === 'string') {
            return order === 'asc'
                ? valA.localeCompare(valB)
                : valB.localeCompare(valA);
        }

        if (typeof valA === 'number' && typeof valB === 'number') {
            return order === 'asc' ? valA - valB : valB - valA;
        }

        return 0;
    });
}
