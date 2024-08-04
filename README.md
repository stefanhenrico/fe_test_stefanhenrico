## Notes

- In practice I would fetch 100 records plus the additional photo data at the same time but for the use case it's fine. Ideally you'd be able to get a paginated response from an API.
- The backend should handle setting a thumbnail before sending it to the client.
- I would save the incorrect attempts in a db as someone who knows about developer tools could still delete the value from the local storage. The latter is just a temporary solution to get the solution to an initial MVP state. I'd also use Redux persistance but for this use case I feel that local storage is fine.
