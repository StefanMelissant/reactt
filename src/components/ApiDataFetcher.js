import React, { useState, useEffect } from 'react';
import { Page, Layout, Card, TextContainer, SkeletonBodyText, SkeletonDisplayText} from '@shopify/polaris';

const ApiDataFetcher = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Replace 'YOUR_API_ENDPOINT' with the actual endpoint of your Laravel API
                const apiUrl = 'http://localhost:8000/api/get-messages';  // Adjust the API endpoint

                // Fetch the access token from a secure location or use your authentication flow
                const accessToken = 'YOUR_ACCESS_TOKEN';

                const response = await fetch(apiUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    // ...

    return (
        <Page>
            <Layout>
                <Layout.Section>
                    {data ? (
                        <Card>
                            <TextContainer>
                                <h2>Data from API:</h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                                    {data.messages.map((message, index) => (
                                        <Card key={index}>
                                            <TextContainer>
                                                <p>Name: {message.name}</p>
                                                <p>Subject: {message.subject}</p>
                                                <p>Message: {message.message}</p>
                                            </TextContainer>
                                        </Card>
                                    ))}
                                </div>
                            </TextContainer>
                        </Card>
                    ) : (
                        <Card sectioned>
                            <SkeletonDisplayText size="small" />
                            <SkeletonBodyText lines={4} />
                        </Card>


                    )}
                </Layout.Section>
            </Layout>
        </Page>
    );
};

export default ApiDataFetcher;