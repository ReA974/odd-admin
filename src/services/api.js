function redirectIfUnauthorized(response) {
    if (response.status === 401) {
        window.location = '/unauthorized';
    } else if (response.status === 403) {
        window.location = '/forbidden';
    } else {
        return response;
    }
}