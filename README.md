<div align="center">

<img src="/assets/logo.png" width="88" alt="SynthQL"  />
<h1 style="margin-top:16px">SynthQL</h1>
<p>A full-stack, type-safe client to your PostgreSQL database with a focus on DX and performance.</p>
</div>

## Show me some code

```ts
const query = from('films')
    .columns('id', 'title', 'year')
    .where({ id: { in: [1, 2, 3] } })
    .many();

const { data } = useSynthql(query);

// `data` will resolve to
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

-   [Website](https://synthql.github.io/SynthQL)
-   [Docs](https://synthql.github.io/SynthQL/docs/getting-started)
-   [API](https://synthql.github.io/SynthQL/reference)
-   [X/Twitter](https://twitter.com/fernandohur)
-   [GitHub](https://github.com/synthql/SynthQL)
