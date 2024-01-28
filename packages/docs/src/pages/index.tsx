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
                        to="/docs/intro"
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
            title={`XQL: Type-safe, composable queries`}
            description="The type-safe, composable query language"
        >
            <header className="container" style={{ paddingTop: 40 }}>
                <h1>Welcome to XQL</h1>
                <div className="row">
                    <p className="col">
                        A full stack, type-safe client to your postgresql
                        database with a focus on DX and performance.
                    </p>
                </div>
                <div className="row">
                    <p className="col">
                        XQL let's you query your database directly from the
                        browser, helping you create large object graphs without
                        the need for implementing custom endpoints.
                    </p>
                </div>
                <div className="row">
                    <p className="col">
                        XQL is written in TypeScript, and runs on the browser
                        and nodejs.
                    </p>
                </div>
            </header>
            <main className="container">
                <section>
                    <h2>Installation</h2>
                    <p>
                        <CodeBlock language="bash">
                            {`yarn install @xql/client`}
                        </CodeBlock>
                    </p>
                </section>
                <section>
                    <h2>End-to-end type-safety</h2>
                    <p>
                        XQL infers the types of your database schema, and uses
                        them to provide end-to-end type-safety. To generate
                        types run the following command:
                    </p>
                    <CodeBlock language="bash">
                        {`yarn @xql/client generate-types --database-url DATABASE_URL`}
                    </CodeBlock>
                </section>

                <section>
                    <h2>Composable queries</h2>
                    <p>
                        XQL uses a composable query API, which allows you to
                        build complex queries from small, reusable parts.
                    </p>
                </section>
            </main>
        </Layout>
    );
}
