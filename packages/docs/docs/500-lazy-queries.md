# Lazy queries

## The bigger the query, the longer the latency
One of the disadvantages of large query trees is that they result in proportionally longer latencies. The reason is simple: you have to wait for the entire query tree to load before you can send the response back to the client. So the bigger the query, the longer the wait.

To mitigate this issue, `synthql` let's you mark parts of your query tree as `lazy`. A lazy boundary will split your query into two and will tell the QueryEngine to flush results to the client in sequences.

This feature is similar to [graphql's @defer directive](https://graphql.org/blog/2020-12-08-improving-latency-with-defer-and-stream-directives/).

## Example: store with many products

Let's imagine that you have a store that can sell hundreds of different products. You need to implement a Store page in which you display the store's properties and after srolling a bit the user can see a list of all the products sold by the store.

To improve the latency of this page you can mark the `products` query as `.lazy()` as follows:

```tsx
const products = from('products')
    .column('id','price','name')
    .lazy() // <======= this marks the products query as lazy
    .many()


const query = from('store')
    .column('id','store_name','store_owner')
    .include({
        products
    })

useSynthql(query)
```

Marking the `products` subquery as lazy will result in the query client first fetching the `store`, and then re-rendering the component when eventually the data from the `products` comes in.

## What happens over the wire

When the `QueryEngine` executes a query it will flush results to the client whenever it sees a `lazy()` boundary. In this example this will result in two lines of JSON being sent to the client over the same HTTP connection as follows

```ts
// First line of JSON
{id: '123', 'store_name': 'Fun Inc.', store_owner: 'Bob', products: {status:'pending'}}
// Once the products have loaded
{id: '123', 'store_name': 'Toys Inc.', store_owner: 'Bill', products: {status:'done', data: [...]}}
```



