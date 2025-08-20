import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { useTasks } from '@/hooks/useTasks';

export const TasksPage = () => {

    const {data, isLoading, error } = useTasks();

    if (isLoading) {
        return <div>Loading tasks...</div>;
    } else if (error) {
        return <div>Error while loading tasks.</div>;
    } else {
        return (
            <div>
                <h1>Task list</h1>
                {
                    // Card is composed of multiple sub-components
                    <Card>
                        <CardHeader>
                            <CardTitle>Title</CardTitle>
                            <CardDescription>Description</CardDescription>
                        </CardHeader>
                        <CardContent>
                            Content goes here
                        </CardContent>
                        <CardFooter>
                            Footer content
                        </CardFooter>
                    </Card>
                }
            </div>
        );
    }
};