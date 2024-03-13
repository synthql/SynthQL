<div align="center">

<img src="/assets/logo.png" width="88" alt="synthql"  />
<h1 style="margin-top:16px">synthql</h1>
<p>A full-stack, type-safe client to your Postgresql database with a focus on DX and performance.</p>
</div>

![@synthql/react version](https://img.shields.io/npm/v/%40synthql%2Freact?label=%40synthql%2Freact)
![@synthql/backend version](https://img.shields.io/npm/v/%40synthql%2Fbackend?label=%40synthql%2Fbackend)
![@synthql/queries version](https://img.shields.io/npm/v/%40synthql%2Fqueries?label=%40synthql%2Fqueries)




## Show me some code

```ts
const query = from('films')
    .columns('id', 'title', 'year')
    .where({ id: { in: [1, 2] } })
    .many();

const { data } = useSynthql(query);

// data will resolve to
[
    {
        id: 1,
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: '2001',
    },
    {
        id: 2,
        title: 'The Lord of the Rings: The Two Towers',
        year: '2002',
    },
    {
        id: 3,
        title: 'The Lord of the Rings: The Return of the King',
        year: '2003',
    },
];
```

## Links

-   [Website](https://fhur.github.io/synthql/)
-   [Docs](https://fhur.github.io/synthql/docs/getting-started)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [Github](https://github.com/fhur/synthql)
