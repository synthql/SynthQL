export const schema = {
    properties: {
        users: {
            properties: {
                columns: {
                    properties: {
                        id: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                        name: {
                            properties: {
                                selectable: {
                                    type: 'boolean',
                                    const: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
