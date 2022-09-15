export function getQueryParams() {
    const query = window.location.search
    return new URLSearchParams(query)
}
