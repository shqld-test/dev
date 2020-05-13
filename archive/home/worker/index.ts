addEventListener('fetch', (event) => {
    event.respondWith(handleRequest(event.request))
})

/**
 * Respond to the request
 * @param {Request} request
 */
async function handleRequest(request) {
    let response = await fetch(request)

    // Make the headers mutable by re-constructing the Response.
    response = new Response(response.body, response)
    response.headers.set('x-my-header', 'custom value')

    return response
}
