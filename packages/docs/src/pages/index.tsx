import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

export default function Home(): JSX.Element {
    return (
        <Layout
            title={`SynthQL: Type-safe, composable queries`}
            description="The type-safe, composable query language"
        >
            <header
                style={{
                    minHeight: '70vh',
                    // Theme-safe background color
                    background: 'var(--ifm-hero-background)',
                    width: '100vw',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <div
                    style={{
                        maxWidth: 600,
                        padding: 20,
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 0,
                    }}
                >
                    <div
                        style={{
                            background: "url('./img/logo.webp')",
                            height: '80px',
                            width: '80px',
                            backgroundSize: 'cover',
                            borderRadius: '100%',
                            margin: '0 auto',
                        }}
                    />
                    <h1 style={{ textAlign: 'center' }}>SynthQL</h1>
                    <p>
                        The type-safe HTTP client for your PostgreSQL database.
                    </p>

                    <Link to="/docs/getting-started">
                        <button className="button button--primary button--lg">
                            Get started
                        </button>
                    </Link>
                </div>
            </header>

            <div style={{ height: 80 }} />

            <main className="container">
                <section
                    style={{
                        minHeight: '70vh',
                        display: 'flex',
                        gap: 0,
                        flexDirection: 'column',
                        padding: 40,
                    }}
                >
                    <div className="row">
                        <div className="col col--6">
                            <h2>What is SynthQL</h2>

                            <p>
                                SynthQL is a full stack HTTP client for your
                                PostgreSQL database. It lets you declaratively
                                describe your React component's data
                                dependencies.
                            </p>

                            <p>
                                With SynthQL you can focus on building great
                                products instead of spending time thinking how
                                to most efficiently fetch data into your
                                components.
                            </p>

                            <p>
                                SynthQL reads your PostgreSQL database schema
                                and generates types so you get type safety end
                                to end.
                            </p>
                        </div>

                        <div className="col col--6">
                            <CodeBlock language="typescript">
                                {[
                                    `const q = from('movies')`,
                                    `  .columns('id', 'title')`,
                                    `  .filter({ id: 1 })`,
                                    `  .take(10);`,
                                    ``,
                                    `// Execute the query`,
                                    `const { data: movies } = useSynthql(q);`,
                                    ``,
                                    `// movies is now `,
                                    `// Array<{id: string, title:string}> `,
                                    `console.log(movies[0].id)`,
                                ].join('\n')}
                            </CodeBlock>
                        </div>
                    </div>
                </section>

                <section>
                    <h1>Why SynthQL?</h1>
                    <div
                        style={{
                            marginTop: 40,
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 80,
                        }}
                    >
                        {features.map(
                            ({ title, link, description, code }, i) => {
                                const blocks = [
                                    <div className="col col--6">
                                        <div
                                            style={{
                                                height: '100%',

                                                borderRadius: 16,
                                            }}
                                        >
                                            <Heading as="h3">{title}</Heading>
                                            <p
                                                style={{
                                                    // preserve white space
                                                    whiteSpace: 'pre-wrap',
                                                }}
                                            >
                                                {description}
                                            </p>
                                            {link && (
                                                <Link to={link}>Read more</Link>
                                            )}
                                        </div>
                                    </div>,
                                    <div className="col col--6">
                                        <CodeBlock language="typescript">
                                            {code}
                                        </CodeBlock>
                                    </div>,
                                ];

                                return <div className="row">{blocks}</div>;
                            },
                        )}
                    </div>
                </section>

                <section
                    style={{
                        display: 'grid',
                        placeItems: 'center',
                        minHeight: '60vh',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 16,
                            transform: 'translateY(-20%)',
                        }}
                    >
                        <h2>Ready to get started?</h2>
                        <Link to="/docs/getting-started">
                            <button className="button button--primary button--lg">
                                Jump to the docs!
                            </button>
                        </Link>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

const features: Array<{
    title: string;
    description: string;
    link?: string;
    code: string;
}> = [
        {
            title: 'End-to-end type safety',
            description:
                'Generate types from your schema with a single command. Run in on your CI to ensure types are always up to date.',
            link: '/docs/getting-started#generate-types',
            code: [`npx @synthql/cli generate --url $DATABASE_URL`].join('\n'),
        },
        {
            title: 'Composable query language',
            description:
                'Build complex queries by composing smaller queries together. The SynthQL query language is designed for easy composition and re-use.',
            code: [
                `const findPetsByOwner = (owner) =>`,
                `    from('pets')`,
                `        .filter({ owner })`,
                `        .many();`,
                ``,
                `const findPersonById = (id) => {`,
                `    const pets = findPetsByOwner(id)`,
                `    return from('people')`,
                `        .filter({ id })`,
                `        .include({ pets })`,
                `        .one()`,
                `    }`,
            ].join('\n'),
        },
        {
            title: 'Built-in pagination & streaming',
            code: [
                `
const query = from('users')
    .filter({age: {gt:18}})
    .take(100) // set the size of the page

const {data, fetchNextPage} = useSynthql(query)`,
            ].join('\n'),
            description: [
                `Pagination in SynthQL just works! You don't need to do anything special to enable it!`,
            ].join('\n'),
        },
        {
            title: 'Lazy queries',
            description: [
                `As queries become bigger, latency also grows. Lazy queries help you split large object graphs to optimize page load.`,
                '',
                'In the following example, we use a lazy query to load a store and its products separately. This means the store can load quickly and the products can load in the background.',
                'This is especially useful when the products are not immediately visible on the page.',
            ].join('\n'),
            link: '/docs/deferred-queries',
            code: `
const products = from('products')
    .column('id', 'name', 'price')
    .filter({
        product_id: { in: col('store.product_ids') }
    })
    .lazy()
    .many()

const query = from('store')
    .column('id', 'name')
    .filter({ id })
    .include({
        products
    })

// Over the network, this results in two JSON lines
[{ id: "store 1", name: "Fancy store", products: { status: 'pending' } }]
[{ id: "store 1", name: "Fancy store", products: { status: "done", data: [...] } }]
            `,
        },

        {
            title: 'Security',
            link: '/docs/security',
            description:
                'SynthQL offers a number of security features to help you secure your application. This includes built-in authentication, query whitelisting, and more.',
            code: `
const findPetsByOwner = (ownerId) => {
    return from('pets')
        .column('name','id')
        .filter({ ownerId })
        .requires('pets:read')
        .many()
}

const findPersonByIds = (ids) => {
    return from('people')
        .column('first_name','last_name')
        .requires('person:read')
        .filter({id:{in:ids}})
        .include({
            films: findPetsByOwner(col('people.id'))
        })
        .many()
}`,
        },

        {
            title: 'Custom query providers',
            link: '/docs/custom-query-providers',
            description:
                'Not all data comes from the database. Use custom providers to join your DB tables with data from 3rd party APIs using a predictable performance model.',
            code: `
const findFilmsWithRatings = () => {
    const ratings = from('rotten_tomatoes_ratings')
        .filter({
            year:col('film.year')
        })
        .many()

    return from('films')
        .filter({ year: 1965 })
        .include({ ratings })
        .many()
}`,
        },
    ];
