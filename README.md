Start the project with the following command:

```bash
pnpm start:debug
```

The graphql playground will be available at:

```bash
http://localhost:3000/graphql
```

# Example GraphQL query

```graphql
query {
  stringifyHosts(selectedHosts: [{ hostName: "test", hdSerial: 6 }]) {
    objectString
  }
}
```

Expected output:

```json
{
  "data": {
    "stringifyHosts": {
      "objectString": "[{\"hostName\":\"test\",\"hdSerial\":6}]"
    }
  }
}
```

Actual output:

```json
{
  "data": {
    "stringifyHosts": {
      "objectString": "[[]]"
    }
  }
}
```
