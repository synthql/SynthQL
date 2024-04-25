import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CodeBlock from '@theme/CodeBlock';

import styles from './index.module.css';

function HomepageHeader() {
    const { siteConfig } = useDocusaurusContext();
    return (
        <header
            style={{ height: '100vh' }}
            className={clsx('hero hero--primary', styles.heroBanner)}
        >
            <div className="container">
                <Heading as="h1" className="hero__title">
                    {siteConfig.title}
                </Heading>
                <p className="hero__subtitle">
                    The <i>extreme</i> query language
                </p>
                <div className={styles.buttons}>
                    <Link
                        className="button button--secondary button--lg"
                        to="/docs/getting-started"
                    >
                        Docusaurus Tutorial - 5min ⏱️
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default function Home(): JSX.Element {
    return (
        <Layout
            title={`SynthQL: Type-safe, composable queries`}
            description="The type-safe, composable query language"
        >
            <header
                style={{
                    minHeight: '90vh',
                    background: '#fafafa',
                    width: '100vw',
                    display: 'grid',
                    placeItems: 'center',
                }}
            >
                <div
                    style={{
                        background: "url('./img/logo.webp')",
                        height: '124px',
                        width: '124px',
                        backgroundSize: 'cover',
                        borderRadius: '100%',
                    }}
                />
                <div
                    style={{
                        maxWidth: 600,
                        transform: 'translateY(-20%)',
                        padding: 20,
                    }}
                >
                    <h1 style={{ textAlign: 'center' }}>Welcome to SynthQL</h1>
                    <div className="row">
                        <p className="col">
                            A full stack, type-safe client to your PostgreSQL
                            database with a focus on DX and performance.
                        </p>
                    </div>
                    <div className="row">
                        <p className="col">
                            SynthQL lets you query your database directly from
                            the browser, helping you create large object graphs
                            without the need for implementing custom endpoints.
                        </p>
                    </div>
                    <div className="row">
                        <p className="col">
                            SynthQL is written in TypeScript, and runs on the
                            browser and Node.js.
                        </p>
                    </div>

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
                        minHeight: '100vh',
                        display: 'flex',
                        gap: 40,
                        flexDirection: 'column',
                        padding: 40,
                    }}
                >
                    <h2>Features</h2>

                    <div className="row">
                        {[
                            {
                                title: 'Full-stack',
                                description:
                                    'SynthQL queries can be written both on the client and server.',
                            },
                            {
                                title: 'Plain-data queries',
                                description:
                                    'SynthQL queries are plain data. They can thus be serialized, deserialized, and transformed by regular function.',
                            },
                            {
                                title: 'Composable queries',
                                description:
                                    "SynthQL's query language is composable, allowing you to build complex queries from simple ones.",
                            },
                            {
                                title: 'Lazy queries',
                                link: '/docs/lazy-queries',
                                description:
                                    'Lazy queries help you split large object graphs to optimize page load.',
                            },
                            {
                                title: 'Security',
                                link: '/docs/security',
                                description:
                                    'SynthQL provides mechanisms for whitelisting queries, restricting access to columns and restricting access to rows.',
                            },
                            {
                                title: 'Custom query executors',
                                link: '/docs/custom-query-executors',
                                description:
                                    'Queries are compiled by default to a single SQL query, query executors let you resolve queries from HTTP endpoints, files, e.t.c.',
                            },
                            {
                                title: 'Type-generation',
                                link: '/docs/generating-types',
                                description:
                                    'SynthQL can automatically generate TypeScript types from your database schema.',
                            },
                            { title: 'Denormalized cache', description: '' },
                        ].map(({ title, link, description }) => {
                            return (
                                <div
                                    style={{ padding: 8 }}
                                    className="col col--6"
                                >
                                    <div
                                        style={{
                                            height: '100%',
                                            background: '#fafafa',
                                            borderRadius: 16,
                                            padding: 32,
                                        }}
                                    >
                                        <Heading as="h3">{title}</Heading>
                                        <p>{description}</p>
                                        {link && (
                                            <Link to={link}>Read more</Link>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
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
